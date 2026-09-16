import React from "react";
import Navbar from "../../../components/navigation/Navbar";


/* ------------------------------------------------------------------ */
/*  InternFlix — Original: AI Support Desk (EP05)                      */
/*  "I learned how AI could automate a workflow."                      */
/*                                                                      */
/*  A workflow/automation episode — visually distinct from EP03's      */
/*  technical learning page and EP07's full AI product page. The      */
/*  emphasis throughout is on information moving through a pipeline:   */
/*  email → AI → decision → action → response. Envelope/workflow      */
/*  motifs (nodes, arrows, structured output) stay within the         */
/*  existing dark/red InternFlix system rather than introducing a      */
/*  new palette.                                                       */
/*                                                                      */
/*  EDIT ME: "My Role" and "Behind The Scenes" (esp. Challenge 04,     */
/*  the webhook/Gemini experiment) should be narrowed to exactly what  */
/*  you personally built. The Watch section defaults to a demo-steps   */
/*  placeholder — swap for a real recording once one exists.           */
/* ------------------------------------------------------------------ */

const WORKFLOW = [
  { title: "Gmail", tag: "Trigger", desc: "Detects the incoming customer-support email." },
  { title: "Zapier", tag: "Orchestrator", desc: "Moves information between the email, AI, storage, and response steps." },
  { title: "AI", tag: "Analyzer", desc: "Converts the customer's message into structured support information." },
];

const WORKFLOW_BRANCH = [
  { title: "Google Sheets", tag: "Record", desc: "Stores the analysis for tracking and follow-up." },
  { title: "Gmail", tag: "Response", desc: "Uses the generated response to continue the customer interaction." },
];

const AI_OUTPUT = [
  { field: "Category", value: "Billing" },
  { field: "Sentiment", value: "Negative" },
  { field: "Priority", value: "High" },
  { field: "Summary", value: "Customer paid but cannot access their account." },
  { field: "Suggested Reply", value: "We apologize for the inconvenience..." },
];

const DECISION_LAYER = [
  { title: "Category", desc: "What type of issue?" },
  { title: "Sentiment", desc: "How does the customer feel?" },
  { title: "Priority", desc: "How urgent is it?" },
  { title: "Summary", desc: "What is the core issue?" },
  { title: "Reply", desc: "What should we say?" },
];

const FEATURES = [
  { title: "AI Email Classification", desc: "Automatically identifies the type of customer issue." },
  { title: "Sentiment Detection", desc: "Determines whether the customer's message is positive, neutral, or negative." },
  { title: "Priority Detection", desc: "Identifies how urgently the issue should be handled." },
  { title: "AI Summarization", desc: "Converts long customer messages into concise summaries." },
  { title: "Suggested Replies", desc: "Generates a professional response based on the customer's message." },
  { title: "Automated Record Keeping", desc: "Stores the processed information in Google Sheets." },
];

const JOURNEY = ["Send Email", "AI Reads It", "AI Understands It", "Issue Is Structured", "Response Is Generated", "Support Team Has A Record"];

const CAST_GROUPS = [
  { category: "Automation", items: ["Zapier", "Webhooks", "Automation Workflows"] },
  { category: "Communication", items: ["Gmail", "Email Triggers", "Email Responses"] },
  { category: "AI", items: ["LLM", "Classification", "Sentiment Analysis", "Summarization", "Response Generation"] },
  { category: "Data", items: ["Google Sheets", "Structured Records"] },
];

const CHALLENGES = [
  { n: "01", title: "Unstructured input", desc: "Customer emails don't arrive in a predictable format. The AI needed to extract consistent information from natural language." },
  { n: "02", title: "Reliable AI output", desc: "The workflow needed predictable fields such as category, sentiment, priority, summary, and response." },
  { n: "03", title: "Connecting AI to automation", desc: "The useful part wasn't only generating an AI response; the output needed to feed the next automation steps." },
  { n: "04", title: "API experimentation", desc: "Webhook-based AI integration introduced another way of connecting external AI models to an automation workflow." },
];

const LESSONS = [
  { title: "AI + Automation", desc: "AI becomes more useful when its output can trigger actions." },
  { title: "Structured AI Output", desc: "Natural-language input can be transformed into structured information." },
  { title: "Workflow Thinking", desc: "Building an AI solution also means designing what happens before and after the model." },
];

const DEMO_STEPS = ["Send email", "Zap triggers", "AI analyzes", "Google Sheet gets row", "Response generated/sent"];

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
function EnvelopeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M4 7 L12 13 L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WorkflowArt() {
  return (
    <svg viewBox="0 0 220 160" className="hero-art" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="16" y="16" width="46" height="30" rx="3" />
        <path d="M20 22 L39 34 L58 22" opacity="0.7" />
        <path d="M62 31 H96" />
        <rect x="98" y="16" width="46" height="30" rx="3" />
        <path d="M144 31 H178" />
        <rect x="180" y="16" width="30" height="30" rx="3" />
        <path d="M121 46 V72" />
        <path d="M107 90 H135 M107 90 V78 M135 90 V78" opacity="0.6" />
        <rect x="86" y="92" width="30" height="24" rx="3" opacity="0.8" />
        <rect x="126" y="92" width="30" height="24" rx="3" opacity="0.8" />
      </g>
    </svg>
  );
}

function Section({ id, label, title, subtitle, children, className = "" }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="section__inner">
        <p className="label label--accent">{label}</p>
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

export default function AISupportDeskPage() {
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

        .label { font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-2); font-weight: 600; margin: 0 0 0.75rem; }
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

        .section { padding: 4.5rem 3rem; border-top: 1px solid var(--surface-2); }
        .section__inner { max-width: 900px; margin: 0 auto; }
        .section-title { font-size: clamp(1.5rem, 2.6vw, 2rem); font-weight: 700; margin: 0 0 0.6rem; }
        .section-subtitle { color: var(--text-3); font-size: 0.95rem; margin: -0.4rem 0 1.5rem; }
        .section--wide .section__inner { max-width: 1140px; }

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

        /* Workflow graphic */
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

        /* Content must stay above image + scrim */
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
        .synopsis__connect { border-left: 2px solid var(--accent); padding-left: 1rem; color: var(--text-2); font-size: 0.98rem; font-style: italic; }

        /* Workflow rows (How It Plays / Behind The System) */
        .workflow { display: flex; flex-direction: column; align-items: center; gap: 0; }
        .workflow-row { display: flex; align-items: stretch; justify-content: center; gap: 0; flex-wrap: wrap; }
        .workflow-card {
          background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 8px;
          padding: 1.1rem 1.3rem; width: 200px; text-align: center;
        }
        .workflow-card--accent { border-color: var(--accent); background: #1c0d0e; }
        .workflow-card__tag { color: var(--text-3); font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 0.4rem; }
        .workflow-card__title { font-weight: 700; font-size: 0.98rem; margin: 0 0 0.4rem; }
        .workflow-card__desc { color: var(--text-2); font-size: 0.82rem; line-height: 1.5; margin: 0; }
        .workflow-arrow-h { color: var(--text-3); align-self: center; margin: 0 0.5rem; }
        .workflow-branch { display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap; margin-top: 0.5rem; }

        /* Simple vertical flow */
        .flow { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }
        .flow__step { width: 100%; max-width: 420px; background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 6px; padding: 0.85rem 1.25rem; text-align: center; font-weight: 600; font-size: 0.95rem; }
        .flow__step--accent { border-color: var(--accent); color: var(--text); background: #1c0d0e; }
        .arrow { color: var(--text-3); }

        /* What the AI Understands */
        .transform-grid { display: grid; grid-template-columns: 1fr auto 1fr; gap: 1.5rem; align-items: center; }
        .transform-panel { background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 8px; padding: 1.5rem 1.6rem; }
        .transform-panel__label { color: var(--text-3); font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 0.9rem; }
        .transform-panel__subject { color: var(--text-3); font-size: 0.85rem; margin: 0 0 0.5rem; }
        .transform-panel__body { color: var(--text-2); font-size: 0.95rem; line-height: 1.65; margin: 0; font-style: italic; }
        .transform-arrow { text-align: center; color: var(--accent); font-weight: 700; font-size: 0.85rem; letter-spacing: 0.05em; }
        .ai-fields { display: flex; flex-direction: column; gap: 0.9rem; }
        .ai-field__label { color: var(--text-3); font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 0.25rem; }
        .ai-field__value { color: var(--text); font-size: 0.95rem; margin: 0; font-weight: 600; }

        /* AI Decision Layer */
        .decision-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.9rem; }
        .decision-card { background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 8px; padding: 1.1rem 1rem; text-align: center; }
        .decision-card__title { font-weight: 700; font-size: 0.92rem; margin: 0 0 0.5rem; color: var(--accent); }
        .decision-card__desc { color: var(--text-2); font-size: 0.82rem; line-height: 1.45; margin: 0; }

        /* From Unstructured to Structured */
        .code-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: stretch; }
        .code-panel { background: var(--surface); border: 1px solid var(--surface-3); border-radius: 8px; padding: 1.3rem 1.4rem; }
        .code-panel__label { color: var(--text-3); font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 0.8rem; }
        .code-panel__body { color: var(--text-2); font-size: 0.88rem; line-height: 1.6; margin: 0; white-space: pre-wrap; }
        .transform-caption { text-align: center; color: var(--text-2); font-size: 0.98rem; line-height: 1.7; max-width: 560px; margin: 1.75rem auto 0; font-style: italic; }

        /* What I Built */
        .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .feature-card { background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 8px; padding: 1.3rem 1.4rem; transition: border-color 0.18s ease; }
        .feature-card:hover { border-color: var(--accent); }
        .feature-card__title { font-weight: 700; font-size: 0.98rem; margin: 0 0 0.5rem; }
        .feature-card__desc { color: var(--text-2); font-size: 0.9rem; line-height: 1.55; margin: 0; }

        /* Customer Journey */
        .journey { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }

        /* Cast & Technology */
        .toolkit { display: flex; flex-direction: column; gap: 1.4rem; }
        .toolkit__group-label { color: var(--text-3); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 0.6rem; }
        .cast { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .cast__chip { background: var(--surface-2); border: 1px solid var(--surface-3); padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; color: var(--text-2); }

        /* My Role */
        .role-copy { color: var(--text-2); line-height: 1.75; font-size: 1.05rem; margin: 0; }

        /* Behind The Scenes */
        .challenge-list { display: flex; flex-direction: column; gap: 1.1rem; }
        .challenge { display: flex; gap: 1.2rem; background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 8px; padding: 1.2rem 1.4rem; }
        .challenge__n { color: var(--accent); font-weight: 800; font-size: 1.3rem; font-family: 'JetBrains Mono', monospace; flex: 0 0 auto; }
        .challenge__title { font-weight: 700; font-size: 0.98rem; margin: 0 0 0.4rem; }
        .challenge__desc { color: var(--text-2); font-size: 0.92rem; line-height: 1.6; margin: 0; }

        /* Lessons */
        .lesson-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .lesson-card { background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 8px; padding: 1.3rem 1.4rem; text-align: center; }
        .lesson-card__title { font-weight: 700; font-size: 0.95rem; margin: 0 0 0.6rem; }
        .lesson-card__desc { color: var(--text-2); font-size: 0.88rem; line-height: 1.55; margin: 0; }

        /* Watch */
        .watch { text-align: center; }
        .watch__frame { border: 1px dashed var(--surface-3); border-radius: 8px; background: var(--surface-2); padding: 3rem 2rem; margin-bottom: 1.5rem; }
        .watch__play-ring { width: 64px; height: 64px; border-radius: 50%; border: 2px solid var(--surface-3); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; color: var(--text-3); }
        .watch__frame p { color: var(--text-3); margin: 0 0 0.4rem; font-size: 0.95rem; }
        .watch__progress { height: 3px; background: var(--surface-3); border-radius: 2px; max-width: 320px; margin: 1.5rem auto 0; }
        .watch__steps { display: flex; flex-direction: column; gap: 0.5rem; max-width: 340px; margin: 1.5rem auto 0; text-align: left; }
        .watch__step { display: flex; gap: 0.7rem; align-items: baseline; color: var(--text-2); font-size: 0.9rem; }
        .watch__step-n { color: var(--accent); font-weight: 700; font-family: 'JetBrains Mono', monospace; }

        /* Episode Transition */
        .transition-grid { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; align-items: center; gap: 1rem; }
        .transition-card { background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 8px; padding: 1.4rem 1.3rem; }
        .transition-card--current { border-color: var(--accent); background: #1c0d0e; }
        .transition-card__label { color: var(--text-3); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 0.5rem; }
        .transition-card__ep { font-weight: 700; font-size: 0.95rem; margin: 0 0 0.5rem; }
        .transition-card__line { color: var(--text-2); font-size: 0.86rem; line-height: 1.5; margin: 0; font-style: italic; }
        .transition-arrow { color: var(--text-3); font-size: 1.2rem; text-align: center; }
        .transition-cta { text-align: center; margin-top: 2rem; }

        @media (max-width: 1199px) {
          .hero, .section { padding-left: 2rem; padding-right: 2rem; }
          .feature-grid { grid-template-columns: repeat(2, 1fr); }
          .decision-grid { grid-template-columns: repeat(3, 1fr); }
          .lesson-grid { grid-template-columns: 1fr; }
          .transform-grid { grid-template-columns: 1fr; }
          .transform-arrow { transform: rotate(90deg); }
          .code-grid-2 { grid-template-columns: 1fr; }
          .transition-grid { grid-template-columns: 1fr; }
          .transition-arrow { transform: rotate(90deg); }
        }
        @media (max-width: 767px) {
          .hero, .section { padding-left: 1.1rem; padding-right: 1.1rem; }
          .hero { min-height: 58vh; padding-top: 5rem; }
          .hero-art { display: none; }
          .feature-grid { grid-template-columns: 1fr; }
          .decision-grid { grid-template-columns: repeat(2, 1fr); }
          .workflow-card { width: 100%; max-width: 280px; }
          .workflow-arrow-h { transform: rotate(90deg); margin: 0.4rem 0; }
          .challenge { flex-direction: column; gap: 0.5rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .project * { transition: none !important; }
        }
      `}</style>

      {/* Hero */}
      <header className="hero">

        <div className="hero__image-wrap">
          <img
            src="/images/help.png"
            alt=""
            className="hero__image"
          />
        </div>

        <WorkflowArt />

        <div className="hero__scrim" aria-hidden="true" />   

        <div className="hero__content">
          <div className="hero__meta">
            <span>S1 &middot; EP05</span>
            <span>AI &middot; AUTOMATION &middot; CUSTOMER SUPPORT</span>
          </div>

          <h1 className="hero__title">
            AI Support Desk
          </h1>

          <p className="hero__tagline">
            &ldquo;Turning customer emails into intelligent, actionable support.&rdquo;
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
            AI Support Desk is an AI-powered customer-support automation workflow
            that processes incoming emails, analyzes the customer's issue,
            identifies sentiment and priority, generates a concise summary and
            suggested response, and records the result for follow-up.
          </p>
        </div>
        <p className="synopsis__connect">
          The project explored how AI could turn an unstructured customer email
          into structured, actionable support information.
        </p>
      </Section>

      {/* How It Plays */}
      <Section label="How It Plays" title="One customer email. Multiple intelligent actions." className="section--wide">
        <div className="workflow">
          <div className="workflow-card">
            <p className="workflow-card__tag">Trigger</p>
            <p className="workflow-card__title"><EnvelopeIcon /></p>
            <p className="workflow-card__desc">Customer Email</p>
          </div>
          <ArrowDown />
          <div className="workflow-row">
            {WORKFLOW.map((n, i) => (
              <React.Fragment key={n.title}>
                <div className={`workflow-card ${n.title === "AI" ? "workflow-card--accent" : ""}`}>
                  <p className="workflow-card__tag">{n.tag}</p>
                  <p className="workflow-card__title">{n.title}</p>
                  <p className="workflow-card__desc">{n.desc}</p>
                </div>
                {i < WORKFLOW.length - 1 && <span className="workflow-arrow-h">&rarr;</span>}
              </React.Fragment>
            ))}
          </div>
          <ArrowDown />
          <div className="workflow-branch">
            {WORKFLOW_BRANCH.map((n) => (
              <div className="workflow-card" key={n.title}>
                <p className="workflow-card__tag">{n.tag}</p>
                <p className="workflow-card__title">{n.title}</p>
                <p className="workflow-card__desc">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* What the AI Understands */}
      <Section label="Inside The AI" title="What the AI understands" className="section--wide">
        <div className="transform-grid">
          <div className="transform-panel">
            <p className="transform-panel__label">Customer Email</p>
            <p className="transform-panel__subject">Subject: Payment completed but account locked</p>
            <p className="transform-panel__body">
              &ldquo;I made my payment yesterday, but my account is still locked.
              I urgently need access.&rdquo;
            </p>
          </div>
          <div className="transform-arrow">AI &rarr;</div>
          <div className="transform-panel">
            <p className="transform-panel__label">AI Analysis</p>
            <div className="ai-fields">
              {AI_OUTPUT.map((f) => (
                <div key={f.field}>
                  <p className="ai-field__label">{f.field}</p>
                  <p className="ai-field__value">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* AI Decision Layer */}
      <Section label="The AI Decision Layer" title="The brain of the project" className="section--wide">
        <div className="decision-grid">
          {DECISION_LAYER.map((d) => (
            <div className="decision-card" key={d.title}>
              <p className="decision-card__title">{d.title}</p>
              <p className="decision-card__desc">{d.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* From Unstructured to Structured */}
      <Section label="From Unstructured To Structured" title="Free-form text, turned into action" className="section--wide">
        <div className="code-grid-2">
          <div className="code-panel">
            <p className="code-panel__label">Customer Email</p>
            <p className="code-panel__body">
              {`"Hello support,

I paid for my subscription yesterday,
but my account is still locked.

I really need access urgently..."`}
            </p>
          </div>
          <div className="code-panel">
            <p className="code-panel__label mono">AI Output</p>
            <p className="code-panel__body mono">
              {`{
  category: "Billing",
  sentiment: "Negative",
  priority: "High",
  summary: "...",
  reply: "..."
}`}
            </p>
          </div>
        </div>
        <p className="transform-caption">
          AI transforms free-form customer communication into information that an
          automation workflow can act on.
        </p>
      </Section>

      {/* What I Built */}
      <Section label="What I Built" title="Features" className="section--wide">
        <div className="feature-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <p className="feature-card__title">{f.title}</p>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Customer Journey */}
      <Section label="Customer Journey" title="From email to record">
        <div className="journey">
          <div className="flow">
            {JOURNEY.map((step, i) => (
              <React.Fragment key={step}>
                <div className={`flow__step ${i === JOURNEY.length - 1 ? "flow__step--accent" : ""}`}>{step}</div>
                {i < JOURNEY.length - 1 && <ArrowDown />}
              </React.Fragment>
            ))}
          </div>
        </div>
        <p className="transform-caption">
          The goal was to reduce the repetitive first layer of customer-support
          processing.
        </p>
      </Section>

      {/* Behind The System */}
      <Section label="Behind The System" title="A clean automation pipeline" className="section--wide">
        <div className="workflow">
          <div className="workflow-card">
            <p className="workflow-card__title">Customer</p>
          </div>
          <ArrowDown />
          <div className="workflow-card">
            <p className="workflow-card__title">Gmail</p>
          </div>
          <ArrowDown />
          <div className="workflow-card">
            <p className="workflow-card__title">Zapier Trigger</p>
          </div>
          <ArrowDown />
          <div className="workflow-card workflow-card--accent">
            <p className="workflow-card__title">AI Analysis</p>
          </div>
          <ArrowDown />
          <div className="workflow-branch">
            <div className="workflow-card">
              <p className="workflow-card__title">Sheets Record</p>
            </div>
            <div className="workflow-card">
              <p className="workflow-card__title">Gmail Response</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Cast & Technology */}
      <Section label="Cast &amp; Technology" title="Built with">
        <div className="toolkit">
          {CAST_GROUPS.map((group) => (
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

      {/* My Role */}
      <Section label="My Role" title="What I personally did">
        {/* EDIT ME: narrow this to exactly what you implemented if you didn't
            build every integration yourself */}
        <p className="role-copy">
          Designed and implemented the automation workflow connecting customer
          emails, AI analysis, structured data storage, and automated responses.
          I worked with AI prompts and workflow logic to turn incoming support
          messages into categorized, prioritized, summarized, and actionable
          information.
        </p>
      </Section>

      {/* Behind The Scenes */}
      <Section label="Behind The Scenes" title="What actually made this hard">
        {/* EDIT ME: only keep Challenge 04 if the webhook/Gemini experiment is
            genuinely part of your story */}
        <div className="challenge-list">
          {CHALLENGES.map((c) => (
            <div className="challenge" key={c.n}>
              <span className="challenge__n">{c.n}</span>
              <div>
                <p className="challenge__title">{c.title}</p>
                <p className="challenge__desc">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* What This Project Taught Me */}
      <Section label="What This Project Taught Me" title="Beyond the workflow" className="section--wide">
        <div className="lesson-grid">
          {LESSONS.map((l) => (
            <div className="lesson-card" key={l.title}>
              <p className="lesson-card__title">{l.title}</p>
              <p className="lesson-card__desc">{l.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Watch */}
      <Section label="Watch" title="Workflow demo">
        <div className="watch">
          <div className="watch__frame">
            <div className="watch__play-ring"><PlayIcon /></div>
            <p className="label" style={{ color: "var(--text-3)" }}>AI Support Desk &mdash; Workflow Demo</p>
            <div className="watch__progress" />
            <div className="watch__steps">
              {DEMO_STEPS.map((s, i) => (
                <div className="watch__step" key={s}>
                  <span className="watch__step-n">{i + 1}</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
          {/* EDIT ME: swap for a real screen recording showing the steps above */}
          <button className="btn btn--ghost">
            <PlayIcon /> Play Demo
          </button>
        </div>
      </Section>

      {/* Episode Transition */}
      <Section label="Episode Transition" title="From automation to AI product" className="section--wide">
        <div className="transition-grid">
          <div className="transition-card">
            <p className="transition-card__label">Previously</p>
            <p className="transition-card__ep">EP04 — SIP Investment Advisor</p>
            <p className="transition-card__line">&ldquo;I applied AI to a practical decision-support use case.&rdquo;</p>
          </div>
          <div className="transition-arrow">&rarr;</div>
          <div className="transition-card transition-card--current">
            <p className="transition-card__label">This Episode</p>
            <p className="transition-card__ep">EP05 — AI Support Desk</p>
            <p className="transition-card__line">&ldquo;I learned how AI could automate a workflow.&rdquo;</p>
          </div>
          <div className="transition-arrow">&rarr;</div>
          <div className="transition-card">
            <p className="transition-card__label">Next</p>
            <p className="transition-card__ep">EP06 — Into Production</p>
            <p className="transition-card__line">&ldquo;I started contributing to a real client-facing application.&rdquo;</p>
          </div>
        </div>
        <div className="transition-cta">
          <button
            className="btn btn--primary"
            onClick={() => { window.location.href = "/originals/into-production"; }}
          >
            Continue To EP06
          </button>
        </div>
      </Section>
    </div>
  );
}