import React from "react";
import Navbar from "../../../components/navigation/Navbar";
/* ------------------------------------------------------------------ */
/*  InternFlix — Original: RoofPro AI (EP07)                           */
/*  "I helped build a real AI application."                            */
/*                                                                      */
/*  This is the story turn from learning AI (EP02-03) to building a    */
/*  real-world AI application for a business use case. Presented as    */
/*  a product case study rather than a learning page — three visual    */
/*  modes on purpose: product storytelling (Hero/Synopsis/Customer     */
/*  Journey), technical storytelling (RAG Pipeline/Architecture/       */
/*  Knowledge Engine), and portfolio storytelling (My Role/Behind The  */
/*  Scenes/Why It Matters).                                            */
/*                                                                      */
/*  EDIT ME: "My Role" and "Behind The Scenes" cards must be adjusted  */
/*  to reflect your actual, verified contribution on this client       */
/*  project — don't imply sole ownership of every component unless     */
/*  that's true. The Watch section defaults to "Demo coming soon";     */
/*  swap for a real recording once one exists, don't fake a demo.      */
/* ------------------------------------------------------------------ */

const HOW_IT_PLAYS = ["Customer Query", "Flask Backend", "Query Processing", "RAG Retrieval", "LLM Response", "Customer Response"];

const KNOWLEDGE_ENGINE = ["Roofing PDFs", "Text Extraction", "Chunking", "Embeddings", "FAISS Index"];

const RAG_RETRIEVAL_RESULTS = ["Roofing repair guidance", "Leak-related information", "Emergency recommendations"];

const FEATURES = [
  { title: "Conversational Roofing Assistant", tag: "AI Chatbot", desc: "Customers can ask roofing-related questions through a web-based chatbot." },
  { title: "Custom Roofing Knowledge", tag: "Knowledge-Based Answers", desc: "The chatbot can use information from the project's roofing documents when answering relevant questions." },
  { title: "Emergency Assistance", tag: "Emergency Guidance", desc: "Handles roofing-related emergency situations and provides appropriate guidance." },
  { title: "Approximate Estimates", tag: "Cost Estimation", desc: "Uses available roofing information and customer-provided details to support approximate cost estimation." },
  { title: "Lead Generation", tag: "Lead Capture", desc: "Potential customer information can be collected during the conversation." },
  { title: "Google Sheets", tag: "Business Integration", desc: "Captured lead information can be sent to Google Sheets for follow-up." },
];

const JOURNEY = ["Discover", "Ask", "Understand", "Estimate", "Share Details", "Become A Lead"];

const CAST_GROUPS = [
  { category: "AI", items: ["OpenAI", "RAG", "Embeddings", "LLM"] },
  { category: "Backend", items: ["Python", "Flask"] },
  { category: "Retrieval", items: ["FAISS", "Vector Search", "Document Chunking"] },
  { category: "Integration", items: ["Google Sheets"] },
  { category: "Deployment", items: ["Render"] },
];

const ROLE_CARDS = [
  { title: "AI Integration", desc: "Worked with the LLM-based conversational flow and domain-specific AI functionality." },
  { title: "Knowledge & Retrieval", desc: "Worked with the knowledge-driven response flow and retrieval concepts used by the chatbot." },
  { title: "Application Development", desc: "Contributed to the application experience and integration of the AI functionality." },
  { title: "Problem Solving", desc: "Debugged and refined the interaction flow while working toward a usable business-facing chatbot." },
];

const CHALLENGES = [
  { n: "01", title: "Making AI domain-specific", desc: "A general-purpose LLM isn't automatically a roofing expert. The system needed access to relevant domain knowledge." },
  { n: "02", title: "Connecting retrieval with generation", desc: "Retrieving information was only one part of the problem. The retrieved context needed to be incorporated into the response-generation flow." },
  { n: "03", title: "Balancing AI and business logic", desc: "The chatbot needed to do more than answer questions—it also had to support estimates, emergency guidance, and potential lead collection." },
  { n: "04", title: "Moving from experiment to application", desc: "The concepts learned during the earlier LLM engineering phase now had to work together inside an actual application." },
];

const IMPACT = [
  { title: "Faster Information", desc: "Customers can interact with the assistant without waiting for a manual response to every basic question." },
  { title: "Guided Customer Interaction", desc: "The chatbot can guide customers through roofing-related questions and requirements." },
  { title: "Lead Generation", desc: "Customer interactions can become potential leads that can be followed up by the business." },
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

export default function RoofProAIPage() {
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

        .section { padding: 4.5rem 3rem; border-top: 1px solid var(--surface-2); }
        .section__inner { max-width: 900px; margin: 0 auto; }
        .section-title {
          font-size: clamp(1.5rem, 2.6vw, 2rem);
          font-weight: 700; margin: 0 0 0.6rem;
        }
        .section-subtitle { color: var(--text-3); font-size: 0.95rem; margin: -0.4rem 0 1.5rem; }
        .section--wide .section__inner { max-width: 1140px; }

        /* Hero — Full Image + Left Dissolve */
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
          inset: 0;
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

        .hero__scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            linear-gradient(
              90deg,
              #050505 0%,
              rgba(5,5,5,.98) 16%,
              rgba(5,5,5,.90) 28%,
              rgba(5,5,5,.62) 40%,
              rgba(5,5,5,.28) 54%,
              rgba(5,5,5,.08) 70%,
              rgba(5,5,5,0) 100%
            ),
            linear-gradient(
              to top,
              #050505 0%,
              rgba(5,5,5,.72) 14%,
              rgba(5,5,5,0) 45%
            ),
            linear-gradient(
              to bottom,
              rgba(5,5,5,.42) 0%,
              rgba(5,5,5,0) 28%
            );
        }

        .hero__content {
          position: relative;
          z-index: 3;
          width: 100%;
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
        .synopsis__connect {
          border-left: 2px solid var(--accent); padding-left: 1rem;
          color: var(--text-2); font-size: 0.98rem; font-style: italic;
        }

        /* RAG in Action */
        .rag-demo {
          background: var(--surface-2); border: 1px solid var(--surface-3);
          border-radius: 10px; padding: 1.75rem 2rem; display: flex;
          flex-direction: column; gap: 1.25rem;
        }
        .rag-demo__bubble {
          max-width: 78%; padding: 0.85rem 1.1rem; border-radius: 10px;
          font-size: 0.95rem; line-height: 1.55;
        }
        .rag-demo__bubble--user {
          align-self: flex-end; background: var(--accent); color: #fff;
        }
        .rag-demo__bubble--system {
          align-self: flex-start; background: var(--surface); border: 1px solid var(--surface-3);
          color: var(--text-2); font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;
        }
        .rag-demo__bubble--bot {
          align-self: flex-start; background: var(--surface-3); color: var(--text);
        }
        .rag-demo__chip-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; }
        .rag-demo__chip {
          background: var(--surface); border: 1px solid var(--surface-3);
          border-radius: 20px; padding: 0.35rem 0.85rem; font-size: 0.78rem; color: var(--text-2);
        }

        /* What I Built — feature grid */
        .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .feature-card {
          background: var(--surface-2); border: 1px solid var(--surface-3);
          border-radius: 8px; padding: 1.3rem 1.4rem;
          transition: border-color 0.18s ease;
        }
        .feature-card:hover { border-color: var(--accent); }
        .feature-card__tag { color: var(--text-3); font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 0.5rem; }
        .feature-card__title { font-weight: 700; font-size: 1rem; margin: 0 0 0.5rem; }
        .feature-card__desc { color: var(--text-2); font-size: 0.9rem; line-height: 1.55; margin: 0; }

        /* Customer Journey */
        .journey { display: flex; align-items: center; flex-wrap: wrap; gap: 0; justify-content: center; }
        .journey__node { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; }
        .journey__dot { width: 12px; height: 12px; border-radius: 50%; background: var(--accent); }
        .journey__label { font-size: 0.9rem; font-weight: 600; color: var(--text); white-space: nowrap; }
        .journey__connector { flex: 1; height: 1px; background: var(--surface-3); min-width: 32px; margin: 0 0.4rem; align-self: start; margin-top: 5px; }
        .journey-example {
          margin-top: 2.5rem; display: flex; flex-direction: column; gap: 0.9rem;
          max-width: 560px; margin-left: auto; margin-right: auto;
        }
        .journey-example__row { display: flex; gap: 0.9rem; align-items: baseline; }
        .journey-example__who { color: var(--accent); font-weight: 700; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.05em; flex: 0 0 90px; }
        .journey-example__what { color: var(--text-2); font-size: 0.95rem; line-height: 1.5; }

        /* Architecture (Behind The System) */
        .arch-tree { display: flex; flex-direction: column; align-items: center; gap: 0; }
        .arch-node {
          background: var(--surface-2); border: 1px solid var(--surface-3);
          border-radius: 6px; padding: 0.75rem 1.4rem; font-weight: 600;
          font-size: 0.9rem; text-align: center; white-space: nowrap;
        }
        .arch-node--root { border-color: var(--accent); background: #1c0d0e; font-size: 1rem; }
        .arch-branch-row {
          display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap;
          margin: 0.5rem 0;
        }
        .arch-branch-row .arch-node { font-weight: 500; color: var(--text-2); }

        /* Behind The AI (RAG pipeline zoom) */
        .ai-pipeline { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }

        /* Cast & Technology */
        .toolkit { display: flex; flex-direction: column; gap: 1.4rem; }
        .toolkit__group-label { color: var(--text-3); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 0.6rem; }
        .cast { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .cast__chip { background: var(--surface-2); border: 1px solid var(--surface-3); padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; color: var(--text-2); }

        /* My Role cards */
        .role-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .role-card { background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 8px; padding: 1.3rem 1.4rem; }
        .role-card__title { font-weight: 700; font-size: 0.98rem; margin: 0 0 0.5rem; color: var(--accent); }
        .role-card__desc { color: var(--text-2); font-size: 0.92rem; line-height: 1.6; margin: 0; }

        /* Behind The Scenes — challenges */
        .challenge-list { display: flex; flex-direction: column; gap: 1.1rem; }
        .challenge {
          display: flex; gap: 1.2rem; background: var(--surface-2);
          border: 1px solid var(--surface-3); border-radius: 8px; padding: 1.2rem 1.4rem;
        }
        .challenge__n { color: var(--accent); font-weight: 800; font-size: 1.3rem; font-family: 'JetBrains Mono', monospace; flex: 0 0 auto; }
        .challenge__title { font-weight: 700; font-size: 0.98rem; margin: 0 0 0.4rem; }
        .challenge__desc { color: var(--text-2); font-size: 0.92rem; line-height: 1.6; margin: 0; }

        /* Why It Matters */
        .impact-formula {
          text-align: center; color: var(--text-2); font-size: 0.95rem;
          line-height: 2; margin: 0 0 2rem; font-weight: 600;
        }
        .impact-formula .accent { color: var(--accent); }
        .impact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .impact-card { background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 8px; padding: 1.3rem 1.4rem; text-align: center; }
        .impact-card__title { font-weight: 700; font-size: 0.95rem; margin: 0 0 0.6rem; }
        .impact-card__desc { color: var(--text-2); font-size: 0.88rem; line-height: 1.55; margin: 0; }

        /* Watch */
        .watch { text-align: center; }
        .watch__frame {
          border: 1px dashed var(--surface-3); border-radius: 8px;
          background: var(--surface-2); padding: 4rem 2rem; margin-bottom: 1.5rem;
          position: relative;
        }
        .watch__play-ring {
          width: 64px; height: 64px; border-radius: 50%;
          border: 2px solid var(--surface-3); display: flex; align-items: center;
          justify-content: center; margin: 0 auto 1.25rem; color: var(--text-3);
        }
        .watch__frame p { color: var(--text-3); margin: 0 0 0.4rem; font-size: 0.95rem; }
        .watch__frame p.label { margin-bottom: 0.75rem; }
        .watch__progress { height: 3px; background: var(--surface-3); border-radius: 2px; max-width: 320px; margin: 1.5rem auto 0; overflow: hidden; }
        .watch__caption { color: var(--text-2); font-size: 0.95rem; line-height: 1.65; max-width: 480px; margin: 1.25rem auto 0; }

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
          .hero {
            min-height: 72vh;
            padding-left: 2rem;
            padding-right: 2rem;
          }

          .hero__image {
            object-position: center center;
            opacity: 0.78;
          }

          .hero__scrim {
            background:
              linear-gradient(90deg,#050505 0%,rgba(5,5,5,.96) 16%,rgba(5,5,5,.82) 32%,rgba(5,5,5,.45) 50%,rgba(5,5,5,.08) 76%,transparent 100%),
              linear-gradient(to top,#050505 0%,rgba(5,5,5,.55) 18%,transparent 48%);
          }

          .feature-grid,
          .impact-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

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
            object-position: 60% center;
            opacity: 0.62;
          }

          .hero__scrim {
            background:
              linear-gradient(
                to bottom,
                rgba(5,5,5,.10) 0%,
                rgba(5,5,5,.28) 28%,
                rgba(5,5,5,.62) 50%,
                rgba(5,5,5,.90) 68%,
                #050505 88%,
                #050505 100%
              );
          }

          .hero__content {
            width: 100%;
            max-width: 100%;
            margin-left: 0;
          }

          .hero__meta {
            gap: .55rem;
            font-size: .72rem;
            line-height: 1.4;
            margin-bottom: .75rem;
          }

          .hero__title {
            font-size: clamp(2.1rem, 9.5vw, 3rem);
            line-height: 1.05;
            margin-bottom: .85rem;
          }

          .hero__tagline {
            font-size: .98rem;
            line-height: 1.5;
            max-width: 100%;
            margin-bottom: 1.25rem;
          }

          .hero__actions {
            width: 100%;
            gap: .65rem;
          }

          .hero__actions .btn {
            flex: 1;
            min-width: 0;
          }

          .feature-grid,
          .impact-grid,
          .role-grid {
            grid-template-columns: 1fr;
          }

          .journey {
            flex-direction: column;
            align-items: stretch;
          }

          .journey__node {
            flex-direction: row;
            justify-content: flex-start;
          }

          .journey__connector {
            width: 1px;
            height: 22px;
            min-width: 1px;
            margin: .15rem 0 .15rem 5px;
            flex: none;
          }

          .journey-example__row {
            align-items: flex-start;
            flex-direction: column;
            gap: .2rem;
          }

          .rag-demo {
            padding: 1.1rem;
          }

          .rag-demo__bubble {
            max-width: 92%;
          }

          .arch-node {
            white-space: normal;
            width: 100%;
            max-width: 340px;
          }

          .arch-branch-row {
            width: 100%;
            flex-direction: column;
            align-items: center;
          }

          .transition-grid {
            grid-template-columns: 1fr;
            gap: .7rem;
          }

          .transition-arrow {
            transform: rotate(90deg);
          }

          .challenge {
            flex-direction: column;
            gap: .5rem;
          }
        }

        @media (max-width: 480px) {
          .hero {
            min-height: 76vh;
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .hero__image {
            object-position: 63% center;
          }

          .hero__title {
            font-size: clamp(2rem, 10vw, 2.65rem);
          }

          .hero__actions {
            flex-direction: column;
          }

          .hero__actions .btn {
            width: 100%;
          }

          .section {
            padding-top: 3.5rem;
            padding-bottom: 3.5rem;
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

        <div className="hero__image-wrap">
          <img
            src="/images/rooftop.png"
            alt=""
            className="hero__image"
          />
        </div>

        <div className="hero__scrim" aria-hidden="true" />

        <div className="hero__content">
          <div className="hero__meta">
            <span>S1 &middot; EP07</span>
            <span>AI &middot; RAG &middot; CHATBOT &middot; ROOFING</span>
          </div>

          <h1 className="hero__title">
            RoofPro AI
          </h1>

          <p className="hero__tagline">
            &ldquo;Turning domain knowledge into an AI-powered customer experience.&rdquo;
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
            RoofPro AI is a domain-specific AI chatbot designed for roofing-related
            customer interactions. It combines a conversational interface with an
            LLM and a custom roofing knowledge base to provide relevant answers,
            guidance, approximate estimates, and support potential customer
            interactions.
          </p>
        </div>
        <p className="synopsis__connect">
          The project brought together the LLM engineering concepts I had been
          learning and applied them to a practical business use case.
        </p>
      </Section>

      {/* How It Plays */}
      <Section label="How It Plays" title="How It Plays" subtitle="From customer question to AI-generated response." className="section--wide">
        <div className="flow">
          {HOW_IT_PLAYS.map((step, i) => (
            <React.Fragment key={step}>
              <div className={`flow__step ${i === HOW_IT_PLAYS.length - 1 ? "flow__step--accent" : ""}`}>{step}</div>
              {i < HOW_IT_PLAYS.length - 1 && <ArrowDown />}
            </React.Fragment>
          ))}
        </div>
      </Section>

      {/* The Knowledge Engine */}
      <Section label="The Knowledge Engine" title="Beyond the language model" className="section--wide">
        <div className="synopsis">
          <p>
            The chatbot doesn't rely solely on the language model. It can
            retrieve relevant information from a custom roofing knowledge base
            before generating an answer.
          </p>
        </div>
        <div className="flow">
          {KNOWLEDGE_ENGINE.map((step, i) => (
            <React.Fragment key={step}>
              <div className={`flow__step ${i === KNOWLEDGE_ENGINE.length - 1 ? "flow__step--accent" : ""}`}>{step}</div>
              {i < KNOWLEDGE_ENGINE.length - 1 && <ArrowDown />}
            </React.Fragment>
          ))}
        </div>
      </Section>

      {/* RAG in Action */}
      <Section label="RAG In Action" title="Retrieval-Augmented Generation" className="section--wide">
        <div className="rag-demo">
          <div className="rag-demo__bubble rag-demo__bubble--user">
            What should I do if my roof starts leaking?
          </div>
          <div className="rag-demo__bubble rag-demo__bubble--system">
            Searching roofing knowledge base...
            <div className="rag-demo__chip-row">
              {RAG_RETRIEVAL_RESULTS.map((r) => (
                <span className="rag-demo__chip" key={r}>{r}</span>
              ))}
            </div>
          </div>
          <div className="rag-demo__bubble rag-demo__bubble--system">
            Question + Retrieved Context + Instructions &rarr; OpenAI
          </div>
          <div className="rag-demo__bubble rag-demo__bubble--bot">
            Here's what to do right away, and how RoofPro AI can help you plan
            the repair from here.
          </div>
        </div>
      </Section>

      {/* What I Built */}
      <Section label="What I Built" title="Features" className="section--wide">
        <div className="feature-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <p className="feature-card__tag">{f.tag}</p>
              <p className="feature-card__title">{f.title}</p>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Customer Journey */}
      <Section label="The Customer Journey" title="From question to lead" className="section--wide">
        <div className="journey">
          {JOURNEY.map((step, i) => (
            <React.Fragment key={step}>
              <div className="journey__node">
                <span className="journey__dot" />
                <span className="journey__label">{step}</span>
              </div>
              {i < JOURNEY.length - 1 && <div className="journey__connector" />}
            </React.Fragment>
          ))}
        </div>
        <div className="journey-example">
          <div className="journey-example__row">
            <span className="journey-example__who">Customer</span>
            <span className="journey-example__what">&ldquo;I need to repair my roof.&rdquo;</span>
          </div>
          <div className="journey-example__row">
            <span className="journey-example__who">RoofPro AI</span>
            <span className="journey-example__what">&ldquo;Let's understand the problem.&rdquo;</span>
          </div>
          <div className="journey-example__row">
            <span className="journey-example__who">Customer</span>
            <span className="journey-example__what">Provides details.</span>
          </div>
          <div className="journey-example__row">
            <span className="journey-example__who">RoofPro AI</span>
            <span className="journey-example__what">Provides relevant guidance and approximate information.</span>
          </div>
          <div className="journey-example__row">
            <span className="journey-example__who">Outcome</span>
            <span className="journey-example__what">Potential customer &rarr; lead captured.</span>
          </div>
        </div>
      </Section>

      {/* Behind The System */}
      <Section label="Behind The System" title="Architecture" className="section--wide">
        <div className="arch-tree">
          <div className="arch-node arch-node--root">ROOFPRO AI</div>
          <ArrowDown />
          <div className="arch-node">Flask Web UI</div>
          <ArrowDown />
          <div className="arch-node">Flask Backend</div>
          <ArrowDown />
          <div className="arch-branch-row">
            <div className="arch-node">Query Processing</div>
            <div className="arch-node">Emergency Handling</div>
            <div className="arch-node">Estimate Logic</div>
          </div>
          <ArrowDown />
          <div className="arch-node">RAG Pipeline</div>
          <ArrowDown />
          <div className="arch-node">FAISS Retrieval</div>
          <ArrowDown />
          <div className="arch-node">OpenAI LLM</div>
          <ArrowDown />
          <div className="arch-node arch-node--root">Final Response</div>
          <ArrowDown />
          <div className="arch-node">Lead Capture</div>
          <ArrowDown />
          <div className="arch-node">Google Sheets</div>
        </div>
      </Section>

      {/* Behind The AI */}
      <Section label="Behind The AI" title="The RAG pipeline, zoomed in" className="section--wide">
        <div className="ai-pipeline">
          {["User Question", "Query Embedding", "FAISS Vector Search", "Relevant Document Chunks", "Context Builder", "OpenAI LLM", "AI Response"].map((step, i, arr) => (
            <React.Fragment key={step}>
              <div className={`flow__step ${i === arr.length - 1 ? "flow__step--accent" : ""}`}>{step}</div>
              {i < arr.length - 1 && <ArrowDown />}
            </React.Fragment>
          ))}
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
        {/* EDIT ME: adjust to reflect your actual, verified contribution on this client project */}
        <div className="role-grid">
          {ROLE_CARDS.map((r) => (
            <div className="role-card" key={r.title}>
              <p className="role-card__title">{r.title}</p>
              <p className="role-card__desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Behind The Scenes */}
      <Section label="Behind The Scenes" title="What actually made this hard">
        {/* EDIT ME: adjust to reflect your actual challenges on this project */}
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

      {/* Why It Matters */}
      <Section label="Why It Matters" title="Business impact" className="section--wide">
        <p className="impact-formula">
          <span className="accent">AI Knowledge</span> + <span className="accent">Domain Knowledge</span> + <span className="accent">Conversational UX</span> + <span className="accent">Business Logic</span>
          <br />
          &darr;<br />
          AI-Powered Customer Experience
        </p>
        <div className="impact-grid">
          {IMPACT.map((item) => (
            <div className="impact-card" key={item.title}>
              <p className="impact-card__title">{item.title}</p>
              <p className="impact-card__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Watch */}
      <Section label="Watch" title="Product walkthrough">
        <div className="watch">
          <div className="watch__frame">
            <div className="watch__play-ring"><PlayIcon /></div>
            <p className="label" style={{ color: "var(--text-3)" }}>RoofPro AI Demo</p>
            {/* EDIT ME: swap for a real recording once one exists — don't fake a demo */}
            <p>Demo coming soon.</p>
            <div className="watch__progress" />
          </div>
          <p className="watch__caption">
            See the chatbot handle a roofing query, retrieve domain knowledge,
            generate a response, and guide the customer through the interaction.
          </p>
        </div>
      </Section>

      {/* Episode Transition */}
      <Section label="Episode Transition" title="Where this fits in the season" className="section--wide">
        <div className="transition-grid">
          <div className="transition-card">
            <p className="transition-card__label">Previously</p>
            <p className="transition-card__ep">EP06 — Into Production</p>
            <p className="transition-card__line">&ldquo;Contributing to a real client-facing application.&rdquo;</p>
          </div>
          <div className="transition-arrow">&rarr;</div>
          <div className="transition-card transition-card--current">
            <p className="transition-card__label">This Episode</p>
            <p className="transition-card__ep">EP07 — RoofPro AI</p>
            <p className="transition-card__line">&ldquo;Applying LLM engineering to a domain-specific AI product.&rdquo;</p>
          </div>
          <div className="transition-arrow">&rarr;</div>
          <div className="transition-card">
            <p className="transition-card__label">Next</p>
            <p className="transition-card__ep">EP08 — Trend Intelligence</p>
            <p className="transition-card__line">&ldquo;Working on a larger data and AI pipeline.&rdquo;</p>
          </div>
        </div>
        <div className="transition-cta">
          <button
            className="btn btn--primary"
            onClick={() => { window.location.href = "/originals/trend-intelligence"; }}
          >
            Continue To EP08
          </button>
        </div>
      </Section>
    </div>
  );
}