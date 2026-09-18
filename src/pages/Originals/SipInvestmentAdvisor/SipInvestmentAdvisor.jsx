import React from "react";
import Navbar from "../../../components/navigation/Navbar";

/* ------------------------------------------------------------------ */
/* InternFlix — Original: SIP Investment Advisor (EP04)               */
/*                                                                      */
/* Daily automated, rule-based SIP decision workflow.                  */
/* Market Data → Google Sheets → Calculations → Decision → Slack       */
/*                                                                      */
/* IMPORTANT: This is a rule-based decision-support system, not a       */
/* guaranteed investment advisor or predictive trading system.         */
/* ------------------------------------------------------------------ */

const WORKFLOW = [
  {
    title: "Zapier Scheduler",
    tag: "Trigger",
    desc: "Starts the workflow automatically on the configured daily schedule.",
  },
  {
    title: "Market Data API",
    tag: "Data Source",
    desc: "Fetches the current market price and previous close through a webhook/API request.",
  },
  {
    title: "Google Sheets",
    tag: "Raw Data",
    desc: "Stores the incoming market observation before the indicators are calculated.",
  },
  {
    title: "Calculation Engine",
    tag: "Processing",
    desc: "Transforms raw market data into indicators such as dip, 200 DMA, trend, and volatility.",
  },
  {
    title: "Decision Engine",
    tag: "Decision",
    desc: "Evaluates the calculated market signals against predefined SIP allocation rules.",
  },
];

const DECISION_PATHS = [
  {
    title: "0%",
    tag: "SKIP",
    desc: "No SIP allocation when the configured decision rules produce a zero-allocation outcome.",
  },
  {
    title: "30%",
    tag: "PARTIAL",
    desc: "A smaller portion of the planned SIP allocation.",
  },
  {
    title: "50%",
    tag: "MEDIUM",
    desc: "A medium allocation based on the configured market conditions.",
  },
  {
    title: "75%",
    tag: "HIGH",
    desc: "A higher allocation when the configured conditions call for it.",
  },
  {
    title: "100%",
    tag: "FULL",
    desc: "The full planned SIP allocation according to the rule set.",
  },
];

const DECISION_LAYER = [
  {
    title: "Risk Checks",
    desc: "Evaluate configured risk conditions before selecting an allocation.",
  },
  {
    title: "Trend",
    desc: "Evaluate the calculated market trend.",
  },
  {
    title: "Dip",
    desc: "Evaluate the current dip against predefined thresholds.",
  },
  {
    title: "Allocation Rules",
    desc: "Map the market conditions to an SIP allocation level.",
  },
  {
    title: "Decision",
    desc: "Produce the final allocation used by the Zapier path.",
  },
];

const MARKET_SIGNALS = [
  {
    title: "Reference High",
    desc: "Reference price used to determine how far the current market price has moved from a recent high.",
  },
  {
    title: "Dip %",
    desc: "Measures the percentage difference between the current price and the reference high.",
  },
  {
    title: "200 DMA",
    desc: "Long-term moving-average reference used as part of the trend calculation.",
  },
  {
    title: "Trend",
    desc: "Classifies the market direction using the price and moving-average relationship.",
  },
  {
    title: "Volatility",
    desc: "An additional market condition available to the decision layer.",
  },
];

const CALCULATIONS = [
  {
    field: "Price",
    value: "₹1,396.45",
  },
  {
    field: "Previous Close",
    value: "₹1,395.05",
  },
  {
    field: "Change %",
    value: "+0.10%",
  },
  {
    field: "Reference High",
    value: "₹1,680.27",
  },
  {
    field: "Dip %",
    value: "-16.89%",
  },
  {
    field: "200 DMA",
    value: "₹1,447.20",
  },
  {
    field: "Trend",
    value: "DOWN",
  },
];

const FEATURES = [
  {
    title: "Automated Market Collection",
    desc: "Retrieves market information automatically through the scheduled workflow.",
  },
  {
    title: "Raw Data Storage",
    desc: "Stores daily market observations in Google Sheets for calculation and historical reference.",
  },
  {
    title: "Market Indicator Calculation",
    desc: "Transforms raw price data into signals such as dip percentage, 200 DMA, and trend.",
  },
  {
    title: "Rule-Based Decision Engine",
    desc: "Evaluates predefined market conditions to determine the SIP allocation.",
  },
  {
    title: "Dynamic Path Routing",
    desc: "Uses Zapier Paths to route different allocation outcomes.",
  },
  {
    title: "Daily Slack Alerts",
    desc: "Delivers the resulting SIP decision and supporting market signals through Slack.",
  },
];

const JOURNEY = [
  "Daily Schedule",
  "Market Data Retrieved",
  "Raw Data Stored",
  "Indicators Calculated",
  "Latest Row Retrieved",
  "Decision Rules Evaluated",
  "SIP Allocation Selected",
  "Slack Alert Delivered",
];

const CAST_GROUPS = [
  {
    category: "Automation",
    items: [
      "Zapier",
      "Scheduler",
      "Webhooks",
      "Paths",
      "Automation Workflow",
    ],
  },
  {
    category: "Market Data",
    items: [
      "Market Data API",
      "Current Price",
      "Previous Close",
      "Historical Observations",
    ],
  },
  {
    category: "Calculation",
    items: [
      "Google Sheets",
      "Reference High",
      "Dip %",
      "200 DMA",
      "Trend",
      "Volatility",
    ],
  },
  {
    category: "Decision",
    items: [
      "Risk Checks",
      "Trend Rules",
      "Dip Rules",
      "Allocation Rules",
    ],
  },
  {
    category: "Communication",
    items: [
      "Slack",
      "Daily SIP Alert",
    ],
  },
];

const CHALLENGES = [
  {
    n: "01",
    title: "Market data reliability",
    desc: "The workflow depends on external market data, so the quality and timing of incoming observations directly affect the downstream calculations.",
  },
  {
    n: "02",
    title: "Calculation accuracy",
    desc: "Indicators such as the 200 DMA require appropriate historical data rather than a small number of observations.",
  },
  {
    n: "03",
    title: "Overlapping decision conditions",
    desc: "Multiple market conditions can sometimes match at the same time, making rule priority important when routing decisions through Zapier Paths.",
  },
  {
    n: "04",
    title: "Duplicate observations",
    desc: "Automated data ingestion needs safeguards to prevent repeated daily observations from creating duplicate records.",
  },
];

const LESSONS = [
  {
    title: "Automation Architecture",
    desc: "Learned how multiple services can be connected into a single end-to-end workflow.",
  },
  {
    title: "Rule-Based Decision Systems",
    desc: "Learned how raw data and calculated signals can be transformed into deterministic decisions.",
  },
  {
    title: "Data → Decision",
    desc: "Learned how external data, calculations, business rules, and notifications work together as one system.",
  },
];

const DEMO_STEPS = [
  "Scheduled workflow starts",
  "Market data is fetched",
  "Google Sheets stores and calculates",
  "Latest row is retrieved",
  "Decision path is selected",
  "Slack alert is generated",
];

function PlayIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      {...props}
    >
      <path d="M6 4.5v15l13-7.5-13-7.5Z" />
    </svg>
  );
}

function InfoIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...props}
    >
      <circle cx="12" cy="12" r="9.2" />
      <path d="M12 11v5.2" strokeLinecap="round" />
      <circle
        cx="12"
        cy="7.6"
        r="0.9"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="16"
      height="16"
      className="arrow"
      aria-hidden="true"
    >
      <path
        d="M10 2v13M10 15l-5-5M10 15l5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarketIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      {...props}
    >
      <path d="M4 18V9" />
      <path d="M9 18V6" />
      <path d="M14 18v-8" />
      <path d="M19 18V4" />
      <path d="M3 20h18" />
    </svg>
  );
}

function Section({
  id,
  label,
  title,
  subtitle,
  children,
  className = "",
}) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="section__inner">
        <p className="label label--accent">{label}</p>

        {title && <h2 className="section-title">{title}</h2>}

        {subtitle && (
          <p className="section-subtitle">{subtitle}</p>
        )}

        {children}
      </div>
    </section>
  );
}

export default function SipInvestmentAdvisorPage() {
  return (
    <div className="project">
      <Navbar />

      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

  :root {
    --bg: #050505;
    --surface: #101010;
    --surface-2: #181818;
    --surface-3: #222222;

    --text: #FFFFFF;
    --text-2: #B3B3B3;
    --text-3: #777777;

    --accent: #E50914;
  }

  /* ============================================================ */
  /* BASE                                                         */
  /* ============================================================ */

  .project * {
    box-sizing: border-box;
  }

  .project {
    background: var(--bg);
    color: var(--text);
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .project :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  .mono {
    font-family: 'JetBrains Mono', 'SFMono-Regular', Menlo, monospace;
  }

  /* ============================================================ */
  /* TYPOGRAPHY                                                   */
  /* ============================================================ */

  .label {
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-2);
    font-weight: 600;
    margin: 0 0 0.75rem;
  }

  .label--accent {
    color: var(--accent);
  }

  .section-title {
    font-size: clamp(1.5rem, 2.6vw, 2rem);
    font-weight: 700;
    line-height: 1.2;
    margin: 0 0 0.6rem;
  }

  .section-subtitle {
    color: var(--text-3);
    font-size: 0.95rem;
    line-height: 1.6;
    margin: -0.4rem 0 1.5rem;
  }

  /* ============================================================ */
  /* BUTTONS                                                      */
  /* ============================================================ */

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    border: none;
    border-radius: 4px;

    padding: 0.8rem 1.6rem;

    font-size: 0.95rem;
    font-weight: 600;
    font-family: inherit;

    cursor: pointer;

    transition:
      background-color 0.15s ease,
      transform 0.15s ease;
  }

  .btn--primary {
    background: var(--accent);
    color: #fff;
  }

  .btn--primary:hover {
    background: #c40812;
    transform: translateY(-1px);
  }

  .btn--ghost {
    background: var(--surface-3);
    color: var(--text);
  }

  .btn--ghost:hover {
    background: #2c2c2c;
    transform: translateY(-1px);
  }

  /* ============================================================ */
  /* SECTION                                                       */
  /* ============================================================ */

  .section {
    padding: 4.5rem 3rem;
    border-top: 1px solid var(--surface-2);
  }

  .section__inner {
    max-width: 900px;
    margin: 0 auto;
  }

  .section--wide .section__inner {
    max-width: 1140px;
  }

  /* ============================================================ */
  /* HERO — TREND INTELLIGENCE STYLE                               */
  /* ============================================================ */

  .hero {
    position: relative;
    min-height: 78vh;

    display: flex;
    align-items: flex-end;

    padding: 6rem 3rem 3.5rem;

    overflow: hidden;

    background: var(--bg);
  }

  .hero__image-wrap {
    position: absolute;
    inset: 0 0 0 35%;

    z-index: 0;
  }

  .hero__image {
    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center;

    opacity: 0.9;

    display: block;
  }

  .hero__scrim {
    position: absolute;
    inset: 0;

    z-index: 1;

    pointer-events: none;

    background:
      linear-gradient(
        90deg,
        var(--bg) 0%,
        rgba(5, 5, 5, 0.96) 28%,
        rgba(5, 5, 5, 0.72) 48%,
        rgba(5, 5, 5, 0.25) 72%,
        rgba(5, 5, 5, 0.05) 100%
      ),
      linear-gradient(
        to top,
        var(--bg) 0%,
        transparent 35%
      ),
      linear-gradient(
        to bottom,
        rgba(5, 5, 5, 0.35) 0%,
        transparent 25%
      );
  }

  .hero__content {
    position: relative;

    z-index: 3;

    max-width: 620px;

    margin-left: 0;
  }

  .hero__meta {
    display: flex;

    gap: 1rem;

    flex-wrap: wrap;

    color: var(--text-3);

    font-size: 0.85rem;

    margin-bottom: 1rem;
  }

  .hero__meta span:first-child {
    color: var(--text-2);
  }

  .hero__title {
    font-size: clamp(2.5rem, 5vw, 4.5rem);

    font-weight: 800;

    line-height: 1.05;

    margin: 0 0 1.1rem;

    text-transform: none;
  }

  .hero__tagline {
    color: var(--text-2);

    font-size: 1.1rem;

    line-height: 1.55;

    font-style: italic;

    margin: 0 0 1.6rem;

    max-width: 480px;
  }

  .hero__actions {
    display: flex;

    gap: 0.9rem;

    flex-wrap: wrap;
  }

  /* ============================================================ */
  /* SYNOPSIS                                                      */
  /* ============================================================ */

  .synopsis p {
    color: var(--text-2);

    line-height: 1.75;

    font-size: 1.05rem;

    margin: 0 0 1.1rem;
  }

  .synopsis p:last-child {
    margin-bottom: 0;
  }

  .synopsis__connect {
    border-left: 2px solid var(--accent);

    padding-left: 1rem;

    color: var(--text-2);

    font-size: 0.98rem;

    font-style: italic;

    line-height: 1.65;

    margin-top: 1.5rem;
  }

  /* ============================================================ */
  /* WORKFLOW                                                      */
  /* ============================================================ */

  .workflow {
    display: flex;

    flex-direction: column;

    align-items: center;

    gap: 0;
  }

  .workflow-row {
    display: flex;

    align-items: stretch;

    justify-content: center;

    gap: 0;

    flex-wrap: wrap;

    width: 100%;
  }

  .workflow-card {
    position: relative;

    background: var(--surface-2);

    border: 1px solid var(--surface-3);

    border-radius: 8px;

    padding: 1.1rem 1.3rem;

    width: 200px;

    min-height: 118px;

    text-align: center;

    display: flex;

    flex-direction: column;

    justify-content: center;

    transition:
      border-color 0.18s ease,
      background-color 0.18s ease,
      transform 0.18s ease;
  }

  .workflow-card:hover {
    border-color: #333;

    background: #1b1b1b;

    transform: translateY(-2px);
  }

  .workflow-card--accent {
    border-color: var(--accent);

    background: #1c0d0e;
  }

  .workflow-card--accent:hover {
    border-color: var(--accent);

    background: #241011;
  }

  .workflow-card__tag {
    color: var(--text-3);

    font-size: 0.7rem;

    letter-spacing: 0.08em;

    text-transform: uppercase;

    margin: 0 0 0.4rem;
  }

  .workflow-card__title {
    font-weight: 700;

    font-size: 0.98rem;

    line-height: 1.35;

    margin: 0 0 0.4rem;
  }

  .workflow-card__desc {
    color: var(--text-2);

    font-size: 0.82rem;

    line-height: 1.5;

    margin: 0;
  }

  .workflow-arrow-h {
    color: var(--text-3);

    align-self: center;

    margin: 0 0.5rem;

    font-size: 1.1rem;
  }

  .workflow-branch {
    display: flex;

    gap: 0.75rem;

    justify-content: center;

    align-items: stretch;

    flex-wrap: wrap;

    width: 100%;

    margin-top: 0.5rem;
  }

  .workflow-branch .workflow-card {
    width: 150px;
    min-height: 100px;
  }

  .arrow {
    color: var(--text-3);

    margin: 0.35rem 0;
  }

  /* ============================================================ */
  /* MARKET SIGNALS / FEATURE GRID                                */
  /* ============================================================ */

  .feature-grid {
    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 1rem;
  }

  .feature-card {
    background: var(--surface-2);

    border: 1px solid var(--surface-3);

    border-radius: 8px;

    padding: 1.3rem 1.4rem;

    transition:
      border-color 0.18s ease,
      background-color 0.18s ease,
      transform 0.18s ease;
  }

  .feature-card:hover {
    border-color: var(--accent);

    background: #1b1b1b;

    transform: translateY(-2px);
  }

  .feature-card__title {
    font-weight: 700;

    font-size: 0.98rem;

    margin: 0 0 0.5rem;
  }

  .feature-card__desc {
    color: var(--text-2);

    font-size: 0.9rem;

    line-height: 1.55;

    margin: 0;
  }

  /* ============================================================ */
  /* TRANSFORMATION / DATA PANELS                                 */
  /* ============================================================ */

  .transform-grid {
    display: grid;

    grid-template-columns: 1fr auto 1fr;

    gap: 1.5rem;

    align-items: center;
  }

  .transform-panel {
    background: var(--surface-2);

    border: 1px solid var(--surface-3);

    border-radius: 8px;

    padding: 1.5rem 1.6rem;

    min-height: 250px;
  }

  .transform-panel__label {
    color: var(--text-3);

    font-size: 0.75rem;

    letter-spacing: 0.08em;

    text-transform: uppercase;

    margin: 0 0 1rem;
  }

  .transform-panel__subject {
    color: var(--text-3);

    font-size: 0.85rem;

    margin: 0 0 0.5rem;
  }

  .transform-panel__body {
    color: var(--text-2);

    font-size: 0.95rem;

    line-height: 1.65;

    margin: 0;

    font-style: italic;
  }

  .transform-arrow {
    text-align: center;

    color: var(--accent);

    font-weight: 700;

    font-size: 0.85rem;

    letter-spacing: 0.05em;

    white-space: nowrap;
  }

  .ai-fields {
    display: flex;

    flex-direction: column;

    gap: 0.85rem;
  }

  .ai-field__label {
    color: var(--text-3);

    font-size: 0.72rem;

    letter-spacing: 0.08em;

    text-transform: uppercase;

    margin: 0 0 0.25rem;
  }

  .ai-field__value {
    color: var(--text);

    font-size: 0.95rem;

    margin: 0;

    font-weight: 600;
  }

  /* ============================================================ */
  /* CODE / DATA PANELS                                            */
  /* ============================================================ */

  .code-grid-2 {
    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 1.5rem;

    align-items: stretch;
  }

  .code-panel {
    background: var(--surface);

    border: 1px solid var(--surface-3);

    border-radius: 8px;

    padding: 1.3rem 1.4rem;

    overflow: hidden;
  }

  .code-panel__label {
    color: var(--text-3);

    font-size: 0.72rem;

    letter-spacing: 0.08em;

    text-transform: uppercase;

    margin: 0 0 0.8rem;
  }

  .code-panel__body {
    color: var(--text-2);

    font-size: 0.88rem;

    line-height: 1.65;

    margin: 0;

    white-space: pre-wrap;
  }

  .transform-caption {
    text-align: center;

    color: var(--text-2);

    font-size: 0.98rem;

    line-height: 1.7;

    max-width: 620px;

    margin: 1.75rem auto 0;

    font-style: italic;
  }

  /* ============================================================ */
  /* DECISION ENGINE                                               */
  /* ============================================================ */

  .decision-grid {
    display: grid;

    grid-template-columns: repeat(5, 1fr);

    gap: 0.9rem;
  }

  .decision-card {
    background: var(--surface-2);

    border: 1px solid var(--surface-3);

    border-radius: 8px;

    padding: 1.2rem 1rem;

    text-align: center;

    min-height: 110px;

    display: flex;

    flex-direction: column;

    justify-content: center;

    transition:
      border-color 0.18s ease,
      background-color 0.18s ease,
      transform 0.18s ease;
  }

  .decision-card:hover {
    border-color: var(--accent);

    background: #1c0d0e;

    transform: translateY(-2px);
  }

  .decision-card__title {
    font-weight: 800;

    font-size: 1.15rem;

    margin: 0 0 0.5rem;

    color: var(--accent);

    font-family: 'JetBrains Mono', monospace;
  }

  .decision-card__desc {
    color: var(--text-2);

    font-size: 0.82rem;

    line-height: 1.45;

    margin: 0;
  }

  /* ============================================================ */
  /* DAILY JOURNEY                                                 */
  /* ============================================================ */

  .journey {
    display: flex;

    flex-direction: column;

    align-items: center;

    gap: 0.4rem;
  }

  .flow {
    display: flex;

    flex-direction: column;

    align-items: center;

    gap: 0.4rem;

    width: 100%;
  }

  .flow__step {
    width: 100%;

    max-width: 420px;

    background: var(--surface-2);

    border: 1px solid var(--surface-3);

    border-radius: 6px;

    padding: 0.85rem 1.25rem;

    text-align: center;

    font-weight: 600;

    font-size: 0.95rem;

    transition:
      border-color 0.18s ease,
      background-color 0.18s ease;
  }

  .flow__step:hover {
    border-color: #333;

    background: #1b1b1b;
  }

  .flow__step--accent {
    border-color: var(--accent);

    color: var(--text);

    background: #1c0d0e;
  }

  /* ============================================================ */
  /* CAST & TECHNOLOGY                                             */
  /* ============================================================ */

  .toolkit {
    display: flex;

    flex-direction: column;

    gap: 1.4rem;
  }

  .toolkit__group-label {
    color: var(--text-3);

    font-size: 0.75rem;

    font-weight: 700;

    letter-spacing: 0.1em;

    text-transform: uppercase;

    margin: 0 0 0.6rem;
  }

  .cast {
    display: flex;

    flex-wrap: wrap;

    gap: 0.6rem;
  }

  .cast__chip {
    background: var(--surface-2);

    border: 1px solid var(--surface-3);

    padding: 0.5rem 1rem;

    border-radius: 20px;

    font-size: 0.85rem;

    color: var(--text-2);

    transition:
      border-color 0.18s ease,
      color 0.18s ease;
  }

  .cast__chip:hover {
    border-color: var(--accent);

    color: var(--text);
  }

  /* ============================================================ */
  /* MY ROLE                                                       */
  /* ============================================================ */

  .role-copy {
    color: var(--text-2);

    line-height: 1.75;

    font-size: 1.05rem;

    margin: 0;
  }

  /* ============================================================ */
  /* BEHIND THE SCENES                                             */
  /* ============================================================ */

  .challenge-list {
    display: flex;

    flex-direction: column;

    gap: 1.1rem;
  }

  .challenge {
    display: flex;

    gap: 1.2rem;

    background: var(--surface-2);

    border: 1px solid var(--surface-3);

    border-radius: 8px;

    padding: 1.2rem 1.4rem;

    transition:
      border-color 0.18s ease,
      background-color 0.18s ease;
  }

  .challenge:hover {
    border-color: #333;

    background: #1b1b1b;
  }

  .challenge__n {
    color: var(--accent);

    font-weight: 800;

    font-size: 1.3rem;

    font-family: 'JetBrains Mono', monospace;

    flex: 0 0 auto;
  }

  .challenge__title {
    font-weight: 700;

    font-size: 0.98rem;

    margin: 0 0 0.4rem;
  }

  .challenge__desc {
    color: var(--text-2);

    font-size: 0.92rem;

    line-height: 1.6;

    margin: 0;
  }

  /* ============================================================ */
  /* LESSONS                                                       */
  /* ============================================================ */

  .lesson-grid {
    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 1rem;
  }

  .lesson-card {
    background: var(--surface-2);

    border: 1px solid var(--surface-3);

    border-radius: 8px;

    padding: 1.3rem 1.4rem;

    text-align: center;

    transition:
      border-color 0.18s ease,
      transform 0.18s ease;
  }

  .lesson-card:hover {
    border-color: var(--accent);

    transform: translateY(-2px);
  }

  .lesson-card__title {
    font-weight: 700;

    font-size: 0.95rem;

    margin: 0 0 0.6rem;
  }

  .lesson-card__desc {
    color: var(--text-2);

    font-size: 0.88rem;

    line-height: 1.55;

    margin: 0;
  }

  

  /* ============================================================ */
  /* EPISODE TRANSITION                                            */
  /* ============================================================ */

  .transition-grid {
    display: grid;

    grid-template-columns:
      1fr
      auto
      1fr
      auto
      1fr;

    align-items: center;

    gap: 1rem;
  }

  .transition-card {
    background: var(--surface-2);

    border: 1px solid var(--surface-3);

    border-radius: 8px;

    padding: 1.4rem 1.3rem;

    min-height: 150px;
  }

  .transition-card--current {
    border-color: var(--accent);

    background: #1c0d0e;
  }

  .transition-card__label {
    color: var(--text-3);

    font-size: 0.7rem;

    font-weight: 700;

    letter-spacing: 0.1em;

    text-transform: uppercase;

    margin: 0 0 0.5rem;
  }

  .transition-card__ep {
    font-weight: 700;

    font-size: 0.95rem;

    line-height: 1.4;

    margin: 0 0 0.5rem;
  }

  .transition-card__line {
    color: var(--text-2);

    font-size: 0.86rem;

    line-height: 1.5;

    margin: 0;

    font-style: italic;
  }

  .transition-arrow {
    color: var(--text-3);

    font-size: 1.2rem;

    text-align: center;
  }

  .transition-cta {
    text-align: center;

    margin-top: 2rem;
  }

  /* ============================================================ */
  /* TABLET                                                        */
  /* ============================================================ */

  @media (max-width: 1199px) {

    .hero,
    .section {
      padding-left: 2rem;
      padding-right: 2rem;
    }

    .hero__image-wrap {
      inset: 0;
    }

    .hero__image {
      object-position: center;
      opacity: 0.7;
    }

    .hero__scrim {
      background:
        linear-gradient(
          90deg,
          var(--bg) 0%,
          rgba(5, 5, 5, 0.78) 48%,
          rgba(5, 5, 5, 0.25) 100%
        ),
        linear-gradient(
          to top,
          var(--bg) 0%,
          transparent 55%
        );
    }

    .hero__content {
      max-width: 620px;
      margin-left: 0;
    }

    .hero__meta,
    .hero__actions {
      justify-content: flex-start;
    }

    .feature-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .decision-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .lesson-grid {
      grid-template-columns: 1fr;
    }

    .transform-grid {
      grid-template-columns: 1fr;
    }

    .transform-arrow {
      transform: rotate(90deg);
    }

    .code-grid-2 {
      grid-template-columns: 1fr;
    }

    .transition-grid {
      grid-template-columns: 1fr;
    }

    .transition-arrow {
      transform: rotate(90deg);
    }

    .workflow-row {
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
    }

    .workflow-arrow-h {
      transform: rotate(90deg);
      margin: 0.25rem 0;
    }

    .workflow-card {
      width: 100%;
      max-width: 420px;
    }

    .workflow-branch {
      flex-direction: row;
    }
  }

  /* ============================================================ */
  /* MOBILE                                                        */
  /* ============================================================ */

  @media (max-width: 767px) {

    .hero,
    .section {
      padding-left: 1.1rem;
      padding-right: 1.1rem;
    }

    .hero {
      min-height: 72vh;
      padding-top: 5rem;
      padding-bottom: 2.5rem;
      align-items: flex-end;
    }

    .hero__image-wrap {
      inset: 0;
    }

    .hero__image {
      object-position: center;
      opacity: 0.62;
    }

    .hero__scrim {
      background:
        linear-gradient(
          180deg,
          rgba(5, 5, 5, 0.25) 0%,
          rgba(5, 5, 5, 0.55) 42%,
          rgba(5, 5, 5, 0.9) 72%,
          var(--bg) 100%
        );
    }

    .hero__content {
      width: 100%;
      max-width: 100%;
      margin-left: 0;
    }

    .hero__meta {
      gap: 0.55rem;
      font-size: 0.72rem;
      margin-bottom: 0.8rem;
    }

    .hero__title {
      font-size: clamp(2.15rem, 9.5vw, 3rem);
      line-height: 1.05;
      margin-bottom: 0.9rem;
      max-width: 100%;
    }

    .hero__tagline {
      font-size: 0.98rem;
      line-height: 1.5;
      max-width: 100%;
      margin-bottom: 1.25rem;
    }

    .hero__actions {
      width: 100%;
      gap: 0.65rem;
    }

    .hero__actions .btn {
      width: auto;
      min-width: 140px;
    }

    .feature-grid {
      grid-template-columns: 1fr;
    }

    .decision-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .workflow-card {
      width: 100%;
      max-width: 320px;
    }

    .workflow-branch {
      flex-direction: column;
      align-items: center;
    }

    .workflow-branch .workflow-card {
      width: 100%;
      max-width: 280px;
    }

    .transform-grid {
      grid-template-columns: 1fr;
    }

    .transform-arrow {
      transform: rotate(90deg);
      margin: 0.5rem 0;
    }

    .code-grid-2 {
      grid-template-columns: 1fr;
    }

    .challenge {
      flex-direction: column;
      gap: 0.5rem;
    }

    .transition-grid {
      grid-template-columns: 1fr;
    }

    .transition-arrow {
      transform: rotate(90deg);
    }

    .watch__frame {
      padding: 2.2rem 1rem;
    }
  }

  /* ============================================================ */
  /* SMALL MOBILE                                                  */
  /* ============================================================ */

  @media (max-width: 480px) {

    .section {
      padding-top: 3.5rem;
      padding-bottom: 3.5rem;
    }

    .hero {
      min-height: 76vh;
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .hero__image {
      object-position: 58% center;
    }

    .hero__title {
      font-size: clamp(2rem, 10vw, 2.65rem);
    }

    .hero__tagline {
      font-size: 0.95rem;
    }

    .decision-grid {
      grid-template-columns: 1fr;
    }

    .decision-card {
      min-height: 90px;
    }

    .cast {
      gap: 0.45rem;
    }

    .cast__chip {
      font-size: 0.78rem;
      padding: 0.45rem 0.8rem;
    }

    .btn {
      width: 100%;
    }

    .hero__actions {
      width: 100%;
    }

    .hero__actions .btn {
      max-width: 280px;
      width: 100%;
    }
  }

  /* ============================================================ */
  /* REDUCED MOTION                                                */
  /* ============================================================ */

  @media (prefers-reduced-motion: reduce) {

    .project * {
      transition: none !important;
    }
  }

`}</style>

      {/* ========================================================= */}
      {/* HERO                                                       */}
      {/* ========================================================= */}

      <header className="hero">

        {/* Background Image */}
        <div className="hero__image-wrap">
          <img
            src="/images/sip.png"
            alt=""
            className="hero__image"
          />
        </div>

        {/* Dark Netflix-style overlay */}
        <div
          className="hero__scrim"
          aria-hidden="true"
        />

        {/* Hero Content */}
        <div className="hero__content">

          <div className="hero__meta">
            <span>S1 &middot; EP04</span>
            <span>AI &middot; FINTECH &middot; DECISION SUPPORT</span>
          </div>

          <h1 className="hero__title">
            SIP Investment Advisor
          </h1>

          <p className="hero__tagline">
            &ldquo;Turning market signals into an automated SIP decision.&rdquo;
          </p>

          <div className="hero__actions">

            <button
              className="btn btn--primary"
              onClick={() => {
                window.open("/demos/SIP.html", "_blank");
              }}
            >
              <PlayIcon /> Watch Demo
            </button>

            <button className="btn btn--ghost">
              <InfoIcon />
              More Info
            </button>

          </div>

        </div>

      </header>


      {/* ========================================================= */}
      {/* SYNOPSIS                                                   */}
      {/* ========================================================= */}

      <Section
        label="Synopsis"
        title="What this project is"
      >
        <div className="synopsis">

          <p>
            SIP Investment Advisor is a daily automated,
            rule-based decision-support workflow that collects
            market data, calculates market indicators, evaluates
            predefined SIP allocation rules, and delivers the
            resulting decision through Slack.
          </p>

        </div>

        <p className="synopsis__connect">
          The project explored how market data can move through
          an automated pipeline from raw observation to calculated
          signals, decision logic, allocation, and notification.
        </p>
      </Section>


      {/* ========================================================= */}
      {/* HOW IT PLAYS — DETAILED WORKFLOW                          */}
      {/* ========================================================= */}

      <Section
        label="How It Plays"
        title="From market data to a daily SIP decision."
        className="section--wide"
      >

        <div className="workflow">

          {/* DAILY SCHEDULE */}

          <div className="workflow-card">
            <p className="workflow-card__tag">
              Trigger
            </p>

            <p className="workflow-card__title">
              Zapier Scheduler
            </p>

            <p className="workflow-card__desc">
              Starts the workflow automatically on the
              configured daily schedule.
            </p>
          </div>

          <ArrowDown />


          {/* MAIN PIPELINE */}

          <div className="workflow-row">

            {WORKFLOW.slice(1).map((node, i) => (
              <React.Fragment key={node.title}>

                <div
                  className={`workflow-card ${
                    node.title === "Decision Engine"
                      ? "workflow-card--accent"
                      : ""
                  }`}
                >

                  <p className="workflow-card__tag">
                    {node.tag}
                  </p>

                  <p className="workflow-card__title">
                    {node.title}
                  </p>

                  <p className="workflow-card__desc">
                    {node.desc}
                  </p>

                </div>

                {i < WORKFLOW.slice(1).length - 1 && (
                  <span className="workflow-arrow-h">
                    →
                  </span>
                )}

              </React.Fragment>
            ))}

          </div>

          <ArrowDown />


          {/* ZAPIER PATHS */}

          <div className="workflow-card workflow-card--accent">

            <p className="workflow-card__tag">
              Decision Routing
            </p>

            <p className="workflow-card__title">
              Zapier Paths
            </p>

            <p className="workflow-card__desc">
              Routes the decision into the appropriate
              SIP allocation path.
            </p>

          </div>

          <ArrowDown />


          {/* ALLOCATION BRANCH */}

          <div className="workflow-branch">

            {DECISION_PATHS.map((path) => (
              <div
                className="workflow-card"
                key={path.title}
              >

                <p className="workflow-card__tag">
                  {path.tag}
                </p>

                <p className="workflow-card__title">
                  {path.title}
                </p>

                <p className="workflow-card__desc">
                  {path.desc}
                </p>

              </div>
            ))}

          </div>

          <ArrowDown />


          {/* SLACK */}

          <div className="workflow-card">

            <p className="workflow-card__tag">
              Notification
            </p>

            <p className="workflow-card__title">
              Slack
            </p>

            <p className="workflow-card__desc">
              Delivers the daily SIP allocation and
              supporting market signals.
            </p>

          </div>

        </div>

      </Section>


      {/* ========================================================= */}
      {/* MARKET SIGNALS                                             */}
      {/* ========================================================= */}

      <Section
        label="What The System Watches"
        title="Turning raw market data into signals."
        className="section--wide"
      >

        <div className="feature-grid">

          {MARKET_SIGNALS.map((signal) => (
            <div
              className="feature-card"
              key={signal.title}
            >

              <p className="feature-card__title">
                {signal.title}
              </p>

              <p className="feature-card__desc">
                {signal.desc}
              </p>

            </div>
          ))}

        </div>

      </Section>


      {/* ========================================================= */}
      {/* CALCULATION LAYER                                          */}
      {/* ========================================================= */}

      <Section
        label="Calculation Layer"
        title="Where raw observations become market indicators."
        className="section--wide"
      >

        <div className="code-grid-2">

          {/* RAW DATA */}

          <div className="code-panel">

            <p className="code-panel__label">
              Raw Market Data
            </p>

            <p className="code-panel__body">
              {`Date:
18 Mar 2026

Price:
₹1,396.45

Previous Close:
₹1,395.05

Change:
+0.10%`}
            </p>

          </div>


          {/* CALCULATED DATA */}

          <div className="code-panel">

            <p className="code-panel__label">
              Calculated Indicators
            </p>

            <p className="code-panel__body">
              {`Reference High:
₹1,680.27

Dip:
-16.89%

200 DMA:
₹1,447.20

Trend:
DOWN`}
            </p>

          </div>

        </div>

        <p className="transform-caption">
          Google Sheets acts as the calculation layer,
          transforming raw market observations into signals
          that can be evaluated by the decision engine.
        </p>

      </Section>


      {/* ========================================================= */}
      {/* DECISION ENGINE                                            */}
      {/* ========================================================= */}

      <Section
        label="The Decision Engine"
        title="Market signals become an allocation decision."
        className="section--wide"
      >

        <div className="decision-grid">

          {DECISION_LAYER.map((item) => (
            <div
              className="decision-card"
              key={item.title}
            >

              <p className="decision-card__title">
                {item.title}
              </p>

              <p className="decision-card__desc">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

        <p className="transform-caption">
          The system uses predefined rules to map market
          conditions to a SIP allocation level.
        </p>

      </Section>


      {/* ========================================================= */}
      {/* DECISION STEP BY STEP                                      */}
      {/* ========================================================= */}

      <Section
        label="A Decision, Step By Step"
        title="One market observation through the system."
        className="section--wide"
      >

        <div className="transform-grid">

          {/* MARKET OBSERVATION */}

          <div className="transform-panel">

            <p className="transform-panel__label">
              Market Observation
            </p>

            <div className="ai-fields">

              {CALCULATIONS.map((item) => (
                <div key={item.field}>

                  <p className="ai-field__label">
                    {item.field}
                  </p>

                  <p className="ai-field__value">
                    {item.value}
                  </p>

                </div>
              ))}

            </div>

          </div>


          <div className="transform-arrow">
            DECISION →
          </div>


          {/* RESULT */}

          <div className="transform-panel">

            <p className="transform-panel__label">
              SIP Decision
            </p>

            <div className="ai-fields">

              <div>
                <p className="ai-field__label">
                  Trend
                </p>

                <p className="ai-field__value">
                  DOWN
                </p>
              </div>

              <div>
                <p className="ai-field__label">
                  Dip
                </p>

                <p className="ai-field__value">
                  -16.89%
                </p>
              </div>

              <div>
                <p className="ai-field__label">
                  Allocation
                </p>

                <p className="ai-field__value">
                  30%
                </p>
              </div>

            </div>

          </div>

        </div>

      </Section>


      {/* ========================================================= */}
      {/* ALLOCATION LADDER                                          */}
      {/* ========================================================= */}

      <Section
        label="Allocation Ladder"
        title="The available SIP allocation paths."
        className="section--wide"
      >

        <div className="decision-grid">

          {DECISION_PATHS.map((path) => (
            <div
              className="decision-card"
              key={path.title}
            >

              <p className="decision-card__title">
                {path.title}
              </p>

              <p className="decision-card__desc">
                {path.tag}
              </p>

            </div>
          ))}

        </div>

      </Section>


      {/* ========================================================= */}
      {/* WHAT I BUILT                                               */}
      {/* ========================================================= */}

      <Section
        label="What I Built"
        title="Features"
        className="section--wide"
      >

        <div className="feature-grid">

          {FEATURES.map((feature) => (
            <div
              className="feature-card"
              key={feature.title}
            >

              <p className="feature-card__title">
                {feature.title}
              </p>

              <p className="feature-card__desc">
                {feature.desc}
              </p>

            </div>
          ))}

        </div>

      </Section>


      {/* ========================================================= */}
      {/* DAILY JOURNEY                                              */}
      {/* ========================================================= */}

      <Section
        label="Daily Journey"
        title="From scheduled trigger to Slack alert."
      >

        <div className="journey">

          <div className="flow">

            {JOURNEY.map((step, i) => (
              <React.Fragment key={step}>

                <div
                  className={`flow__step ${
                    i === JOURNEY.length - 1
                      ? "flow__step--accent"
                      : ""
                  }`}
                >
                  {step}
                </div>

                {i < JOURNEY.length - 1 && (
                  <ArrowDown />
                )}

              </React.Fragment>
            ))}

          </div>

        </div>

        <p className="transform-caption">
          The complete workflow runs from market-data
          collection to a final daily notification.
        </p>

      </Section>


      {/* ========================================================= */}
      {/* BEHIND THE SYSTEM — ARCHITECTURE                           */}
      {/* ========================================================= */}

      <Section
        label="Behind The System"
        title="How the components connect."
        subtitle="The architecture separates data collection, calculation, decision routing, and notification."
        className="section--wide"
      >

        <div className="workflow">

          {/* DAILY SCHEDULE */}

          <div className="workflow-card">

            <p className="workflow-card__tag">
              Trigger
            </p>

            <p className="workflow-card__title">
              Daily Schedule
            </p>

          </div>

          <ArrowDown />


          {/* ZAPIER */}

          <div className="workflow-card">

            <p className="workflow-card__tag">
              Automation
            </p>

            <p className="workflow-card__title">
              Zapier Scheduler
            </p>

          </div>

          <ArrowDown />


          {/* API */}

          <div className="workflow-card">

            <p className="workflow-card__tag">
              Data Source
            </p>

            <p className="workflow-card__title">
              Webhook / Market Price API
            </p>

          </div>

          <ArrowDown />


          {/* GOOGLE SHEETS */}

          <div className="workflow-card">

            <p className="workflow-card__tag">
              Storage
            </p>

            <p className="workflow-card__title">
              Google Sheets — Raw Data
            </p>

          </div>

          <ArrowDown />


          {/* CALCULATION */}

          <div className="workflow-card workflow-card--accent">

            <p className="workflow-card__tag">
              Processing
            </p>

            <p className="workflow-card__title">
              Calculation Engine
            </p>

            <p className="workflow-card__desc">
              Monthly High · Dip % · 200 DMA · Trend · Decision
            </p>

          </div>

          <ArrowDown />


          {/* LATEST ROW */}

          <div className="workflow-card">

            <p className="workflow-card__tag">
              Data Retrieval
            </p>

            <p className="workflow-card__title">
              Get Latest Row
            </p>

          </div>

          <ArrowDown />


          {/* PATHS */}

          <div className="workflow-card workflow-card--accent">

            <p className="workflow-card__tag">
              Decision Routing
            </p>

            <p className="workflow-card__title">
              Paths By Zapier
            </p>

            <p className="workflow-card__desc">
              Decision Engine
            </p>

          </div>

          <ArrowDown />


          {/* BRANCHES */}

          <div className="workflow-branch">

            {DECISION_PATHS.map((path) => (
              <div
                className="workflow-card"
                key={path.title}
              >

                <p className="workflow-card__tag">
                  Path
                </p>

                <p className="workflow-card__title">
                  {path.title}
                </p>

              </div>
            ))}

          </div>

          <ArrowDown />


          {/* SLACK */}

          <div className="workflow-card">

            <p className="workflow-card__tag">
              Notification
            </p>

            <p className="workflow-card__title">
              Slack — SIP Alert
            </p>

          </div>

        </div>

      </Section>


      {/* ========================================================= */}
      {/* SLACK OUTPUT                                               */}
      {/* ========================================================= */}

      <Section
        label="Final Output"
        title="The decision arrives where it can be acted on."
      >

        <div className="code-panel">

          <p className="code-panel__label">
            Slack — Daily SIP Alert
          </p>

          <p className="code-panel__body mono">
            {`🚨 ETF SIP ALERT

Price: ₹1,396.45
Dip: -16.89%
Trend: DOWN

Action:
Invest 30% of SIP

Time:
18 Mar 2026 · 4:30 PM`}
          </p>

        </div>

      </Section>


      {/* ========================================================= */}
      {/* CAST & TECHNOLOGY                                          */}
      {/* ========================================================= */}

      <Section
        label="Cast & Technology"
        title="Built with"
      >

        <div className="toolkit">

          {CAST_GROUPS.map((group) => (
            <div key={group.category}>

              <p className="toolkit__group-label">
                {group.category}
              </p>

              <div className="cast">

                {group.items.map((item) => (
                  <span
                    className="cast__chip"
                    key={item}
                  >
                    {item}
                  </span>
                ))}

              </div>

            </div>
          ))}

        </div>

      </Section>


      {/* ========================================================= */}
      {/* MY ROLE                                                    */}
      {/* ========================================================= */}

      <Section
        label="My Role"
        title="What I personally did"
      >

        <p className="role-copy">
          Designed and built the automated workflow that
          collects market data, processes market indicators,
          applies predefined SIP allocation rules, and
          delivers the resulting decision through Slack.
          I worked across the scheduling, API integration,
          Google Sheets calculation layer, Zapier decision
          paths, and notification workflow.
        </p>

      </Section>


      {/* ========================================================= */}
      {/* BEHIND THE SCENES                                          */}
      {/* ========================================================= */}

      <Section
        label="Behind The Scenes"
        title="What actually made this hard"
      >

        <div className="challenge-list">

          {CHALLENGES.map((challenge) => (
            <div
              className="challenge"
              key={challenge.n}
            >

              <span className="challenge__n">
                {challenge.n}
              </span>

              <div>

                <p className="challenge__title">
                  {challenge.title}
                </p>

                <p className="challenge__desc">
                  {challenge.desc}
                </p>

              </div>

            </div>
          ))}

        </div>

      </Section>


      {/* ========================================================= */}
      {/* LESSONS                                                    */}
      {/* ========================================================= */}

      <Section
        label="What This Project Taught Me"
        title="Beyond the automation."
        className="section--wide"
      >

        <div className="lesson-grid">

          {LESSONS.map((lesson) => (
            <div
              className="lesson-card"
              key={lesson.title}
            >

              <p className="lesson-card__title">
                {lesson.title}
              </p>

              <p className="lesson-card__desc">
                {lesson.desc}
              </p>

            </div>
          ))}

        </div>

      </Section>


      


      {/* ========================================================= */}
      {/* EPISODE TRANSITION                                         */}
      {/* ========================================================= */}

      <Section
        label="Episode Transition"
        title="From decision automation to workflow automation."
        className="section--wide"
      >

        <div className="transition-grid">

          <div className="transition-card">

            <p className="transition-card__label">
              Previously
            </p>

            <p className="transition-card__ep">
              EP03 — LLM Engineering
            </p>

            <p className="transition-card__line">
              “I moved from experimenting with models
              to engineering around them.”
            </p>

          </div>


          <div className="transition-arrow">
            →
          </div>


          <div className="transition-card transition-card--current">

            <p className="transition-card__label">
              This Episode
            </p>

            <p className="transition-card__ep">
              EP04 — SIP Investment Advisor
            </p>

            <p className="transition-card__line">
              “I applied automation and rule-based
              decision logic to a practical use case.”
            </p>

          </div>


          <div className="transition-arrow">
            →
          </div>


          <div className="transition-card">

            <p className="transition-card__label">
              Next
            </p>

            <p className="transition-card__ep">
              EP05 — AI Support Desk
            </p>

            <p className="transition-card__line">
              “I learned how AI could automate
              a customer-support workflow.”
            </p>

          </div>

        </div>


        <div className="transition-cta">

          <button
            className="btn btn--primary"
            onClick={() => {
              window.location.href =
                "/originals/ai-support-desk";
            }}
          >
            Continue To EP05
          </button>

        </div>

      </Section>

    </div>
  );
}