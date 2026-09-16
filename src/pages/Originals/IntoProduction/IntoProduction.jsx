import React, { useRef } from "react";
import Navbar from "../../../components/navigation/Navbar";

/* ------------------------------------------------------------------ */
/*  InternFlix — Original: Into Production (EP06)            */
/*  Route: /originals/into-production                       */
/*                                                                      */
/*  Single-file page. Only dependency is your existing Navbar          */
/*  component (imported above) — everything else (buttons, badges,     */
/*  footer, styles) is defined locally in this file.                   */
/*                                                                      */
/*  Career-story episode: the internship's first real client-facing    */
/*  engagement. Visual identity is intentionally corporate/product/    */
/*  frontend rather than AI, and language throughout is careful to     */
/*  say "contributed to" rather than "built" — this was work alongside */
/*  a senior developer on an existing codebase, not solo ownership.    */
/* ------------------------------------------------------------------ */

const CLIENT_CARDS = [
  { title: "Corporate Presence", detail: "A professional digital presence for the recruitment business." },
  { title: "Services", detail: "Communicate specialist recruitment capabilities." },
  { title: "Client Proof", detail: "Showcase major enterprise relationships and case studies." },
  { title: "Conversion", detail: "Guide prospective clients toward engagement." },
];

const STACK = [
  { title: "React", detail: "Component-based UI" },
  { title: "Vite", detail: "Development & build" },
  { title: "React Router", detail: "Page navigation" },
  { title: "Tailwind CSS", detail: "Responsive styling" },
  { title: "Framer Motion", detail: "Interaction & animation" },
  { title: "Lucide React", detail: "Interface icons" },
];

const CASE_STUDY_CLIENTS = ["Celonis", "Apple", "Palantir", "AVIV", "Behavox", "OverIT", "Oracle"];

const ROLE_CHIPS = ["React UI Development", "Page & Section Work", "Routing & Navigation", "Case Study Experience"];

const REQUIREMENT_FLOWS = [
  {
    steps: ["Case study needs to be accessible", "React Router + case-study components", "Dedicated client case-study pages"],
  },
  {
    steps: ["Multiple case studies", "Reusable page sections", "Consistent experience across clients"],
  },
];

const CHALLENGES = [
  { title: "Working With An Existing Codebase", detail: "Understanding existing components, structure and conventions before making changes." },
  { title: "Following An Existing Design Direction", detail: "Implementing the required design consistently, rather than building to personal preference." },
  { title: "Reusable Components", detail: "Keeping UI sections consistent across multiple pages and case studies." },
  { title: "Navigation", detail: "Handling consistent routing and navigation behaviour across pages and case studies." },
  { title: "Client Requirements", detail: "Reflecting the project's actual requirements rather than treating changes as isolated experiments." },
];

const LESSONS = [
  { title: "Working In A Team", detail: "Software development in a real project involves collaboration, feedback and working within an existing direction." },
  { title: "Understanding Existing Systems", detail: "Contributing effectively means understanding what already exists before changing it." },
  { title: "Building For Real Requirements", detail: "A production-style project requires balancing technical implementation with business and client requirements." },
];

const CAST_GROUPS = [
  { group: "Frontend", items: ["React", "JavaScript"] },
  { group: "UI", items: ["Tailwind CSS", "Lucide React", "Framer Motion"] },
  { group: "Application", items: ["Vite", "React Router"] },
  { group: "Content", items: ["Case Studies", "PDF Assets", "Static Resources"] },
];

/* ------------------------------ Local UI bits ------------------------------ */

function Button({ variant = "primary", as = "button", children, ...props }) {
  const Tag = as;
  return (
    <Tag className={`btn btn--${variant}`} {...props}>
      {children}
    </Tag>
  );
}

function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

function SectionTitle({ eyebrow, title }) {
  return (
    <>
      {eyebrow && <p className="label label--accent">{eyebrow}</p>}
      {title && <h2 className="section-title">{title}</h2>}
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__wordmark">INTERNFLIX</p>
      <p className="footer__tag">Season 1 was the internship. Season 2 is what comes next.</p>
    </footer>
  );
}

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M6 4.5v15l13-7.5-13-7.5Z" />
    </svg>
  );
}
function PlusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
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

/* --------------------------------- Page --------------------------------- */

export default function IntoProduction() {
  const synopsisRef = useRef(null);
  const watchRef = useRef(null);
  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="ep06">
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .ep06 {
          --bg: #050505;
          --surface: #101010;
          --surface-2: #181818;
          --surface-3: #222222;
          --text: #FFFFFF;
          --text-2: #B3B3B3;
          --text-3: #777777;
          --accent: #E50914;
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          min-height: 100vh;
        }
        .ep06 * { box-sizing: border-box; }
        .ep06 :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

        .ep06 .label {
          font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--text-2); font-weight: 600; margin: 0 0 0.6rem;
        }
        .ep06 .label--accent { color: var(--accent); }
        .ep06 .section-title { font-size: clamp(1.4rem, 2.4vw, 1.85rem); font-weight: 700; margin: 0 0 1.25rem; }

        .ep06 .btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          border: none; border-radius: 4px; padding: 0.8rem 1.6rem;
          font-size: 0.95rem; font-weight: 600; cursor: pointer;
          font-family: inherit; text-decoration: none;
          transition: background-color 0.15s ease, border-color 0.15s ease;
        }
        .ep06 .btn--primary { background: var(--accent); color: #fff; }
        .ep06 .btn--primary:hover { background: #c40812; }
        .ep06 .btn--ghost { background: var(--surface-3); color: var(--text); }
        .ep06 .btn--ghost:hover { background: #2c2c2c; }

        .ep06 .badge {
          display: inline-block; background: var(--surface-2); border: 1px solid var(--surface-3);
          padding: 0.45rem 0.95rem; border-radius: 20px; font-size: 0.8rem; color: var(--text-2);
        }

        .ep06 .footer { border-top: 1px solid var(--surface-2); padding: 2.5rem 3rem 3rem; text-align: center; }
        .ep06 .footer__wordmark { color: var(--accent); font-weight: 800; letter-spacing: 0.08em; margin: 0 0 0.5rem; }
        .ep06 .footer__tag { color: var(--text-3); font-size: 0.85rem; margin: 0; }

        /* Hero */
        .ep06-hero {
          position: relative;
          min-height: 78vh;
          display: flex;
          align-items: flex-end;
          padding: 6rem 3rem 3.5rem;
          overflow: hidden;
          background: var(--bg);
        }

        /* Background image — full hero, no hard crop */
        .ep06-hero__image-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .ep06-hero__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0.9;
          display: block;
        }

        /* Netflix-style dissolve: image fades naturally into the black content side */
        .ep06-hero__scrim {
          position: absolute;
          inset: 0;
          z-index: 2;

          background:
            linear-gradient(
              90deg,
              #050505 0%,
              rgba(5, 5, 5, 0.99) 13%,
              rgba(5, 5, 5, 0.94) 25%,
              rgba(5, 5, 5, 0.76) 37%,
              rgba(5, 5, 5, 0.48) 49%,
              rgba(5, 5, 5, 0.20) 63%,
              rgba(5, 5, 5, 0.06) 78%,
              rgba(5, 5, 5, 0) 100%
            ),
            linear-gradient(
              to top,
              #050505 0%,
              rgba(5, 5, 5, 0.82) 14%,
              rgba(5, 5, 5, 0.18) 42%,
              rgba(5, 5, 5, 0) 72%
            ),
            linear-gradient(
              to bottom,
              rgba(5, 5, 5, 0.38) 0%,
              rgba(5, 5, 5, 0) 28%
            );
        }

        /* Hero content */
        .ep06-hero__content {
          position: relative;
          z-index: 3;
          max-width: 620px;
          margin-left: 0;
        }

        .ep06-hero__meta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          color: var(--text-3);
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }

        .ep06-hero__title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          line-height: 1.05;
          margin: 0 0 1.1rem;
        }

        .ep06-hero__tagline {
          color: var(--text-2);
          font-size: 1.1rem;
          line-height: 1.55;
          font-style: italic;
          margin: 0 0 1.6rem;
          max-width: 480px;
        }

        .ep06-hero__actions {
          display: flex;
          gap: 0.9rem;
          flex-wrap: wrap;
        }

        /* Section shell */
        .ep06-section { padding: 4rem 3rem; border-top: 1px solid var(--surface-2); }
        .ep06-section__inner { max-width: 780px; margin: 0 auto; }
        .ep06-section--wide .ep06-section__inner { max-width: 1080px; }
        .ep06-body { color: var(--text-2); line-height: 1.75; font-size: 1.05rem; max-width: 660px; margin: 0 0 1.1rem; }
        .ep06-body:last-child { margin-bottom: 0; }

        /* The Shift */
        .shift {
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
        }
        .shift__box {
          width: 100%; max-width: 420px;
          background: var(--surface-2); border: 1px solid var(--surface-3);
          border-radius: 8px; padding: 1.25rem 1.5rem;
        }
        .shift__box-label { font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin: 0 0 0.6rem; }
        .shift__tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .shift__tag { background: var(--surface-3); border-radius: 4px; padding: 0.3rem 0.65rem; font-size: 0.8rem; color: var(--text-2); }
        .shift__box--mid {
          background: #1c0d0e; border-color: var(--accent);
          text-align: center; font-weight: 700; padding: 0.9rem 1.5rem;
          max-width: 260px;
        }

        /* 4-card grid (client brief) */
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .grid-card {
          background: var(--surface-2); border: 1px solid var(--surface-3);
          border-radius: 6px; padding: 1.25rem 1.3rem;
        }
        .grid-card__title { font-weight: 700; font-size: 0.95rem; margin: 0 0 0.45rem; }
        .grid-card__detail { color: var(--text-2); font-size: 0.85rem; line-height: 1.5; margin: 0; }

        /* Row of cards (stack) */
        .row { display: flex; gap: 1rem; overflow-x: auto; scrollbar-width: none; padding-bottom: 0.25rem; }
        .row::-webkit-scrollbar { display: none; }
        .stack-card { flex: 0 0 170px; background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 6px; padding: 1.1rem; }
        .stack-card__title { font-weight: 700; font-size: 0.95rem; margin: 0 0 0.35rem; }
        .stack-card__detail { color: var(--text-3); font-size: 0.78rem; margin: 0; }

        /* Architecture tree */
        .tree { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; }
        .tree__node {
          background: var(--surface-2); border: 1px solid var(--surface-3);
          border-radius: 6px; padding: 0.7rem 1.2rem; font-weight: 600; font-size: 0.9rem;
        }
        .tree__node--root { border-color: var(--accent); background: #1c0d0e; }
        .tree__row { display: flex; gap: 0.6rem; flex-wrap: wrap; justify-content: center; }
        .tree__row .tree__node { font-size: 0.82rem; font-weight: 500; }

        .pipeline { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; margin-top: 2rem; }
        .pipeline__step { width: 100%; max-width: 380px; text-align: center; background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 6px; padding: 0.7rem 1rem; font-size: 0.85rem; color: var(--text-2); }

        /* Case study */
        .case-flow { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; margin-bottom: 2rem; }
        .case-flow__client {
          background: #1c0d0e; border: 1px solid var(--accent); border-radius: 6px;
          padding: 0.7rem 1.4rem; font-weight: 700;
        }
        .case-flow__step { width: 100%; max-width: 340px; text-align: center; background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 6px; padding: 0.65rem 1rem; font-size: 0.85rem; color: var(--text-2); }
        .client-chips { display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: center; }
        .client-chip { background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 20px; padding: 0.5rem 1.1rem; font-size: 0.85rem; color: var(--text-2); }

        /* My role */
        .role-chips { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .role-chip {
          background: var(--surface-2); border: 1px solid var(--surface-3);
          border-radius: 6px; padding: 0.9rem 1.3rem; font-weight: 600; font-size: 0.9rem;
        }

        /* Requirement -> Interface */
        .req-flows { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .req-flow { display: flex; flex-direction: column; align-items: center; gap: 0.3rem; }
        .req-flow__step { width: 100%; text-align: center; background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 6px; padding: 0.7rem 0.9rem; font-size: 0.85rem; color: var(--text-2); }
        .req-flow__step:last-child { border-color: var(--accent); background: #1c0d0e; color: var(--text); font-weight: 600; }

        /* Behind the scenes / lessons */
        .card-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .card-grid--3 { grid-template-columns: repeat(3, 1fr); }
        .info-card { background: var(--surface-2); border: 1px solid var(--surface-3); border-radius: 6px; padding: 1.25rem 1.4rem; }
        .info-card__title { font-weight: 700; font-size: 0.95rem; margin: 0 0 0.5rem; }
        .info-card__detail { color: var(--text-2); font-size: 0.88rem; line-height: 1.55; margin: 0; }

        /* Cast groups */
        .cast-groups { display: flex; flex-direction: column; gap: 1.25rem; }
        .cast-group__label { font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin: 0 0 0.6rem; }
        .cast-group__items { display: flex; flex-wrap: wrap; gap: 0.6rem; }

        /* Watch */
        .ep06-watch { text-align: left; }
        .ep06-watch__frame { border: 1px dashed var(--surface-3); border-radius: 8px; background: var(--surface-2); padding: 3rem 2rem; margin-bottom: 1.5rem; text-align: center; }
        .ep06-watch__note { color: var(--text-3); margin: 0; font-size: 0.95rem; }

        /* Episode transition */
        .transition { padding: 4.5rem 2rem 5rem; max-width: 720px; margin: 0 auto; border-top: 1px solid var(--surface-2); }
        .transition__row { display: flex; align-items: flex-start; gap: 1rem; padding: 1rem 0; }
        .transition__row .label { margin: 0 0 0.3rem; }
        .transition__quote { color: var(--text-2); font-style: italic; margin: 0; line-height: 1.55; }
        .transition__row--current { border-left: 2px solid var(--accent); padding-left: 1.25rem; margin-left: -1.25rem; }
        .transition__arrow { text-align: center; color: var(--text-3); }
        .transition__card {
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          color: inherit;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
        }

        .transition__card:hover .transition__ep {
          color: var(--accent);
        }

        .transition__ep {
          font-weight: 700;
          font-size: 1rem;
          margin: 0 0 0.5rem;
          transition: color 0.15s ease;
        }

        .transition-cta {
          text-align: center;
          margin-top: 2rem;
        }

        @media (max-width: 1199px) {
        .ep06-hero,
        .ep06-section {
          padding-left: 2rem;
          padding-right: 2rem;
        }

        .explore-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 380px) {
        .ep06-hero {
          min-height: 62vh;
          padding-left: 0.85rem;
          padding-right: 0.85rem;
        }

        .ep06-hero__title {
          font-size: 2.15rem;
        }

        .ep06-hero__actions {
          flex-direction: column;
          align-items: stretch;
        }

        .ep06-hero__actions .btn {
          width: 100%;
          justify-content: center;
        }
      }

      @media (max-width: 767px) {
        .ep06-hero,
        .ep06-section {
          padding-left: 1.1rem;
          padding-right: 1.1rem;
        }

        .ep06-hero {
          min-height: 58vh;
          padding-top: 5rem;
        }

        .ep06-hero .hero-art {
          display: none;
        }

        /* Keep the complete image on mobile */
        .ep06-hero__image-wrap {
          inset: 0;
        }

        .ep06-hero__image {
          object-position: center center;
        }

        /* Mobile: fade the image vertically into the black content area */
        .ep06-hero__scrim {
          background:
            linear-gradient(
              180deg,
              rgba(5, 5, 5, 0.12) 0%,
              rgba(5, 5, 5, 0.28) 25%,
              rgba(5, 5, 5, 0.68) 48%,
              rgba(5, 5, 5, 0.94) 68%,
              #050505 88%,
              #050505 100%
            );
        }

        .ep06-hero__content {
          max-width: 100%;
          margin-left: 0;
        }

        .ep06-hero__meta {
          font-size: 0.72rem;
          gap: 0.55rem;
          margin-bottom: 0.8rem;
        }

        .ep06-hero__title {
          font-size: clamp(2.25rem, 10vw, 3.4rem);
          line-height: 1.02;
          margin-bottom: 0.9rem;
        }

        .ep06-hero__tagline {
          font-size: 0.98rem;
          line-height: 1.5;
          max-width: 100%;
          margin-bottom: 1.25rem;
        }

        .ep06-hero__actions {
          gap: 0.6rem;
        }

        .ep06-hero__actions .btn {
          padding: 0.72rem 1rem;
          font-size: 0.88rem;
        }
      }
      `}</style>

      

      {/* 01 Hero */}
      <header className="ep06-hero">

        {/* Background image */}
        <div className="ep06-hero__image-wrap">
          <img
            src="/images/intopro.png"
            alt=""
            className="ep06-hero__image"
          />
        </div>

        {/* Netflix-style dark gradient */}
        <div className="ep06-hero__scrim" aria-hidden="true" />

        <div className="ep06-hero__content">
          <div className="ep06-hero__meta">
            <span>S1 &middot; EP06</span>
            <span>CLIENT PROJECT &middot; FRONTEND &middot; REACT</span>
          </div>

          <h1 className="ep06-hero__title">
            Into Production
          </h1>

          <p className="ep06-hero__tagline">
            &ldquo;From building experiments to building for a real client.&rdquo;
          </p>

          <div className="ep06-hero__actions">
            <Button
              variant="primary"
              onClick={() => scrollTo(watchRef)}
            >
              <PlayIcon /> Watch Project
            </Button>

            <Button
              variant="ghost"
              onClick={() => scrollTo(synopsisRef)}
            >
              <PlusIcon /> More Info
            </Button>
          </div>
        </div>

      </header>

      {/* 02 Synopsis */}
      <section className="ep06-section" ref={synopsisRef}>
        <div className="ep06-section__inner">
          <SectionTitle eyebrow="Synopsis" />
          <p className="ep06-body">
            During the internship, I joined a real client project alongside a
            senior developer and contributed to the frontend development of a
            corporate technology recruitment website for Selected Group.
          </p>
          <p className="ep06-body">
            Working on an existing project introduced a different kind of
            engineering challenge — understanding an established codebase,
            following an existing design direction, building reusable UI
            components, and making changes within real client requirements.
          </p>
        </div>
      </section>

      {/* 03 The Shift */}
      <section className="ep06-section">
        <div className="ep06-section__inner">
          <SectionTitle eyebrow="The Shift" title="From personal experiments to a real product." />
          <div className="shift">
            <div className="shift__box">
              <p className="shift__box-label">My Learning</p>
              <div className="shift__tags">
                <span className="shift__tag">LLMs</span>
                <span className="shift__tag">LangChain</span>
                <span className="shift__tag">Automation</span>
                <span className="shift__tag">AI Experiments</span>
              </div>
            </div>
            <ArrowDown />
            <div className="shift__box shift__box--mid">Real Client Project</div>
            <ArrowDown />
            <div className="shift__box">
              <p className="shift__box-label">Existing Codebase</p>
              <div className="shift__tags">
                <span className="shift__tag">React</span>
                <span className="shift__tag">Components</span>
                <span className="shift__tag">Routing</span>
                <span className="shift__tag">UI</span>
                <span className="shift__tag">Client Requirements</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 The Client Brief */}
      <section className="ep06-section ep06-section--wide">
        <div className="ep06-section__inner">
          <SectionTitle eyebrow="The Brief" title="Selected Group — Technology Recruitment" />
          <p className="ep06-body">
            The goal: build a premium digital presence that communicates the
            company&rsquo;s recruitment expertise, services, clients and
            successful enterprise engagements.
          </p>
          <div className="grid-4">
            {CLIENT_CARDS.map((c) => (
              <div className="grid-card" key={c.title}>
                <p className="grid-card__title">{c.title}</p>
                <p className="grid-card__detail">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 Behind The Frontend */}
      <section className="ep06-section ep06-section--wide">
        <div className="ep06-section__inner">
          <SectionTitle eyebrow="Behind The Frontend" title="What I worked with" />
          <div className="row">
            {STACK.map((s) => (
              <div className="stack-card" key={s.title}>
                <p className="stack-card__title">{s.title}</p>
                <p className="stack-card__detail">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 Website Architecture */}
      <section className="ep06-section ep06-section--wide">
        <div className="ep06-section__inner">
          <SectionTitle eyebrow="Website Architecture" title="How the product was structured" />
          <div className="tree">
            <div className="tree__node tree__node--root">Selected Group Website</div>
            <div className="tree__row">
              <div className="tree__node">Home</div>
              <div className="tree__node">About</div>
              <div className="tree__node">Services</div>
            </div>
            <ArrowDown />
            <div className="tree__node">Case Studies</div>
            <div className="tree__row">
              {CASE_STUDY_CLIENTS.map((c) => (
                <div className="tree__node" key={c}>{c}</div>
              ))}
            </div>
          </div>
          <div className="pipeline">
            {["React", "React Router", "Page Components", "Reusable UI Sections", "Static Assets / PDFs"].map((step, i, arr) => (
              <React.Fragment key={step}>
                <div className="pipeline__step">{step}</div>
                {i < arr.length - 1 && <ArrowDown />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 07 The Case Study System */}
      <section className="ep06-section ep06-section--wide">
        <div className="ep06-section__inner">
          <SectionTitle eyebrow="The Case Study System" title="Building the case study experience" />
          <div className="case-flow">
            <div className="case-flow__client">Celonis</div>
            <ArrowDown />
            {["Challenge", "Recruitment Mandate", "Solution", "Results", "Business Impact", "Download PDF"].map((step, i, arr) => (
              <React.Fragment key={step}>
                <div className="case-flow__step">{step}</div>
                {i < arr.length - 1 && <ArrowDown />}
              </React.Fragment>
            ))}
          </div>
          <div className="client-chips">
            {CASE_STUDY_CLIENTS.map((c) => (
              <span className="client-chip" key={c}>{c}</span>
            ))}
          </div>
          <p className="ep06-body" style={{ marginTop: "1.75rem" }}>
            The website wasn&rsquo;t simply a collection of pages — the case
            studies created a structured way to communicate Selected
            Group&rsquo;s recruitment impact.
          </p>
        </div>
      </section>

      {/* 08 My Role */}
      <section className="ep06-section">
        <div className="ep06-section__inner">
          <SectionTitle eyebrow="My Role" />
          <p className="ep06-body">
            I contributed to the frontend development of the Selected Group
            corporate website while working alongside a senior developer. My
            work involved implementing and refining React-based UI sections,
            working with the existing component structure, handling page
            layouts and interactions, and contributing to the case-study and
            navigation experience.
          </p>
          <div className="role-chips">
            {ROLE_CHIPS.map((r) => (
              <span className="role-chip" key={r}>{r}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 09 From Requirement to Interface */}
      <section className="ep06-section ep06-section--wide">
        <div className="ep06-section__inner">
          <SectionTitle eyebrow="From Requirement To Interface" />
          <div className="req-flows">
            {REQUIREMENT_FLOWS.map((flow, idx) => (
              <div className="req-flow" key={idx}>
                {flow.steps.map((step, i, arr) => (
                  <React.Fragment key={step}>
                    <div className="req-flow__step">{step}</div>
                    {i < arr.length - 1 && <ArrowDown />}
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 Behind The Scenes */}
      <section className="ep06-section ep06-section--wide">
        <div className="ep06-section__inner">
          <SectionTitle eyebrow="Behind The Scenes" title="Real engineering challenges" />
          <div className="card-grid">
            {CHALLENGES.map((c) => (
              <div className="info-card" key={c.title}>
                <p className="info-card__title">{c.title}</p>
                <p className="info-card__detail">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 What This Project Taught Me */}
      <section className="ep06-section ep06-section--wide">
        <div className="ep06-section__inner">
          <SectionTitle eyebrow="What This Project Taught Me" />
          <div className="card-grid card-grid--3">
            {LESSONS.map((l) => (
              <div className="info-card" key={l.title}>
                <p className="info-card__title">{l.title}</p>
                <p className="info-card__detail">{l.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12 Cast & Technology */}
      <section className="ep06-section">
        <div className="ep06-section__inner">
          <SectionTitle eyebrow="Cast &amp; Technology" />
          <div className="cast-groups">
            {CAST_GROUPS.map((g) => (
              <div key={g.group}>
                <p className="cast-group__label">{g.group}</p>
                <div className="cast-group__items">
                  {g.items.map((i) => (
                    <Badge key={i}>{i}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13 Watch */}
      <section className="ep06-section" ref={watchRef}>
        <div className="ep06-section__inner ep06-watch">
          <SectionTitle eyebrow="Project Walkthrough" />
          <div className="ep06-watch__frame">
            <p className="label" style={{ color: "var(--text-3)" }}>Selected Group Website</p>
            <p className="ep06-watch__note">No recorded walkthrough added yet — swap this frame for a video, live embed, or screenshots once one exists.</p>
          </div>
          <Button variant="ghost">
            <PlayIcon /> Play Project Walkthrough
          </Button>
        </div>
      </section>

      {/* 14 Episode Transition */}
      <section className="transition">
        <div className="transition__row">
          <button
            className="transition__card"
            onClick={() => {
              window.location.href = "/originals/ai-support-desk";
            }}
          >
            <p className="label" style={{ color: "var(--text-3)" }}>
              Previously · EP05
            </p>
            <p className="transition__ep">AI Support Desk</p>
            <p className="transition__quote">
              “I learned how automation could transform an unstructured support workflow.”
            </p>
          </button>
        </div>

        <div className="transition__arrow">
          <ArrowDown />
        </div>

        <div className="transition__row transition__row--current">
          <div>
            <p className="label label--accent">
              This Episode · EP06
            </p>
            <p className="transition__ep">Into Production</p>
            <p className="transition__quote">
              “I moved from building experiments to contributing to a real client-facing product.”
            </p>
          </div>
        </div>

        <div className="transition__arrow">
          <ArrowDown />
        </div>

        <div className="transition__row">
          <button
            className="transition__card"
            onClick={() => {
              window.location.href = "/originals/roofpro-ai";
            }}
          >
            <p className="label" style={{ color: "var(--text-3)" }}>
              Next · EP07
            </p>
            <p className="transition__ep">RoofPro AI</p>
            <p className="transition__quote">
              “I took what I had learned and applied AI to a practical industry problem.”
            </p>
          </button>
        </div>

        <div className="transition-cta">
          <button
            className="btn btn--primary"
            onClick={() => {
              window.location.href = "/originals/roofpro-ai";
            }}
          >
            Continue To EP07
          </button>
        </div>
      </section>
    </div>
  );
}