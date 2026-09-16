import React from "react";
import Navbar from "../../../components/navigation/Navbar";

/* ------------------------------------------------------------------ */
/*  InternFlix — Original: Trend Intelligence                          */
/*  Flagship project detail page, following the standard Original      */
/*  page architecture: Hero → Synopsis → How It Plays →                */
/*  Behind The System → Cast & Technology → My Role →                  */
/*  Behind The Scenes → Watch.                                         */
/*                                                                      */
/*  Content below reflects the actual Digital Trust Trend Intelligence */
/*  pipeline: Apify collection from LinkedIn/Reddit, normalization,    */
/*  dedup, relevance filtering, PostgreSQL storage, multi-dimension    */
/*  scoring, embeddings/clustering, OpenAI analysis, ReportLab PDF     */
/*  delivery, and a Telegram RAG-style Q&A interface.                  */
/*                                                                      */
/*  "My Role" reflects verified, specific contributions. Update the    */
/*  Watch section with real media/links before publishing.             */
/* ------------------------------------------------------------------ */

const PIPELINE = [
  "LinkedIn / Reddit",
  "Apify Collection",
  "Normalization + Deduplication",
  "Relevance Filtering",
  "PostgreSQL Storage",
  "Scoring & Ranking",
  "Embeddings + Clustering",
  "AI Analysis",
  "PDF Report / Telegram Q&A",
];

const ARCHITECTURE = [
  { layer: "Data Collection", detail: "Apify actors scrape LinkedIn and Reddit posts + comments" },
  { layer: "Processing", detail: "Normalization to a common schema, deduplication, and Digital Trust/GRC relevance filtering" },
  { layer: "API", detail: "FastAPI backend orchestrating scoring, ranking, and report requests" },
  { layer: "Database", detail: "PostgreSQL IntelligenceItem store, plus Redis for caching" },
  { layer: "Scoring Engine", detail: "Strategic, engagement, trust, confidence, freshness, trending, and combined scores per item" },
  { layer: "AI / Processing", detail: "OpenAI embeddings for semantic clustering, GPT for analyst-grade theme and trend analysis" },
  { layer: "Delivery", detail: "ReportLab executive PDF reports and a Telegram bot for grounded, RAG-style Q&A" },
  { layer: "Deployment", detail: "Docker Compose services on an AWS EC2 Ubuntu server" },
];

const CAST = [
  "Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Redis", "Apify",
  "OpenAI Embeddings", "OpenAI GPT", "ReportLab", "Telegram Bot API", "Docker",
];

const ROLE = [
  "Built scoring_service.py — four scores per ingested item (rule-based hotness and trust, plus GPT-based business relevance and sensitivity), with the two GPT scores combined into a single API call to cut OpenAI costs.",
  "Cut OpenAI API usage aggressively across the pipeline, batching calls down from roughly 11 to 3 per run.",
  "Implemented null-safe scoring logic with per-item exception handling and rollback, so a single bad record can't take down a scoring run.",
  "Wrote normalize_id() to regex-match LinkedIn's inconsistent URN formats so comments reliably link back to the right post.",
  "Replaced surface-level post summaries with analyst-grade intelligence fields — strategic_signal, why_it_matters, business_impact, future_implication, confidence_level — used throughout the report.",
  "Built the ReportLab PDF renderer: an eight-section executive report with a navy/teal palette and custom flowables, plus a separate Unicode/symbol-cleaning layer for LinkedIn's special characters that leaves the source JSON untouched.",
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
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
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
      strokeWidth="2"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <circle cx="12" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}



function Section({ id, label, title, children, className = "" }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="section__inner">
        <p className="label label--accent">{label}</p>
        {title && <h2 className="section-title">{title}</h2>}
        {children}
      </div>
    </section>
  );
}

export default function TrendIntelligencePage() {
  return (
    <div className="project">
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
        .project * { box-sizing: border-box; }
        .project {
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          min-height: 100vh;
        }
        .project :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

        .label {
          font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--text-2); font-weight: 600; margin: 0 0 0.75rem;
        }
        .label--accent { color: var(--accent); }

        .btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          border: none; border-radius: 4px; padding: 0.8rem 1.6rem;
          font-size: 0.95rem; font-weight: 600; cursor: pointer;
          font-family: inherit; transition: background-color 0.15s ease;
        }
        .btn--primary { background: var(--accent); color: #fff; }
        .btn--primary:hover { background: #c40812; }
        .btn--ghost { background: var(--surface-3); color: var(--text); }
        .btn--ghost:hover { background: #2c2c2c; }

        .section { padding: 4rem 3rem; border-top: 1px solid var(--surface-2); }
        .section__inner { max-width: 860px; margin: 0 auto; }
        .section-title {
          font-size: clamp(1.5rem, 2.6vw, 2rem);
          font-weight: 700; margin: 0 0 1.25rem;
        }
        .section--wide .section__inner { max-width: 1100px; }

        /* Hero */
        .hero {
          position: relative;
          min-height: 78vh;
          display: flex;
          align-items: flex-end;
          padding: 6rem 3rem 3.5rem;
          overflow: hidden;
          background: var(--bg);
        }

        /* Background image */
        .hero__image-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          opacity: 0.9;
          display: block;
        }

        /* Netflix-style gradient */
        .hero__scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
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

        /* Hero content */
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
        /* Synopsis */
        .synopsis p { color: var(--text-2); line-height: 1.75; font-size: 1.05rem; margin: 0 0 1.1rem; }
        .synopsis p:last-child { margin-bottom: 0; }

        /* How it plays */
        .flow {
          display: flex; flex-direction: column; align-items: center;
          gap: 0.4rem;
        }
        .flow__step {
          width: 100%; max-width: 420px;
          background: var(--surface-2);
          border: 1px solid var(--surface-3);
          border-radius: 6px;
          padding: 0.85rem 1.25rem;
          text-align: center;
          font-weight: 600;
          font-size: 0.95rem;
        }
        .flow__step--accent { border-color: var(--accent); color: var(--text); background: #1c0d0e; }
        .arrow { color: var(--text-3); }

        /* Architecture */
        .arch {
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        .arch__row {
          display: flex; align-items: center; gap: 1.25rem;
          background: var(--surface-2); border: 1px solid var(--surface-3);
          border-radius: 6px; padding: 1rem 1.4rem;
        }
        .arch__layer {
          flex: 0 0 160px; font-weight: 700; font-size: 0.9rem;
          text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent);
        }
        .arch__detail { color: var(--text-2); font-size: 0.92rem; }

        /* Cast */
        .cast { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .cast__chip {
          background: var(--surface-2); border: 1px solid var(--surface-3);
          padding: 0.5rem 1rem; border-radius: 20px;
          font-size: 0.85rem; color: var(--text-2);
        }

        /* My role */
        .role-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.9rem; }
        .role-list li {
          position: relative; padding-left: 1.4rem;
          color: var(--text-2); line-height: 1.6; font-size: 1rem;
        }
        .role-list li::before {
          content: ""; position: absolute; left: 0; top: 0.55rem;
          width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
        }

        /* Behind the scenes */
        .scene-card {
          background: var(--surface-2); border: 1px solid var(--surface-3);
          border-radius: 8px; padding: 1.75rem 2rem;
        }
        .scene-card h3 { margin: 0 0 1.25rem; font-size: 1.1rem; }
        .scene-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem 2rem;
        }
        .scene-item .label { color: var(--text-3); margin-bottom: 0.35rem; }
        .scene-item p { margin: 0; color: var(--text-2); line-height: 1.6; font-size: 0.95rem; }

        /* Watch */
        .watch {
          text-align: center;
        }
        .watch__frame {
          border: 1px dashed var(--surface-3);
          border-radius: 8px;
          background: var(--surface-2);
          padding: 3.5rem 2rem;
          margin-bottom: 1.5rem;
        }
        .watch__frame p { color: var(--text-3); margin: 0 0 0.4rem; font-size: 0.95rem; }
        .watch__frame p.label { margin-bottom: 0.75rem; }

        @media (max-width: 767px) {
        .hero,
        .section {
          padding-left: 1.1rem;
          padding-right: 1.1rem;
        }

        .hero {
          min-height: 58vh;
          padding-top: 5rem;
        }

        .hero__image-wrap {
          inset: 0;
        }

        .hero__scrim {
          background:
            linear-gradient(
              180deg,
              rgba(5, 5, 5, 0.45) 0%,
              rgba(5, 5, 5, 0.78) 55%,
              #050505 100%
            );
        }

        .hero__content {
          margin-left: 0;
          max-width: 100%;
        }

        .hero__actions {
          gap: 0.7rem;
        }

        /* keep your existing mobile rules below */
        .arch__row {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.4rem;
        }

        .arch__layer {
          flex: none;
        }

        .scene-grid {
          grid-template-columns: 1fr;
        }
      }
      `}</style>

      {/* Hero */}
      <header className="hero">

      <div className="hero__image-wrap">
        <img
          src="/images/trend.png"
          alt=""
          className="hero__image"
        />
      </div>

      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__content">
        <div className="hero__meta">
          <span>S1 &middot; EP07</span>
          <span>AI &middot; DATA &middot; CLIENT ENGAGEMENT</span>
        </div>

        <h1 className="hero__title">
          Trend Intelligence
        </h1>

        <p className="hero__tagline">
          &ldquo;Turning cybersecurity chatter into board-ready Digital Trust intelligence.&rdquo;
        </p>

        <div className="hero__actions">
          <button className="btn btn--primary">
            <PlayIcon /> Watch Demo
          </button>

          <button className="btn btn--ghost">
            <InfoIcon /> More Info
          </button>
        </div>
      </div>

    </header>

      {/* Synopsis */}
      <Section label="Synopsis" title="What this project is">
        <div className="synopsis">
          <p>
            A client team needed a faster way to understand what CISOs, GRC
            leaders, and the wider security community were actually saying
            about cyber governance, NIS2, DORA, and AI governance — instead
            of reading posts and comments on LinkedIn and Reddit one at a time.
          </p>
          <p>
            Trend Intelligence is an end-to-end pipeline that collects posts
            and comments from LinkedIn and Reddit, filters them for genuine
            Digital Trust and cybersecurity relevance, scores and ranks them,
            clusters related posts into themes, and uses AI analysis to turn
            that raw signal into a structured, executive-grade report.
          </p>
          <p>
            The output reaches the client as a polished PDF report and as a
            conversational Telegram interface, where questions are answered
            using retrieval-augmented generation grounded in the collected
            intelligence rather than general model knowledge.
          </p>
        </div>
      </Section>

      {/* How it plays */}
      <Section id="how-it-plays" label="How It Plays" title="End-to-end flow" className="section--wide">
        <div className="flow">
          {PIPELINE.map((step, i) => (
            <React.Fragment key={step}>
              <div className={`flow__step ${i === PIPELINE.length - 1 ? "flow__step--accent" : ""}`}>{step}</div>
              {i < PIPELINE.length - 1 && <ArrowDown />}
            </React.Fragment>
          ))}
        </div>
      </Section>

      {/* Behind the system */}
      <Section label="Behind The System" title="Architecture" className="section--wide">
        <div className="arch">
          {ARCHITECTURE.map((row) => (
            <div className="arch__row" key={row.layer}>
              <span className="arch__layer">{row.layer}</span>
              <span className="arch__detail">{row.detail}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Cast & technology */}
      <Section label="Cast &amp; Technology" title="Built with">
        <div className="cast">
          {CAST.map((tech) => (
            <span className="cast__chip" key={tech}>{tech}</span>
          ))}
        </div>
      </Section>

      {/* My role */}
      <Section label="My Role" title="What I personally did">
        <ul className="role-list">
          {ROLE.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </Section>

      {/* Behind the scenes */}
      <Section label="Behind The Scenes" title="The comment-matching bug">
        <div className="scene-card">
          <div className="scene-grid">
            <div className="scene-item">
              <p className="label">Problem</p>
              <p>Only a subset of posts had comments attached — LinkedIn's URN formats weren't matching consistently.</p>
            </div>
            <div className="scene-item">
              <p className="label">Investigation</p>
              <p>Traced comment IDs through the pipeline and found inconsistent LinkedIn URN formats breaking the match.</p>
            </div>
            <div className="scene-item">
              <p className="label">Fix</p>
              <p>Wrote normalize_id() to regex-normalize the ID formats before matching comments to posts.</p>
            </div>
            <div className="scene-item">
              <p className="label">Learning</p>
              <p>Source data assumptions need to be validated at pipeline boundaries, not trusted as given.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Watch */}
      <Section label="Watch" title="See it in action">
        <div className="watch">
          <div className="watch__frame">
            <p className="label" style={{ color: "var(--text-3)" }}>Project Walkthrough</p>
            <p>No recorded demo added yet — swap this frame for a video, live embed, or screenshots.</p>
          </div>
          {/* EDIT ME: use "Watch Live" + real URL if deployed, or "Play Demo" +
              recorded video if not. Label recreated/inactive demos clearly,
              e.g. "Recreated Demo" or "Recorded Demonstration". */}
          <button className="btn btn--ghost">
            <PlayIcon /> Play Demo
          </button>
        </div>
      </Section>
    </div>
  );
}