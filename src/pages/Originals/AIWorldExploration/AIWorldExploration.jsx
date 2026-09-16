import React from "react";
import Navbar from "../../../components/navigation/Navbar";

/* ------------------------------------------------------------------ */
/*  InternFlix — Original: Into The AI World (EP02)                    */
/*  "What did I discover when I first entered the AI/LLM space?"       */
/*                                                                      */
/*  This is the bridge episode between EP01 — The Beginning and        */
/*  EP03 — LLM Engineering. It stays at the level of curiosity and     */
/*  exploration — first contact with LLMs, Groq, Hugging Face, and     */
/*  prompting — and deliberately leaves the deeper engineering         */
/*  concepts (LCEL, chains, structured/Pydantic parsing, embeddings,   */
/*  cosine similarity) to EP03 so the two episodes don't read as       */
/*  duplicates.                                                        */
/*                                                                      */
/*  EDIT ME: "My Role" and "Behind The Scenes" copy is a placeholder   */
/*  built from the brief. Swap in your own words once confirmed, and   */
/*  wire up the Watch section once a real demo/recording exists.       */
/* ------------------------------------------------------------------ */

const EXPLORED = [
  { name: "LLMs", tag: "Foundation" },
  { name: "Groq", tag: "Experiments" },
  { name: "Hugging Face", tag: "Models" },
  { name: "Prompting", tag: "Experiments" },
  { name: "Model APIs", tag: "Integration" },
  { name: "AI Concepts", tag: "Exploration" },
];

const CAST = ["LLMs", "Groq", "Hugging Face", "LangChain"];

const PLAYS = ["LLMs", "Providers", "Prompts", "Experiments"];

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M6 4.5v15l13-7.5-13-7.5Z" />
    </svg>
  );
}

function InfoIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M12 11v5.2" strokeLinecap="round" />
      <circle cx="12" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
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

export default function IntoTheAIWorldPage() {
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

        .hero__image-wrap {
          position: absolute;
          inset: 0 0 0 35%;
          z-index: 0;
          overflow: hidden;
        }

        .hero__image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center center;
          opacity: 0.9;
        }

        .hero-art {
          position: absolute;
          top: 50%;
          right: 4%;
          transform: translateY(-50%);
          width: 38%;
          max-width: 520px;
          color: #fff;
          opacity: 0.12;
          z-index: 1;
          pointer-events: none;
          mix-blend-mode: overlay;
        }

        .hero__scrim {
          position: absolute;
          inset: 0;
          z-index: 2;
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
            linear-gradient(to top, var(--bg) 0%, transparent 35%),
            linear-gradient(to bottom, rgba(5, 5, 5, 0.35) 0%, transparent 25%);
        }

        .hero__content {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 620px;
          margin-left: 0;
        }

        .hero__title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          line-height: 1.05;
          margin: 0 0 1.1rem;
        }

        .hero__meta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          color: var(--text-3);
          font-size: 0.85rem;
          margin-bottom: 1rem;
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

        /* What I Explored */
        .explore-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .explore-card {
          background: var(--surface-2);
          border: 1px solid var(--surface-3);
          border-radius: 6px;
          padding: 1.1rem 1.25rem;
          transition: border-color 0.18s ease, background-color 0.18s ease;
        }
        .explore-card:hover {
          border-color: var(--accent);
          background: #1c0d0e;
        }
        .explore-card__name { font-weight: 700; font-size: 1rem; margin: 0 0 0.3rem; }
        .explore-card__tag { color: var(--text-3); font-size: 0.8rem; margin: 0; }

        /* Cast */
        .cast { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .cast__chip {
          background: var(--surface-2); border: 1px solid var(--surface-3);
          padding: 0.5rem 1rem; border-radius: 20px;
          font-size: 0.85rem; color: var(--text-2);
        }

        /* My role */
        .role-copy { color: var(--text-2); line-height: 1.75; font-size: 1.05rem; margin: 0; }

        /* Behind the scenes */
        .scene-flow {
          display: flex; align-items: center; flex-wrap: wrap; gap: 0.6rem;
        }
        .scene-flow__step {
          background: var(--surface-2); border: 1px solid var(--surface-3);
          border-radius: 20px; padding: 0.55rem 1.1rem;
          font-size: 0.9rem; color: var(--text-2); font-weight: 500;
        }
        .scene-flow__arrow { color: var(--text-3); font-size: 1rem; }

        /* Watch */
        .watch { text-align: center; }
        .watch__frame {
          border: 1px dashed var(--surface-3);
          border-radius: 8px;
          background: var(--surface-2);
          padding: 3.5rem 2rem;
          margin-bottom: 1.5rem;
        }
        .watch__frame p { color: var(--text-3); margin: 0 0 0.4rem; font-size: 0.95rem; }
        .watch__frame p.label { margin-bottom: 0.75rem; }

        /* Tablet */
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
            opacity: 0.72;
          }

          .hero__scrim {
            background:
              linear-gradient(
                90deg,
                var(--bg) 0%,
                rgba(5, 5, 5, 0.82) 42%,
                rgba(5, 5, 5, 0.35) 100%
              ),
              linear-gradient(to top, var(--bg) 0%, transparent 55%);
          }

          .hero__content {
            max-width: 620px;
          }

          .explore-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .hero,
          .section {
            padding-left: 1.1rem;
            padding-right: 1.1rem;
          }

          .hero {
            min-height: 68vh;
            padding-top: 5rem;
            padding-bottom: 2.5rem;
            align-items: flex-end;
          }

          .hero__image-wrap {
            inset: 0;
          }

          .hero__image {
            opacity: 0.62;
            object-position: center center;
          }

          .hero-art {
            display: none;
          }

          .hero__scrim {
            background:
              linear-gradient(
                to bottom,
                rgba(5, 5, 5, 0.18) 0%,
                rgba(5, 5, 5, 0.40) 32%,
                rgba(5, 5, 5, 0.78) 58%,
                rgba(5, 5, 5, 0.96) 78%,
                var(--bg) 100%
              );
          }

          .hero__content {
            width: 100%;
            max-width: 100%;
            margin: 0;
          }

          .hero__meta {
            gap: 0.55rem;
            font-size: 0.72rem;
            line-height: 1.4;
            margin-bottom: 0.7rem;
          }

          .hero__title {
            font-size: clamp(2.1rem, 9.5vw, 3rem);
            line-height: 1.05;
            margin-bottom: 0.85rem;
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

          .explore-grid {
            grid-template-columns: 1fr;
          }

          .section {
            padding-top: 3.5rem;
            padding-bottom: 3.5rem;
          }

          .section-title {
            font-size: 1.55rem;
          }

          .synopsis p,
          .role-copy {
            font-size: 0.98rem;
            line-height: 1.7;
          }

          .scene-flow {
            flex-direction: column;
            align-items: stretch;
          }

          .scene-flow__step {
            text-align: center;
          }

          .scene-flow__arrow {
            text-align: center;
            transform: rotate(90deg);
          }

          .watch__frame {
            padding: 2.5rem 1rem;
          }
        }

        /* Small phones */
        @media (max-width: 480px) {
          .hero {
            min-height: 72vh;
            padding-left: 1rem;
            padding-right: 1rem;
            padding-bottom: 2.25rem;
          }

          .hero__image {
            object-position: 55% center;
          }

          .hero__title {
            font-size: clamp(2rem, 10vw, 2.65rem);
          }

          .hero__tagline {
            font-size: 0.94rem;
          }

          .hero__actions {
            flex-direction: row;
            align-items: stretch;
          }

          .hero__actions .btn {
            flex: 1;
            min-width: 0;
            padding: 0.75rem 0.8rem;
            font-size: 0.86rem;
          }

          .cast {
            gap: 0.45rem;
          }

          .cast__chip {
            font-size: 0.78rem;
            padding: 0.45rem 0.8rem;
          }
        }

        /* Very small phones */
        @media (max-width: 360px) {
          .hero {
            min-height: 78vh;
          }

          .hero__actions {
            flex-direction: column;
          }

          .hero__actions .btn {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project * {
            transition: none !important;
          }
        }

      `}</style>

      {/* Hero */}
      <header className="hero">

        {/* Background image */}
        <div className="hero__image-wrap">
          <img
            src="/images/intoAI.png"
            alt=""
            className="hero__image"
          />
        </div>

        {/* Netflix-style dark gradient */}
        <div className="hero__scrim" aria-hidden="true" />

        {/* Hero content */}
        <div className="hero__content">

          <div className="hero__meta">
            <span>S1 &middot; EP02</span>
            <span>AI &middot; LLMs &middot; EXPLORATION</span>
          </div>

          <h1 className="hero__title">
            Into The AI World
          </h1>

          <p className="hero__tagline">
            &ldquo;The first step into understanding how AI systems actually work.&rdquo;
          </p>

          <div className="hero__actions">
            <button className="btn btn--primary">
              <PlayIcon /> Play Episode
            </button>

            <button className="btn btn--ghost">
              <InfoIcon /> More Info
            </button>
          </div>

        </div>

      </header>

      {/* Synopsis */}
      <Section label="Synopsis" title="What this episode is">
        <div className="synopsis">
          <p>
            An exploration phase focused on understanding LLMs, experimenting with
            different providers, and learning how modern AI applications are built.
          </p>
          <p>
            It's the bridge between the very beginning and the deeper LLM engineering
            that follows — discovery first, architecture later.
          </p>
        </div>
      </Section>

      {/* How It Plays */}
      <Section label="How It Plays" title="The arc of this episode" className="section--wide">
        <div className="plays">
          {PLAYS.map((step, i) => (
            <React.Fragment key={step}>
              <div className="plays__node">
                <span className="plays__dot" />
                <span className="plays__label">{step}</span>
              </div>
              {i < PLAYS.length - 1 && <div className="plays__connector" />}
            </React.Fragment>
          ))}
        </div>
      </Section>

      {/* What I Explored */}
      <Section label="What I Explored" title="Early experiments" className="section--wide">
        <div className="explore-grid">
          {EXPLORED.map((item) => (
            <div className="explore-card" key={item.name}>
              <p className="explore-card__name">{item.name}</p>
              <p className="explore-card__tag">{item.tag}</p>
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
        {/* EDIT ME: replace with your own words once confirmed */}
        <p className="role-copy">
          Self-directed exploration and experimentation with LLM-based systems,
          before moving into deeper engineering.
        </p>
      </Section>

      {/* Behind the scenes */}
      <Section label="Behind The Scenes" title="How it unfolded">
        {/* EDIT ME: replace with your own words once confirmed */}
        <div className="scene-flow">
          <span className="scene-flow__step">Small experiments</span>
          <span className="scene-flow__arrow">&rarr;</span>
          <span className="scene-flow__step">Testing models</span>
          <span className="scene-flow__arrow">&rarr;</span>
          <span className="scene-flow__step">Understanding prompts</span>
          <span className="scene-flow__arrow">&rarr;</span>
          <span className="scene-flow__step">Learning how the pieces fit together</span>
        </div>
      </Section>

      {/* Watch */}
      <Section label="Watch" title="See it in action">
        <div className="watch">
          <div className="watch__frame">
            <p className="label" style={{ color: "var(--text-3)" }}>Project Walkthrough</p>
            <p>No recorded demo added yet — swap this frame for a video, live embed, or screenshots.</p>
          </div>
          <button className="btn btn--ghost">
            <PlayIcon /> Play Demo
          </button>
        </div>
      </Section>
    </div>
  );
}