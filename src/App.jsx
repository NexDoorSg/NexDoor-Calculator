import { useState } from "react";

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
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900&family=DM+Sans:wght@300;400;500;600&display=swap');

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
  .nd-input-wrap .nd-input { padding-left: 26px; }

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

  @media (max-width: 640px) {
    .nd-grid, .nd-grid-3, .nd-compare-grid, .nd-breakdown { grid-template-columns: 1fr; }
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

const fmtS = (n, dec = 0) => isNaN(n) || !isFinite(n) ? "—" : `S$${fmt(n, dec)}`;

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
          <div className="nd-input-wrap"><span className="nd-prefix">S$</span><input className="nd-input" placeholder="8,000" value={income1} onChange={e => setIncome1(e.target.value)} /></div>
        </div>
        <div className="nd-field">
          <label className="nd-label">{buyers === "2" ? "Buyer 1 — Existing Monthly Debt" : "Existing Monthly Debt"}</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$</span><input className="nd-input" placeholder="500" value={debt1} onChange={e => setDebt1(e.target.value)} /></div>
        </div>
        {buyers === "2" && <>
          <div className="nd-field">
            <label className="nd-label">Buyer 2 — Gross Monthly Income</label>
            <div className="nd-input-wrap"><span className="nd-prefix">S$</span><input className="nd-input" placeholder="6,000" value={income2} onChange={e => setIncome2(e.target.value)} /></div>
          </div>
          <div className="nd-field">
            <label className="nd-label">Buyer 2 — Existing Monthly Debt</label>
            <div className="nd-input-wrap"><span className="nd-prefix">S$</span><input className="nd-input" placeholder="0" value={debt2} onChange={e => setDebt2(e.target.value)} /></div>
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
          <div className="nd-input-wrap"><span className="nd-prefix">S$</span><input className="nd-input" placeholder="800,000" value={loan} onChange={e => setLoan(e.target.value)} /></div>
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
          <div className="nd-input-wrap"><span className="nd-prefix">S$</span><input className="nd-input" placeholder="1,200,000" value={price} onChange={e => setPrice(e.target.value)} /></div>
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
          <div className="nd-input-wrap"><span className="nd-prefix">S$</span><input className="nd-input" placeholder="150,000" value={cpfAmt} onChange={e => setCpfAmt(e.target.value)} /></div>
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
          <div className="nd-input-wrap"><span className="nd-prefix">S$</span><input className="nd-input" placeholder="1,500,000" value={price} onChange={e => setPrice(e.target.value)} /></div>
        </div>
        <div className="nd-field">
          <label className="nd-label">Monthly Rent</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$</span><input className="nd-input" placeholder="4,000" value={rent} onChange={e => setRent(e.target.value)} /></div>
        </div>
        <div className="nd-field">
          <label className="nd-label">Vacancy (months/year)</label>
          <select className="nd-select" value={vacancy} onChange={e => setVacancy(e.target.value)}>
            {[0,1,2,3].map(n => <option key={n} value={n}>{n} month{n !== 1 ? "s" : ""}</option>)}
          </select>
        </div>
        <div className="nd-field">
          <label className="nd-label">Annual Expenses (maint, tax...)</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$</span><input className="nd-input" placeholder="6,000" value={expenses} onChange={e => setExpenses(e.target.value)} /></div>
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

    // FIXED: Deduct ALL costs from sale price first, then split net pool by ownership %
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
          <div className="nd-input-wrap"><span className="nd-prefix">S$</span><input className="nd-input" placeholder="1,200,000" value={salePrice} onChange={e => setSalePrice(e.target.value)} /></div>
        </div>
        <div className="nd-field">
          <label className="nd-label">Outstanding Loan</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$</span><input className="nd-input" placeholder="400,000" value={outstanding} onChange={e => setOutstanding(e.target.value)} /></div>
        </div>
        <div className="nd-field">
          <label className="nd-label">{sellers === "2" ? "Seller 1 — CPF Principal Used" : "CPF Principal Used"}</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$</span><input className="nd-input" placeholder="150,000" value={cpfUsed1} onChange={e => setCpfUsed1(e.target.value)} /></div>
        </div>
        <div className="nd-field">
          <label className="nd-label">{sellers === "2" ? "Seller 1 — CPF Accrued Interest" : "CPF Accrued Interest"}</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$</span><input className="nd-input" placeholder="30,000" value={cpfInterest1} onChange={e => setCpfInterest1(e.target.value)} /></div>
        </div>
        {sellers === "2" && <>
          <div className="nd-field">
            <label className="nd-label">Seller 2 — CPF Principal Used</label>
            <div className="nd-input-wrap"><span className="nd-prefix">S$</span><input className="nd-input" placeholder="80,000" value={cpfUsed2} onChange={e => setCpfUsed2(e.target.value)} /></div>
          </div>
          <div className="nd-field">
            <label className="nd-label">Seller 2 — CPF Accrued Interest</label>
            <div className="nd-input-wrap"><span className="nd-prefix">S$</span><input className="nd-input" placeholder="15,000" value={cpfInterest2} onChange={e => setCpfInterest2(e.target.value)} /></div>
          </div>
        </>}
        <div className="nd-field">
          <label className="nd-label">Agent Commission (%)</label>
          <input className="nd-input" placeholder="2.0" value={commRate} onChange={e => setCommRate(e.target.value)} />
        </div>
        <div className="nd-field">
          <label className="nd-label">Legal Fees (est.)</label>
          <div className="nd-input-wrap"><span className="nd-prefix">S$</span><input className="nd-input" placeholder="3,000" value={legalFees} onChange={e => setLegalFees(e.target.value)} /></div>
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

// ─── App Shell ────────────────────────────────────────────────
const TABS = [
  { id: "afford", label: "Affordability", component: AffordabilityCalc },
  { id: "mortgage", label: "Mortgage", component: MortgageCalc },
  { id: "stamp", label: "Stamp Duty", component: StampDutyCalc },
  { id: "cpf", label: "CPF vs Cash", component: CpfCashCalc },
  { id: "yield", label: "Rental Yield", component: RentalYieldCalc },
  { id: "seller", label: "Net Proceeds", component: SellerProceedsCalc },
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
