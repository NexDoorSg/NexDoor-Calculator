#!/usr/bin/env python3
"""
Monthly amenity sync: MOE schools + NEA hawker centres -> public/*.json

Regenerates the two files the Wealth Planner map layers read
(src/App.jsx fetches /schools.json and /hawkers.json):
  - public/schools.json : [{name, level, lat, lon}, ...]
  - public/hawkers.json : [{name, status, stalls, lat, lon}, ...]

The output schema is fixed by those existing files and must not drift —
App.jsx colour-codes schools by `level` and plots `lat`/`lon`.

Flow:
  1. Re-pull MOE "General information of schools"
     (d_688b934f82c1059ed0a6993d2a829089) via data.gov.sg datastore_search.
  2. Re-pull NEA "Hawker Centres" (d_4a086da0a5553be1d89383cd90d07ecd)
     GeoJSON via poll-download. Hawker features already carry coordinates,
     so hawkers are never geocoded.
  3. Geocode ONLY schools that are new. Schools are matched to the existing
     schools.json by name; a matched school reuses its existing lat/lon and
     is never re-geocoded. Only genuinely new schools hit OneMap.
  4. Append the TERTIARY constant verbatim (see below).
  5. SAFETY GUARD: if a run would REMOVE more than 10% of the existing
     MOE-sourced schools, or of the existing hawker centres, flag an anomaly.
     GitHub Actions then opens a PR for review instead of committing to main.
     Catches API/source glitches, not the odd genuine opening/closure.

Tertiary institutions:
  The 5 polytechnics, 3 ITE colleges and 6 universities are NOT in the MOE
  dataset — they were curated by hand. They are held in TERTIARY below and
  are appended verbatim on every run: never geocoded, never diffed, never
  counted by the safety guard. Without this they would be seen as "removed"
  every run (14/351 = 4%, which is UNDER the 10% guard, so they would be
  silently deleted).

Identity key:
  Name only. School names are unique in both the MOE dataset and the live
  file (verified 337/337), so name alone identifies a school. Including
  `level` in the key would make an MOE re-classification look like a
  delete+add, and lat/lon proximity is unusable because coordinates are the
  very thing being resolved.

Usage:
  python3 scripts/amenity_sync/sync_amenities.py --dry-run
  python3 scripts/amenity_sync/sync_amenities.py --out-dir /tmp/preview
  python3 scripts/amenity_sync/sync_amenities.py
"""

import os
import html
import json
import time
import argparse
import urllib.parse
import urllib.request
import urllib.error

# ---- data.gov.sg: MOE schools (CKAN datastore) ----
DATASTORE = "https://data.gov.sg/api/action/datastore_search"
SCHOOLS_RID = "d_688b934f82c1059ed0a6993d2a829089"
PAGE = 1000

# ---- data.gov.sg: NEA hawker centres (GeoJSON via poll-download) ----
HAWKERS_DATASET = "d_4a086da0a5553be1d89383cd90d07ecd"
POLL_DOWNLOAD = f"https://api-open.data.gov.sg/v1/public/api/datasets/{HAWKERS_DATASET}/poll-download"

# ---- OneMap (public search, no token needed) ----
ONEMAP = "https://www.onemap.gov.sg/api/common/elastic/search"
GEO_PACING_S = 0.25
GEO_MAX_RETRIES = 4

# ---- Output ----
REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
DEFAULT_OUT_DIR = os.path.join(REPO_ROOT, "public")
SCHOOLS_FILE = "schools.json"
HAWKERS_FILE = "hawkers.json"

# ---- Safety guard ----
REMOVAL_FRACTION = 0.10

USER_AGENT = "NexDoor-amenity-sync/1.0"
COORD_DP = 6  # matches the precision already in public/*.json

# MOE mainlevel_code -> the level buckets App.jsx colour-codes on.
LEVEL_MAP = {
    "PRIMARY": "primary",
    "SECONDARY (S1-S5)": "secondary",
    "SECONDARY (S1-S4)": "secondary",
    "JUNIOR COLLEGE": "jc",
    "CENTRALISED INSTITUTE": "jc",
    "MIXED LEVEL (S1-JC2)": "jc",
    "MIXED LEVEL (S1-S5, JC1-JC2)": "jc",
    "MIXED LEVEL (P1-S4)": "mixed",
}

# Words the live file keeps upper-cased; everything else is word.capitalize().
ACRONYMS = {"NUS"}

# Hand-curated: absent from the MOE dataset, so the sync cannot source or
# verify these. Appended verbatim, in this order, on every run.
TERTIARY = [
    {"name": "Nanyang Polytechnic", "level": "tertiary", "lat": 1.377819, "lon": 103.848423},
    {"name": "Ngee Ann Polytechnic", "level": "tertiary", "lat": 1.332481, "lon": 103.773306},
    {"name": "Singapore Polytechnic", "level": "tertiary", "lat": 1.310946, "lon": 103.772769},
    {"name": "Republic Polytechnic", "level": "tertiary", "lat": 1.444968, "lon": 103.785362},
    {"name": "Temasek Polytechnic", "level": "tertiary", "lat": 1.347939, "lon": 103.92884},
    {"name": "ITE College Central", "level": "tertiary", "lat": 1.377892, "lon": 103.856412},
    {"name": "ITE College East", "level": "tertiary", "lat": 1.334387, "lon": 103.955051},
    {"name": "ITE College West", "level": "tertiary", "lat": 1.375275, "lon": 103.752407},
    {"name": "National University of Singapore", "level": "tertiary", "lat": 1.2966, "lon": 103.7764},
    {"name": "Nanyang Technological University", "level": "tertiary", "lat": 1.3483, "lon": 103.6831},
    {"name": "Singapore Management University", "level": "tertiary", "lat": 1.296847, "lon": 103.852208},
    {"name": "Singapore University of Technology and Design", "level": "tertiary", "lat": 1.340172, "lon": 103.96286},
    {"name": "Singapore Institute of Technology", "level": "tertiary", "lat": 1.413307, "lon": 103.912964},
    {"name": "Singapore University of Social Sciences", "level": "tertiary", "lat": 1.328326, "lon": 103.775805},
]
TERTIARY_NAMES = {t["name"].strip().upper() for t in TERTIARY}


def clean(value):
    """HTML-unescape, strip, collapse internal whitespace."""
    if value is None:
        return ""
    return " ".join(html.unescape(str(value)).split())


def title_case(name):
    """Match the casing already in public/schools.json."""
    return " ".join(w if w.upper() in ACRONYMS else w.capitalize() for w in name.split())


def get_json(url, timeout=60):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=timeout) as response:
        return json.load(response)


def key_of(name):
    return clean(name).upper()


# --------------------------------------------------------------------------- #
# Schools
# --------------------------------------------------------------------------- #
def fetch_schools_raw():
    rows, offset = [], 0
    while True:
        qs = urllib.parse.urlencode({"resource_id": SCHOOLS_RID, "limit": PAGE, "offset": offset})
        result = get_json(f"{DATASTORE}?{qs}").get("result", {})
        records = result.get("records", [])
        rows.extend(records)
        total = result.get("total", len(rows))
        offset += PAGE
        if not records or offset >= total:
            break
    return rows


def level_of(mainlevel_code, unknown):
    raw = clean(mainlevel_code).upper()
    if raw in LEVEL_MAP:
        return LEVEL_MAP[raw]
    # Unrecognised code: keep the school (dropping it would read as a removal)
    # but bucket it by keyword and surface the code in the report.
    unknown.add(raw)
    if "PRIMARY" in raw and "MIXED" not in raw:
        return "primary"
    if "JUNIOR COLLEGE" in raw or "CENTRALISED" in raw:
        return "jc"
    if "MIXED" in raw:
        return "mixed"
    if "SECONDARY" in raw:
        return "secondary"
    return "mixed"


# --------------------------------------------------------------------------- #
# Hawkers
# --------------------------------------------------------------------------- #
def fetch_hawkers_geojson():
    meta = get_json(POLL_DOWNLOAD)
    url = meta.get("data", {}).get("url")
    if not url:
        raise SystemExit(f"poll-download returned no url: {meta}")
    return get_json(url, timeout=120)


def hawker_record(feature):
    props = feature.get("properties", {})
    coords = (feature.get("geometry") or {}).get("coordinates") or [None, None]
    lon, lat = coords[0], coords[1]  # GeoJSON is [lng, lat]
    return {
        "name": clean(props.get("NAME")),
        "status": clean(props.get("STATUS")),
        "stalls": props.get("NUMBER_OF_COOKED_FOOD_STALLS"),
        "lat": round(float(lat), COORD_DP) if lat is not None else None,
        "lon": round(float(lon), COORD_DP) if lon is not None else None,
    }


# --------------------------------------------------------------------------- #
# Geocoding (new schools only)
# --------------------------------------------------------------------------- #
def geocode(query):
    if not query:
        return None
    url = f"{ONEMAP}?searchVal={urllib.parse.quote(query)}&returnGeom=Y&getAddrDetails=Y&pageNum=1"
    for attempt in range(GEO_MAX_RETRIES + 1):
        try:
            results = get_json(url, timeout=30).get("results", [])
            if not results:
                return None
            return (round(float(results[0]["LATITUDE"]), COORD_DP),
                    round(float(results[0]["LONGITUDE"]), COORD_DP))
        except urllib.error.HTTPError as e:
            if (e.code == 429 or e.code >= 500) and attempt < GEO_MAX_RETRIES:
                time.sleep(0.4 * (2 ** attempt)); continue
            return None
        except Exception:
            if attempt < GEO_MAX_RETRIES:
                time.sleep(0.4 * (2 ** attempt)); continue
            return None
    return None


# --------------------------------------------------------------------------- #
# IO
# --------------------------------------------------------------------------- #
def load_existing(path):
    if not os.path.exists(path):
        return []
    with open(path, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            return []
    return data if isinstance(data, list) else []


def write_json(path, records):
    # Match the existing files byte-for-byte: compact single line, json's
    # default separators, no trailing newline. Anything else turns a no-op
    # sync into a whole-file diff.
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(json.dumps(records, ensure_ascii=False))


def emit(report):
    out = os.environ.get("GITHUB_OUTPUT")
    lines = [f"{k}={v}" for k, v in report.items()]
    if out:
        with open(out, "a", encoding="utf-8") as f:
            f.write("\n".join(lines) + "\n")
    print("\n--- report ---")
    print("\n".join(lines))


def phrase(kind, added, removed):
    parts = []
    if added:
        parts.append(f"+{added} {kind}{'' if added == 1 else 's'}")
    if removed:
        parts.append(f"-{removed} {kind}{'' if removed == 1 else 's'}")
    return parts


# --------------------------------------------------------------------------- #
# Main
# --------------------------------------------------------------------------- #
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="Report only; write nothing.")
    ap.add_argument("--out-dir", default=DEFAULT_OUT_DIR, help="Where to write the JSON (default: repo public/).")
    args = ap.parse_args()

    schools_path = os.path.join(args.out_dir, SCHOOLS_FILE)
    hawkers_path = os.path.join(args.out_dir, HAWKERS_FILE)
    existing_schools_path = os.path.join(DEFAULT_OUT_DIR, SCHOOLS_FILE)
    existing_hawkers_path = os.path.join(DEFAULT_OUT_DIR, HAWKERS_FILE)

    # ---------------- Schools ----------------
    existing_all = load_existing(existing_schools_path)
    # The guard and the coord-reuse map must only ever see MOE-sourced schools;
    # the tertiary constant is not part of the synced set.
    existing_moe = [s for s in existing_all if key_of(s.get("name")) not in TERTIARY_NAMES]
    existing_coords = {key_of(s.get("name")): (s.get("lat"), s.get("lon")) for s in existing_moe}
    existing_keys = set(existing_coords)

    unknown_levels = set()
    raw_schools = fetch_schools_raw()
    schools = []
    for row in raw_schools:
        name = clean(row.get("school_name"))
        if not name:
            continue
        schools.append({
            "name": title_case(name),
            "level": level_of(row.get("mainlevel_code"), unknown_levels),
            "lat": None,
            "lon": None,
            "_postal": clean(row.get("postal_code")),
            "_address": clean(row.get("address")),
        })
    print(f"MOE schools pulled: {len(schools)} (existing MOE-sourced in file: {len(existing_moe)})")
    if unknown_levels:
        print(f"  WARNING unmapped mainlevel_code(s): {sorted(unknown_levels)}")

    new_keys = {key_of(s["name"]) for s in schools}
    # Reuse existing coordinates; only geocode what we've never seen.
    for school in schools:
        previous = existing_coords.get(key_of(school["name"]))
        if previous and previous[0] is not None:
            school["lat"], school["lon"] = previous
    to_geocode = [s for s in schools if s["lat"] is None]
    print(f"Schools needing OneMap geocode (new only): {len(to_geocode)}")
    for i, school in enumerate(to_geocode, 1):
        found = geocode(school["_postal"]) or geocode(school["_address"])
        if found:
            school["lat"], school["lon"] = found
        time.sleep(GEO_PACING_S)
        if i % 25 == 0:
            print(f"  OneMap … {i}/{len(to_geocode)}")

    schools.sort(key=lambda s: s["name"].upper())
    schools_out = [{"name": s["name"], "level": s["level"], "lat": s["lat"], "lon": s["lon"]} for s in schools]
    # Tertiary is appended verbatim, after the MOE-sourced block.
    schools_out.extend(TERTIARY)

    schools_added = len(new_keys - existing_keys)
    schools_removed = len(existing_keys - new_keys)

    # ---------------- Hawkers ----------------
    existing_hawkers = load_existing(existing_hawkers_path)
    existing_hawker_keys = {key_of(h.get("name")) for h in existing_hawkers}

    geojson = fetch_hawkers_geojson()
    hawkers_out = [hawker_record(f) for f in geojson.get("features", [])
                   if clean((f.get("properties") or {}).get("NAME"))]
    print(f"NEA hawker centres pulled: {len(hawkers_out)} (existing in file: {len(existing_hawkers)})")

    hawker_keys = {key_of(h["name"]) for h in hawkers_out}
    hawkers_added = len(hawker_keys - existing_hawker_keys)
    hawkers_removed = len(existing_hawker_keys - hawker_keys)

    # ---------------- Safety guard (MOE-sourced + hawkers only) ----------------
    anomaly, reasons = False, []
    if existing_keys and schools_removed > REMOVAL_FRACTION * len(existing_keys):
        anomaly = True
        reasons.append(f"{schools_removed} schools removed (>{REMOVAL_FRACTION:.0%} of {len(existing_keys)} MOE-sourced)")
    if existing_hawker_keys and hawkers_removed > REMOVAL_FRACTION * len(existing_hawker_keys):
        anomaly = True
        reasons.append(f"{hawkers_removed} hawker centres removed (>{REMOVAL_FRACTION:.0%} of {len(existing_hawker_keys)})")

    # ---------------- Write ----------------
    if args.dry_run:
        print("--dry-run: no files written")
    else:
        write_json(schools_path, schools_out)
        write_json(hawkers_path, hawkers_out)
        print(f"Wrote {schools_path} and {hawkers_path}")

    # ---------------- Report ----------------
    changes = phrase("school", schools_added, schools_removed) + phrase("hawker centre", hawkers_added, hawkers_removed)
    summary = "Amenity sync: " + (", ".join(changes) if changes else "no additions/removals")

    emit({
        "anomaly": "true" if anomaly else "false",
        "anomaly_reason": "; ".join(reasons),
        "summary": summary,
        "schools_total": len(schools_out),
        "schools_moe": len(schools),
        "schools_tertiary": len(TERTIARY),
        "schools_added": schools_added,
        "schools_removed": schools_removed,
        "hawkers_total": len(hawkers_out),
        "hawkers_added": hawkers_added,
        "hawkers_removed": hawkers_removed,
        "unknown_levels": ",".join(sorted(unknown_levels)),
    })

    if anomaly:
        print(f"\n!!  SAFETY GUARD TRIPPED: {'; '.join(reasons)}")
        print("    The workflow will open a PR for review instead of committing to main.")


if __name__ == "__main__":
    main()
