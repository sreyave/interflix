import React from "react";
import Navbar from "../../components/navigation/Navbar";
/* ------------------------------------------------------------------ */
/*  InternFlix — What's Next (Season 2)                                */
/*  Route: /whats-next                                                 */
/*                                                                      */
/*  EDIT ME: the closing "Next Episode" title ("Full-Time Engineer")   */
/*  is a placeholder — swap it for wording that matches your actual    */
/*  professional goal.                                                 */
/* ------------------------------------------------------------------ */

const PROGRESSION = [
  "More Ownership",
  "Stronger System Design",
  "Production-Ready Engineering",
  "End-to-End Delivery",
  "Technical Leadership",
];

function ArrowDown() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" className="arrow" aria-hidden="true">
      <path d="M10 2v13M10 15l-5-5M10 15l5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M6 4.5v15l13-7.5-13-7.5Z" />
    </svg>
  );
}

function LoadingBar() {
  return (
    <div
      className="loading-bar"
      role="progressbar"
      aria-label="Season 2 loading"
      aria-valuenow={72}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span style={{ width: "72%" }} />
    </div>
  );
}

export default function WhatsNextPage() {
  return (
    <div className="next">
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

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
        .next * { box-sizing: border-box; }
        .next {
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          min-height: 100vh;
        }
        .next :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

        .label {
          font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--text-2); font-weight: 600; margin: 0 0 0.75rem;
        }
        .label--accent { color: var(--accent); }

        /* Header */
        .next__header {
          padding: 6rem 3rem 3rem;
          max-width: 720px;
          background: radial-gradient(90% 100% at 15% 0%, #1a1010 0%, var(--bg) 60%);
        }
        .next__title {
          font-size: clamp(2rem, 4.4vw, 3.25rem);
          font-weight: 800; margin: 0 0 0.85rem; letter-spacing: -0.01em;
        }
        .next__subtitle { color: var(--text-2); font-size: 1.05rem; line-height: 1.6; margin: 0 0 1.4rem; }
        .next__body { color: var(--text-2); line-height: 1.7; font-size: 1rem; max-width: 620px; margin: 0; }

        /* Progression */
        .progression {
          padding: 1rem 3rem 4.5rem;
          max-width: 640px;
          display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
        }
        .progression__step {
          width: 100%;
          background: var(--surface-2);
          border: 1px solid var(--surface-3);
          border-radius: 6px;
          padding: 1rem 1.4rem;
          text-align: center;
          font-weight: 600;
          font-size: 1rem;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }
        .progression__step--last {
          border-color: var(--accent);
          background: #1c0d0e;
          color: var(--text);
        }
        .arrow { color: var(--text-3); }

        /* Loading card */
        .loading-section {
          padding: 1rem 3rem 6rem;
          max-width: 640px;
          margin: 0 auto;
        }
        .loading-card {
          border: 1px solid var(--surface-3);
          background: linear-gradient(155deg, #150c0d, var(--surface));
          border-radius: 10px;
          padding: 2.75rem 2.5rem;
          text-align: center;
        }
        .loading-card__status {
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          margin: 0 0 1.25rem;
        }
        .loading-bar {
          height: 4px;
          background: var(--surface-3);
          border-radius: 2px;
          overflow: hidden;
          margin: 0 auto 2rem;
        }
        .loading-bar span {
          display: block;
          height: 100%;
          background: var(--accent);
          transition: width 0.5s ease;
        }

        .next-episode {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background: var(--surface-2);
          border: 1px solid var(--surface-3);
          border-radius: 8px;
          padding: 1.1rem 1.3rem;
          text-align: left;
        }
        .next-episode__thumb {
          flex: 0 0 84px;
          height: 60px;
          border-radius: 5px;
          background: var(--surface-3);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-2);
        }
        .next-episode__meta { flex: 1; min-width: 0; }
        .next-episode__label { color: var(--text-3); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 0.25rem; }
        .next-episode__title { font-size: 1.1rem; font-weight: 700; margin: 0; }

        /* Footer */
        .next__footer {
          border-top: 1px solid var(--surface-2);
          padding: 3.5rem 3rem 4.5rem;
          text-align: center;
        }
        .next__footer p { color: var(--text-3); font-size: 0.9rem; margin: 0; max-width: 480px; margin: 0 auto; }

        @media (max-width: 1199px) {
          .next__header, .progression, .loading-section, .next__footer { padding-left: 2rem; padding-right: 2rem; }
        }
        @media (max-width: 767px) {
          .next__header, .progression, .loading-section, .next__footer { padding-left: 1.1rem; padding-right: 1.1rem; }
          .next__header { padding-top: 5rem; }
          .loading-card { padding: 2rem 1.5rem; }
          .next-episode { flex-direction: column; align-items: flex-start; text-align: left; }
          .next-episode__thumb { width: 84px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .next * { transition: none !important; }
        }
      `}</style>

      <header className="next__header">
        <p className="label label--accent">Season 2</p>
        <h1 className="next__title">The next chapter is loading.</h1>
        <p className="next__body">
          Season 1 was learning, building, debugging, and delivering for a client.
          Season 2 continues the same story with more weight behind it — from
          contributing to a system to owning one, end to end.
        </p>
      </header>

      <div className="progression">
        {PROGRESSION.map((step, i) => (
          <React.Fragment key={step}>
            <div className={`progression__step ${i === PROGRESSION.length - 1 ? "progression__step--last" : ""}`}>
              {step}
            </div>
            {i < PROGRESSION.length - 1 && <ArrowDown />}
          </React.Fragment>
        ))}
      </div>

      <div className="loading-section">
        <div className="loading-card">
          <p className="loading-card__status">Season 2: Loading&hellip;</p>
          <LoadingBar />
          <div className="next-episode">
            <div className="next-episode__thumb">
              <PlayIcon />
            </div>
            <div className="next-episode__meta">
              <p className="next-episode__label">Next Episode</p>
              <p className="next-episode__title">Full-Time Engineer</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="next__footer">
        <p>Season 1 was the internship. Season 2 is what comes next.</p>
      </footer>
    </div>
  );
}