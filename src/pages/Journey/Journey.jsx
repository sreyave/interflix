import React from "react";
import Navbar from "../../components/navigation/Navbar";

/* ------------------------------------------------------------------ */
/*  InternFlix — Journey (Season 1)                                    */
/*  Chronological timeline of the internship, EP01–EP08.               */
/*  Route: /journey                                                    */
/*                                                                      */
/*  EDIT ME: dates/periods for EP02–EP08 are left as placeholders —    */
/*  only EP01's date (24 Feb 2026) was given in the brief. Fill in     */
/*  real periods once you have them.                                   */
/* ------------------------------------------------------------------ */

const EPISODES = [
  {
    ep: "EP01",
    title: "The Beginning",
    date: "24 Feb 2026",
    summary:
      "Internship begins. Initial exploration and getting oriented in the engineering environment.",
    projects: [],
    turningPoint: false,
  },
  {
    ep: "EP02",
    title: "Into The AI World",
    date: "Early on",
    summary:
      "First look at LLMs and AI agents — experimenting with Zapier and n8n to understand how AI can be connected to real workflows.",
    projects: [{ id: "llm-agent-exploration", name: "LLM Agent Exploration" }],
    turningPoint: false,
  },
  {
    ep: "EP03",
    title: "First Automations",
    date: "Building on EP02",
    summary:
      "Moving from experiments to practical AI automations — decision support and Slack-based workflows covering issue classification, sentiment, and severity detection.",
    projects: [
      { id: "sip-investment-advisor", name: "SIP Investment Advisor" },
      { id: "workplace-ai-assistant", name: "Workplace AI Assistant" },
    ],
    turningPoint: false,
  },
  {
    ep: "EP04",
    title: "Working With A Senior",
    date: "Mid-internship",
    summary:
      "Collaborating with a senior engineer on an existing client project — contributing to the frontend and learning engineering practices through pairing and review.",
    projects: [{ id: "client-frontend", name: "Client Frontend Contribution" }],
    turningPoint: false,
  },
  {
    ep: "EP05",
    title: "Rooftop AI",
    date: "Mid-internship",
    summary:
      "Applying AI to a product-focused use case — an assistant for rooftop and roofing solutions covering requirement estimation and solution recommendations.",
    projects: [{ id: "rooftop-ai", name: "Rooftop AI" }],
    turningPoint: false,
  },
  {
    ep: "EP06",
    title: "The Client Interview",
    date: "Turning point",
    summary:
      "First client interview. Technical communication and understanding real requirements — the moment that led to selection for the client engagement.",
    projects: [],
    turningPoint: true,
  },
  {
    ep: "EP07",
    title: "Trend Intelligence",
    date: "Client engagement",
    summary:
      "The flagship project: collecting and ranking social signal from LinkedIn and Reddit, clustering it with embeddings, and turning it into a client-facing intelligence report.",
    projects: [{ id: "trend-intelligence", name: "Trend Intelligence" }],
    turningPoint: false,
    flagship: true,
  },
  {
    ep: "EP08",
    title: "What's Next",
    date: "Looking ahead",
    summary:
      "Learning, building, debugging and client delivery become the foundation for what comes next: ownership, design, build, deploy, lead.",
    projects: [],
    turningPoint: false,
  },
];

function ProjectChip({ id, name }) {
  return (
    <button
      className="chip"
      onClick={() => {
        window.location.href = `/originals/${id}`;
      }}
    >
      {name}
    </button>
  );
}

function EpisodeRow({ episode, index }) {
  return (
    <li className={`ep ${episode.flagship ? "ep--flagship" : ""} ${episode.turningPoint ? "ep--turning" : ""}`}>
      <div className="ep__rail">
        <span className="ep__dot" />
        {index < EPISODES.length - 1 && <span className="ep__line" />}
      </div>
      <div className="ep__card">
        <p className="label label--accent">{episode.ep}{episode.turningPoint ? " \u00B7 Turning Point" : ""}{episode.flagship ? " \u00B7 Flagship" : ""}</p>
        <div className="ep__heading">
          <h2 className="ep__title">{episode.title}</h2>
          <span className="ep__date">{episode.date}</span>
        </div>
        <p className="ep__summary">{episode.summary}</p>
        {episode.projects.length > 0 && (
          <div className="ep__projects">
            {episode.projects.map((p) => (
              <ProjectChip key={p.id} id={p.id} name={p.name} />
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export default function JourneyPage() {
  return (
    <div className="journey">
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
        .journey * { box-sizing: border-box; }
        .journey {
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          min-height: 100vh;
        }
        .journey :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

        .label {
          font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--text-2); font-weight: 600; margin: 0 0 0.6rem;
        }
        .label--accent { color: var(--accent); }

        .journey__header {
          padding: 6rem 3rem 3rem;
          max-width: 720px;
          background: radial-gradient(90% 100% at 15% 0%, #1a1010 0%, var(--bg) 60%);
        }
        .journey__eyebrow { color: var(--text-3); font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 0.75rem; }
        .journey__title {
          font-size: clamp(2rem, 4.4vw, 3.25rem);
          font-weight: 800; margin: 0 0 0.85rem; letter-spacing: -0.01em;
        }
        .journey__subtitle { color: var(--text-2); font-size: 1.05rem; line-height: 1.6; margin: 0; }

        .timeline {
          list-style: none;
          margin: 0;
          padding: 1rem 3rem 5rem;
          max-width: 860px;
        }
        .ep { display: flex; gap: 1.5rem; }
        .ep__rail { display: flex; flex-direction: column; align-items: center; width: 20px; flex-shrink: 0; }
        .ep__dot {
          width: 14px; height: 14px; border-radius: 50%;
          background: var(--surface-3); border: 2px solid var(--text-3);
          margin-top: 0.4rem; flex-shrink: 0;
        }
        .ep--turning .ep__dot, .ep--flagship .ep__dot {
          background: var(--accent); border-color: var(--accent);
        }
        .ep__line { flex: 1; width: 2px; background: var(--surface-3); margin: 0.35rem 0; }
        .ep__card { flex: 1; padding-bottom: 3rem; }
        .ep__heading {
          display: flex; align-items: baseline; justify-content: space-between;
          gap: 1rem; flex-wrap: wrap; margin-bottom: 0.6rem;
        }
        .ep__title { font-size: clamp(1.2rem, 2vw, 1.5rem); font-weight: 700; margin: 0; }
        .ep__date { color: var(--text-3); font-size: 0.85rem; white-space: nowrap; }
        .ep__summary { color: var(--text-2); line-height: 1.65; font-size: 1rem; max-width: 600px; margin: 0 0 1rem; }
        .ep__projects { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .chip {
          background: var(--surface-2); border: 1px solid var(--surface-3);
          padding: 0.4rem 0.9rem; border-radius: 20px;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.8rem; color: var(--text-2);
        }
        .ep--flagship .chip {
          border-color: var(--accent); color: var(--text);
          background: #1c0d0e;
        }
        .ep--flagship .ep__title { color: var(--text); }

        .journey__footer {
          border-top: 1px solid var(--surface-2);
          padding: 4rem 3rem 5rem;
          text-align: center;
        }
        .journey__footer p.label { justify-content: center; display: block; }
        .journey__footer h2 { font-size: clamp(1.4rem, 2.6vw, 1.9rem); font-weight: 700; margin: 0 0 0.75rem; }
        .journey__footer p { color: var(--text-2); max-width: 520px; margin: 0 auto 1.75rem; line-height: 1.6; }
        .btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          border: none; border-radius: 4px; padding: 0.8rem 1.6rem;
          font-size: 0.95rem; font-weight: 600; cursor: pointer;
          font-family: inherit; background: var(--accent); color: #fff;
          transition: background-color 0.15s ease;
        }
        .btn:hover { background: #c40812; }

        @media (max-width: 1199px) {
          .journey__header, .timeline, .journey__footer { padding-left: 2rem; padding-right: 2rem; }
        }
        @media (max-width: 767px) {
          .journey__header, .timeline, .journey__footer { padding-left: 1.1rem; padding-right: 1.1rem; }
          .journey__header { padding-top: 5rem; }
          .ep { gap: 1rem; }
          .ep__heading { flex-direction: column; align-items: flex-start; gap: 0.2rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .journey * { transition: none !important; }
        }
      `}</style>

      <header className="journey__header">
        <p className="journey__eyebrow">Internflix</p>
        <h1 className="journey__title">Season 1</h1>
        <p className="journey__subtitle">From first experiments to real client impact.</p>
      </header>

      <ol className="timeline">
        {EPISODES.map((episode, i) => (
          <EpisodeRow key={episode.ep} episode={episode} index={i} />
        ))}
      </ol>

      <footer className="journey__footer">
        <p className="label label--accent">Season 2</p>
        <h2>The next chapter is loading.</h2>
        <p>Season 1 was the internship. Season 2 is what comes next.</p>
        <button
          className="btn"
          onClick={() => {
            window.location.href = "/whats-next";
          }}
        >
          Explore What&rsquo;s Next
        </button>
      </footer>
    </div>
  );
}