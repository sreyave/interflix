
import Navbar from "../../components/navigation/Navbar";
import React, { useState, useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  InternFlix — Journey (Season 1)                                    */
/*  Chronological timeline of the internship, EP01–EP08.               */
/*  Route: /journey                                                    */
/*                                                                      */
/*  EDIT ME: dates/periods for EP02–EP08 are left as placeholders —    */
/*  only EP01's date (24 Feb 2026) was given in the brief. Fill in     */
/*  real periods once you have them.                                   */
/* ------------------------------------------------------------------ */

import { useNavigate } from "react-router-dom";


/* =========================================================
   DATA
   ========================================================= */

const SEASON_CARDS = [
  { num: "01", title: "THE BEGINNING", date: "24 FEB 2026", target: "ep00" },
  { num: "02", title: "AI EXPLORATION", date: "MARCH", target: "ep01" },
  { num: "03", title: "BUILDING", date: "APRIL", target: "ep03" },
  { num: "04", title: "THE FIRST CLIENT", date: "MAY", target: "ep05" },
  { num: "05", title: "REAL CLIENT WORK", date: "MAY → PRESENT", target: "ep06" },
];

const NAV_STOPS = [
  { label: "FEB", target: "ep00" },
  { label: "MAR", target: "ep01" },
  { label: "APR", target: "ep03" },
  { label: "MAY", target: "ep05" },
  { label: "NOW", target: "ep08" },
];

const MILESTONES = [
  {
    id: "ep00",
    date: "24 FEBRUARY 2026",
    chapter: "EP00 / THE BEGINNING",
    title: "THE FIRST DAY",
    tagline: "Every journey starts before you know where it will lead.",
    story: [
      "I joined my internship on 24 February 2026.",
      "It was the beginning of a completely new professional experience. I was entering an environment where I would have to learn new technologies, understand new ways of working, and gradually figure out where I could contribute.",
    ],
    glyph: "day1",
    extra: {
      heading: "FIRST IMPRESSION",
      text: "I knew I had a lot to learn. I didn't know yet how much this internship would change the way I approached technology and problem-solving.",
    },
    accent: false,
  },
  {
    id: "ep01",
    date: "MARCH 2026",
    chapter: "EP01 / EXPLORATION",
    title: "INTO THE AI WORLD",
    tagline: "Before building systems, I had to understand the possibilities.",
    story: [
      "During my first month, I explored the rapidly expanding world of AI.",
      "I learned about LLMs, LangChain, RAG, AI agents and automation while experimenting with different approaches and tools.",
    ],
    glyph: "explore",
    flow: ["LLMs", "LangChain", "RAG", "AI Agents", "Automation"],
    learningMap: ["LLMs", "LangChain", "RAG", "AI Agents", "Prompt Engineering", "Automation", "Zapier", "n8n"],
    extra: {
      heading: "WHAT CHANGED?",
      text: "I moved from simply reading about AI to experimenting with it.",
    },
    accent: false,
  },
  {
    id: "ep02",
    date: "MARCH 2026",
    chapter: "EP02 / FIRST BUILDS",
    title: "FROM LEARNING TO AUTOMATION",
    tagline: "Learning became more meaningful when I started building.",
    glyph: "builds",
    projects: [
      {
        title: "SIP INVESTMENT ADVISOR",
        flow: ["Schedule", "Market Data API", "Google Sheets", "Calculations", "Decision Rules", "Zapier Paths", "Slack"],
        desc: "A rule-based market decision-support automation that explored how scheduled data collection, calculations and decision routing could produce a daily alert.",
        route: "/originals/sip-investment-advisor",
      },
      {
        title: "AI SUPPORT DESK",
        flow: ["Customer Email", "Gmail", "Zapier", "AI Analysis", "Structured Output", "Google Sheets", "Response"],
        desc: "An AI-powered customer-support workflow that explored how unstructured email could be transformed into category, sentiment, priority, summary and suggested response.",
        route: "/originals/ai-support-desk",
      },
    ],
    learned: [
      "Automation is about the entire workflow, not just one step.",
      "AI output becomes more useful when it can feed another system.",
      "Building exposes problems that tutorials don't.",
    ],
    accent: false,
  },
  {
    id: "ep03",
    date: "APRIL 2026",
    chapter: "EP03 / PRACTICAL AI",
    title: "BUILDING ROOFPRO AI",
    tagline: "From experimenting with AI to designing a domain-specific system.",
    story: ["I started building a more complete AI application: an AI-powered roofing assistant using Retrieval-Augmented Generation."],
    glyph: "roofpro",
    architecture: ["User", "Flask", "Intent / Business Logic", "RAG · Emergency · Estimate", "Knowledge Base / Rules / Calculation", "OpenAI", "Response"],
    ragFlow: ["Roofing PDF", "Text Extraction", "Chunks", "Retrieval", "Relevant Context", "AI Response"],
    features: ["RAG Knowledge Retrieval", "Emergency Handling", "Cost Estimation", "Lead Capture", "Conversation State", "Controlled Responses"],
    note: "Designed to ground responses in the provided knowledge base and provide a fallback when relevant context is unavailable.",
    extra: {
      heading: "WHAT THIS TAUGHT ME",
      text: "AI applications are not only about the model. They also require retrieval, rules, state, data and business logic.",
    },
    route: "/originals/roofpro-ai",
    accent: false,
  },
  {
    id: "ep04",
    date: "APRIL 2026",
    chapter: "EP04 / WORKING WITH OTHERS",
    title: "LEARNING THROUGH COLLABORATION",
    tagline: "Building isn't always a solo process.",
    story: ["During this period I also contributed to the frontend development of the Selected Group client website, while working alongside a senior developer."],
    glyph: "collab",
    flow: ["Requirement", "Discussion", "Implementation", "Review", "Refinement"],
    tech: ["React", "Vite", "React Router", "Tailwind CSS", "Framer Motion", "Lucide React"],
    learned: [
      "Working inside an existing codebase",
      "Understanding requirements",
      "Implementing feedback",
      "Working with a senior developer",
      "Building for an actual product context",
    ],
    route: "/originals/into-production",
    accent: false,
  },
  {
    id: "ep05",
    date: "MAY 2026",
    chapter: "EP05 / THE TURNING POINT",
    title: "THE FIRST CLIENT INTERVIEW",
    tagline: "One POC became an opportunity.",
    story: [
      "In May, I presented the AI-Powered Roofing Assistant POC during my first client interview.",
      "I was nervous because this was my first client interview. But I went through the discussion and was selected.",
    ],
    glyph: "turning-point",
    sequence: ["RoofPro AI POC", "Client Interview", "Technical Discussion", "Selected"],
    accent: true,
  },
  {
    id: "ep06",
    date: "MAY 2026 → PRESENT",
    chapter: "EP06 / REAL CLIENT WORK",
    title: "THE CLIENT CHAPTER",
    tagline: "This is where learning became real work.",
    story: [
      "After getting selected, I continued working with the same client.",
      "This became a different kind of learning environment. Instead of building only for experimentation, I was working through real requirements, real problems, debugging, iteration and project development.",
    ],
    glyph: "client",
    flow: ["Client", "Requirement", "Development", "Debugging", "Review", "Iteration", "Improvement"],
    accent: false,
  },
  {
    id: "ep07",
    date: "MAY 2026 → PRESENT",
    chapter: "EP07 / TREND INTELLIGENCE",
    title: "BUILDING TREND INTELLIGENCE",
    tagline: "From individual AI experiments to a larger intelligence pipeline.",
    glyph: "trend",
    architecture: [
      "Data Sources", "LinkedIn / Reddit", "Collection", "Normalization", "Filtering", "Deduplication",
      "Ranking", "Embeddings", "Clustering", "Keywords", "AI Analysis", "Executive Summary", "Report",
    ],
    workedOn: [
      "Data collection pipeline", "LinkedIn / Reddit processing", "Data normalization", "Deduplication",
      "Content filtering", "Ranking logic", "Top comments", "Embeddings", "Clustering",
      "Keyword extraction", "AI analysis", "Report generation", "API/service refactoring",
      "Debugging", "Pipeline refinement",
    ],
    note: "Contributed to and worked on different parts of the pipeline, debugging and refining services as the system evolved.",
    growthFlow: ["Problem", "Investigate", "Debug", "Change", "Test", "Refine"],
    route: "/originals/trend-intelligence",
    accent: true,
  },
  {
    id: "ep08",
    date: "SEPTEMBER 2026",
    chapter: "EP08 / CURRENTLY",
    title: "STILL IN PROGRESS",
    tagline: "The season isn't over.",
    story: [
      "My internship journey is still ongoing.",
      "The biggest change isn't a single technology I learned or a single project I built. It's the progression from exploring unfamiliar ideas to working through real problems and contributing to real project development.",
    ],
    glyph: "current",
    progression: ["Explore", "Learn", "Experiment", "Build", "Collaborate", "Contribute", "Solve", "Keep Learning"],
    skills: [
      "AI & LLMs", "Automation", "RAG", "Prompt Engineering", "LangChain", "Data Processing",
      "APIs", "Frontend Development", "Debugging", "System Thinking", "Collaboration", "Client Communication",
    ],
    accent: false,
  },
];

/* =========================================================
   SMALL SHARED COMPONENTS
   ========================================================= */

function FlowChain({ items, vertical = true }) {
  return (
    <div className={`flow-chain ${vertical ? "flow-chain--v" : "flow-chain--h"}`}>
      {items.map((step, i) => (
        <React.Fragment key={step + i}>
          <span className="flow-step">{step}</span>
          {i < items.length - 1 && <span className="flow-arrow" aria-hidden="true">{vertical ? "↓" : "→"}</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

function TagList({ items }) {
  return (
    <div className="tag-list">
      {items.map((t) => (
        <span className="tag-pill" key={t}>{t}</span>
      ))}
    </div>
  );
}

function EpisodeButton({ route, label = "EXPLORE EPISODE" }) {
  const navigate = useNavigate();
  if (!route) return null;
  const handleClick = () => {
      navigate(route);

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
      }, 50);
    };

    return (
      <button className="btn-episode" onClick={handleClick}>
        {label} <span aria-hidden="true">›</span>
      </button>
  );
}

/* Chapter glyphs — small inline SVG motifs, no external assets */
function ChapterGlyph({ type }) {
  const common = { width: 56, height: 56, viewBox: "0 0 56 56", "aria-hidden": true };
  switch (type) {
    case "day1":
      return (
        <svg {...common}>
          <rect x="10" y="16" width="36" height="24" rx="2" fill="none" stroke="var(--nf-red)" strokeWidth="2" />
          <rect x="16" y="42" width="24" height="3" rx="1.5" fill="var(--nf-red)" />
          <circle cx="28" cy="28" r="4" fill="var(--nf-red)" />
        </svg>
      );
    case "explore":
      return (
        <svg {...common}>
          <circle cx="28" cy="16" r="4" fill="var(--nf-red)" />
          <circle cx="14" cy="34" r="4" fill="var(--nf-white)" opacity="0.6" />
          <circle cx="42" cy="34" r="4" fill="var(--nf-white)" opacity="0.6" />
          <circle cx="28" cy="46" r="4" fill="var(--nf-white)" opacity="0.6" />
          <line x1="28" y1="16" x2="14" y2="34" stroke="var(--nf-grey)" strokeWidth="1.5" />
          <line x1="28" y1="16" x2="42" y2="34" stroke="var(--nf-grey)" strokeWidth="1.5" />
          <line x1="14" y1="34" x2="28" y2="46" stroke="var(--nf-grey)" strokeWidth="1.5" />
          <line x1="42" y1="34" x2="28" y2="46" stroke="var(--nf-grey)" strokeWidth="1.5" />
        </svg>
      );
    case "builds":
      return (
        <svg {...common}>
          <path d="M14 40 L22 20 L30 40" fill="none" stroke="var(--nf-red)" strokeWidth="2" />
          <circle cx="40" cy="20" r="6" fill="none" stroke="var(--nf-white)" strokeWidth="2" opacity="0.7" />
          <path d="M40 26 v10" stroke="var(--nf-white)" strokeWidth="2" opacity="0.7" />
        </svg>
      );
    case "roofpro":
      return (
        <svg {...common}>
          <path d="M10 30 L28 14 L46 30" fill="none" stroke="var(--nf-red)" strokeWidth="2" />
          <rect x="16" y="30" width="24" height="14" fill="none" stroke="var(--nf-white)" strokeWidth="2" opacity="0.7" />
          <circle cx="40" cy="16" r="6" fill="none" stroke="var(--nf-red)" strokeWidth="2" />
          <path d="M37 16h6M40 13v6" stroke="var(--nf-red)" strokeWidth="1.5" />
        </svg>
      );
    case "collab":
      return (
        <svg {...common}>
          <circle cx="20" cy="20" r="6" fill="none" stroke="var(--nf-white)" strokeWidth="2" opacity="0.8" />
          <circle cx="38" cy="20" r="6" fill="none" stroke="var(--nf-red)" strokeWidth="2" />
          <path d="M12 42c0-7 6-11 8-11s8 4 8 11M28 42c0-7 6-11 10-11s10 4 10 11" fill="none" stroke="var(--nf-grey)" strokeWidth="1.5" />
        </svg>
      );
    case "turning-point":
      return (
        <svg {...common}>
          <circle cx="28" cy="28" r="16" fill="none" stroke="var(--nf-red)" strokeWidth="2.5" />
          <path d="M22 28 l4 5 l9 -11" fill="none" stroke="var(--nf-red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "client":
      return (
        <svg {...common}>
          <rect x="10" y="12" width="36" height="26" rx="2" fill="none" stroke="var(--nf-white)" strokeWidth="2" opacity="0.75" />
          <path d="M16 22h24M16 28h16" stroke="var(--nf-red)" strokeWidth="2" />
          <path d="M20 42h16" stroke="var(--nf-grey)" strokeWidth="2" />
        </svg>
      );
    case "trend":
      return (
        <svg {...common}>
          <circle cx="14" cy="30" r="3" fill="var(--nf-red)" />
          <circle cx="28" cy="16" r="3" fill="var(--nf-white)" opacity="0.8" />
          <circle cx="42" cy="30" r="3" fill="var(--nf-white)" opacity="0.8" />
          <circle cx="28" cy="42" r="3" fill="var(--nf-red)" />
          <path d="M14 30L28 16L42 30L28 42L14 30" fill="none" stroke="var(--nf-grey)" strokeWidth="1.5" />
        </svg>
      );
    case "current":
      return (
        <svg {...common}>
          <line x1="8" y1="28" x2="40" y2="28" stroke="var(--nf-red)" strokeWidth="2.5" strokeDasharray="4 4" />
          <path d="M36 22 L46 28 L36 34" fill="none" stroke="var(--nf-red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

/* =========================================================
   MILESTONE CARD
   ========================================================= */

function MilestoneCard({ m, index, isVisible, side }) {
  return (
    <div
      id={m.id}
      className={`tl-item ${side} ${isVisible ? "is-visible" : ""} ${m.accent ? "is-accent" : ""}`}
    >
      <div className="tl-node">
        <span className="tl-node-dot" />
      </div>

      <div className="tl-card">
        <div className="tl-card-head">
          <ChapterGlyph type={m.glyph} />
          <div>
            <div className="tl-chapter">{m.chapter}</div>
            <div className="tl-date">{m.date}</div>
          </div>
        </div>

        <h3 className="tl-title">{m.title}</h3>
        <p className="tl-tagline">"{m.tagline}"</p>

        {m.story && m.story.map((p, i) => (
          <p className="tl-story" key={i}>{p}</p>
        ))}

        {m.flow && (
          <div className="tl-block">
            <FlowChain items={m.flow} />
          </div>
        )}

        {m.learningMap && (
          <div className="tl-block">
            <div className="tl-block-label">LEARNING MAP</div>
            <TagList items={m.learningMap} />
          </div>
        )}

        {m.projects && (
          <div className="tl-projects">
            {m.projects.map((p) => (
              <div className="project-card" key={p.title}>
                <div className="project-title">{p.title}</div>
                <FlowChain items={p.flow} />
                <p className="project-desc">{p.desc}</p>
                <EpisodeButton route={p.route} />
              </div>
            ))}
          </div>
        )}

        {m.architecture && (
          <div className="tl-block">
            <div className="tl-block-label">ARCHITECTURE</div>
            <FlowChain items={m.architecture} />
          </div>
        )}

        {m.ragFlow && (
          <div className="tl-block">
            <div className="tl-block-label">RAG PIPELINE</div>
            <FlowChain items={m.ragFlow} />
          </div>
        )}

        {m.features && (
          <div className="tl-block">
            <div className="feature-grid">
              {m.features.map((f) => <span className="feature-chip" key={f}>{f}</span>)}
            </div>
          </div>
        )}

        {m.tech && (
          <div className="tl-block">
            <div className="tl-block-label">TECHNOLOGIES</div>
            <TagList items={m.tech} />
          </div>
        )}

        {m.note && <p className="tl-note">{m.note}</p>}

        {m.sequence && (
          <div className="tl-block">
            <FlowChain items={m.sequence} vertical={false} />
            <div className="selected-badge">SELECTED</div>
          </div>
        )}

        {m.workedOn && (
          <div className="tl-block">
            <div className="tl-block-label">WHAT I WORKED ON</div>
            <TagList items={m.workedOn} />
          </div>
        )}

        {m.growthFlow && (
          <div className="tl-block">
            <div className="tl-block-label">ENGINEERING GROWTH</div>
            <FlowChain items={m.growthFlow} vertical={false} />
          </div>
        )}

        {m.progression && (
          <div className="tl-block">
            <FlowChain items={m.progression} />
          </div>
        )}

        {m.skills && (
          <div className="tl-block">
            <div className="tl-block-label">WHAT I HAVE LEARNED SO FAR</div>
            <TagList items={m.skills} />
          </div>
        )}

        {m.learned && (
          <div className="tl-block">
            <div className="tl-block-label">WHAT I LEARNED</div>
            <ul className="learned-list">
              {m.learned.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </div>
        )}

        {m.extra && (
          <div className="tl-extra">
            <div className="tl-block-label">{m.extra.heading}</div>
            <p>{m.extra.text}</p>
          </div>
        )}

        {m.route && <EpisodeButton route={m.route} />}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
   ========================================================= */

export default function Journey() {
  const navigate = useNavigate();
  const [visibleIds, setVisibleIds] = useState({});
  const [activeStop, setActiveStop] = useState("ep00");
  const timelineRef = useRef(null);
  const [fillPct, setFillPct] = useState(0);

  useEffect(() => {
    const nodes = document.querySelectorAll(".tl-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleIds((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onScroll() {
      const el = timelineRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      const scrolled = Math.min(Math.max(vh * 0.5 - rect.top, 0), total);
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setFillPct(Math.min(100, Math.max(0, pct)));

      let closest = null;
      let closestDist = Infinity;
      MILESTONES.forEach((m) => {
        const node = document.getElementById(m.id);
        if (!node) return;
        const d = Math.abs(node.getBoundingClientRect().top - vh * 0.35);
        if (d < closestDist) {
          closestDist = d;
          closest = m.id;
        }
      });
      if (closest) setActiveStop(closest);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="journey-page">
      <Navbar />

      {/* ============ HERO ============ */}
      <section className="jh-hero">
        <div className="jh-hero-bg" aria-hidden="true">
          <div className="jh-hero-lines" />
          <div className="jh-hero-particles" />
        </div>
        <div className="jh-hero-content">
          <div className="jh-meta">S1 · THE JOURNEY</div>
          <h1 className="jh-title">MY INTERNSHIP JOURNEY</h1>
          <p className="jh-subtitle">From exploring AI to contributing to real client work.</p>
          <div className="jh-date">24 FEBRUARY 2026 — PRESENT</div>
          <div className="jh-buttons">
            <button className="btn-primary" onClick={() => scrollToId("ep00")}>
              START THE JOURNEY
            </button>
            <button className="btn-secondary" onClick={() => scrollToId("ep08")}>
              VIEW SEASON
            </button>
          </div>
        </div>
      </section>

      {/* ============ STICKY NAV ============ */}
      <nav className="tl-sticky-nav" aria-label="Timeline navigation">
        <div className="tl-sticky-nav-inner">
          {NAV_STOPS.map((s) => (
            <button
              key={s.target}
              className={`tl-nav-stop ${activeStop === s.target ? "active" : ""}`}
              onClick={() => scrollToId(s.target)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ============ SEASON OVERVIEW ============ */}
      <section className="season-overview">
        <div className="section-heading">
          <span className="section-eyebrow">SEASON 01</span>
          <p className="section-sub">One internship. Several firsts. A lot of learning.</p>
        </div>
        <div className="season-cards">
          {SEASON_CARDS.map((c) => (
            <button className="season-card" key={c.num} onClick={() => scrollToId(c.target)}>
              <span className="season-card-num">{c.num}</span>
              <span className="season-card-title">{c.title}</span>
              <span className="season-card-date">{c.date}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section className="timeline-section" ref={timelineRef}>
        <div className="tl-track">
          <div className="tl-track-fill" style={{ height: `${fillPct}%` }} />
        </div>
        {MILESTONES.map((m, i) => (
          <MilestoneCard
            key={m.id}
            m={m}
            index={i}
            isVisible={!!visibleIds[m.id]}
            side={i % 2 === 0 ? "left" : "right"}
          />
        ))}
      </section>

      {/* ============ ENDING ============ */}
      <section className="journey-ending">
        <div className="ending-eyebrow">TO BE CONTINUED...</div>
        <h2 className="ending-title">SEASON 01 IS STILL RUNNING.</h2>
        <p className="ending-sub">
          From my first day to my first client project, every stage has been another step forward.
          And there is still more to learn, build and experience.
        </p>

        <div className="ending-compressed">
          <FlowChain items={["24 FEB", "MARCH", "APRIL", "MAY", "CLIENT", "TODAY", "?"]} vertical={false} />
        </div>

        <div className="ending-brand">
          <div className="ending-brand-logo">INTERNFLIX</div>
          <div className="ending-brand-season">SEASON 01</div>
          <p className="ending-brand-tag">
            "ONE INTERNSHIP.<br />MANY FIRSTS.<br />STILL MANY MORE TO COME."
          </p>
        </div>

        <button className="btn-primary" onClick={() => navigate("/")}>
          CONTINUE EXPLORING
        </button>
      </section>

      <style>{`
        :root {
          --nf-black: #0a0a0a;
          --nf-black-soft: #141414;
          --nf-card: #181818;
          --nf-white: #f5f5f5;
          --nf-grey: #8c8c8c;
          --nf-red: #e50914;
          --nf-red-dim: rgba(229, 9, 20, 0.35);
        }

        * { box-sizing: border-box; }

        .journey-page {
          background: var(--nf-black);
          color: var(--nf-white);
          font-family: "Helvetica Neue", Arial, sans-serif;
          overflow-x: hidden;
          width: 100%;
        }

        /* ---------- HERO ---------- */
        .jh-hero {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 20px 80px;
          overflow: hidden;
        }
        .jh-hero-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 20%, rgba(229,9,20,0.12), transparent 60%),
                      linear-gradient(180deg, #000 0%, #0a0a0a 60%, var(--nf-black) 100%);
        }
        .jh-hero-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
        }
        .jh-hero-particles {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(2px 2px at 20% 30%, rgba(229,9,20,0.5), transparent),
            radial-gradient(2px 2px at 75% 45%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1.5px 1.5px at 40% 70%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1.5px 1.5px at 85% 20%, rgba(229,9,20,0.4), transparent),
            radial-gradient(2px 2px at 60% 80%, rgba(255,255,255,0.2), transparent);
          animation: driftParticles 16s ease-in-out infinite alternate;
        }
        @keyframes driftParticles {
          from { transform: translateY(0); }
          to { transform: translateY(-16px); }
        }
        .jh-hero-content { position: relative; max-width: 780px; }
        .jh-meta {
          color: var(--nf-red);
          letter-spacing: 3px;
          font-weight: 700;
          font-size: 13px;
          margin-bottom: 18px;
        }
        .jh-title {
          font-size: clamp(32px, 6vw, 64px);
          font-weight: 800;
          letter-spacing: 1px;
          margin: 0 0 16px;
          line-height: 1.05;
        }
        .jh-subtitle {
          font-size: clamp(15px, 2vw, 19px);
          color: var(--nf-grey);
          margin: 0 0 10px;
        }
        .jh-date {
          font-size: 13px;
          letter-spacing: 2px;
          color: var(--nf-grey);
          margin-bottom: 36px;
        }
        .jh-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-primary, .btn-secondary, .btn-episode {
          border: none;
          cursor: pointer;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 14px 30px;
          border-radius: 4px;
          font-size: 13px;
          transition: transform 0.15s ease, background 0.2s ease;
        }
        .btn-primary {
          background: var(--nf-red);
          color: #fff;
        }
        .btn-primary:hover { background: #ff0a16; transform: translateY(-1px); }
        .btn-secondary {
          background: rgba(255,255,255,0.08);
          color: var(--nf-white);
          border: 1px solid rgba(255,255,255,0.18);
        }
        .btn-secondary:hover { background: rgba(255,255,255,0.14); }
        .btn-episode {
          margin-top: 14px;
          background: transparent;
          color: var(--nf-red);
          border: 1px solid var(--nf-red-dim);
          padding: 10px 18px;
          font-size: 12px;
        }
        .btn-episode:hover { background: var(--nf-red-dim); }

        /* ---------- STICKY NAV ---------- */
        .tl-sticky-nav {
          position: sticky;
          top: 0;
          z-index: 40;
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .tl-sticky-nav-inner {
          display: flex;
          gap: 8px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 10px 20px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .tl-sticky-nav-inner::-webkit-scrollbar { display: none; }
        .tl-nav-stop {
          flex: 0 0 auto;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          color: var(--nf-grey);
          font-size: 11px;
          letter-spacing: 1.5px;
          font-weight: 700;
          padding: 7px 14px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tl-nav-stop.active {
          background: var(--nf-red);
          border-color: var(--nf-red);
          color: #fff;
        }

        /* ---------- SEASON OVERVIEW ---------- */
        .season-overview {
          max-width: 1100px;
          margin: 0 auto;
          padding: 70px 20px 40px;
        }
        .section-heading { text-align: center; margin-bottom: 34px; }
        .section-eyebrow {
          display: inline-block;
          color: var(--nf-red);
          font-weight: 800;
          letter-spacing: 3px;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .section-sub { color: var(--nf-grey); font-size: 15px; margin: 0; }
        .season-cards {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
        }
        .season-card {
          background: var(--nf-card);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          padding: 20px 14px;
          text-align: left;
          cursor: pointer;
          color: var(--nf-white);
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .season-card:hover { border-color: var(--nf-red-dim); transform: translateY(-3px); }
        .season-card-num { color: var(--nf-red); font-weight: 800; font-size: 20px; }
        .season-card-title { font-weight: 700; font-size: 13px; letter-spacing: 0.5px; }
        .season-card-date { color: var(--nf-grey); font-size: 11px; letter-spacing: 1px; }

        /* ---------- TIMELINE ---------- */
        .timeline-section {
          position: relative;
          max-width: 1100px;
          margin: 60px auto 0;
          padding: 20px 20px 60px;
        }
        .tl-track {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 40px;
          width: 2px;
          background: rgba(255,255,255,0.08);
          transform: translateX(-50%);
        }
        .tl-track-fill {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          background: linear-gradient(180deg, var(--nf-red), rgba(229,9,20,0.3));
          transition: height 0.2s ease-out;
        }

        .tl-item {
          position: relative;
          width: 50%;
          padding: 0 48px 90px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .tl-item.is-visible { opacity: 1; transform: translateY(0); }
        .tl-item.left { left: 0; text-align: right; }
        .tl-item.right { left: 50%; text-align: left; }

        .tl-node {
          position: absolute;
          top: 4px;
          width: 16px;
          height: 16px;
        }
        .tl-item.left .tl-node { right: -8px; }
        .tl-item.right .tl-node { left: -8px; }
        .tl-node-dot {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: var(--nf-black);
          border: 2px solid var(--nf-grey);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .tl-item.is-visible .tl-node-dot {
          border-color: var(--nf-red);
          box-shadow: 0 0 0 6px var(--nf-red-dim);
        }

        .tl-card {
          background: var(--nf-card);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 24px 26px;
          text-align: left;
          display: inline-block;
          width: 100%;
        }
        .tl-item.is-accent .tl-card {
          border-color: var(--nf-red-dim);
          box-shadow: 0 0 40px -12px rgba(229,9,20,0.35);
        }

        .tl-card-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
        }
        .tl-chapter {
          color: var(--nf-red);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }
        .tl-date { color: var(--nf-grey); font-size: 11px; letter-spacing: 1px; margin-top: 2px; }
        .tl-title {
          font-size: 22px;
          font-weight: 800;
          margin: 0 0 8px;
          letter-spacing: 0.5px;
        }
        .tl-tagline {
          color: var(--nf-grey);
          font-style: italic;
          font-size: 14px;
          margin: 0 0 14px;
        }
        .tl-story {
          font-size: 14px;
          line-height: 1.6;
          color: #d6d6d6;
          margin: 0 0 10px;
        }
        .tl-block { margin-top: 18px; }
        .tl-block-label {
          font-size: 11px;
          letter-spacing: 1.5px;
          font-weight: 800;
          color: var(--nf-grey);
          margin-bottom: 8px;
        }
        .tl-note {
          font-size: 13px;
          color: var(--nf-grey);
          border-left: 2px solid var(--nf-red-dim);
          padding-left: 12px;
          margin-top: 16px;
        }
        .tl-extra {
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .tl-extra p { font-size: 13px; color: #d6d6d6; margin: 0; line-height: 1.6; }

        .flow-chain--v { display: flex; flex-direction: column; gap: 4px; font-size: 13px; }
        .flow-chain--h { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 12px; }
        .flow-step {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
          padding: 5px 10px;
          display: inline-block;
          color: var(--nf-white);
        }
        .flow-arrow { color: var(--nf-red); text-align: center; font-weight: 700; }

        .tag-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag-pill {
          background: rgba(229,9,20,0.08);
          border: 1px solid var(--nf-red-dim);
          color: var(--nf-white);
          font-size: 11px;
          padding: 5px 10px;
          border-radius: 14px;
        }

        .tl-projects { display: flex; flex-direction: column; gap: 16px; margin-top: 16px; }
        .project-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 16px 18px;
        }
        .project-title { font-weight: 800; font-size: 13px; letter-spacing: 0.5px; margin-bottom: 10px; }
        .project-desc { font-size: 13px; color: var(--nf-grey); margin: 10px 0 4px; line-height: 1.5; }

        .feature-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .feature-chip {
          background: var(--nf-black-soft);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 11px;
          padding: 6px 10px;
          border-radius: 4px;
        }

        .learned-list { margin: 0; padding-left: 18px; color: #d6d6d6; font-size: 13px; line-height: 1.7; }

        .selected-badge {
          margin-top: 14px;
          display: inline-block;
          background: var(--nf-red);
          color: #fff;
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 2px;
          padding: 6px 16px;
          border-radius: 4px;
        }

        /* ---------- ENDING ---------- */
        .journey-ending {
          text-align: center;
          padding: 100px 20px 120px;
          background: radial-gradient(ellipse at 50% 0%, rgba(229,9,20,0.1), transparent 60%);
        }
        .ending-eyebrow { color: var(--nf-red); letter-spacing: 3px; font-weight: 800; font-size: 13px; margin-bottom: 14px; }
        .ending-title { font-size: clamp(24px, 4vw, 38px); font-weight: 800; margin: 0 0 16px; }
        .ending-sub { color: var(--nf-grey); max-width: 620px; margin: 0 auto 34px; line-height: 1.7; font-size: 14px; }
        .ending-compressed { display: flex; justify-content: center; margin-bottom: 60px; }
        .ending-compressed .flow-chain--h { justify-content: center; }
        .ending-brand { margin-bottom: 40px; }
        .ending-brand-logo { color: var(--nf-red); font-weight: 900; font-size: 22px; letter-spacing: 2px; }
        .ending-brand-season { color: var(--nf-grey); font-size: 12px; letter-spacing: 3px; margin: 6px 0 20px; }
        .ending-brand-tag { font-size: 15px; font-weight: 700; line-height: 1.6; }

        /* ---------- RESPONSIVE ---------- */
        @media (max-width: 900px) {
          .season-cards { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 720px) {
          .season-cards { grid-template-columns: repeat(2, 1fr); }
          .tl-track { left: 20px; }
          .tl-item, .tl-item.left, .tl-item.right {
            width: 100%;
            left: 0;
            text-align: left;
            padding: 0 0 60px 48px;
          }
          .tl-item.left .tl-node, .tl-item.right .tl-node { left: 12px; }
          .flow-chain--h { flex-direction: column; align-items: flex-start; }
        }

        @media (max-width: 480px) {
          .season-cards { grid-template-columns: 1fr 1fr; }
          .jh-buttons { flex-direction: column; align-items: stretch; }
          .tl-card { padding: 18px 16px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .jh-hero-particles { animation: none; }
          .tl-item { transition: none; opacity: 1; transform: none; }
          .tl-track-fill { transition: none; }
        }
      `}</style>
    </div>
  );
}