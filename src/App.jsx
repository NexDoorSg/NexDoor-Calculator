import { useState, useEffect, useRef } from "react";

const BRAND = {
  navy: "#0D1F3C",
  teal: "#00838F",
  gold: "#C9A84C",
  cream: "#FAF8F4",
  lightGrey: "#F0EDE8",
  midGrey: "#8A8A8A",
  dark: "#1A1A1A",
};

const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900&family=Montserrat:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { font-family: 'DM Sans', sans-serif; background: #FAF8F4; }

  .nd-app { min-height: 100vh; background: #FAF8F4; }

  .nd-header {
    background: #0D1F3C;
    padding: 20px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 20px rgba(0,0,0,0.2);
  }

  .nd-logo-wrap { display: flex; flex-direction: column; }
  .nd-logo { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: #FAF8F4; letter-spacing: 3px; text-transform: uppercase; }
  .nd-tagline { font-size: 10px; color: #C9A84C; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 500; margin-top: 2px; }

  .nd-badge { background: rgba(201,168,76,0.15); border: 1px solid rgba(201,168,76,0.3); color: #C9A84C; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; padding: 6px 12px; border-radius: 2px; }

  .nd-tabs {
    background: #0D1F3C;
    padding: 0 32px;
    display: flex;
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.08);
    overflow-x: auto;
  }
  .nd-tabs::-webkit-scrollbar { display: none; }

  .nd-tab {
    padding: 14px 20px;
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    font-weight: 500;
    color: rgba(250,248,244,0.45);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
    transition: all 0.2s ease;
    background: none;
    border-top: none;
    border-left: none;
    border-right: none;
    font-family: 'DM Sans', sans-serif;
  }
  .nd-tab:hover { color: rgba(250,248,244,0.75); }
  .nd-tab.active { color: #C9A84C; border-bottom-color: #C9A84C; }

  .nd-content { max-width: 820px; margin: 0 auto; padding: 40px 24px 80px; }

  .nd-panel-title {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    font-weight: 600;
    color: #0D1F3C;
    margin-bottom: 4px;
    line-height: 1.2;
  }
  .nd-panel-sub { font-size: 13px; color: #8A8A8A; margin-bottom: 32px; letter-spacing: 0.3px; }

  .nd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .nd-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .nd-full { grid-column: 1 / -1; }

  .nd-field { display: flex; flex-direction: column; gap: 6px; }
  .nd-label { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: #8A8A8A; font-weight: 500; }

  .nd-input, .nd-select {
    background: white;
    border: 1.5px solid #E8E4DE;
    border-radius: 4px;
    padding: 12px 14px;
    font-size: 15px;
    color: #0D1F3C;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s;
    width: 100%;
    outline: none;
  }
  .nd-input:focus, .nd-select:focus { border-color: #00838F; }
  .nd-input::placeholder { color: #C5BFB7; }

  .nd-input-wrap { position: relative; }
  .nd-prefix {
    position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
    color: #8A8A8A; font-size: 14px; pointer-events: none;
  }
  .nd-input-wrap .nd-input { padding-left: 34px; }

  .nd-btn {
    background: #0D1F3C;
    color: #FAF8F4;
    border: none;
    padding: 14px 28px;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
    border-radius: 3px;
    transition: background 0.2s;
    font-family: 'DM Sans', sans-serif;
    margin-top: 8px;
  }
  .nd-btn:hover { background: #1a3158; }

  .nd-results {
    background: #0D1F3C;
    border-radius: 6px;
    padding: 28px;
    margin-top: 28px;
  }

  .nd-results-title {
    font-size: 10px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: rgba(250,248,244,0.4);
    margin-bottom: 20px;
    font-weight: 500;
  }

  .nd-result-main {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    margin-bottom: 24px;
  }

  .nd-result-value {
    font-family: 'Playfair Display', serif;
    font-size: 48px;
    font-weight: 600;
    color: #C9A84C;
    line-height: 1;
  }

  .nd-result-label { font-size: 12px; color: rgba(250,248,244,0.5); margin-bottom: 6px; }

  .nd-breakdown {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .nd-breakdown-item {}
  .nd-breakdown-label { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(250,248,244,0.35); margin-bottom: 4px; }
  .nd-breakdown-val { font-size: 17px; color: rgba(250,248,244,0.9); font-weight: 500; }

  .nd-note {
    font-size: 11px;
    color: #8A8A8A;
    margin-top: 20px;
    line-height: 1.7;
    padding: 14px;
    background: white;
    border-radius: 4px;
    border-left: 3px solid #C9A84C;
  }

  .nd-divider { border: none; border-top: 1px solid #E8E4DE; margin: 24px 0; }

  .nd-compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px; }

  .nd-compare-card {
    border-radius: 5px;
    padding: 20px;
  }
  .nd-compare-card.left { background: #00838F; }
  .nd-compare-card.right { background: #C9A84C; }
  .nd-compare-card-label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.65); margin-bottom: 12px; }
  .nd-compare-card-val { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 600; color: white; line-height: 1; margin-bottom: 4px; }
  .nd-compare-card-sub { font-size: 11px; color: rgba(255,255,255,0.65); }

  .nd-winner-badge {
    display: inline-block;
    background: rgba(255,255,255,0.2);
    border-radius: 2px;
    padding: 3px 8px;
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: white;
    margin-top: 8px;
  }

  .nd-segment { display: flex; gap: 0; margin-bottom: 20px; }
  .nd-seg-btn {
    flex: 1; padding: 10px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;
    background: white; border: 1.5px solid #E8E4DE; color: #8A8A8A; cursor: pointer;
    transition: all 0.2s; font-family: 'DM Sans', sans-serif; font-weight: 500;
  }
  .nd-seg-btn:first-child { border-radius: 4px 0 0 4px; }
  .nd-seg-btn:last-child { border-radius: 0 4px 4px 0; }
  .nd-seg-btn:not(:last-child) { border-right: none; }
  .nd-seg-btn.active { background: #0D1F3C; border-color: #0D1F3C; color: #FAF8F4; }

  .nd-toggle-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 18px; background: white; border: 1.5px solid #E8E4DE; border-radius: 6px; margin-bottom: 20px; }
  .nd-toggle-label { font-size: 13px; font-weight: 500; color: #0D1F3C; letter-spacing: 0.3px; }

  .nd-section-head { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600; color: #0D1F3C; margin: 32px 0 4px; }
  .nd-section-sub { font-size: 12px; color: #8A8A8A; margin-bottom: 18px; letter-spacing: 0.3px; }
  .nd-section-head:first-child { margin-top: 0; }

  .nd-slider-row { display: flex; align-items: center; gap: 14px; }
  .nd-slider { flex: 1; accent-color: #00838F; height: 4px; }
  .nd-slider-val { font-size: 15px; font-weight: 600; color: #0D1F3C; min-width: 110px; text-align: right; }

  .nd-proj-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 8px; }
  .nd-proj-card { background: white; border: 1.5px solid #E8E4DE; border-radius: 6px; padding: 18px; border-left: 3px solid #C9A84C; }
  .nd-proj-name { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 600; color: #0D1F3C; line-height: 1.25; margin-bottom: 2px; }
  .nd-proj-district { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: #00838F; font-weight: 600; margin-bottom: 14px; }
  .nd-proj-price { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 600; color: #C9A84C; line-height: 1; margin-bottom: 12px; }
  .nd-proj-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; border-top: 1px solid #F0EDE8; padding-top: 12px; }
  .nd-proj-meta-label { font-size: 9px; letter-spacing: 1px; text-transform: uppercase; color: #8A8A8A; margin-bottom: 2px; }
  .nd-proj-meta-val { font-size: 14px; color: #0D1F3C; font-weight: 500; }
  .nd-proj-size { margin-top: 12px; padding-top: 12px; border-top: 1px solid #F0EDE8; font-size: 12px; color: #8A8A8A; letter-spacing: 0.3px; }
  .nd-proj-size strong { color: #0D1F3C; font-weight: 600; }

  .nd-district-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .nd-district-link { background: none; border: none; color: #00838F; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; padding: 0; }
  .nd-district-link:hover { color: #0D1F3C; }
  .nd-district-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 20px; }
  .nd-district-item { display: flex; align-items: flex-start; gap: 7px; padding: 8px 10px; background: white; border: 1.5px solid #E8E4DE; border-radius: 5px; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
  .nd-district-item:hover { border-color: #00838F; }
  .nd-district-item.active { border-color: #0D1F3C; background: #F0EDE8; }
  .nd-district-item input { margin-top: 2px; accent-color: #00838F; cursor: pointer; flex-shrink: 0; }
  .nd-district-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
  .nd-district-code { font-size: 12px; font-weight: 600; color: #0D1F3C; }
  .nd-district-name { font-size: 10px; color: #8A8A8A; line-height: 1.25; }

  .nd-spinner { width: 28px; height: 28px; border: 3px solid #E8E4DE; border-top-color: #00838F; border-radius: 50%; animation: nd-spin 0.7s linear infinite; }
  @keyframes nd-spin { to { transform: rotate(360deg); } }
  .nd-loading-box { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 48px 20px; }
  .nd-loading-text { font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: #8A8A8A; }
  .nd-empty-box { padding: 32px 20px; text-align: center; font-size: 13px; color: #8A8A8A; background: white; border: 1.5px dashed #E8E4DE; border-radius: 6px; }

  .mrt-tooltip {
    background: white;
    border: 1px solid rgba(0,0,0,0.15);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    font-size: 11px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 6px;
    text-align: center;
    line-height: 1.4;
    white-space: nowrap;
    color: #1a1a1a;
  }
  .mrt-tooltip::before { display: none; }
  .mrt-tooltip-dist {
    font-size: 10px;
    font-weight: 400;
    color: #888;
  }

  @media (max-width: 640px) {
    .nd-grid, .nd-grid-3, .nd-compare-grid, .nd-breakdown, .nd-proj-grid { grid-template-columns: 1fr; }
    .nd-district-grid { grid-template-columns: repeat(2, 1fr); }
    .nd-result-value { font-size: 36px; }
    .nd-tabs { padding: 0 16px; }
    .nd-content { padding: 24px 16px 60px; }
    .nd-header { padding: 16px 20px; }
  }
`;
document.head.appendChild(style);

const fmt = (n, dec = 0) => {
  if (isNaN(n) || !isFinite(n)) return "—";
  return n.toLocaleString("en-SG", { minimumFractionDigits: dec, maximumFractionDigits: dec });
};

const fmtS = (n, dec = 0) => isNaN(n) || !isFinite(n) ? "—" : `S$ ${fmt(n, dec)}`;

// ─── BSD Calculation ───────────────────────────────────────────
function calcBSD(price) {
  const bands = [
    [180000, 0.01],
    [180000, 0.02],
    [640000, 0.03],
    [500000, 0.04],
    [1500000, 0.05],
    [Infinity, 0.06],
  ];
  let remaining = price;
  let bsd = 0;
  for (const [band, rate] of bands) {
    if (remaining <= 0) break;
    const taxable = Math.min(remaining, band);
    bsd += taxable * rate;
    remaining -= taxable;
  }
  return bsd;
}

// ─── ABSD Rates ────────────────────────────────────────────────
const ABSD_RATES = {
  SC: [0, 0.20, 0.30],
  SPR: [0.05, 0.30, 0.35],
  FR: [0.60, 0.60, 0.60],
  ENTITY: [0.65, 0.65, 0.65],
};

function getABSD(profile, propertyCount, price) {
  const rates = ABSD_RATES[profile];
  const idx = Math.min(propertyCount - 1, 2);
  return price * rates[idx];
}

// ─── 1. Affordability ─────────────────────────────────────────
function AffordabilityCalc() {
  const [buyers, setBuyers] = useState("1");
  const [income1, setIncome1] = useState("");
  const [debt1, setDebt1] = useState("");
  const [income2, setIncome2] = useState("");
  const [debt2, setDebt2] = useState("");
  const [type, setType] = useState("private");
  const [rate, setRate] = useState("4.0");
  const [tenure, setTenure] = useState("25");
  const [result, setResult] = useState(null);

  const calc = () => {
    const mi1 = parseFloat(income1) || 0;
    const md1 = parseFloat(debt1) || 0;
    const mi2 = buyers === "2" ? (parseFloat(income2) || 0) : 0;
    const md2 = buyers === "2" ? (parseFloat(debt2) || 0) : 0;
    const mi = mi1 + mi2;
    const md = md1 + md2;
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(tenure) * 12;

    const tdsrCap = mi * 0.55;
    const msrCap = type === "hdb" ? mi * 0.30 : Infinity;
    const maxRepayment = Math.min(tdsrCap - md, msrCap);

    const maxLoan = maxRepayment * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));
    const maxPrice = maxLoan / 0.75;
    const minCash = maxPrice * 0.05;
    const cpfUsable = maxPrice * 0.20;

    setResult({ maxLoan, maxPrice, maxRepayment, minCash, cpfUsable, mi, md });
  };

  return (
    <div>
      <h2 className="nd-panel-title">Affordability & Max Loan</h2>
      <p className="nd-panel-sub">Based on TDSR (55%) and MSR (30% for HDB) guidelines</p>

      <div style={{display:"flex", gap:12, marginBottom:20, flexWrap:"wrap"}}>
        <div className="nd-segment" style={{flex:1, minWidth:200}}>
          <button className={`nd-seg-btn ${type === "hdb" ? "active" : ""}`} onClick={() => setType("hdb")}>HDB / EC</button>
          <button className={`nd-seg-btn ${type === "private" ? "active" : ""}`} onClick={() => setType("private")}>Private</button>
        </div>
        <div className="nd-segment" style={{flex:1, minWidth:200}}>
          <button className={`nd-seg-btn ${buyers === "1" ? "active" : ""}`} onClick={() => setBuyers("1")}>1 Buyer</button>
          <button className={`nd-seg-btn ${buyers === "2" ? "active" : ""}`} onClick={() => setBuyers("2")}>2 Buyers</button>
        </div>
      </div>

      <div className="nd-grid">
        <div className="nd-field">
          <label className="nd-label">{buyers === "2" ? "Buyer 1 — Gross Monthly Income" : "Gross Monthly Income"}</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="8,000" value={income1} onChange={e => setIncome1(e.target.value)} /></div>
        </div>
        <div className="nd-field">
          <label className="nd-label">{buyers === "2" ? "Buyer 1 — Existing Monthly Debt" : "Existing Monthly Debt"}</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="500" value={debt1} onChange={e => setDebt1(e.target.value)} /></div>
        </div>
        {buyers === "2" && <>
          <div className="nd-field">
            <label className="nd-label">Buyer 2 — Gross Monthly Income</label>
            <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="6,000" value={income2} onChange={e => setIncome2(e.target.value)} /></div>
          </div>
          <div className="nd-field">
            <label className="nd-label">Buyer 2 — Existing Monthly Debt</label>
            <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="0" value={debt2} onChange={e => setDebt2(e.target.value)} /></div>
          </div>
        </>}
        <div className="nd-field">
          <label className="nd-label">Interest Rate (% p.a.)</label>
          <input className="nd-input" placeholder="4.0" value={rate} onChange={e => setRate(e.target.value)} />
        </div>
        <div className="nd-field">
          <label className="nd-label">Loan Tenure (years)</label>
          <input className="nd-input" placeholder="25" value={tenure} onChange={e => setTenure(e.target.value)} />
        </div>
      </div>

      <button className="nd-btn" onClick={calc}>Calculate →</button>

      {result && (
        <div className="nd-results">
          <p className="nd-results-title">Estimated Affordability {buyers === "2" ? "(Combined)" : ""}</p>
          <div className="nd-result-main">
            <div>
              <p className="nd-result-label">Maximum Property Price</p>
              <div className="nd-result-value">{fmtS(result.maxPrice)}</div>
            </div>
          </div>
          <div className="nd-breakdown">
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Max Loan (75% LTV)</p><p className="nd-breakdown-val">{fmtS(result.maxLoan)}</p></div>
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Max Monthly Repayment</p><p className="nd-breakdown-val">{fmtS(result.maxRepayment)}</p></div>
            {buyers === "2" && <div className="nd-breakdown-item"><p className="nd-breakdown-label">Combined Income</p><p className="nd-breakdown-val">{fmtS(result.mi)}</p></div>}
            {buyers === "2" && <div className="nd-breakdown-item"><p className="nd-breakdown-label">Combined Debt</p><p className="nd-breakdown-val">{fmtS(result.md)}</p></div>}
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Min Cash (5%)</p><p className="nd-breakdown-val">{fmtS(result.minCash)}</p></div>
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">CPF Usable (20%)</p><p className="nd-breakdown-val">{fmtS(result.cpfUsable)}</p></div>
          </div>
        </div>
      )}

      <p className="nd-note">Assumes 75% LTV (first property, no outstanding loans). TDSR = 55%, MSR = 30% applies to HDB/EC only. For 2 buyers, incomes and debts are combined. Actual approval subject to bank assessment.</p>
    </div>
  );
}

// ─── 2. Monthly Mortgage ──────────────────────────────────────
function MortgageCalc() {
  const [loan, setLoan] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [result, setResult] = useState(null);

  const calc = () => {
    const P = parseFloat(loan);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(tenure) * 12;
    const monthly = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthly * n;
    const totalInterest = totalPaid - P;
    const yr1interest = P * parseFloat(rate) / 100;

    setResult({ monthly, totalPaid, totalInterest, yr1interest });
  };

  return (
    <div>
      <h2 className="nd-panel-title">Monthly Mortgage</h2>
      <p className="nd-panel-sub">Standard reducing balance calculation</p>

      <div className="nd-grid">
        <div className="nd-field">
          <label className="nd-label">Loan Amount</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="800,000" value={loan} onChange={e => setLoan(e.target.value)} /></div>
        </div>
        <div className="nd-field">
          <label className="nd-label">Interest Rate (% p.a.)</label>
          <input className="nd-input" placeholder="4.0" value={rate} onChange={e => setRate(e.target.value)} />
        </div>
        <div className="nd-field nd-full">
          <label className="nd-label">Loan Tenure (years)</label>
          <input className="nd-input" placeholder="25" value={tenure} onChange={e => setTenure(e.target.value)} />
        </div>
      </div>

      <button className="nd-btn" onClick={calc}>Calculate →</button>

      {result && (
        <div className="nd-results">
          <p className="nd-results-title">Repayment Summary</p>
          <div className="nd-result-main">
            <div>
              <p className="nd-result-label">Monthly Repayment</p>
              <div className="nd-result-value">{fmtS(result.monthly)}</div>
            </div>
          </div>
          <div className="nd-breakdown">
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Total Amount Paid</p><p className="nd-breakdown-val">{fmtS(result.totalPaid)}</p></div>
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Total Interest Paid</p><p className="nd-breakdown-val">{fmtS(result.totalInterest)}</p></div>
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Interest (Year 1)</p><p className="nd-breakdown-val">{fmtS(result.yr1interest)}</p></div>
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Interest % of Loan</p><p className="nd-breakdown-val">{fmt(result.totalInterest / parseFloat(loan) * 100, 1)}%</p></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 3. Stamp Duty ────────────────────────────────────────────
function StampDutyCalc() {
  const [price, setPrice] = useState("");
  const [profile, setProfile] = useState("SC");
  const [propCount, setPropCount] = useState("1");
  const [result, setResult] = useState(null);

  const profileLabels = { SC: "Singapore Citizen", SPR: "Singapore PR", FR: "Foreigner", ENTITY: "Entity / Company" };

  const calc = () => {
    const p = parseFloat(price);
    const bsd = calcBSD(p);
    const absd = getABSD(profile, parseInt(propCount), p);
    setResult({ bsd, absd, total: bsd + absd, price: p });
  };

  return (
    <div>
      <h2 className="nd-panel-title">Stamp Duty Calculator</h2>
      <p className="nd-panel-sub">BSD + ABSD based on current IRAS rates</p>

      <div className="nd-grid">
        <div className="nd-field">
          <label className="nd-label">Purchase Price</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="1,200,000" value={price} onChange={e => setPrice(e.target.value)} /></div>
        </div>
        <div className="nd-field">
          <label className="nd-label">Buyer Profile</label>
          <select className="nd-select" value={profile} onChange={e => setProfile(e.target.value)}>
            {Object.entries(profileLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
        <div className="nd-field nd-full">
          <label className="nd-label">Property Count (including this purchase)</label>
          <div className="nd-segment" style={{marginBottom: 0}}>
            {["1","2","3"].map(n => (
              <button key={n} className={`nd-seg-btn ${propCount === n ? "active" : ""}`} onClick={() => setPropCount(n)}>
                {n === "3" ? "3rd+" : `${n}${n === "1" ? "st" : "nd"}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="nd-btn" onClick={calc}>Calculate →</button>

      {result && (
        <div className="nd-results">
          <p className="nd-results-title">Stamp Duty Payable</p>
          <div className="nd-result-main">
            <div>
              <p className="nd-result-label">Total Stamp Duty</p>
              <div className="nd-result-value">{fmtS(result.total)}</div>
            </div>
          </div>
          <div className="nd-breakdown">
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Buyer's Stamp Duty (BSD)</p><p className="nd-breakdown-val">{fmtS(result.bsd)}</p></div>
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Additional BSD (ABSD)</p><p className="nd-breakdown-val">{result.absd === 0 ? "—" : fmtS(result.absd)}</p></div>
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">BSD Rate (effective)</p><p className="nd-breakdown-val">{fmt(result.bsd / result.price * 100, 2)}%</p></div>
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Total as % of Price</p><p className="nd-breakdown-val">{fmt(result.total / result.price * 100, 2)}%</p></div>
          </div>
        </div>
      )}
      <p className="nd-note">ABSD rates (Apr 2023): SC 0% / 20% / 30% | SPR 5% / 30% / 35% | Foreigner 60% | Entity 65%. BSD: 1–6% on progressive bands. Verify with IRAS for latest rates.</p>
    </div>
  );
}

// ─── 4. CPF vs Cash ───────────────────────────────────────────
function CpfCashCalc() {
  const [cpfAmt, setCpfAmt] = useState("");
  const [years, setYears] = useState("");
  const [cashReturn, setCashReturn] = useState("4.0");
  const [result, setResult] = useState(null);

  const calc = () => {
    const C = parseFloat(cpfAmt);
    const y = parseInt(years);
    const cpfRate = 0.025;
    const cashRate = parseFloat(cashReturn) / 100;

    const cpfAccrued = C * Math.pow(1 + cpfRate, y);
    const cashGrown = C * Math.pow(1 + cashRate, y);
    const cpfRefundTotal = cpfAccrued;
    const netSaleBackCPF = cpfAccrued - C;
    const cashOppCost = cashGrown - C;

    setResult({ cpfAccrued, cashGrown, cpfRefundTotal, netSaleBackCPF, cashOppCost, C });
  };

  return (
    <div>
      <h2 className="nd-panel-title">CPF vs Cash</h2>
      <p className="nd-panel-sub">Compare CPF OA usage vs deploying cash elsewhere</p>

      <div className="nd-grid">
        <div className="nd-field">
          <label className="nd-label">CPF OA Amount to Use</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="150,000" value={cpfAmt} onChange={e => setCpfAmt(e.target.value)} /></div>
        </div>
        <div className="nd-field">
          <label className="nd-label">Holding Period (years)</label>
          <input className="nd-input" placeholder="10" value={years} onChange={e => setYears(e.target.value)} />
        </div>
        <div className="nd-field nd-full">
          <label className="nd-label">Cash Investment Return (% p.a.)</label>
          <input className="nd-input" placeholder="4.0" value={cashReturn} onChange={e => setCashReturn(e.target.value)} />
        </div>
      </div>

      <button className="nd-btn" onClick={calc}>Calculate →</button>

      {result && (
        <div>
          <div className="nd-compare-grid">
            <div className="nd-compare-card left">
              <p className="nd-compare-card-label">CPF OA (2.5% p.a.)</p>
              <div className="nd-compare-card-val">{fmtS(result.cpfAccrued)}</div>
              <p className="nd-compare-card-sub">Incl. accrued interest to refund</p>
              <div className="nd-winner-badge">Must refund on sale</div>
            </div>
            <div className="nd-compare-card right">
              <p className="nd-compare-card-label">Cash at {cashReturn}% p.a.</p>
              <div className="nd-compare-card-val">{fmtS(result.cashGrown)}</div>
              <p className="nd-compare-card-sub">Opportunity value of your cash</p>
              {parseFloat(cashReturn) > 2.5 && <div className="nd-winner-badge">Higher return</div>}
            </div>
          </div>
          <div className="nd-results" style={{marginTop: 16}}>
            <p className="nd-results-title">Key Numbers</p>
            <div className="nd-breakdown">
              <div className="nd-breakdown-item"><p className="nd-breakdown-label">CPF Accrued Interest</p><p className="nd-breakdown-val">{fmtS(result.netSaleBackCPF)}</p></div>
              <div className="nd-breakdown-item"><p className="nd-breakdown-label">Cash Opportunity Gain</p><p className="nd-breakdown-val">{fmtS(result.cashOppCost)}</p></div>
              <div className="nd-breakdown-item"><p className="nd-breakdown-label">Difference</p><p className="nd-breakdown-val">{fmtS(Math.abs(result.cashGrown - result.cpfAccrued))}</p></div>
              <div className="nd-breakdown-item"><p className="nd-breakdown-label">Advantage</p><p className="nd-breakdown-val">{result.cashGrown > result.cpfAccrued ? "Cash wins" : "CPF wins"}</p></div>
            </div>
          </div>
        </div>
      )}
      <p className="nd-note">CPF OA earns 2.5% p.a. and must be refunded with accrued interest upon property sale. Using CPF frees up cash — compare that cash's opportunity cost against 2.5%. This is informational only; consult CPF Board for full rules.</p>
    </div>
  );
}

// ─── 5. Rental Yield ─────────────────────────────────────────
function RentalYieldCalc() {
  const [price, setPrice] = useState("");
  const [rent, setRent] = useState("");
  const [vacancy, setVacancy] = useState("1");
  const [expenses, setExpenses] = useState("");
  const [result, setResult] = useState(null);

  const calc = () => {
    const p = parseFloat(price);
    const r = parseFloat(rent);
    const v = parseInt(vacancy) || 0;
    const e = parseFloat(expenses) || 0;

    const grossAnnual = r * 12;
    const effectiveAnnual = r * (12 - v);
    const netAnnual = effectiveAnnual - e;
    const grossYield = (grossAnnual / p) * 100;
    const netYield = (netAnnual / p) * 100;
    const vacancyLoss = r * v;

    setResult({ grossAnnual, effectiveAnnual, netAnnual, grossYield, netYield, vacancyLoss });
  };

  return (
    <div>
      <h2 className="nd-panel-title">Rental Yield</h2>
      <p className="nd-panel-sub">Gross and net yield with vacancy and expense adjustments</p>

      <div className="nd-grid">
        <div className="nd-field">
          <label className="nd-label">Purchase Price</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="1,500,000" value={price} onChange={e => setPrice(e.target.value)} /></div>
        </div>
        <div className="nd-field">
          <label className="nd-label">Monthly Rent</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="4,000" value={rent} onChange={e => setRent(e.target.value)} /></div>
        </div>
        <div className="nd-field">
          <label className="nd-label">Vacancy (months/year)</label>
          <select className="nd-select" value={vacancy} onChange={e => setVacancy(e.target.value)}>
            {[0,1,2,3].map(n => <option key={n} value={n}>{n} month{n !== 1 ? "s" : ""}</option>)}
          </select>
        </div>
        <div className="nd-field">
          <label className="nd-label">Annual Expenses (maint, tax...)</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="6,000" value={expenses} onChange={e => setExpenses(e.target.value)} /></div>
        </div>
      </div>

      <button className="nd-btn" onClick={calc}>Calculate →</button>

      {result && (
        <div className="nd-results">
          <p className="nd-results-title">Yield Analysis</p>
          <div className="nd-compare-grid" style={{marginBottom: 20}}>
            <div>
              <p className="nd-result-label">Gross Yield</p>
              <div className="nd-result-value" style={{fontSize: 40}}>{fmt(result.grossYield, 2)}%</div>
            </div>
            <div>
              <p className="nd-result-label">Net Yield</p>
              <div className="nd-result-value" style={{fontSize: 40, color: result.netYield < 2 ? "#e57373" : "#C9A84C"}}>{fmt(result.netYield, 2)}%</div>
            </div>
          </div>
          <div className="nd-breakdown">
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Gross Annual Rent</p><p className="nd-breakdown-val">{fmtS(result.grossAnnual)}</p></div>
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Effective (post-vacancy)</p><p className="nd-breakdown-val">{fmtS(result.effectiveAnnual)}</p></div>
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Net Annual Income</p><p className="nd-breakdown-val">{fmtS(result.netAnnual)}</p></div>
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Vacancy Loss</p><p className="nd-breakdown-val">{fmtS(result.vacancyLoss)}</p></div>
          </div>
        </div>
      )}
      <p className="nd-note">Gross yield = annual rent / price. Net yield accounts for vacancy and recurring expenses (maintenance, property tax, agent fees). Does not include financing costs or depreciation.</p>
    </div>
  );
}

// ─── 6. Seller Net Proceeds ───────────────────────────────────
function SellerProceedsCalc() {
  const [sellers, setSellers] = useState("1");
  const [split, setSplit] = useState("50");
  const [salePrice, setSalePrice] = useState("");
  const [outstanding, setOutstanding] = useState("");
  const [cpfUsed1, setCpfUsed1] = useState("");
  const [cpfInterest1, setCpfInterest1] = useState("");
  const [cpfUsed2, setCpfUsed2] = useState("");
  const [cpfInterest2, setCpfInterest2] = useState("");
  const [commRate, setCommRate] = useState("2.0");
  const [legalFees, setLegalFees] = useState("3000");
  const [ssdYears, setSsdYears] = useState("0");
  const [result, setResult] = useState(null);

  const SSD_RATES = { 0: 0, 1: 0.16, 2: 0.12, 3: 0.08, 4: 0.04 };

  const calc = () => {
    const sp = parseFloat(salePrice);
    const loan = parseFloat(outstanding) || 0;
    const cpf1 = (parseFloat(cpfUsed1) || 0) + (parseFloat(cpfInterest1) || 0);
    const cpf2 = sellers === "2" ? (parseFloat(cpfUsed2) || 0) + (parseFloat(cpfInterest2) || 0) : 0;
    const comm = sp * parseFloat(commRate) / 100;
    const legal = parseFloat(legalFees) || 0;
    const ssd = sp * (SSD_RATES[Math.min(parseInt(ssdYears), 4)] || 0);

    const pct1 = parseInt(split) / 100;
    const pct2 = 1 - pct1;

    const netPool = sp - loan - cpf1 - cpf2 - comm - legal - ssd;
    const seller1Cash = netPool * pct1;
    const seller2Cash = netPool * pct2;

    const totalDeductions = loan + cpf1 + cpf2 + comm + legal + ssd;
    const netCash = sp - totalDeductions;

    setResult({ sp, loan, cpf1, cpf2, comm, legal, ssd, totalDeductions, netCash, seller1Cash, seller2Cash, pct1, pct2 });
  };

  return (
    <div>
      <h2 className="nd-panel-title">Seller Net Proceeds</h2>
      <p className="nd-panel-sub">Estimate actual cash after all deductions</p>

      <div style={{display:"flex", gap:12, marginBottom:20, flexWrap:"wrap"}}>
        <div className="nd-segment" style={{flex:1, minWidth:200}}>
          <button className={`nd-seg-btn ${sellers === "1" ? "active" : ""}`} onClick={() => setSellers("1")}>1 Seller</button>
          <button className={`nd-seg-btn ${sellers === "2" ? "active" : ""}`} onClick={() => setSellers("2")}>2 Sellers</button>
        </div>
        {sellers === "2" && (
          <div className="nd-segment" style={{flex:1, minWidth:200}}>
            {[["50","50 / 50"],["60","60 / 40"],["70","70 / 30"],["99","99 / 1"]].map(([v, l]) => (
              <button key={v} className={`nd-seg-btn ${split === v ? "active" : ""}`} onClick={() => setSplit(v)} style={{fontSize:10}}>{l}</button>
            ))}
          </div>
        )}
      </div>

      <div className="nd-grid">
        <div className="nd-field">
          <label className="nd-label">Sale Price</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="1,200,000" value={salePrice} onChange={e => setSalePrice(e.target.value)} /></div>
        </div>
        <div className="nd-field">
          <label className="nd-label">Outstanding Loan</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="400,000" value={outstanding} onChange={e => setOutstanding(e.target.value)} /></div>
        </div>
        <div className="nd-field">
          <label className="nd-label">{sellers === "2" ? "Seller 1 — CPF Principal Used" : "CPF Principal Used"}</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="150,000" value={cpfUsed1} onChange={e => setCpfUsed1(e.target.value)} /></div>
        </div>
        <div className="nd-field">
          <label className="nd-label">{sellers === "2" ? "Seller 1 — CPF Accrued Interest" : "CPF Accrued Interest"}</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="30,000" value={cpfInterest1} onChange={e => setCpfInterest1(e.target.value)} /></div>
        </div>
        {sellers === "2" && <>
          <div className="nd-field">
            <label className="nd-label">Seller 2 — CPF Principal Used</label>
            <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="80,000" value={cpfUsed2} onChange={e => setCpfUsed2(e.target.value)} /></div>
          </div>
          <div className="nd-field">
            <label className="nd-label">Seller 2 — CPF Accrued Interest</label>
            <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="15,000" value={cpfInterest2} onChange={e => setCpfInterest2(e.target.value)} /></div>
          </div>
        </>}
        <div className="nd-field">
          <label className="nd-label">Agent Commission (%)</label>
          <input className="nd-input" placeholder="2.0" value={commRate} onChange={e => setCommRate(e.target.value)} />
        </div>
        <div className="nd-field">
          <label className="nd-label">Legal Fees (est.)</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="3,000" value={legalFees} onChange={e => setLegalFees(e.target.value)} /></div>
        </div>
        <div className="nd-field nd-full">
          <label className="nd-label">Held for (SSD period)</label>
          <div className="nd-segment" style={{marginBottom: 0}}>
            {[["0","No SSD"],["1","Year 1 (16%)"],["2","Year 2 (12%)"],["3","Year 3 (8%)"],["4","Year 4 (4%)"]].map(([v, l]) => (
              <button key={v} className={`nd-seg-btn ${ssdYears === v ? "active" : ""}`} onClick={() => setSsdYears(v)} style={{fontSize: 10}}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <button className="nd-btn" onClick={calc}>Calculate →</button>

      {result && (
        <div className="nd-results">
          <p className="nd-results-title">Net Proceeds</p>
          {sellers === "1" ? (
            <>
              <div className="nd-result-main">
                <div>
                  <p className="nd-result-label">Cash in Hand After Sale</p>
                  <div className="nd-result-value" style={{color: result.netCash < 0 ? "#ef5350" : "#C9A84C"}}>{fmtS(result.netCash)}</div>
                </div>
              </div>
            </>
          ) : (
            <div className="nd-compare-grid" style={{marginBottom: 20}}>
              <div className="nd-compare-card left">
                <p className="nd-compare-card-label">Seller 1 ({Math.round(result.pct1 * 100)}% share)</p>
                <div className="nd-compare-card-val">{fmtS(result.seller1Cash)}</div>
                <p className="nd-compare-card-sub">Cash after CPF refund</p>
              </div>
              <div className="nd-compare-card right">
                <p className="nd-compare-card-label">Seller 2 ({Math.round(result.pct2 * 100)}% share)</p>
                <div className="nd-compare-card-val">{fmtS(result.seller2Cash)}</div>
                <p className="nd-compare-card-sub">Cash after CPF refund</p>
              </div>
            </div>
          )}
          <div className="nd-breakdown">
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Loan Repayment</p><p className="nd-breakdown-val">{fmtS(result.loan)}</p></div>
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">CPF Refund {sellers === "2" ? "(Seller 1)" : "(incl. interest)"}</p><p className="nd-breakdown-val">{fmtS(result.cpf1)}</p></div>
            {sellers === "2" && <div className="nd-breakdown-item"><p className="nd-breakdown-label">CPF Refund (Seller 2)</p><p className="nd-breakdown-val">{fmtS(result.cpf2)}</p></div>}
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Commission</p><p className="nd-breakdown-val">{fmtS(result.comm)}</p></div>
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Legal Fees</p><p className="nd-breakdown-val">{fmtS(result.legal)}</p></div>
            {result.ssd > 0 && <div className="nd-breakdown-item"><p className="nd-breakdown-label">Seller's Stamp Duty</p><p className="nd-breakdown-val">{fmtS(result.ssd)}</p></div>}
            <div className="nd-breakdown-item"><p className="nd-breakdown-label">Total Deductions</p><p className="nd-breakdown-val">{fmtS(result.totalDeductions)}</p></div>
          </div>
        </div>
      )}
      <p className="nd-note">CPF must be refunded to each owner's OA with accrued interest at 2.5% p.a. For 2 sellers, all costs (loan, CPF, commission, legal, SSD) are deducted from the sale price first. The remaining net proceeds are then split by ownership %. SSD applies within 3 years of purchase.</p>
    </div>
  );
}

// ─── 7. Wealth Planner ────────────────────────────────────────
const SSD_RATES_WP = { 0: 0, 1: 0.16, 2: 0.12, 3: 0.08, 4: 0.04 };
const PROFILE_TO_ABSD = { SC: "SC", SPR: "SPR", FR: "FR" };
const TYPE_TO_CATEGORY = { HDB: "hdb", Condo: "condo", EC: "ec", Landed: "landed" };
const PROJECT_MATCHER_URL = "https://homevalue.nexdoor.sg/api/project-matcher";

// Map + nearby-amenities config.
const SG_CENTER = [1.3521, 103.8198];
const NEARBY_AMENITIES_URL = "https://homevalue.nexdoor.sg/api/nearby-amenities";

// Haversine distance in metres between two [lat, lon] points.
function haversineM(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// Official MRT/LRT line colours, used for station markers and the map legend.
const MRT_LINE_COLORS = {
  NSL: "#D42E12",
  EWL: "#009645",
  NEL: "#9900AA",
  CCL: "#FA9E0D",
  DTL: "#005EC4",
  TEL: "#9D5B25",
  CRL: "#009AA6",
  JRL: "#0099AA",
};

// Static MRT/LRT station dataset (open + future CRL/JRL) used for the map's MRT
// layer — filtered client-side, no API call.
const MRT_STATIONS = [
  // NSL
  {name:"Jurong East",lat:1.3329,lon:103.7424,status:"open",line:"NSL"},
  {name:"Bukit Batok",lat:1.3490,lon:103.7496,status:"open",line:"NSL"},
  {name:"Bukit Gombak",lat:1.3586,lon:103.7519,status:"open",line:"NSL"},
  {name:"Choa Chu Kang",lat:1.3853,lon:103.7441,status:"open",line:"NSL"},
  {name:"Yew Tee",lat:1.3973,lon:103.7474,status:"open",line:"NSL"},
  {name:"Kranji",lat:1.4252,lon:103.7619,status:"open",line:"NSL"},
  {name:"Marsiling",lat:1.4326,lon:103.7742,status:"open",line:"NSL"},
  {name:"Woodlands",lat:1.4370,lon:103.7864,status:"open",line:"NSL"},
  {name:"Admiralty",lat:1.4406,lon:103.8006,status:"open",line:"NSL"},
  {name:"Sembawang",lat:1.4491,lon:103.8199,status:"open",line:"NSL"},
  {name:"Canberra",lat:1.4432,lon:103.8299,status:"open",line:"NSL"},
  {name:"Yishun",lat:1.4294,lon:103.8354,status:"open",line:"NSL"},
  {name:"Khatib",lat:1.4175,lon:103.8330,status:"open",line:"NSL"},
  {name:"Yio Chu Kang",lat:1.3817,lon:103.8448,status:"open",line:"NSL"},
  {name:"Ang Mo Kio",lat:1.3700,lon:103.8497,status:"open",line:"NSL"},
  {name:"Bishan",lat:1.3510,lon:103.8486,status:"open",line:"NSL"},
  {name:"Braddell",lat:1.3403,lon:103.8469,status:"open",line:"NSL"},
  {name:"Toa Payoh",lat:1.3325,lon:103.8474,status:"open",line:"NSL"},
  {name:"Novena",lat:1.3202,lon:103.8437,status:"open",line:"NSL"},
  {name:"Newton",lat:1.3131,lon:103.8384,status:"open",line:"NSL"},
  {name:"Orchard",lat:1.3043,lon:103.8319,status:"open",line:"NSL"},
  {name:"Somerset",lat:1.3004,lon:103.8389,status:"open",line:"NSL"},
  {name:"Dhoby Ghaut",lat:1.2990,lon:103.8459,status:"open",line:"NSL"},
  {name:"City Hall",lat:1.2931,lon:103.8520,status:"open",line:"NSL"},
  {name:"Raffles Place",lat:1.2840,lon:103.8513,status:"open",line:"NSL"},
  {name:"Marina Bay",lat:1.2764,lon:103.8548,status:"open",line:"NSL"},
  {name:"Marina South Pier",lat:1.2710,lon:103.8634,status:"open",line:"NSL"},
  // EWL
  {name:"Pasir Ris",lat:1.3731,lon:103.9494,status:"open",line:"EWL"},
  {name:"Tampines",lat:1.3528,lon:103.9453,status:"open",line:"EWL"},
  {name:"Simei",lat:1.3432,lon:103.9532,status:"open",line:"EWL"},
  {name:"Tanah Merah",lat:1.3273,lon:103.9462,status:"open",line:"EWL"},
  {name:"Bedok",lat:1.3240,lon:103.9300,status:"open",line:"EWL"},
  {name:"Kembangan",lat:1.3211,lon:103.9129,status:"open",line:"EWL"},
  {name:"Eunos",lat:1.3196,lon:103.9031,status:"open",line:"EWL"},
  {name:"Paya Lebar",lat:1.3180,lon:103.8930,status:"open",line:"EWL"},
  {name:"Aljunied",lat:1.3162,lon:103.8831,status:"open",line:"EWL"},
  {name:"Kallang",lat:1.3113,lon:103.8714,status:"open",line:"EWL"},
  {name:"Lavender",lat:1.3074,lon:103.8635,status:"open",line:"EWL"},
  {name:"Bugis",lat:1.3006,lon:103.8560,status:"open",line:"EWL"},
  {name:"Tanjong Pagar",lat:1.2765,lon:103.8454,status:"open",line:"EWL"},
  {name:"Outram Park",lat:1.2802,lon:103.8393,status:"open",line:"EWL"},
  {name:"Tiong Bahru",lat:1.2860,lon:103.8270,status:"open",line:"EWL"},
  {name:"Redhill",lat:1.2893,lon:103.8167,status:"open",line:"EWL"},
  {name:"Queenstown",lat:1.2947,lon:103.8063,status:"open",line:"EWL"},
  {name:"Commonwealth",lat:1.3021,lon:103.7981,status:"open",line:"EWL"},
  {name:"Buona Vista",lat:1.3070,lon:103.7900,status:"open",line:"EWL"},
  {name:"Dover",lat:1.3113,lon:103.7788,status:"open",line:"EWL"},
  {name:"Clementi",lat:1.3153,lon:103.7649,status:"open",line:"EWL"},
  {name:"Chinese Garden",lat:1.3425,lon:103.7322,status:"open",line:"EWL"},
  {name:"Lakeside",lat:1.3442,lon:103.7203,status:"open",line:"EWL"},
  {name:"Boon Lay",lat:1.3387,lon:103.7060,status:"open",line:"EWL"},
  {name:"Pioneer",lat:1.3368,lon:103.6970,status:"open",line:"EWL"},
  {name:"Joo Koon",lat:1.3278,lon:103.6786,status:"open",line:"EWL"},
  {name:"Gul Circle",lat:1.3194,lon:103.6615,status:"open",line:"EWL"},
  {name:"Tuas Crescent",lat:1.3207,lon:103.6406,status:"open",line:"EWL"},
  {name:"Tuas West Road",lat:1.3273,lon:103.6273,status:"open",line:"EWL"},
  {name:"Tuas Link",lat:1.3407,lon:103.6378,status:"open",line:"EWL"},
  {name:"Expo",lat:1.3354,lon:103.9615,status:"open",line:"EWL"},
  {name:"Changi Airport",lat:1.3574,lon:103.9883,status:"open",line:"EWL"},
  // CCL
  {name:"Bras Basah",lat:1.2966,lon:103.8502,status:"open",line:"CCL"},
  {name:"Esplanade",lat:1.2937,lon:103.8554,status:"open",line:"CCL"},
  {name:"Promenade",lat:1.2938,lon:103.8613,status:"open",line:"CCL"},
  {name:"Nicoll Highway",lat:1.2998,lon:103.8631,status:"open",line:"CCL"},
  {name:"Stadium",lat:1.3028,lon:103.8748,status:"open",line:"CCL"},
  {name:"Mountbatten",lat:1.3064,lon:103.8820,status:"open",line:"CCL"},
  {name:"Dakota",lat:1.3083,lon:103.8883,status:"open",line:"CCL"},
  {name:"MacPherson",lat:1.3267,lon:103.8888,status:"open",line:"CCL"},
  {name:"Tai Seng",lat:1.3358,lon:103.8882,status:"open",line:"CCL"},
  {name:"Bartley",lat:1.3427,lon:103.8809,status:"open",line:"CCL"},
  {name:"Serangoon",lat:1.3499,lon:103.8731,status:"open",line:"CCL"},
  {name:"Lorong Chuan",lat:1.3518,lon:103.8649,status:"open",line:"CCL"},
  {name:"Marymount",lat:1.3491,lon:103.8393,status:"open",line:"CCL"},
  {name:"Caldecott",lat:1.3376,lon:103.8393,status:"open",line:"CCL"},
  {name:"Botanic Gardens",lat:1.3224,lon:103.8154,status:"open",line:"CCL"},
  {name:"Farrer Road",lat:1.3173,lon:103.8079,status:"open",line:"CCL"},
  {name:"Holland Village",lat:1.3113,lon:103.7961,status:"open",line:"CCL"},
  {name:"one-north",lat:1.2993,lon:103.7873,status:"open",line:"CCL"},
  {name:"Kent Ridge",lat:1.2934,lon:103.7846,status:"open",line:"CCL"},
  {name:"Haw Par Villa",lat:1.2831,lon:103.7821,status:"open",line:"CCL"},
  {name:"Pasir Panjang",lat:1.2762,lon:103.7920,status:"open",line:"CCL"},
  {name:"Labrador Park",lat:1.2726,lon:103.8025,status:"open",line:"CCL"},
  {name:"Telok Blangah",lat:1.2705,lon:103.8097,status:"open",line:"CCL"},
  {name:"Harbourfront",lat:1.2652,lon:103.8203,status:"open",line:"CCL"},
  {name:"Bayfront",lat:1.2822,lon:103.8597,status:"open",line:"CCL"},
  // DTL
  {name:"Bukit Panjang",lat:1.3784,lon:103.7762,status:"open",line:"DTL"},
  {name:"Cashew",lat:1.3694,lon:103.7764,status:"open",line:"DTL"},
  {name:"Hillview",lat:1.3623,lon:103.7672,status:"open",line:"DTL"},
  {name:"Beauty World",lat:1.3412,lon:103.7759,status:"open",line:"DTL"},
  {name:"King Albert Park",lat:1.3355,lon:103.7784,status:"open",line:"DTL"},
  {name:"Sixth Avenue",lat:1.3319,lon:103.7950,status:"open",line:"DTL"},
  {name:"Tan Kah Kee",lat:1.3256,lon:103.8075,status:"open",line:"DTL"},
  {name:"Stevens",lat:1.3197,lon:103.8264,status:"open",line:"DTL"},
  {name:"Little India",lat:1.3066,lon:103.8494,status:"open",line:"DTL"},
  {name:"Rochor",lat:1.3031,lon:103.8527,status:"open",line:"DTL"},
  {name:"Downtown",lat:1.2793,lon:103.8527,status:"open",line:"DTL"},
  {name:"Telok Ayer",lat:1.2818,lon:103.8478,status:"open",line:"DTL"},
  {name:"Fort Canning",lat:1.2916,lon:103.8444,status:"open",line:"DTL"},
  {name:"Bencoolen",lat:1.2981,lon:103.8499,status:"open",line:"DTL"},
  {name:"Jalan Besar",lat:1.3047,lon:103.8556,status:"open",line:"DTL"},
  {name:"Bendemeer",lat:1.3148,lon:103.8638,status:"open",line:"DTL"},
  {name:"Geylang Bahru",lat:1.3213,lon:103.8713,status:"open",line:"DTL"},
  {name:"Mattar",lat:1.3244,lon:103.8826,status:"open",line:"DTL"},
  {name:"Ubi",lat:1.3257,lon:103.8982,status:"open",line:"DTL"},
  {name:"Kaki Bukit",lat:1.3350,lon:103.9067,status:"open",line:"DTL"},
  {name:"Bedok North",lat:1.3328,lon:103.9163,status:"open",line:"DTL"},
  {name:"Bedok Reservoir",lat:1.3355,lon:103.9322,status:"open",line:"DTL"},
  {name:"Tampines West",lat:1.3463,lon:103.9379,status:"open",line:"DTL"},
  {name:"Tampines East",lat:1.3575,lon:103.9553,status:"open",line:"DTL"},
  {name:"Upper Changi",lat:1.3413,lon:103.9614,status:"open",line:"DTL"},
  // TEL open stages
  {name:"Woodlands North",lat:1.4480,lon:103.8200,status:"open",line:"TEL"},
  {name:"Woodlands South",lat:1.4243,lon:103.7960,status:"open",line:"TEL"},
  {name:"Springleaf",lat:1.3990,lon:103.8189,status:"open",line:"TEL"},
  {name:"Lentor",lat:1.3840,lon:103.8356,status:"open",line:"TEL"},
  {name:"Mayflower",lat:1.3712,lon:103.8386,status:"open",line:"TEL"},
  {name:"Bright Hill",lat:1.3612,lon:103.8330,status:"open",line:"TEL"},
  {name:"Upper Thomson",lat:1.3540,lon:103.8318,status:"open",line:"TEL"},
  {name:"Mount Pleasant",lat:1.3226,lon:103.8313,status:"open",line:"TEL"},
  {name:"Napier",lat:1.3066,lon:103.8198,status:"open",line:"TEL"},
  {name:"Orchard Boulevard",lat:1.2989,lon:103.8231,status:"open",line:"TEL"},
  {name:"Great World",lat:1.2940,lon:103.8360,status:"open",line:"TEL"},
  {name:"Havelock",lat:1.2887,lon:103.8394,status:"open",line:"TEL"},
  {name:"Maxwell",lat:1.2797,lon:103.8449,status:"open",line:"TEL"},
  {name:"Shenton Way",lat:1.2770,lon:103.8480,status:"open",line:"TEL"},
  {name:"Gardens by the Bay",lat:1.2816,lon:103.8654,status:"open",line:"TEL"},
  {name:"Tanjong Rhu",lat:1.2996,lon:103.8770,status:"open",line:"TEL"},
  {name:"Katong Park",lat:1.3025,lon:103.8916,status:"open",line:"TEL"},
  {name:"Tanjong Katong",lat:1.3060,lon:103.9009,status:"open",line:"TEL"},
  {name:"Marine Parade",lat:1.3025,lon:103.9063,status:"open",line:"TEL"},
  {name:"Marine Terrace",lat:1.3063,lon:103.9159,status:"open",line:"TEL"},
  {name:"Siglap",lat:1.3107,lon:103.9264,status:"open",line:"TEL"},
  {name:"Bayshore",lat:1.3145,lon:103.9371,status:"open",line:"TEL"},
  {name:"Bedok South",lat:1.3213,lon:103.9466,status:"open",line:"TEL"},
  {name:"Sungei Bedok",lat:1.3278,lon:103.9556,status:"open",line:"TEL"},
  // NEL
  {name:"HarbourFront",lat:1.2652,lon:103.8203,status:"open",line:"NEL"},
  {name:"Chinatown",lat:1.2836,lon:103.8443,status:"open",line:"NEL"},
  {name:"Clarke Quay",lat:1.2884,lon:103.8464,status:"open",line:"NEL"},
  {name:"Farrer Park",lat:1.3121,lon:103.8558,status:"open",line:"NEL"},
  {name:"Boon Keng",lat:1.3193,lon:103.8617,status:"open",line:"NEL"},
  {name:"Potong Pasir",lat:1.3317,lon:103.8687,status:"open",line:"NEL"},
  {name:"Woodleigh",lat:1.3389,lon:103.8706,status:"open",line:"NEL"},
  {name:"Kovan",lat:1.3598,lon:103.8856,status:"open",line:"NEL"},
  {name:"Hougang",lat:1.3714,lon:103.8921,status:"open",line:"NEL"},
  {name:"Buangkok",lat:1.3832,lon:103.8930,status:"open",line:"NEL"},
  {name:"Sengkang",lat:1.3916,lon:103.8954,status:"open",line:"NEL"},
  {name:"Punggol",lat:1.4053,lon:103.9022,status:"open",line:"NEL"},
  // CRL future
  {name:"Aviation Park",lat:1.3600,lon:103.9850,status:"future",line:"CRL"},
  {name:"Loyang",lat:1.3700,lon:103.9700,status:"future",line:"CRL"},
  {name:"Pasir Ris East",lat:1.3750,lon:103.9600,status:"future",line:"CRL"},
  {name:"Tampines North",lat:1.3900,lon:103.9380,status:"future",line:"CRL"},
  {name:"Defu",lat:1.3800,lon:103.9050,status:"future",line:"CRL"},
  {name:"Serangoon North",lat:1.3800,lon:103.8750,status:"future",line:"CRL"},
  {name:"Teck Ghee",lat:1.3650,lon:103.8450,status:"future",line:"CRL"},
  {name:"Turf City",lat:1.3300,lon:103.8050,status:"future",line:"CRL"},
  {name:"Maju",lat:1.3300,lon:103.7650,status:"future",line:"CRL"},
  {name:"West Coast",lat:1.3100,lon:103.7600,status:"future",line:"CRL"},
  {name:"Jurong Lake District",lat:1.3350,lon:103.7400,status:"future",line:"CRL"},
  // JRL future
  {name:"Choa Chu Kang West",lat:1.3900,lon:103.7350,status:"future",line:"JRL"},
  {name:"Tengah",lat:1.3800,lon:103.7250,status:"future",line:"JRL"},
  {name:"Hong Kah",lat:1.3700,lon:103.7200,status:"future",line:"JRL"},
  {name:"Corporation",lat:1.3600,lon:103.7150,status:"future",line:"JRL"},
  {name:"Jurong West",lat:1.3500,lon:103.7050,status:"future",line:"JRL"},
  {name:"Bahar Junction",lat:1.3450,lon:103.7150,status:"future",line:"JRL"},
  {name:"Peng Kang Hill",lat:1.3750,lon:103.7300,status:"future",line:"JRL"},
  {name:"Tengah Park",lat:1.3820,lon:103.7180,status:"future",line:"JRL"},
  {name:"Bukit Batok West",lat:1.3580,lon:103.7430,status:"future",line:"JRL"},
  {name:"Tawas",lat:1.3480,lon:103.7200,status:"future",line:"JRL"},
  {name:"Nanyang Gateway",lat:1.3400,lon:103.6900,status:"future",line:"JRL"},
  {name:"Nanyang Crescent",lat:1.3350,lon:103.6800,status:"future",line:"JRL"},
  {name:"Pandan Reservoir",lat:1.3250,lon:103.7050,status:"future",line:"JRL"},
  {name:"Jurong Pier",lat:1.3200,lon:103.7000,status:"future",line:"JRL"},
  {name:"Gek Poh",lat:1.3480,lon:103.6950,status:"future",line:"JRL"},
];

// All 28 Singapore postal districts (matches the API's district codes).
const DISTRICTS = [
  { code: "D01", name: "Raffles Place, Marina" },
  { code: "D02", name: "Tanjong Pagar" },
  { code: "D03", name: "Queenstown, Tiong Bahru" },
  { code: "D04", name: "Harbourfront, Telok Blangah" },
  { code: "D05", name: "Buona Vista, West Coast" },
  { code: "D06", name: "City Hall, Clarke Quay" },
  { code: "D07", name: "Beach Road, Bugis" },
  { code: "D08", name: "Farrer Park, Serangoon Road" },
  { code: "D09", name: "Orchard, River Valley" },
  { code: "D10", name: "Holland, Bukit Timah" },
  { code: "D11", name: "Newton, Novena" },
  { code: "D12", name: "Toa Payoh, Balestier" },
  { code: "D13", name: "Macpherson, Potong Pasir" },
  { code: "D14", name: "Geylang, Paya Lebar" },
  { code: "D15", name: "East Coast, Marine Parade" },
  { code: "D16", name: "Bedok, Upper East Coast" },
  { code: "D17", name: "Changi, Loyang" },
  { code: "D18", name: "Tampines, Pasir Ris" },
  { code: "D19", name: "Serangoon, Hougang, Punggol" },
  { code: "D20", name: "Bishan, Ang Mo Kio" },
  { code: "D21", name: "Clementi, Upper Bukit Timah" },
  { code: "D22", name: "Boon Lay, Jurong" },
  { code: "D23", name: "Bukit Batok, Bukit Panjang" },
  { code: "D24", name: "Lim Chu Kang, Tengah" },
  { code: "D25", name: "Kranji, Woodlands" },
  { code: "D26", name: "Upper Thomson, Springleaf" },
  { code: "D27", name: "Yishun, Sembawang" },
  { code: "D28", name: "Seletar, Punggol North" },
];
const AMENITY_TYPES = [
  { id: "mrt", label: "MRT" },
  { id: "school", label: "Schools" },
  { id: "hawker", label: "Hawkers" },
];

// Preferred size options -> sqft band sent to the project-matcher API.
const SIZE_OPTIONS = [
  { id: "any",          label: "Any size",                       sizeMin: null, sizeMax: null },
  { id: "small",        label: "Up to 600 sqft (Studio / 1-bed)", sizeMin: null, sizeMax: 600 },
  { id: "medium_small", label: "600–800 sqft (Compact 2-bed)",   sizeMin: 600,  sizeMax: 800 },
  { id: "medium",       label: "800–1,000 sqft (Standard 2-bed)", sizeMin: 800,  sizeMax: 1000 },
  { id: "large",        label: "1,000–1,300 sqft (3-bed)",        sizeMin: 1000, sizeMax: 1300 },
  { id: "xlarge",       label: "1,300 sqft+ (4-bed+)",            sizeMin: 1300, sizeMax: null },
];

function WealthPlannerCalc() {
  // Section A — selling (up to 4 sellers)
  const [selling, setSelling] = useState(false);
  const [sellerCount, setSellerCount] = useState(1); // 1–4 sellers
  const [salePrice, setSalePrice] = useState("");
  const [loanBal, setLoanBal] = useState("");
  const [commRate, setCommRate] = useState("2.0");
  const [legalFees, setLegalFees] = useState("3000");
  const [ssdYears, setSsdYears] = useState("0");
  const [sellerNames, setSellerNames] = useState(["", "", "", ""]);
  const [sellerCpfPrincipals, setSellerCpfPrincipals] = useState(["", "", "", ""]);
  const [sellerCpfInterests, setSellerCpfInterests] = useState(["", "", "", ""]);
  const [sellerOaBalances, setSellerOaBalances] = useState(["", "", "", ""]);
  const [sellerOwnerships, setSellerOwnerships] = useState(["", "", "", ""]);

  // Are the sellers and buyers the same people? (drives buyer auto-fill)
  const [samePeople, setSamePeople] = useState(true);

  // Section B — buying (up to 4 buyers)
  const [buyerCount, setBuyerCount] = useState(1); // 1–4 buyers
  const [buyerNames, setBuyerNames] = useState(["", "", "", ""]);
  // Track which buyer name / OA fields the agent has manually edited so
  // auto-fill (from the matching seller) doesn't clobber a manual override.
  const [buyerNameEdited, setBuyerNameEdited] = useState([false, false, false, false]);
  const [buyerOaEdited, setBuyerOaEdited] = useState([false, false, false, false]);
  const [buyerAges, setBuyerAges] = useState(["", "", "", ""]);
  const [buyerIncomes, setBuyerIncomes] = useState(["", "", "", ""]);
  const [buyerDebts, setBuyerDebts] = useState(["", "", "", ""]);
  const [buyerOaBalances, setBuyerOaBalances] = useState(["", "", "", ""]);
  const [buyerCitizenships, setBuyerCitizenships] = useState(["SC", "SC", "SC", "SC"]);
  const [propertiesOwned, setPropertiesOwned] = useState("0"); // owned before this purchase
  const [propType, setPropType] = useState("Condo");
  const [prefSize, setPrefSize] = useState("any");
  const [rate, setRate] = useState("4.0");
  const [reserves, setReserves] = useState(50000);

  // Pure-buyer (not selling) extra fields — existing property + cash savings.
  const [existingProperty, setExistingProperty] = useState("no"); // "yes" | "no"
  const [existingLoanBal, setExistingLoanBal] = useState("");
  const [existingTenure, setExistingTenure] = useState("25");
  const [existingRate, setExistingRate] = useState("3.50");
  const [cashSavings, setCashSavings] = useState("");

  // Section C — projects
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [selectedDistricts, setSelectedDistricts] = useState([]); // [] = island-wide
  const [viewMode, setViewMode] = useState("list"); // "list" | "map"
  const [activeAmenity, setActiveAmenity] = useState(null); // null | "mrt" | "school" | "hawker"
  const [selectedProjectLatLon, setSelectedProjectLatLon] = useState(null); // { lat, lon }
  const [amenityLoading, setAmenityLoading] = useState(false);
  const [amenityError, setAmenityError] = useState(null);
  const [amenityMessage, setAmenityMessage] = useState(null);

  // Leaflet map instance + marker bookkeeping (refs so re-renders don't reset).
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const amenityMarkersRef = useRef([]);

  // Toggle an amenity layer on/off; only one type is active at a time.
  const toggleAmenity = (type) => {
    setActiveAmenity(prev => (prev === type ? null : type));
  };

  const num = (v) => parseFloat(v) || 0;
  // Curried array-state updater for the per-seller / per-buyer fields.
  const upd = (setter) => (i, val) => setter(prev => prev.map((x, k) => (k === i ? val : x)));

  const sellerIdx = Array.from({ length: sellerCount }, (_, i) => i);
  const buyerIdx = Array.from({ length: buyerCount }, (_, i) => i);

  // ── Section A: sale proceeds ──
  const salePriceN = num(salePrice);
  const loanN = num(loanBal);
  const commN = salePriceN * num(commRate) / 100;
  const legalN = num(legalFees);
  const ssdN = salePriceN * (SSD_RATES_WP[Math.min(parseInt(ssdYears) || 0, 4)] || 0);
  const totalCpfRefund = sellerIdx.reduce((s, i) => s + num(sellerCpfPrincipals[i]) + num(sellerCpfInterests[i]), 0);

  // Pool left after the shared selling costs (before each owner's CPF refund).
  const netPoolAfterCosts = salePriceN - loanN - commN - legalN - ssdN;
  const netProceeds = selling ? (netPoolAfterCosts - totalCpfRefund) : 0;

  // Splits apply if ANY seller entered an ownership %; otherwise single figure.
  const anyOwnership = sellerIdx.some(i => sellerOwnerships[i] !== "" && !isNaN(parseFloat(sellerOwnerships[i])));
  const sellerBreakdown = sellerIdx.map(i => {
    const cpfRefund = num(sellerCpfPrincipals[i]) + num(sellerCpfInterests[i]);
    const ownership = num(sellerOwnerships[i]) / 100;
    const share = netPoolAfterCosts * ownership;
    const cashInHand = share - cpfRefund;
    const oaAfter = num(sellerOaBalances[i]) - cpfRefund; // per spec: Current OA − refund
    return { i, name: sellerNames[i], cpfRefund, ownership, share, cashInHand, oaAfter };
  });

  // ── Same-people auto-fill: buyer N inherits seller N's name + CPF OA,
  // unless that buyer field has been manually edited. ──
  // Buyer i ↔ Seller i (returns the matching seller index, or -1 if none).
  const sourceSellerIdx = (i) => (selling && samePeople && i < sellerCount) ? i : -1;
  const autoFillBuyer = (i) => sourceSellerIdx(i) >= 0;
  const buyerNameEffective = (i) => {
    const s = sourceSellerIdx(i);
    return (s >= 0 && !buyerNameEdited[i] && sellerNames[s]) ? sellerNames[s] : buyerNames[i];
  };
  // On sale, the seller's CPF principal AND accrued interest are refunded into
  // their OA, so CPF available for the next purchase = current OA + principal +
  // accrued interest.
  const sellerCpfOaAfterSale = (s) =>
    num(sellerOaBalances[s]) + num(sellerCpfPrincipals[s]) + num(sellerCpfInterests[s]);
  const buyerOaNum = (i) => {
    const s = sourceSellerIdx(i);
    return (s >= 0 && !buyerOaEdited[i]) ? sellerCpfOaAfterSale(s) : num(buyerOaBalances[i]);
  };
  const buyerOaFieldValue = (i) => {
    const s = sourceSellerIdx(i);
    return (s >= 0 && !buyerOaEdited[i]) ? String(Math.round(sellerCpfOaAfterSale(s))) : buyerOaBalances[i];
  };

  // ── Section B: income, IWAA tenure, loan, CPF, budget ──
  const mi = buyerIdx.reduce((s, i) => s + num(buyerIncomes[i]), 0);
  const md = buyerIdx.reduce((s, i) => s + num(buyerDebts[i]), 0);
  const incomeAgeSum = buyerIdx.reduce((s, i) => s + num(buyerIncomes[i]) * num(buyerAges[i]), 0);
  const iwaa = mi > 0 ? incomeAgeSum / mi : 0;

  const isHdb = propType === "HDB";
  const showSizeSelector = propType !== "Landed";
  // Derived max tenure: HDB caps at 25 yrs, private/EC at 30; both off age 65.
  const tenureCap = isHdb ? 25 : 30;
  const maxTenure = Math.max(0, Math.min(tenureCap, Math.floor(65 - iwaa)));

  const tdsrRepayment = mi * 0.55 - md;
  const msrRepayment = isHdb ? mi * 0.30 : Infinity;
  const maxRepayment = Math.max(0, Math.min(tdsrRepayment, msrRepayment));

  // ── Loan helpers ──
  const calcMonthlyMortgage = (P, years, annualRate) => {
    const rr = annualRate / 12 / 100;
    const nn = years * 12;
    if (nn <= 0 || P <= 0) return 0;
    if (rr === 0) return P / nn;
    return P * (rr * Math.pow(1 + rr, nn)) / (Math.pow(1 + rr, nn) - 1);
  };
  const calcMaxLoanFromPayment = (payment, years, annualRate) => {
    const rr = annualRate / 12 / 100;
    const nn = years * 12;
    if (nn <= 0 || payment <= 0) return 0;
    if (rr === 0) return payment * nn;
    return payment * ((Math.pow(1 + rr, nn) - 1) / (rr * Math.pow(1 + rr, nn)));
  };

  // Existing-property mortgage (pure-buyer flow only) reduces TDSR + LTV.
  // The 45% LTV / 25%-min-cash rule triggers ONLY when there is an actual
  // outstanding loan on an existing property — NOT merely because properties
  // are owned. A fully-paid-up existing property keeps LTV at 75%.
  const existingLoanBalN = num(existingLoanBal);
  const hasOutstandingLoan = !selling && existingProperty === "yes" && existingLoanBalN > 0;
  const existingMonthly = hasOutstandingLoan
    ? calcMonthlyMortgage(existingLoanBalN, parseInt(existingTenure) || 0, num(existingRate))
    : 0;

  // An outstanding home loan drops LTV to 45% (min 25% cash downpayment).
  const standardLtv = 0.75;
  const effectiveLtv = hasOutstandingLoan ? 0.45 : standardLtv;
  const minCashPct = hasOutstandingLoan ? 0.25 : 0.05;
  const downpaymentPct = 1 - effectiveLtv; // 0.25 standard, 0.55 with existing loan

  // ── ABSD (2024 rates): highest rate across buyers by citizenship + count ──
  // The selector stores a string ("0".."3"); parse to an integer so
  // propertyCount (owned + 1) and the === comparisons in getRate work — e.g.
  // owned 1 → 2nd property → SC 20%.
  const propertiesOwnedN = parseInt(propertiesOwned) || 0;
  const propertyCount = propertiesOwnedN + 1;
  const propertyCountLabel = propertyCount === 1 ? "1st" : propertyCount === 2 ? "2nd" : propertyCount === 3 ? "3rd" : "4th+";
  const buyersArr = buyerIdx.map(i => ({ citizenship: buyerCitizenships[i] }));
  const calcAbsd = (buyers, price, owned) => {
    const propertyCount = owned + 1;
    const getRate = (cz, count) => {
      if (cz === "SC") { if (count === 1) return 0; if (count === 2) return 0.20; return 0.30; }
      if (cz === "PR") { if (count === 1) return 0.05; if (count === 2) return 0.30; return 0.35; }
      if (cz === "Foreigner") return 0.60;
      return 0.65; // Entity
    };
    const allSC = buyers.every(b => b.citizenship === "SC");
    if (allSC && propertyCount === 1) return 0;
    const highestRate = Math.max(...buyers.map(b => getRate(b.citizenship, propertyCount)));
    return Math.round(price * highestRate);
  };
  const estimateBuyerLegal = (price) => price <= 500000 ? 2500 : price <= 1000000 ? 3000 : price <= 2000000 ? 3500 : 4000;

  // ── Funds available: CPF OA + cash (cash reduced by reserves held) ──
  // Negative OA (after refund) can't fund a purchase, so floor each at 0.
  const totalOA = buyerIdx.reduce((s, i) => s + Math.max(0, buyerOaNum(i)), 0);
  const grossCash = selling ? netProceeds : num(cashSavings);
  const cashPortion = Math.max(0, grossCash - reserves);
  const totalFunds = Math.max(0, totalOA + cashPortion);

  // ── Solve max purchase price: cash + CPF cover the downpayment + all duties.
  // Duties (esp. ABSD) scale with price, so a naive fixed-point iteration
  // diverges once ABSD is large; bisect the monotonic "funds needed" curve. ──
  const fundsNeededAt = (P) => P * downpaymentPct + calcBSD(P)
    + calcAbsd(buyersArr, P, propertiesOwnedN) + estimateBuyerLegal(P)
    + (isHdb ? 5000 : Math.round(P * 0.05));
  const solveMaxPurchasePrice = (funds, dpPct) => {
    if (dpPct <= 0 || funds <= 0) return 0;
    let lo = 0, hi = funds / dpPct; // fundsNeeded(hi) ≥ funds, so the root is in range
    for (let i = 0; i < 60 && hi - lo > 1; i++) {
      const mid = (lo + hi) / 2;
      if (fundsNeededAt(mid) > funds) hi = mid; else lo = mid;
    }
    return Math.max(0, Math.round(lo));
  };
  let purchasePrice = solveMaxPurchasePrice(totalFunds, downpaymentPct);

  // ── TDSR check: cap the price if income supports a smaller loan than LTV ──
  const remainingDebtCapacity = Math.max(0, maxRepayment - existingMonthly);
  const maxLoanFromTdsr = calcMaxLoanFromPayment(remainingDebtCapacity, maxTenure, num(rate));
  let ltvBasedMaxLoan = purchasePrice * effectiveLtv;
  const tdsrBinds = maxLoanFromTdsr < ltvBasedMaxLoan;
  if (tdsrBinds) {
    purchasePrice = Math.min(purchasePrice, Math.round(maxLoanFromTdsr / effectiveLtv));
    ltvBasedMaxLoan = purchasePrice * effectiveLtv;
  }
  const maxLoan = Math.min(ltvBasedMaxLoan, maxLoanFromTdsr);

  // ── Final cost breakdown at the solved purchase price ──
  const bsd = purchasePrice > 0 ? calcBSD(purchasePrice) : 0;
  const absd = purchasePrice > 0 ? calcAbsd(buyersArr, purchasePrice, propertiesOwnedN) : 0;
  const buyerLegal = purchasePrice > 0 ? estimateBuyerLegal(purchasePrice) : 0;
  const optionFees = purchasePrice > 0 ? (isHdb ? 5000 : Math.round(purchasePrice * 0.05)) : 0;
  const totalDuties = bsd + absd + buyerLegal + optionFees;

  const downpayment = Math.max(0, purchasePrice - maxLoan);
  // CPF funds the non-cash portion of the downpayment; the rest is cash.
  const cpfCap = Math.max(0, 1 - effectiveLtv - minCashPct) * purchasePrice;
  const totalCpfContribution = Math.min(totalOA, cpfCap, downpayment);
  const cpfForDownpayment = totalCpfContribution;
  const cashForDownpayment = Math.max(0, downpayment - cpfForDownpayment);
  const buyerCpf = buyerIdx.map(i => {
    const oa = Math.max(0, buyerOaNum(i));
    const contribution = totalOA > 0 ? (oa / totalOA) * totalCpfContribution : 0;
    return { i, name: buyerNameEffective(i), oa, contribution };
  });

  const totalFundsRequired = downpayment + totalDuties; // cash + CPF actually used
  const surplusOrShortfall = totalFunds - totalFundsRequired; // + surplus, − shortfall
  const cashUsedTotal = cashForDownpayment + totalDuties; // cash portion of funds used

  const availableBudget = purchasePrice; // project-matcher budget = max price

  const findProjects = async () => {
    setLoading(true);
    setFetchError(null);
    setProjects(null);
    // Fresh result set → clear any selected project / active amenity layer.
    setSelectedProjectLatLon(null);
    setActiveAmenity(null);
    setAmenityError(null);
    setAmenityMessage(null);
    try {
      const budget = Math.max(0, Math.round(availableBudget));
      const category = TYPE_TO_CATEGORY[propType];
      const params = new URLSearchParams({ budget: String(budget), category });
      // Size preference only applies to non-landed types.
      const size = SIZE_OPTIONS.find(o => o.id === prefSize);
      if (showSizeSelector && size) {
        if (size.sizeMin != null) params.set("sizeMin", String(size.sizeMin));
        if (size.sizeMax != null) params.set("sizeMax", String(size.sizeMax));
      }
      if (selectedDistricts.length > 0) params.set("districts", selectedDistricts.join(","));
      const url = `${PROJECT_MATCHER_URL}?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = await res.json();
      setProjects(data.results || []);
    } catch (err) {
      setFetchError(err.message || "Unable to load matching projects.");
    } finally {
      setLoading(false);
    }
  };

  const fmtDate = (d) => {
    if (!d) return "—";
    const date = new Date(d);
    if (isNaN(date)) return "—";
    return date.toLocaleDateString("en-SG", { month: "short", year: "numeric" });
  };

  const fmtTypicalSize = (p) => {
    const lo = p.typicalSizeMin, hi = p.typicalSizeMax;
    if (lo == null && hi == null) return "—";
    if (lo == null) return `${fmt(hi)} sqft`;
    if (hi == null) return `${fmt(lo)} sqft`;
    if (lo === hi) return `${fmt(lo)} sqft`;
    return `${fmt(lo)}–${fmt(hi)} sqft`;
  };

  const projectPopupHtml = (p) => `
    <div style="min-width:180px;font-family:'DM Sans',sans-serif">
      <div style="font-weight:700;font-size:14px;color:#0D1F3C;margin-bottom:2px">${p.name}</div>
      <div style="font-size:10px;color:#00838F;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px">${p.district || "—"}</div>
      <div style="font-size:13px;color:#0D1F3C;margin-bottom:2px"><b>${fmtS(p.medianPrice)}</b> median</div>
      <div style="font-size:12px;color:#555">Median PSF: ${p.medianPsf ? "S$ " + fmt(p.medianPsf) : "—"}</div>
      <div style="font-size:12px;color:#555">Typical size: ${fmtTypicalSize(p)}</div>
      <div style="font-size:12px;color:#555">${p.txCount} transactions</div>
    </div>`;

  // Remove any MRT/amenity markers from a previous project click.
  const clearAmenityMarkers = () => {
    if (mapRef.current) amenityMarkersRef.current.forEach(m => mapRef.current.removeLayer(m));
    amenityMarkersRef.current = [];
  };

  // Two-line permanent tooltip: bold name, smaller grey distance line below.
  const amenityTooltipHtml = (name, subline) =>
    `${name}<div class="mrt-tooltip-dist">${subline}</div>`;

  const toggleDistrict = (code) => {
    setSelectedDistricts(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };
  const allDistrictsSelected = selectedDistricts.length === DISTRICTS.length;
  const toggleAllDistricts = () => {
    setSelectedDistricts(allDistrictsSelected ? [] : DISTRICTS.map(d => d.code));
  };

  // Initialise the Leaflet map once per (viewMode → map, results) change; the
  // cleanup destroys it so a new result set rebuilds a fresh map.
  useEffect(() => {
    if (viewMode !== "map" || !projects || projects.length === 0) return;
    const L = window.L;
    if (!L || !mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current).setView(SG_CENTER, 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
    mapRef.current = map;

    projects.forEach(p => {
      if (!Number.isFinite(p.lat) || !Number.isFinite(p.lon)) return;
      const marker = L.marker([p.lat, p.lon]).addTo(map);
      marker.bindPopup(projectPopupHtml(p));
      // Clicking a pin selects that project; the amenity effect renders the
      // active layer (if any) around it.
      marker.on("click", () => setSelectedProjectLatLon({ lat: p.lat, lon: p.lon }));
    });

    // The container was just revealed; let Leaflet recompute its size.
    const t = setTimeout(() => map.invalidateSize(), 100);

    return () => {
      clearTimeout(t);
      amenityMarkersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, projects]);

  // Render the active amenity layer around the selected project. Re-runs when
  // the toggle or the selected project changes. MRT is local; schools/hawkers
  // hit the API (with loading + error states).
  useEffect(() => {
    if (viewMode !== "map") return;
    const L = window.L;
    if (!mapRef.current || !L) return;

    clearAmenityMarkers();
    setAmenityError(null);
    setAmenityMessage(null);
    setAmenityLoading(false);

    if (!activeAmenity) return;
    if (!selectedProjectLatLon) {
      setAmenityMessage("Select a project pin first");
      return;
    }

    const { lat, lon } = selectedProjectLatLon;

    if (activeAmenity === "mrt") {
      // Static dataset, filtered to within 1.5km and deduped by name.
      const nearest = new Map();
      MRT_STATIONS.forEach(s => {
        const dist = Math.round(haversineM(lat, lon, s.lat, s.lon));
        if (dist > 1500) return;
        const existing = nearest.get(s.name);
        if (!existing || dist < existing.dist) nearest.set(s.name, { ...s, dist });
      });
      nearest.forEach(s => {
        const future = s.status === "future";
        const lineColor = MRT_LINE_COLORS[s.line] || "#00838F";
        const marker = L.circleMarker([s.lat, s.lon], future
          ? { radius: 9, color: lineColor, fillColor: lineColor, fillOpacity: 0.3, weight: 2.5, dashArray: "5" }
          : { radius: 9, color: "#FFFFFF", fillColor: lineColor, fillOpacity: 0.9, weight: 2 }
        ).addTo(mapRef.current);
        const subline = `${s.line} • ${s.dist}m${future ? " (soon)" : ""}`;
        marker.bindTooltip(amenityTooltipHtml(s.name, subline), { permanent: true, direction: "top", className: "mrt-tooltip" });
        marker.bindPopup(
          `<b>${s.name}</b><br><span style="color:${lineColor}">${s.line}</span> • ${s.dist}m away${future ? " (Coming soon)" : ""}`
        );
        amenityMarkersRef.current.push(marker);
      });
      return;
    }

    // Schools / hawkers → API.
    const color = activeAmenity === "school" ? "#009645" : "#FA9E0D";
    let cancelled = false;
    setAmenityLoading(true);
    (async () => {
      try {
        const res = await fetch(`${NEARBY_AMENITIES_URL}?lat=${lat}&lon=${lon}&type=${activeAmenity}`);
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const data = await res.json();
        if (cancelled || !mapRef.current) return;
        const items = Array.isArray(data.results) ? data.results : [];
        items.forEach(item => {
          if (!Number.isFinite(item.lat) || !Number.isFinite(item.lon)) return;
          const marker = L.circleMarker([item.lat, item.lon], {
            radius: 8, color: "#FFFFFF", fillColor: color, fillOpacity: 0.9, weight: 2,
          }).addTo(mapRef.current);
          const dist = Number.isFinite(item.distance_m) ? `${item.distance_m}m` : "";
          marker.bindTooltip(amenityTooltipHtml(item.name, dist), { permanent: true, direction: "top", className: "mrt-tooltip" });
          marker.bindPopup(`<b>${item.name}</b>${dist ? `<br>${dist} away` : ""}`);
          amenityMarkersRef.current.push(marker);
        });
      } catch {
        if (!cancelled) setAmenityError("Unable to load — please try again");
      } finally {
        if (!cancelled) setAmenityLoading(false);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAmenity, selectedProjectLatLon, viewMode]);

  return (
    <div style={{fontFamily: "'Montserrat', sans-serif"}}>
      <h2 className="nd-panel-title">Wealth Planner</h2>
      <p className="nd-panel-sub">Plan your next purchase — from sale proceeds to a shortlist of projects you can afford</p>

      {/* ── Are you selling? — the very first question ── */}
      <div className="nd-toggle-row" style={{marginTop: 0}}>
        <span className="nd-toggle-label">Are you selling your current property?</span>
        <div className="nd-segment" style={{marginBottom: 0, width: 180}}>
          <button className={`nd-seg-btn ${selling ? "active" : ""}`} onClick={() => setSelling(true)}>Yes</button>
          <button className={`nd-seg-btn ${!selling ? "active" : ""}`} onClick={() => setSelling(false)}>No</button>
        </div>
      </div>

      {selling && (
        <>
          {/* ── Section A ── */}
          <h3 className="nd-section-head">Current Property (Selling)</h3>
          <p className="nd-section-sub">We'll roll your net sale proceeds into your budget</p>

          <div className="nd-field" style={{marginBottom: 16}}>
            <label className="nd-label">Number of Sellers</label>
            <div className="nd-segment" style={{marginBottom: 0, maxWidth: 320}}>
              {[1, 2, 3, 4].map(c => (
                <button key={c} className={`nd-seg-btn ${sellerCount === c ? "active" : ""}`} onClick={() => setSellerCount(c)}>{c}</button>
              ))}
            </div>
          </div>

          <div className="nd-grid">
            <div className="nd-field">
              <label className="nd-label">Sale Price</label>
              <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="1,200,000" value={salePrice} onChange={e => setSalePrice(e.target.value)} /></div>
            </div>
            <div className="nd-field">
              <label className="nd-label">Outstanding Loan Balance</label>
              <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="400,000" value={loanBal} onChange={e => setLoanBal(e.target.value)} /></div>
            </div>
            <div className="nd-field">
              <label className="nd-label">Agent Commission (%)</label>
              <input className="nd-input" placeholder="2.0" value={commRate} onChange={e => setCommRate(e.target.value)} />
            </div>
            <div className="nd-field">
              <label className="nd-label">Legal Fees (est.)</label>
              <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="3,000" value={legalFees} onChange={e => setLegalFees(e.target.value)} /></div>
            </div>
            <div className="nd-field nd-full">
              <label className="nd-label">Held for (SSD period)</label>
              <div className="nd-segment" style={{marginBottom: 0}}>
                {[["0","No SSD"],["1","Year 1 (16%)"],["2","Year 2 (12%)"],["3","Year 3 (8%)"],["4","Year 4 (4%)"]].map(([v, l]) => (
                  <button key={v} className={`nd-seg-btn ${ssdYears === v ? "active" : ""}`} onClick={() => setSsdYears(v)} style={{fontSize: 10}}>{l}</button>
                ))}
              </div>
            </div>
          </div>

          {Array.from({ length: sellerCount }, (_, i) => (
            <div key={i} style={{background: "white", border: "1.5px solid #E8E4DE", borderRadius: 6, padding: 16, marginBottom: 12}}>
              <p className="nd-label" style={{marginBottom: 10, color: "#0D1F3C"}}>Seller {i + 1}</p>
              <div className="nd-grid" style={{marginBottom: 0}}>
                <div className="nd-field nd-full">
                  <label className="nd-label">Seller {i + 1} — Name (optional)</label>
                  <input className="nd-input" placeholder="e.g. Tan" value={sellerNames[i]} onChange={e => upd(setSellerNames)(i, e.target.value)} />
                </div>
                <div className="nd-field">
                  <label className="nd-label">CPF Principal Used</label>
                  <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="150,000" value={sellerCpfPrincipals[i]} onChange={e => upd(setSellerCpfPrincipals)(i, e.target.value)} /></div>
                </div>
                <div className="nd-field">
                  <label className="nd-label">CPF Accrued Interest</label>
                  <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="30,000" value={sellerCpfInterests[i]} onChange={e => upd(setSellerCpfInterests)(i, e.target.value)} /></div>
                </div>
                <div className="nd-field">
                  <label className="nd-label">Current CPF OA Balance</label>
                  <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="80,000" value={sellerOaBalances[i]} onChange={e => upd(setSellerOaBalances)(i, e.target.value)} /></div>
                </div>
                <div className="nd-field">
                  <label className="nd-label">Ownership % (optional)</label>
                  <input className="nd-input" placeholder="50" value={sellerOwnerships[i]} onChange={e => upd(setSellerOwnerships)(i, e.target.value)} />
                </div>
              </div>
            </div>
          ))}

          {!anyOwnership ? (
            <div className="nd-results" style={{marginTop: 8}}>
              <p className="nd-results-title">Net Cash Proceeds from Sale</p>
              <div className="nd-result-main">
                <div>
                  <p className="nd-result-label">Cash freed up toward your next home</p>
                  <div className="nd-result-value" style={{fontSize: 36, color: netProceeds < 0 ? "#ef5350" : "#C9A84C"}}>{fmtS(netProceeds)}</div>
                </div>
              </div>
              <div className="nd-breakdown">
                <div className="nd-breakdown-item"><p className="nd-breakdown-label">Sale Price</p><p className="nd-breakdown-val">{fmtS(salePriceN)}</p></div>
                <div className="nd-breakdown-item"><p className="nd-breakdown-label">Less: Outstanding Loan</p><p className="nd-breakdown-val">− {fmtS(loanN)}</p></div>
                <div className="nd-breakdown-item"><p className="nd-breakdown-label">Less: Total CPF Refund</p><p className="nd-breakdown-val">− {fmtS(totalCpfRefund)}</p></div>
                <div className="nd-breakdown-item"><p className="nd-breakdown-label">Less: Commission</p><p className="nd-breakdown-val">− {fmtS(commN)}</p></div>
                <div className="nd-breakdown-item"><p className="nd-breakdown-label">Less: Legal Fees</p><p className="nd-breakdown-val">− {fmtS(legalN)}</p></div>
                <div className="nd-breakdown-item"><p className="nd-breakdown-label">Less: SSD</p><p className="nd-breakdown-val">{ssdN > 0 ? `− ${fmtS(ssdN)}` : "—"}</p></div>
              </div>
            </div>
          ) : (
            <div className="nd-results" style={{marginTop: 8}}>
              <p className="nd-results-title">Per-Seller Proceeds</p>
              {sellerBreakdown.map(s => (
                <div key={s.i} style={{borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 12, marginTop: 4}}>
                  <p className="nd-breakdown-label" style={{fontSize: 12, color: "#C9A84C", marginBottom: 8}}>
                    Seller {s.i + 1}{s.name ? ` (${s.name})` : ""} — {Math.round(s.ownership * 100)}% share
                  </p>
                  <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12}}>
                    <div className="nd-breakdown-item"><p className="nd-breakdown-label">Share of Net Pool</p><p className="nd-breakdown-val">{fmtS(s.share)}</p></div>
                    <div className="nd-breakdown-item"><p className="nd-breakdown-label">Less: CPF Refund</p><p className="nd-breakdown-val">− {fmtS(s.cpfRefund)}</p></div>
                    <div className="nd-breakdown-item"><p className="nd-breakdown-label">Cash in Hand</p><p className="nd-breakdown-val" style={{color: s.cashInHand < 0 ? "#ef5350" : "#C9A84C"}}>{fmtS(s.cashInHand)}</p></div>
                    <div className="nd-breakdown-item"><p className="nd-breakdown-label">CPF OA After Refund</p><p className="nd-breakdown-val" style={{color: s.oaAfter < 0 ? "#ef5350" : undefined}}>{fmtS(s.oaAfter)}</p></div>
                  </div>
                </div>
              ))}
              <p className="nd-note" style={{marginTop: 16, color: "rgba(250,248,244,0.55)", background: "rgba(255,255,255,0.04)", borderLeftColor: "#C9A84C"}}>
                Net pool after loan, commission, legal &amp; SSD: {fmtS(netPoolAfterCosts)}. Combined net cash proceeds: <strong style={{color:"#C9A84C"}}>{fmtS(netProceeds)}</strong>
              </p>
            </div>
          )}
        </>
      )}

      {/* ── Same people? (only meaningful when selling) ── */}
      {selling && (
        <div className="nd-toggle-row" style={{marginTop: 20}}>
          <span className="nd-toggle-label">Are the sellers and buyers the same people?</span>
          <div className="nd-segment" style={{marginBottom: 0, width: 180}}>
            <button className={`nd-seg-btn ${samePeople ? "active" : ""}`} onClick={() => setSamePeople(true)}>Yes</button>
            <button className={`nd-seg-btn ${!samePeople ? "active" : ""}`} onClick={() => setSamePeople(false)}>No</button>
          </div>
        </div>
      )}

      {/* ── Section B ── */}
      <h3 className="nd-section-head">Buyer Profile (Buying)</h3>
      <p className="nd-section-sub">We size your loan via TDSR / MSR, IWAA tenure and CPF, then net off stamp duties</p>

      <div className="nd-field" style={{marginBottom: 16}}>
        <label className="nd-label">Number of Buyers</label>
        <div className="nd-segment" style={{marginBottom: 0, maxWidth: 320}}>
          {[1, 2, 3, 4].map(c => (
            <button key={c} className={`nd-seg-btn ${buyerCount === c ? "active" : ""}`} onClick={() => setBuyerCount(c)}>{c}</button>
          ))}
        </div>
      </div>

      {Array.from({ length: buyerCount }, (_, i) => (
        <div key={i} style={{background: "white", border: "1.5px solid #E8E4DE", borderRadius: 6, padding: 16, marginBottom: 12}}>
          <p className="nd-label" style={{marginBottom: 10, color: "#0D1F3C"}}>Buyer {i + 1}</p>
          <div className="nd-grid" style={{marginBottom: 0}}>
            <div className="nd-field nd-full">
              <label className="nd-label">Buyer {i + 1} — Name (optional)</label>
              <input className="nd-input" placeholder="e.g. Lim" value={buyerNameEffective(i)} onChange={e => { upd(setBuyerNames)(i, e.target.value); upd(setBuyerNameEdited)(i, true); }} />
            </div>
            <div className="nd-field">
              <label className="nd-label">Age</label>
              <input className="nd-input" placeholder="35" value={buyerAges[i]} onChange={e => upd(setBuyerAges)(i, e.target.value)} />
            </div>
            <div className="nd-field">
              <label className="nd-label">Gross Monthly Income</label>
              <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="8,000" value={buyerIncomes[i]} onChange={e => upd(setBuyerIncomes)(i, e.target.value)} /></div>
            </div>
            <div className="nd-field">
              <label className="nd-label">Existing Monthly Debt</label>
              <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="500" value={buyerDebts[i]} onChange={e => upd(setBuyerDebts)(i, e.target.value)} /></div>
            </div>
            <div className="nd-field">
              <label className="nd-label">Current CPF OA Balance</label>
              <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="120,000" value={buyerOaFieldValue(i)} onChange={e => { upd(setBuyerOaBalances)(i, e.target.value); upd(setBuyerOaEdited)(i, true); }} /></div>
              {autoFillBuyer(i) && !buyerOaEdited[i] && (
                <p className="nd-section-sub" style={{margin: "6px 0 0", fontSize: 10}}>Auto-filled from sale proceeds — tap to edit</p>
              )}
            </div>
            <div className="nd-field">
              <label className="nd-label">Citizenship</label>
              <select className="nd-select" value={buyerCitizenships[i]} onChange={e => upd(setBuyerCitizenships)(i, e.target.value)}>
                <option value="SC">Singapore Citizen</option>
                <option value="PR">Singapore PR</option>
                <option value="Foreigner">Foreigner</option>
                <option value="Entity">Entity / Company</option>
              </select>
            </div>
          </div>
          <p className="nd-section-sub" style={{margin: "10px 0 0", fontSize: 11}}>
            Can contribute up to <strong style={{color: "#00838F"}}>{fmtS(buyerCpf[i].contribution)}</strong> from CPF OA
          </p>
        </div>
      ))}

      <div className="nd-grid">
        <div className="nd-field">
          <label className="nd-label">Property Type</label>
          <select className="nd-select" value={propType} onChange={e => setPropType(e.target.value)}>
            {["HDB","Condo","EC","Landed"].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        {showSizeSelector && (
          <div className="nd-field">
            <label className="nd-label">Preferred Size</label>
            <select className="nd-select" value={prefSize} onChange={e => setPrefSize(e.target.value)}>
              {SIZE_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
          </div>
        )}
        <div className="nd-field nd-full">
          <label className="nd-label">Properties Currently Owned (before this purchase)</label>
          <div className="nd-segment" style={{marginBottom: 0}}>
            {["0","1","2","3"].map(nn => (
              <button key={nn} className={`nd-seg-btn ${propertiesOwned === nn ? "active" : ""}`} onClick={() => setPropertiesOwned(nn)}>
                {nn === "3" ? "3+" : nn}
              </button>
            ))}
          </div>
        </div>
        <div className="nd-field">
          <label className="nd-label">Interest Rate (% p.a.)</label>
          <input className="nd-input" placeholder="4.0" value={rate} onChange={e => setRate(e.target.value)} />
        </div>
        <div className="nd-field nd-full">
          <label className="nd-label">Cash Reserves to Keep Aside</label>
          <div className="nd-slider-row">
            <input className="nd-slider" type="range" min="0" max="500000" step="10000" value={reserves} onChange={e => setReserves(parseInt(e.target.value))} />
            <span className="nd-slider-val">{fmtS(reserves)}</span>
          </div>
        </div>
      </div>

      {/* ── Pure-buyer extras (only when not selling) ── */}
      {!selling && (
        <>
          <h3 className="nd-section-head" style={{fontSize: 18}}>Existing Property</h3>
          <div className="nd-toggle-row">
            <span className="nd-toggle-label">Do you own an existing property?</span>
            <div className="nd-segment" style={{marginBottom: 0, width: 180}}>
              <button className={`nd-seg-btn ${existingProperty === "yes" ? "active" : ""}`} onClick={() => setExistingProperty("yes")}>Yes</button>
              <button className={`nd-seg-btn ${existingProperty === "no" ? "active" : ""}`} onClick={() => setExistingProperty("no")}>No</button>
            </div>
          </div>

          {existingProperty === "yes" && (
            <div className="nd-grid">
              <div className="nd-field">
                <label className="nd-label">Outstanding Loan Balance</label>
                <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="300,000" value={existingLoanBal} onChange={e => setExistingLoanBal(e.target.value)} /></div>
              </div>
              <div className="nd-field">
                <label className="nd-label">Remaining Loan Tenure (years)</label>
                <input className="nd-input" placeholder="25" value={existingTenure} onChange={e => setExistingTenure(e.target.value)} />
              </div>
              <div className="nd-field">
                <label className="nd-label">Current Interest Rate (%)</label>
                <input className="nd-input" placeholder="3.50" value={existingRate} onChange={e => setExistingRate(e.target.value)} />
              </div>
              <div className="nd-field">
                <label className="nd-label">Est. Monthly Mortgage Payment</label>
                <div className="nd-input-wrap" style={{background: "#EDE4D8", border: "1.5px solid #E8E4DE", borderRadius: 4}}>
                  <span className="nd-prefix">S$ </span>
                  <input className="nd-input" readOnly value={existingMonthly > 0 ? fmt(existingMonthly) : "—"} style={{background: "transparent", fontWeight: 600}} />
                </div>
              </div>
            </div>
          )}

          <h3 className="nd-section-head" style={{fontSize: 18}}>Available Funds</h3>
          <div className="nd-grid">
            <div className="nd-field nd-full">
              <label className="nd-label">Cash Savings Available</label>
              <div className="nd-input-wrap"><span className="nd-prefix">S$ </span><input className="nd-input" placeholder="Total cash savings available for this purchase" value={cashSavings} onChange={e => setCashSavings(e.target.value)} /></div>
            </div>
          </div>
        </>
      )}

      <div className="nd-results" style={{marginTop: 8}}>
        <p className="nd-results-title">Maximum Purchase Price</p>
        <div className="nd-result-main">
          <div>
            <p className="nd-result-label">Estimated maximum {propType} price your funds + loan support</p>
            <div className="nd-result-value" style={{color: purchasePrice > 0 ? "#C9A84C" : "#ef5350"}}>{fmtS(purchasePrice)}</div>
          </div>
        </div>

        <div style={{display: "flex", gap: 32, margin: "4px 0 18px"}}>
          <div>
            <p className="nd-breakdown-label">IWAA (Income-Weighted Avg Age)</p>
            <p style={{fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 600, color: "#FAF8F4", lineHeight: 1}}>{iwaa > 0 ? iwaa.toFixed(1) : "—"}</p>
          </div>
          <div>
            <p className="nd-breakdown-label">Max Loan Tenure</p>
            <p style={{fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 600, color: "#FAF8F4", lineHeight: 1}}>{maxTenure} yrs</p>
          </div>
        </div>

        {tdsrBinds && (
          <p className="nd-note" style={{marginTop: 4, color: "rgba(250,248,244,0.75)", background: "rgba(201,168,76,0.08)", borderLeftColor: "#C9A84C"}}>
            ⚠ Your borrowing capacity is limited by TDSR (55% of income). Maximum loan reduced to {fmtS(maxLoan)}. To increase your budget, consider increasing income or reducing existing debt commitments.
          </p>
        )}
        {hasOutstandingLoan && (
          <p className="nd-note" style={{marginTop: 12, color: "rgba(250,248,244,0.75)", background: "rgba(201,168,76,0.08)", borderLeftColor: "#C9A84C"}}>
            ⚠ LTV reduced to 45% as you have an existing outstanding home loan. Minimum cash downpayment is 25% of the purchase price.
          </p>
        )}

        <p className="nd-results-title" style={{marginTop: 24}}>Cost Breakdown</p>
        <div className="nd-breakdown">
          <div className="nd-breakdown-item"><p className="nd-breakdown-label">Purchase Price</p><p className="nd-breakdown-val">{fmtS(purchasePrice)}</p></div>
          <div className="nd-breakdown-item"><p className="nd-breakdown-label">Max Loan ({Math.round(effectiveLtv * 100)}% LTV)</p><p className="nd-breakdown-val">{fmtS(maxLoan)}</p></div>
          <div className="nd-breakdown-item"><p className="nd-breakdown-label">Total Downpayment ({Math.round(downpaymentPct * 100)}%)</p><p className="nd-breakdown-val">{fmtS(downpayment)}</p></div>
          <div className="nd-breakdown-item"><p className="nd-breakdown-label" style={{paddingLeft: 12}}>of which — CPF</p><p className="nd-breakdown-val">{fmtS(cpfForDownpayment)}</p></div>
          <div className="nd-breakdown-item"><p className="nd-breakdown-label" style={{paddingLeft: 12}}>of which — Cash</p><p className="nd-breakdown-val">{fmtS(cashForDownpayment)}</p></div>
          <div className="nd-breakdown-item"><p className="nd-breakdown-label">Option + Exercise Fees</p><p className="nd-breakdown-val">{fmtS(optionFees)}</p></div>
          <div className="nd-breakdown-item"><p className="nd-breakdown-label">Buyer's Stamp Duty (BSD)</p><p className="nd-breakdown-val">{fmtS(bsd)}</p></div>
          <div className="nd-breakdown-item"><p className="nd-breakdown-label">ABSD ({propertyCountLabel} property)</p><p className="nd-breakdown-val" style={{color: absd > 0 ? "#ef5350" : undefined}}>{absd > 0 ? fmtS(absd) : "Not applicable"}</p></div>
          <div className="nd-breakdown-item"><p className="nd-breakdown-label">Est. Legal Fees</p><p className="nd-breakdown-val">{fmtS(buyerLegal)}</p></div>
          <div className="nd-breakdown-item"><p className="nd-breakdown-label">Total Cash + CPF Required</p><p className="nd-breakdown-val" style={{color: "#C9A84C", fontWeight: 700}}>{fmtS(totalFundsRequired)}</p></div>
          <div className="nd-breakdown-item"><p className="nd-breakdown-label">Cash + CPF Available</p><p className="nd-breakdown-val">{fmtS(totalFunds)}</p></div>
          <div className="nd-breakdown-item"><p className="nd-breakdown-label">{surplusOrShortfall >= 0 ? "Surplus" : "Shortfall"}</p><p className="nd-breakdown-val" style={{color: surplusOrShortfall >= 0 ? "#4caf50" : "#ef5350"}}>{fmtS(Math.abs(surplusOrShortfall))}</p></div>
        </div>

        {absd > 0 && (
          <p className="nd-note" style={{marginTop: 16, color: "#ef9a9a", background: "rgba(239,83,80,0.08)", borderLeftColor: "#ef5350"}}>
            ⚠ ABSD of {fmtS(absd)} is payable within 14 days of signing the OTP and must be paid in cash. It cannot be paid using CPF.
          </p>
        )}

        <p className="nd-note" style={{marginTop: 16, color: "rgba(250,248,244,0.55)", background: "rgba(255,255,255,0.04)", borderLeftColor: "#C9A84C"}}>
          Max Loan {fmtS(maxLoan)} + CPF {fmtS(cpfForDownpayment)} + Cash {fmtS(cashUsedTotal)} − Stamp Duties &amp; Fees {fmtS(totalDuties)} = Purchase Price <strong style={{color:"#C9A84C"}}>{fmtS(purchasePrice)}</strong>
        </p>

        <div style={{marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8, fontSize: 12, color: "rgba(250,248,244,0.7)"}}>
          {buyerCpf.map(b => (
            <span key={b.i}>
              Buyer {b.i + 1}{b.name ? ` (${b.name})` : ""}: <strong style={{color: "#C9A84C"}}>{fmtS(b.contribution)}</strong> CPF{b.i < buyerCpf.length - 1 ? "  |" : ""}
            </span>
          ))}
        </div>
      </div>

      {/* ── Section C ── */}
      <h3 className="nd-section-head">Project Shortlist</h3>
      <p className="nd-section-sub">Real transacted projects within your budget over the last 24 months</p>

      <div className="nd-district-head">
        <label className="nd-label">Preferred Districts {selectedDistricts.length > 0 ? `(${selectedDistricts.length})` : "(all)"}</label>
        <button className="nd-district-link" onClick={toggleAllDistricts}>
          {allDistrictsSelected ? "Clear All" : "Select All"}
        </button>
      </div>
      <div className="nd-district-grid">
        {DISTRICTS.map(d => {
          const active = selectedDistricts.includes(d.code);
          return (
            <label key={d.code} className={`nd-district-item ${active ? "active" : ""}`}>
              <input type="checkbox" checked={active} onChange={() => toggleDistrict(d.code)} />
              <span className="nd-district-text">
                <span className="nd-district-code">{d.code}</span>
                <span className="nd-district-name">{d.name}</span>
              </span>
            </label>
          );
        })}
      </div>

      <button className="nd-btn" onClick={findProjects} disabled={loading}>
        {loading ? "Finding…" : "Find Matching Projects →"}
      </button>

      {loading && (
        <div className="nd-loading-box">
          <div className="nd-spinner" />
          <p className="nd-loading-text">Matching projects to your budget</p>
        </div>
      )}

      {!loading && fetchError && (
        <div className="nd-empty-box" style={{marginTop: 20, borderColor: "#ef5350", color: "#c62828"}}>{fetchError}</div>
      )}

      {!loading && projects && projects.length === 0 && (
        <div className="nd-empty-box" style={{marginTop: 20}}>No matching projects found in this budget range. Try adjusting your reserves or property type.</div>
      )}

      {!loading && projects && projects.length > 0 && (
        <>
          <div className="nd-segment" style={{marginTop: 20, maxWidth: 320}}>
            <button className={`nd-seg-btn ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}>List View</button>
            <button className={`nd-seg-btn ${viewMode === "map" ? "active" : ""}`} onClick={() => setViewMode("map")}>Map View</button>
          </div>

          {viewMode === "list" && (
            <div className="nd-proj-grid">
              {projects.map((p, i) => (
                <div className="nd-proj-card" key={`${p.name}-${i}`}>
                  <div className="nd-proj-name">{p.name}</div>
                  <div className="nd-proj-district">{p.district || "—"}</div>
                  <div className="nd-proj-price">{fmtS(p.medianPrice)}</div>
                  <div className="nd-proj-meta">
                    <div>
                      <p className="nd-proj-meta-label">Median PSF</p>
                      <p className="nd-proj-meta-val">{p.medianPsf ? `S$ ${fmt(p.medianPsf)}` : "—"}</p>
                    </div>
                    <div>
                      <p className="nd-proj-meta-label">Transactions</p>
                      <p className="nd-proj-meta-val">{p.txCount}</p>
                    </div>
                    <div>
                      <p className="nd-proj-meta-label">Last Sold</p>
                      <p className="nd-proj-meta-val">{fmtDate(p.lastTxDate)}</p>
                    </div>
                    <div>
                      <p className="nd-proj-meta-label">District</p>
                      <p className="nd-proj-meta-val">{p.district || "—"}</p>
                    </div>
                  </div>
                  <div className="nd-proj-size">Typical size: <strong>{fmtTypicalSize(p)}</strong></div>
                </div>
              ))}
            </div>
          )}

          {viewMode === "map" && (
            <>
              <div
                id="wealth-planner-map"
                ref={mapContainerRef}
                style={{height: "480px", width: "100%", borderRadius: "12px", overflow: "hidden", marginTop: 20}}
              />
              <div className="nd-segment" style={{marginTop: 12, maxWidth: 360}}>
                {AMENITY_TYPES.map(a => (
                  <button
                    key={a.id}
                    className={`nd-seg-btn ${activeAmenity === a.id ? "active" : ""}`}
                    onClick={() => toggleAmenity(a.id)}
                  >
                    {a.label}
                  </button>
                ))}
              </div>

              {activeAmenity === "mrt" && (
                <div style={{display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", marginTop: 10, fontSize: 12, color: "#8A8A8A"}}>
                  {[
                    {line: "NSL", label: "NSL"},
                    {line: "EWL", label: "EWL"},
                    {line: "NEL", label: "NEL"},
                    {line: "CCL", label: "CCL"},
                    {line: "DTL", label: "DTL"},
                    {line: "TEL", label: "TEL"},
                    {line: "CRL", label: "CRL (future)", future: true},
                    {line: "JRL", label: "JRL (future)", future: true},
                  ].map(item => (
                    <span key={item.line} style={{display: "inline-flex", alignItems: "center", gap: 6}}>
                      <span style={{
                        width: 12, height: 12, borderRadius: "50%", display: "inline-block",
                        background: item.future ? "transparent" : MRT_LINE_COLORS[item.line],
                        border: item.future ? `2px dashed ${MRT_LINE_COLORS[item.line]}` : "none",
                      }} />
                      {item.label}
                    </span>
                  ))}
                </div>
              )}

              {amenityLoading && (
                <div style={{display: "flex", alignItems: "center", gap: 10, marginTop: 12}}>
                  <div className="nd-spinner" style={{width: 20, height: 20, borderWidth: 2}} />
                  <span className="nd-loading-text" style={{letterSpacing: 1}}>Loading nearby {activeAmenity === "school" ? "schools" : "hawkers"}…</span>
                </div>
              )}

              {amenityMessage && (
                <div className="nd-empty-box" style={{marginTop: 12}}>{amenityMessage}</div>
              )}

              {amenityError && (
                <div className="nd-empty-box" style={{marginTop: 12, borderColor: "#ef5350", color: "#c62828"}}>{amenityError}</div>
              )}

              <p className="nd-section-sub" style={{marginTop: 10, marginBottom: 0}}>
                Click a project pin, then toggle MRT / Schools / Hawkers to reveal what's nearby.
              </p>
            </>
          )}
        </>
      )}

      <p className="nd-note">Budget combines your net sale proceeds, max loan (TDSR 55%, or MSR 30% for HDB/EC), less cash reserves and stamp duties (BSD + ABSD on an estimated 75%-LTV purchase price). Project matches reflect median transacted prices and are indicative — actual affordability and pricing subject to bank and valuation assessment.</p>
    </div>
  );
}

// ─── 8. Lease Impact Calculator ───────────────────────────────
function LeaseImpactCalc() {
  // NexDoor brand palette (this tab is self-contained).
  const NAVY = "#1A2942";
  const TERRA = "#B84C30";
  const GOLD = "#C9A96E";
  const CREAM = "#EDE4D8";
  const GREEN = "#2E7D32";

  const money = (n) => (isNaN(n) || !isFinite(n)) ? "—" : "$" + Math.round(n).toLocaleString("en-SG");
  const pct = (n) => (isNaN(n) || !isFinite(n)) ? "—" : `${n.toFixed(1)}%`;

  // Standard Singapore BSD on purchase price.
  const calcBSDLocal = (price) => {
    let bsd = 0;
    if (price <= 180000) bsd = price * 0.01;
    else if (price <= 360000) bsd = 1800 + (price - 180000) * 0.02;
    else if (price <= 1000000) bsd = 5400 + (price - 360000) * 0.03;
    else if (price <= 1500000) bsd = 24600 + (price - 1000000) * 0.04;
    else if (price <= 3000000) bsd = 44600 + (price - 1500000) * 0.05;
    else bsd = 119600 + (price - 3000000) * 0.06;
    return Math.round(bsd);
  };
  const estimateLegalFees = (price) => {
    if (price <= 500000) return 2500;
    if (price <= 1000000) return 3000;
    if (price <= 2000000) return 3500;
    return 4000;
  };

  // ── Inputs ──
  const [propertyType, setPropertyType] = useState("HDB"); // "HDB" | "Private"
  const [purchasePrice, setPurchasePrice] = useState("");
  const [remainingLease, setRemainingLease] = useState("");
  const [youngestAge, setYoungestAge] = useState("");
  const [loanTypeChoice, setLoanTypeChoice] = useState("hdb"); // "hdb" | "bank"
  const [numBuyers, setNumBuyers] = useState(1);
  const [cpfBalances, setCpfBalances] = useState(["", "", "", ""]);
  const [availableCash, setAvailableCash] = useState("");

  const onDigits = (setter) => (e) => setter(e.target.value.replace(/[^0-9]/g, ""));
  const fmtCommas = (raw) => (raw ? Number(raw).toLocaleString("en-SG") : "");
  const setCpf = (i, v) => setCpfBalances(prev => prev.map((x, k) => (k === i ? v : x)));

  // Private can't take an HDB loan, so an "hdb" choice maps to a bank loan.
  const loanType = propertyType === "Private"
    ? (loanTypeChoice === "none" ? "none" : "bank")
    : loanTypeChoice;
  const loanTypeLabel = loanType === "hdb" ? "HDB Loan" : loanType === "bank" ? "Bank Loan" : "No Loan (Cash + CPF)";

  // ── Derived values ──
  const pp = Number(purchasePrice) || 0;
  const lease = parseInt(remainingLease) || 0;
  const age = parseInt(youngestAge) || 0;
  const cash = Number(availableCash) || 0;
  const ready = pp > 0 && lease >= 1 && lease <= 99 && age > 0 && availableCash !== "";

  // Shared pro-ration ratio (cap at 1, floor at 0).
  let ratio = (lease - 20) / (95 - age - 20);
  ratio = Math.min(1, Math.max(0, ratio));
  if (!Number.isFinite(ratio)) ratio = 0;

  // CPF pro-ration.
  const cpfProRatedPct = ratio * 100;
  const totalOA = cpfBalances.slice(0, numBuyers).reduce((s, v) => s + (Number(v) || 0), 0);
  const maxCpfAllowed = ratio * pp;
  const cpfUsable = Math.min(totalOA, maxCpfAllowed);

  // Loan pro-ration (HDB and bank both cap at 75% LTV; shown for those types).
  const proRatedLtv = ratio * 0.75;
  const proRatedLtvPct = proRatedLtv * 100;

  // Funding stack per loan type.
  // HDB: flat $5,000. Private: 5% of price (1% + 4% option/exercise).
  const isHdbProperty = String(propertyType).toUpperCase() === "HDB";
  const optionExerciseFees = isHdbProperty ? 5000 : Math.round(pp * 0.05);
  const bsd = calcBSDLocal(pp);
  const legalFees = estimateLegalFees(pp);

  let maxLoan = 0;
  let downpayment = 0;
  let cpfForDownpayment = 0;
  let cashForDownpayment = 0;
  let mandatoryCash = 0; // bank loan only: first 5% must be cash
  if (loanType === "hdb") {
    maxLoan = proRatedLtv * pp;
    downpayment = pp - maxLoan;
    cpfForDownpayment = Math.min(cpfUsable, downpayment);
    cashForDownpayment = Math.max(0, downpayment - cpfForDownpayment);
  } else if (loanType === "bank") {
    maxLoan = proRatedLtv * pp;
    downpayment = pp - maxLoan;
    mandatoryCash = pp * 0.05;
    const remainingDownpayment = downpayment - mandatoryCash;
    cpfForDownpayment = Math.min(cpfUsable, Math.max(0, remainingDownpayment));
    cashForDownpayment = mandatoryCash + Math.max(0, remainingDownpayment - cpfForDownpayment);
  } else { // "none" — cash + CPF only
    maxLoan = 0;
    downpayment = pp;
    cpfForDownpayment = Math.min(cpfUsable, pp);
    cashForDownpayment = Math.max(0, pp - cpfForDownpayment);
  }
  // Non-mandatory cash portion of the downpayment (so the "of which" rows sum
  // to the downpayment without double-counting the mandatory 5%).
  const discretionaryCashDownpayment = cashForDownpayment - mandatoryCash;
  const totalCashRequired = optionExerciseFees + cashForDownpayment + bsd + legalFees;
  const cashShortfall = Math.max(0, totalCashRequired - cash);

  // Pro-ration only bites when the buyer's CPF OA exceeds the pro-rated ceiling.
  const cpfRestricted = totalOA > maxCpfAllowed;

  // HDB grant eligibility notes. EHG needs the lease to cover the youngest
  // buyer to 95 for the full grant; below 20 years lease, no grants apply.
  const ehgStatus = lease < 20 ? "none" : ((95 - age) <= lease ? "full" : "prorated");
  const grantsAmber = "#9A7B1F";
  const grantNotes = [
    ehgStatus === "full"
      ? { c: GREEN, t: "✓ EHG — Full grant may apply (up to $120,000 for families / $60,000 for singles)" }
      : ehgStatus === "prorated"
        ? { c: grantsAmber, t: "⚠ EHG — Will be pro-rated by HDB as lease does not cover youngest buyer to age 95. Confirm exact amount via your HFE letter." }
        : { c: TERRA, t: "✗ EHG — Not available (remaining lease below 20 years)" },
    lease >= 20
      ? { c: GREEN, t: "✓ CPF Housing Grant — May apply (up to $80,000 for families / $40,000 for singles), subject to income and first-timer eligibility" }
      : { c: TERRA, t: "✗ CPF Housing Grant — Not available (remaining lease below 20 years)" },
    lease >= 20
      ? { c: GREEN, t: "✓ Proximity Housing Grant — May apply (up to $30,000 for families / $15,000 for singles) if buying near or with parents/children. No income ceiling." }
      : { c: TERRA, t: "✗ Proximity Housing Grant — Not available (remaining lease below 20 years)" },
  ];

  // ── Small presentational helpers ──
  const card = { background: CREAM, borderRadius: 8, padding: "20px 24px", marginTop: 16, border: "1px solid rgba(26,41,66,0.10)" };
  const cardTitle = { fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: NAVY, fontWeight: 700, marginBottom: 14 };
  const Row = ({ label, value, color, strong, indent, divider = true }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "8px 0", borderBottom: divider ? "1px solid rgba(26,41,66,0.10)" : "none", paddingLeft: indent ? 16 : 0 }}>
      <span style={{ fontSize: 13, color: indent ? "rgba(26,41,66,0.55)" : "rgba(26,41,66,0.72)" }}>{label}</span>
      <span style={{ fontSize: strong ? 18 : 15, fontWeight: strong ? 700 : 600, color: color || NAVY, fontFamily: strong ? "'Playfair Display', serif" : "inherit" }}>{value}</span>
    </div>
  );
  const Badge = ({ bg, fg, children }) => (
    <div style={{ display: "inline-block", background: bg, color: fg, fontSize: 12, fontWeight: 600, padding: "8px 14px", borderRadius: 6, marginTop: 12, letterSpacing: 0.3 }}>{children}</div>
  );

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <h2 className="nd-panel-title" style={{ color: NAVY }}>Lease Impact Calculator</h2>
      <p className="nd-panel-sub">How a property's remaining lease pro-rates your CPF usage and loan limits</p>

      <h3 className="nd-section-head" style={{ marginTop: 0, color: NAVY }}>Your Details</h3>
      <p className="nd-section-sub">Results update live as you type</p>

      <div className="nd-grid">
        <div className="nd-field nd-full">
          <label className="nd-label">Property Type</label>
          <div className="nd-segment" style={{ marginBottom: 0 }}>
            {["HDB", "Private"].map(t => (
              <button key={t} className={`nd-seg-btn ${propertyType === t ? "active" : ""}`} onClick={() => setPropertyType(t)}>{t}</button>
            ))}
          </div>
        </div>
        <div className="nd-field nd-full">
          <label className="nd-label">Loan Type</label>
          <div className="nd-segment" style={{ marginBottom: 0 }}>
            {(propertyType === "HDB"
              ? [["hdb", "HDB Loan"], ["bank", "Bank Loan"], ["none", "No Loan (Cash + CPF)"]]
              : [["bank", "Bank Loan"], ["none", "No Loan (Cash + CPF)"]]
            ).map(([v, l]) => (
              <button key={v} className={`nd-seg-btn ${loanType === v ? "active" : ""}`} onClick={() => setLoanTypeChoice(v)} style={{ fontSize: 10.5 }}>{l}</button>
            ))}
          </div>
        </div>
        <div className="nd-field">
          <label className="nd-label">Purchase Price</label>
          <div className="nd-input-wrap"><span className="nd-prefix">$</span><input className="nd-input" inputMode="numeric" placeholder="650,000" value={fmtCommas(purchasePrice)} onChange={onDigits(setPurchasePrice)} /></div>
        </div>
        <div className="nd-field">
          <label className="nd-label">Remaining Lease (years)</label>
          <input className="nd-input" inputMode="numeric" placeholder="60" value={remainingLease} onChange={onDigits(setRemainingLease)} />
        </div>
        <div className="nd-field">
          <label className="nd-label">Youngest Buyer Age (years)</label>
          <input className="nd-input" inputMode="numeric" placeholder="35" value={youngestAge} onChange={onDigits(setYoungestAge)} />
        </div>
        <div className="nd-field">
          <label className="nd-label">Number of Buyers</label>
          <select className="nd-select" value={numBuyers} onChange={e => setNumBuyers(parseInt(e.target.value))}>
            {[1, 2, 3, 4].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        {Array.from({ length: numBuyers }, (_, i) => (
          <div className="nd-field" key={i}>
            <label className="nd-label">Buyer {i + 1} CPF OA</label>
            <div className="nd-input-wrap"><span className="nd-prefix">$</span><input className="nd-input" inputMode="numeric" placeholder="80,000" value={fmtCommas(cpfBalances[i])} onChange={e => setCpf(i, e.target.value.replace(/[^0-9]/g, ""))} /></div>
          </div>
        ))}
        <div className="nd-field">
          <label className="nd-label">Available Cash</label>
          <div className="nd-input-wrap"><span className="nd-prefix">$</span><input className="nd-input" inputMode="numeric" placeholder="100,000" value={fmtCommas(availableCash)} onChange={onDigits(setAvailableCash)} /></div>
        </div>
      </div>

      {!ready && (
        <p className="nd-note" style={{ borderLeftColor: GOLD }}>Enter property type, purchase price, remaining lease, youngest buyer age and available cash to see your results.</p>
      )}

      {ready && (
        <>
          {/* CARD 1 — Lease Impact Summary */}
          <div style={card}>
            <p style={cardTitle}>Lease Impact Summary</p>
            <Row label="Pro-Rated CPF Usage (Full = 100%)" value={pct(cpfProRatedPct)} color={TERRA} divider={loanType !== "none"} />
            {loanType !== "none" && <Row label="Pro-Rated LTV (Full = 75%)" value={pct(proRatedLtvPct)} color={TERRA} divider={false} />}
            {ratio === 1 && <Badge bg="#E3F0E3" fg={GREEN}>✓ No pro-ration applies — full limits in effect</Badge>}
            {ratio > 0 && ratio < 1 && <Badge bg="#FBF0DC" fg="#9A7B1F">⚠ Pro-ration applies — limits reduced due to lease</Badge>}
            {ratio === 0 && <Badge bg="#F6E0DB" fg={TERRA}>✗ CPF and loan not available for this property</Badge>}
          </div>

          {/* CARD 2 — CPF Breakdown */}
          <div style={card}>
            <p style={cardTitle}>CPF Breakdown</p>
            <Row label="Total CPF OA (all buyers)" value={money(totalOA)} />
            <Row label="Max CPF Allowed (pro-rated)" value={money(maxCpfAllowed)} />
            <Row label="CPF You Can Actually Use" value={money(cpfUsable)} color={GOLD} strong divider={false} />
            {!cpfRestricted ? (
              <p style={{ fontSize: 12, color: GREEN, marginTop: 12, lineHeight: 1.6, fontWeight: 600 }}>
                ✓ You can use your full CPF OA of {money(totalOA)} towards this purchase. The pro-rated CPF ceiling ({money(maxCpfAllowed)}) is above your balance — no CPF restriction applies to you.
              </p>
            ) : (
              <p style={{ fontSize: 12, color: "#9A7B1F", marginTop: 12, lineHeight: 1.6, fontWeight: 600 }}>
                ⚠ Your CPF OA ({money(totalOA)}) exceeds the pro-rated ceiling. You are restricted to using {money(maxCpfAllowed)} in CPF for this property. The remaining {money(totalOA - maxCpfAllowed)} stays in your CPF OA and cannot be used for this purchase.
              </p>
            )}
          </div>

          {/* CARD 3 — Purchase Cost Breakdown */}
          <div style={card}>
            <p style={cardTitle}>Purchase Cost Breakdown</p>
            <Row label="Purchase Price" value={money(pp)} />
            {loanType !== "none" && <Row label={`Max Loan (${loanTypeLabel}, ${pct(proRatedLtvPct)} LTV)`} value={money(maxLoan)} />}
            <Row label="Total Downpayment Required" value={money(downpayment)} />
            <Row label="of which — CPF" value={money(cpfForDownpayment)} indent />
            {loanType === "bank" && <Row label="of which — Mandatory Cash (5%)" value={money(mandatoryCash)} indent />}
            <Row label="of which — Cash" value={money(loanType === "bank" ? discretionaryCashDownpayment : cashForDownpayment)} indent />
            <Row label={isHdbProperty ? "Option + Exercise Fees (Fixed)" : "Option + Exercise Fees (1% + 4%)"} value={money(optionExerciseFees)} />
            <Row label="Buyer's Stamp Duty" value={money(bsd)} />
            <Row label="Est. Legal Fees" value={money(legalFees)} />
            <Row label="Total Cash Required" value={money(totalCashRequired)} color={NAVY} strong />
            <Row label="Cash Available" value={money(cash)} />
            {cashShortfall > 0 && <Row label="Cash Shortfall" value={money(cashShortfall)} color={TERRA} strong divider={false} />}
            {cashShortfall > 0 ? (
              <p style={{ fontSize: 12, color: TERRA, marginTop: 12, lineHeight: 1.6 }}>
                You are {money(cashShortfall)} short in cash. Consider increasing your cash reserves or negotiating a lower purchase price.
              </p>
            ) : (
              <p style={{ fontSize: 12, color: GREEN, marginTop: 12, fontWeight: 600 }}>✓ Your cash is sufficient to proceed.</p>
            )}
          </div>

          {/* GRANTS NOTE — HDB only */}
          {propertyType === "HDB" && (
            <div style={card}>
              <p style={cardTitle}>HDB Grants — What to Know</p>
              {grantNotes.map((g, i) => (
                <p key={i} style={{ fontSize: 12.5, color: g.c, fontWeight: 600, lineHeight: 1.55, padding: "10px 0", margin: 0, borderBottom: i < grantNotes.length - 1 ? "1px solid rgba(26,41,66,0.10)" : "none" }}>{g.t}</p>
              ))}
              <p style={{ fontSize: 10.5, color: "rgba(26,41,66,0.45)", lineHeight: 1.7, marginTop: 14 }}>
                Grant eligibility is subject to citizenship, first-timer status, income, and other HDB conditions. Figures shown are maximum amounts as at 2026. Always verify via your HDB Flat Eligibility (HFE) letter.
              </p>
            </div>
          )}

          <p style={{ fontSize: 10.5, color: "rgba(26,41,66,0.45)", lineHeight: 1.7, marginTop: 20 }}>
            Bank loan figures are indicative only. Actual loan quantum is subject to individual bank credit assessment and may differ from the estimate above. CPF usage figures are based on CPF Board pro-ration guidelines. Consult a mortgage specialist for a formal assessment. NexDoor | Singapore Property Agency.
          </p>
        </>
      )}
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────
const TABS = [
  { id: "afford", label: "Affordability", component: AffordabilityCalc },
  { id: "mortgage", label: "Mortgage", component: MortgageCalc },
  { id: "stamp", label: "Stamp Duty", component: StampDutyCalc },
  { id: "cpf", label: "CPF vs Cash", component: CpfCashCalc },
  { id: "yield", label: "Rental Yield", component: RentalYieldCalc },
  { id: "seller", label: "Net Proceeds", component: SellerProceedsCalc },
  { id: "wealth", label: "Wealth Planner", component: WealthPlannerCalc },
  { id: "lease-impact", label: "Lease Impact", component: LeaseImpactCalc },
];

export default function App() {
  const [active, setActive] = useState("afford");
  const ActiveComponent = TABS.find(t => t.id === active)?.component;

  return (
    <div className="nd-app">
      <header className="nd-header">
        <div className="nd-logo-wrap">
          <div className="nd-logo">NexDoor.</div>
          <div className="nd-tagline">Property decisions, made with precision</div>
        </div>
        <div className="nd-badge">Property Calculator</div>
      </header>

      <nav className="nd-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`nd-tab ${active === tab.id ? "active" : ""}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="nd-content">
        {ActiveComponent && <ActiveComponent />}
      </main>
    </div>
  );
}
