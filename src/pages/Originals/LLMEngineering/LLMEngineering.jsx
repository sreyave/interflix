import React from "react";
import Navbar from "../../../components/navigation/Navbar";

/* ------------------------------------------------------------------ */
/*  InternFlix — Original: LLM Engineering (EP03)                      */
/*  "I learned how to build systems around them."                      */
/*                                                                      */
/*  The technical turning point of Season 1: EP02 was about            */
/*  discovering AI, EP03 is about learning to build with it.           */
/*  Arc: Explore → Understand → Engineer → Apply.                      */
/*                                                                      */
/*  Section order: Hero → Synopsis → How It Plays (conceptual) →       */
/*  Engineering Experiments (actual patterns coded) → Code Lab         */
/*  (real snippets) → What Changed (before/after) → Cast & Technology  */
/*  → My Role → Behind The Scenes → Episode Transition → Watch.        */
/*                                                                      */
/*  EDIT ME: "Behind The Scenes" and the Watch panel are still         */
/*  placeholder wording. Swap the Code Lab snippets for your real      */
/*  code/screenshots, and swap the Watch reel for an actual recording  */
/*  once one exists.                                                   */
/* ------------------------------------------------------------------ */

const PLAYS = [
  "Prompts",
  "Structured Output",
  "Chains",
  "LCEL",
  "Embeddings",
  "Similarity Search",
];

const EXPERIMENTS = [
  {
    title: "Prompt → Model",
    steps: ["PromptTemplate", "LLM", "Response"],
  },
  {
    title: "Structured Output",
    steps: ["Prompt", "LLM", "Pydantic Parser", "Structured Data"],
  },
  {
    title: "Sequential Chain",
    steps: ["Input", "Detailed Report", "Summary"],
  },
  {
    title: "Parallel Chain",
    steps: ["Input", "Notes / Quiz / Combined Output"],
    branch: true,
  },
  {
    title: "Embedding Retrieval",
    steps: ["Documents", "Embeddings", "Vector Representation", "Cosine Similarity", "Relevant Document"],
  },
];

const TOOLKIT = [
  { category: "Framework", items: ["LangChain"] },
  { category: "LLM Interaction", items: ["Groq", "Hugging Face"] },
  { category: "Application Building", items: ["Prompt Templates", "Chains", "LCEL", "RunnableParallel"] },
  { category: "Data & Retrieval", items: ["Embeddings", "Cosine Similarity"] },
];

const CODE_SNIPPETS = [
  {
    title: "PromptTemplate",
    code: `prompt = PromptTemplate(
    template="...",
    input_variables=["topic"]
)`,
  },
  {
    title: "RunnableParallel",
    code: `{
  "notes": notes_chain,
  "quiz": quiz_chain
}`,
  },
  {
    title: "Embeddings",
    code: `embedding = OpenAIEmbeddings(...)
vector = embedding.embed_query(query)`,
  },
];

const SCENE_LOOP = [
  "Concept",
  "Write a small experiment",
  "Run it",
  "Observe output",
  "Understand the pattern",
  "Try the next concept",
];

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

function ArrowDown() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" className="arrow" aria-hidden="true">
      <path d="M10 2v13M10 15l-5-5M10 15l5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CircuitArt() {
  return (
    <svg viewBox="0 0 200 140" className="hero-art" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="24" y="20" width="30" height="20" rx="2" />
        <rect x="88" y="20" width="30" height="20" rx="2" />
        <rect x="152" y="20" width="30" height="20" rx="2" />
        <rect x="56" y="76" width="30" height="20" rx="2" />
        <rect x="120" y="76" width="30" height="20" rx="2" />
        <path d="M54 30 H88 M118 30 H152" />
        <path d="M39 40 V60 H71 V76 M103 40 V60 H135 V76" opacity="0.6" />
        <circle cx="39" cy="30" r="2" fill="currentColor" stroke="none" />
        <circle cx="103" cy="30" r="2" fill="currentColor" stroke="none" />
        <circle cx="167" cy="30" r="2" fill="currentColor" stroke="none" />
        <circle cx="71" cy="86" r="2" fill="currentColor" stroke="none" />
        <circle cx="135" cy="86" r="2" fill="currentColor" stroke="none" />
      </g>
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

export default function LLMEngineeringPage() {
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
        .project * { box-sizing: border-box; }
        .project {
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          min-height: 100vh;
        }
        .project :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
        .mono { font-family: 'JetBrains Mono', 'SFMono-Regular', Menlo, monospace; }

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
          inset: 0 0 0 35%;
          z-index: 0;
        }

        .hero__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0.9;
        }

        /* Circuit graphic */
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
          mix-blend-mode: overlay;
        }

        /* Netflix-style dark gradient */
        .hero__scrim {
          position: absolute;
          inset: 0;
          z-index: 2;

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
        }

        .hero__meta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          color: var(--text-3);
          font-size: 0.85rem;
          margin-bottom: 1rem;
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

        /* How it plays / From Prompts to Retrieval — vertical flow */
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
        .flow__note {
          text-align: center; color: var(--text-2); font-size: 1rem;
          line-height: 1.7; max-width: 560px; margin: 1.5rem auto 0; font-style: italic;
        }

        /* Engineering Experiments */
        .exp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .exp-card {
          background: var(--surface-2);
          border: 1px solid var(--surface-3);
          border-radius: 8px;
          padding: 1.4rem 1.5rem;
          transition: border-color 0.18s ease;
        }
        .exp-card:hover { border-color: var(--accent); }
        .exp-card__title {
          font-weight: 700; font-size: 1rem; margin: 0 0 0.9rem; color: var(--text);
        }
        .exp-card__pipeline {
          display: flex; flex-direction: column; align-items: center; gap: 0.35rem;
        }
        .exp-card__node {
          font-size: 0.82rem; color: var(--text-2);
          background: var(--surface); border: 1px solid var(--surface-3);
          border-radius: 4px; padding: 0.4rem 0.8rem; text-align: center;
        }
        .exp-card__arrow { color: var(--text-3); font-size: 0.85rem; }
        .exp-card__branch {
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          flex-wrap: wrap;
        }

        /* Code Lab */
        .code-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .code-card {
          background: var(--surface); border: 1px solid var(--surface-3);
          border-radius: 8px; padding: 1.1rem 1.25rem;
        }
        .code-card__title {
          color: var(--text-3); font-size: 0.78rem; letter-spacing: 0.04em;
          margin: 0 0 0.75rem; padding-bottom: 0.6rem;
          border-bottom: 1px solid var(--surface-3);
        }
        .code-card__body {
          color: var(--text-2); font-size: 0.82rem; line-height: 1.7;
          margin: 0; white-space: pre-wrap; word-break: break-word;
        }

        /* What Changed */
        .changed-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;
          margin-bottom: 1.5rem;
        }
        .changed-card__label {
          text-align: center; color: var(--text-3); font-size: 0.75rem;
          font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          margin: 0 0 1rem;
        }

        /* Cast & Technology — categorized */
        .toolkit { display: flex; flex-direction: column; gap: 1.4rem; }
        .toolkit__group-label {
          color: var(--text-3); font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 0.6rem;
        }
        .cast { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .cast__chip {
          background: var(--surface-2); border: 1px solid var(--surface-3);
          padding: 0.5rem 1rem; border-radius: 20px;
          font-size: 0.85rem; color: var(--text-2);
        }

        /* My role */
        .role-copy { color: var(--text-2); line-height: 1.75; font-size: 1.05rem; margin: 0; }

        /* Behind the scenes */
        .scene-loop {
          display: flex; align-items: center; flex-wrap: wrap; gap: 0.6rem;
          justify-content: center; margin-bottom: 1.75rem;
        }
        .scene-loop__step {
          background: var(--surface-2); border: 1px solid var(--surface-3);
          border-radius: 20px; padding: 0.55rem 1.1rem;
          font-size: 0.88rem; color: var(--text-2); font-weight: 500;
        }
        .scene-loop__arrow { color: var(--text-3); font-size: 1rem; }
        .scene-quote {
          color: var(--text-2); line-height: 1.75; font-size: 1.02rem;
          margin: 0; font-style: italic;
        }

        /* Episode Transition */
        .transition-grid {
          display: grid; grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center; gap: 1rem;
        }
        .transition-card {
          background: var(--surface-2); border: 1px solid var(--surface-3);
          border-radius: 8px; padding: 1.4rem 1.3rem;
        }
        .transition-card--current { border-color: var(--accent); background: #1c0d0e; }
        .transition-card__label {
          color: var(--text-3); font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 0.5rem;
        }
        .transition-card__ep { font-weight: 700; font-size: 0.98rem; margin: 0 0 0.5rem; }
        .transition-card__line { color: var(--text-2); font-size: 0.88rem; line-height: 1.5; margin: 0; font-style: italic; }
        .transition-arrow { color: var(--text-3); font-size: 1.2rem; text-align: center; }
        .transition-cta { text-align: center; margin-top: 2rem; }

        

        @media (max-width: 1199px) {
        .hero,
        .section {
          padding-left: 2rem;
          padding-right: 2rem;
        }

        .exp-grid {
          grid-template-columns: 1fr;
        }

        .code-grid {
          grid-template-columns: 1fr;
        }

        .changed-grid {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .transition-grid {
          grid-template-columns: 1fr;
        }

        .transition-arrow {
          transform: rotate(90deg);
        }
      }

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

        .hero-art {
          display: none;
        }

        .hero__image-wrap {
          inset: 0;
        }

        .hero__scrim {
          background:
            linear-gradient(
              90deg,
              rgba(5, 5, 5, 0.95) 0%,
              rgba(5, 5, 5, 0.72) 55%,
              rgba(5, 5, 5, 0.35) 100%
            ),
            linear-gradient(
              to top,
              var(--bg) 0%,
              transparent 50%
            );
        }

        .hero__content {
          max-width: 100%;
        }
      }
      `}</style>

      {/* Hero */}
      <header className="hero">

        {/* Background image */}
        <div className="hero__image-wrap">
          <img
            src="/images/llm.png"
            alt=""
            className="hero__image"
        />
        </div>

        {/* Circuit / engineering graphic */}
        <CircuitArt />

        {/* Netflix-style dark gradient */}
        <div className="hero__scrim" aria-hidden="true" />

        {/* Hero content */}
        <div className="hero__content">

          <div className="hero__meta">
            <span>S1 &middot; EP03</span>
            <span>AI &middot; LLM ENGINEERING &middot; LANGCHAIN</span>
          </div>

          <h1 className="hero__title">
            LLM Engineering
          </h1>

          <p className="hero__tagline">
            &ldquo;From experimenting with models to engineering systems around them.&rdquo;
          </p>

          <div className="hero__actions">

            <button
              className="btn btn--primary"
              onClick={() => {
                window.open("/demos/LLM.html", "_blank");
              }}
            >
              <PlayIcon /> Play Episode
            </button>

            <button
              className="btn btn--ghost"
              onClick={() => {
                document.getElementById("synopsis")?.scrollIntoView({
                  behavior: "smooth"
                });
              }}
            >
              <InfoIcon /> More Info
            </button>

          </div>

        </div>

      </header>

      {/* Synopsis */}
      <Section label="Synopsis" title="What this episode is">
        <div className="synopsis">
          <p>
            After exploring different LLMs and model providers, I started learning
            how to engineer applications around them. This phase focused on
            prompts, structured outputs, chains, LangChain, LCEL, embeddings, and
            similarity-based retrieval through hands-on coding experiments.
          </p>
        </div>
      </Section>

      {/* How It Plays */}
      <Section id="how-it-plays" label="How It Plays" title="The progression" className="section--wide">
        <div className="flow">
          {PLAYS.map((step, i) => (
            <React.Fragment key={step}>
              <div className={`flow__step ${i === PLAYS.length - 1 ? "flow__step--accent" : ""}`}>{step}</div>
              {i < PLAYS.length - 1 && <ArrowDown />}
            </React.Fragment>
          ))}
        </div>
      </Section>

      {/* Engineering Experiments */}
      <Section label="Engineering Experiments" title="Actual patterns I coded" className="section--wide">
        <div className="exp-grid">
          {EXPERIMENTS.map((exp) => (
            <div className="exp-card" key={exp.title}>
              <p className="exp-card__title">{exp.title}</p>
              {exp.branch ? (
                <div className="exp-card__pipeline">
                  <span className="exp-card__node">{exp.steps[0]}</span>
                  <span className="exp-card__arrow">&darr;</span>
                  <div className="exp-card__branch">
                    <span className="exp-card__node">Notes</span>
                    <span className="exp-card__node">Quiz</span>
                    <span className="exp-card__node">Combined Output</span>
                  </div>
                </div>
              ) : (
                <div className="exp-card__pipeline">
                  {exp.steps.map((s, i) => (
                    <React.Fragment key={s}>
                      <span className="exp-card__node">{s}</span>
                      {i < exp.steps.length - 1 && <span className="exp-card__arrow">&darr;</span>}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Code Lab */}
      <Section label="Code Lab" title="Selected experiments" className="section--wide">
        <div className="code-grid">
          {CODE_SNIPPETS.map((snip) => (
            <div className="code-card" key={snip.title}>
              <p className="code-card__title mono">{snip.title}</p>
              <pre className="code-card__body mono">{snip.code}</pre>
            </div>
          ))}
        </div>
      </Section>

      {/* What Changed */}
      <Section label="What Changed" title="From answer to application" className="section--wide">
        <div className="changed-grid">
          <div className="changed-card">
            <p className="changed-card__label">Before</p>
            <div className="flow">
              <div className="flow__step">Prompt</div>
              <ArrowDown />
              <div className="flow__step">LLM</div>
              <ArrowDown />
              <div className="flow__step">Answer</div>
            </div>
          </div>
          <div className="changed-card">
            <p className="changed-card__label">After</p>
            <div className="flow">
              <div className="flow__step">Prompt</div>
              <ArrowDown />
              <div className="flow__step">Chain</div>
              <ArrowDown />
              <div className="flow__step">Parser</div>
              <ArrowDown />
              <div className="flow__step">Structured Output</div>
              <ArrowDown />
              <div className="flow__step flow__step--accent">Retrieval</div>
            </div>
          </div>
        </div>
        <p className="flow__note">
          The goal wasn't just to get an answer from an LLM — it was to understand
          how the pieces could be composed into an application.
        </p>
      </Section>

      {/* Cast & Technology */}
      <Section label="LLM Engineering Toolkit" title="Cast &amp; Technology">
        <div className="toolkit">
          {TOOLKIT.map((group) => (
            <div key={group.category}>
              <p className="toolkit__group-label">{group.category}</p>
              <div className="cast">
                {group.items.map((item) => (
                  <span className="cast__chip" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* My role */}
      <Section label="My Role" title="What I personally did">
        {/* EDIT ME: replace with your own words once confirmed */}
        <p className="role-copy">
          I learned LLM engineering through hands-on Python and LangChain
          experiments, implementing prompt templates, structured output parsing,
          sequential and parallel chains, LCEL composition, embeddings, and
          similarity-based retrieval.
        </p>
      </Section>

      {/* Behind the scenes */}
      <Section label="Behind The Scenes" title="A learning-through-coding phase">
        {/* EDIT ME: replace with your own words once confirmed */}
        <div className="scene-loop">
          {SCENE_LOOP.map((step, i) => (
            <React.Fragment key={step}>
              <span className="scene-loop__step">{step}</span>
              {i < SCENE_LOOP.length - 1 && <span className="scene-loop__arrow">&rarr;</span>}
            </React.Fragment>
          ))}
        </div>
        <p className="scene-quote">
          Instead of learning LLM engineering only through theory, I used small
          coding experiments to understand how prompts, chains, parsers, models,
          and embeddings behave when connected together.
        </p>
      </Section>

      {/* Episode Transition */}
      <Section label="Episode Transition" title="Where this fits in the season" className="section--wide">
        <div className="transition-grid">
          <div className="transition-card">
            <p className="transition-card__label">Previously</p>
            <p className="transition-card__ep">EP02 — Into The AI World</p>
            <p className="transition-card__line">&ldquo;I explored what LLMs could do.&rdquo;</p>
          </div>
          <div className="transition-arrow">&rarr;</div>
          <div className="transition-card transition-card--current">
            <p className="transition-card__label">This Episode</p>
            <p className="transition-card__ep">EP03 — LLM Engineering</p>
            <p className="transition-card__line">&ldquo;I learned how to build systems around them.&rdquo;</p>
          </div>
          <div className="transition-arrow">&rarr;</div>
          <div className="transition-card">
            <p className="transition-card__label">Next</p>
            <p className="transition-card__ep">EP04 — SIP Investment Advisor</p>
            <p className="transition-card__line">&ldquo;I started applying AI automation to a practical use case.&rdquo;</p>
          </div>
        </div>
        <div className="transition-cta">
          <button
            className="btn btn--primary"
            onClick={() => { window.location.href = "/originals/sip-investment-advisor"; }}
          >
            Continue To EP04
          </button>
        </div>
      </Section>

      
    </div>
  );
}