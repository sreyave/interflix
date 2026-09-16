import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/navigation/Navbar";

/* ------------------------------------------------------------------ */
/*  InternFlix — Home                                                  */
/*  A Netflix-inspired engineering portfolio homepage.                 */
/*                                                                      */
/*  Motion is pure CSS + native IntersectionObserver / rAF.            */
/*  No animation libraries, no new imports — nothing to install.       */
/*                                                                      */
/*  FIXES IN THIS VERSION (from the screenshot/video report):          */
/*  1. LearningRow's scroller div was empty — no .map() over LEARNING. */
/*     That's why "Trending in my learning" showed a heading with no   */
/*     cards. Restored, plus a LearningCard component and scroll       */
/*     arrows to match the other rows.                                 */
/*  2. .row__edge (the ‹ › scroll-arrow buttons) was used in JSX but   */
/*     never given base CSS (position/size/button-reset) — the browser */
/*     fell back to native <button> chrome, which is exactly the empty */
/*     white/grey square visible under Continue Watching. Added the    */
/*     missing .row__viewport / .row__edge base rules.                 */
/*  3. Smooth scrolling: the full-viewport grain overlay used           */
/*     mix-blend-mode on a position:fixed layer, which forces the      */
/*     browser to recomposite the whole page every scroll frame — the  */
/*     actual cause of the janky scroll. Removed the blend mode.       */
/*     Also added `html { scroll-behavior: smooth }`.                  */
/*  4. Featured card hardened: explicit z-index layering so the art    */
/*     layer can never sit above (or be mistaken for covering) the     */
/*     text content, plus pointer-events:none on the art so it can't   */
/*     intercept clicks/scroll.                                        */
/*  5. Hero now includes an EP01 poster card ("Same Girl... Different   */
/*     Versions.") linking to the journey page, and the primary hero   */
/*     button is relabelled "Watch EP1" now that the poster exists —   */
/*     the journey video itself isn't live yet, so both hero buttons   */
/*     still route to /journey rather than to a video player.          */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    id: "ai-world-exploration",
    ep: "EP02",
    title: "Into The AI World",
    tags: ["AI", "LLMs", "AI EXPLORATION"],
    poster: "neural",
    status: "delivered",
    href: "/originals/ai-world-exploration",
    logline: "Where the AI journey began — models, prompts, and first principles.",
  },
  {
    id: "llm-engineering",
    ep: "EP03",
    title: "LLM Engineering",
    tags: ["AI", "LLM ENGINEERING", "LANGCHAIN"],
    poster: "pipeline",
    status: "delivered",
    href: "/originals/llm-engineering",
    logline: "Experimenting with LLMs turned into engineering with them.",
  },
  {
    id: "sip-investment-advisor",
    ep: "EP04",
    title: "SIP Investment Advisor",
    tags: ["AI", "FINTECH", "DECISION SUPPORT"],
    poster: "chart",
    status: "delivered",
    href: "/originals/sip-investment-advisor",
    logline: "Market signal in, a defensible SIP allocation decision out.",
  },
  {
    id: "ai-support-desk",
    ep: "EP05",
    title: "AI Support Desk",
    tags: ["AI", "SLACK", "AUTOMATION"],
    poster: "chat",
    status: "delivered",
    href: "/originals/ai-support-desk",
    logline: "Every inbound email triaged, prioritised and answered.",
  },
  {
    id: "into-production",
    ep: "EP06",
    title: "Into Production",
    tags: ["CLIENT PROJECT", "FRONTEND", "REACT"],
    poster: "code",
    status: "delivered",
    href: "/originals/into-production",
    logline: "My first contribution to a real client-facing product.",
  },
  {
    id: "roofpro-ai",
    ep: "EP07",
    title: "RoofPro AI",
    tags: ["AI", "CHATBOT", "PRODUCT"],
    poster: "roof",
    status: "live",
    href: "/originals/roofpro-ai",
    logline: "A roofing assistant that asks the right questions, then quotes.",
  },
  {
    id: "trend-intelligence",
    ep: "EP08",
    title: "Trend Intelligence",
    tags: ["AI", "DATA", "CLIENT PROJECT"],
    poster: "cluster",
    status: "in-development",
    href: "/originals/trend-intelligence",
    logline: "Raw social signal clustered into something a client can act on.",
  },
];

const STATUS_META = {
  live: { label: "Live", width: "100%" },
  delivered: { label: "Delivered", width: "100%" },
  "in-development": { label: "In Development", width: "55%" },
};

/* Plays the ident once per page load, not per remount. */
let IDENT_PLAYED = false;

/* ------------------------------- Hooks ------------------------------- */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);
  return reduced;
}

/* Reveals an element once, when it scrolls into view. */
function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px", ...(options || {}) }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, inView];
}

/* Tracks whether a horizontal scroller can scroll further left/right,
   so the edge-arrow buttons only appear when they'd do something. */
function useScrollEdges(scrollerRef) {
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const update = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [canLeft, canRight];
}

/* ------------------------------- Icons ------------------------------- */

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M6 4.5v15l13-7.5-13-7.5Z" />
    </svg>
  );
}

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 12h13M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------ Poster Art ----------------------------- */
/* Each poster keeps its own visual language; motion lives in CSS classes  */
/* so it can be paused wholesale under prefers-reduced-motion.             */

function PosterArt({ type }) {
  switch (type) {
    case "neural":
      return (
        <svg viewBox="0 0 320 180" className="poster-svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="p-neural-bg" cx="30%" cy="35%" r="75%">
              <stop offset="0%" stopColor="#241017" />
              <stop offset="100%" stopColor="#0a0505" />
            </radialGradient>
            <radialGradient id="p-neural-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff3b47" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ff3b47" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="320" height="180" fill="url(#p-neural-bg)" />
          <circle cx="160" cy="90" r="70" fill="url(#p-neural-glow)" className="pa-breathe" />
          <g stroke="#5a3236" strokeWidth="1" opacity="0.7">
            <path d="M50 60 L150 40 M50 60 L150 90 M50 60 L150 140 M50 120 L150 40 M50 120 L150 90 M50 120 L150 140" />
            <path d="M150 40 L250 65 M150 40 L250 115 M150 90 L250 65 M150 90 L250 115 M150 140 L250 65 M150 140 L250 115" />
          </g>
          <g stroke="#ff5b63" strokeWidth="1.4" className="pa-signal">
            <path d="M50 60 L150 90 L250 65" pathLength="1" />
          </g>
          <g fill="#0a0505" stroke="#ff5b63" strokeWidth="1.8">
            <circle cx="50" cy="60" r="5" className="pa-node" style={{ "--d": "0s" }} />
            <circle cx="50" cy="120" r="5" className="pa-node" style={{ "--d": "0.4s" }} />
            <circle cx="150" cy="40" r="5" className="pa-node" style={{ "--d": "0.8s" }} />
            <circle cx="150" cy="90" r="6.5" className="pa-node" style={{ "--d": "0.2s" }} />
            <circle cx="150" cy="140" r="5" className="pa-node" style={{ "--d": "1.2s" }} />
            <circle cx="250" cy="65" r="5" className="pa-node" style={{ "--d": "0.6s" }} />
            <circle cx="250" cy="115" r="5" className="pa-node" style={{ "--d": "1s" }} />
          </g>
        </svg>
      );

    case "pipeline":
      return (
        <svg viewBox="0 0 320 180" className="poster-svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="p-pipe-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#101820" />
              <stop offset="100%" stopColor="#080a0a" />
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#p-pipe-bg)" />
          <rect x="24" y="24" width="272" height="132" rx="6" fill="#0d1012" stroke="#2b3338" />
          <rect x="24" y="24" width="272" height="18" rx="6" fill="#171d20" />
          <circle cx="36" cy="33" r="3" fill="#ff5f57" />
          <circle cx="47" cy="33" r="3" fill="#febc2e" />
          <circle cx="58" cy="33" r="3" fill="#28c840" />
          <g fontFamily="'JetBrains Mono', ui-monospace, monospace" fontSize="9.5">
            <text x="36" y="60" fill="#7ee787" className="pa-type" style={{ "--d": "0.0s" }}>PromptTemplate.from_template(</text>
            <text x="36" y="74" fill="#79c0ff" className="pa-type" style={{ "--d": "0.15s" }}>  "Summarize: {"{"}input{"}"}"</text>
            <text x="36" y="88" fill="#e6edf3" className="pa-type" style={{ "--d": "0.3s" }}>)</text>
            <text x="36" y="104" fill="#d2a8ff" className="pa-type" style={{ "--d": "0.45s" }}>chain = prompt | model | parser</text>
            <text x="36" y="120" fill="#ffa657" className="pa-type" style={{ "--d": "0.6s" }}>RunnableParallel(sentiment, tags)</text>
          </g>
          <rect x="36" y="126" width="5" height="10" fill="#7ee787" className="pa-caret" />
          <g>
            <circle cx="60" cy="142" r="6" fill="none" stroke="#58a6ff" strokeWidth="1.5" className="pa-node" style={{ "--d": "0s" }} />
            <circle cx="108" cy="142" r="6" fill="none" stroke="#58a6ff" strokeWidth="1.5" className="pa-node" style={{ "--d": "0.3s" }} />
            <circle cx="156" cy="142" r="6" fill="none" stroke="#58a6ff" strokeWidth="1.5" className="pa-node" style={{ "--d": "0.6s" }} />
            <path d="M66 142 H102 M114 142 H150" stroke="#58a6ff" strokeWidth="1.2" className="pa-signal" pathLength="1" />
            <text x="196" y="146" fontSize="8" fill="#6e7681" fontFamily="ui-monospace, monospace">LCEL · EMBEDDINGS</text>
          </g>
        </svg>
      );

    case "chart":
      return (
        <svg viewBox="0 0 320 180" className="poster-svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="p-chart-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#101410" />
              <stop offset="100%" stopColor="#080a08" />
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#p-chart-bg)" />
          <g stroke="#1c231d" strokeWidth="0.6">
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={i} x1={20 + i * 32} y1="14" x2={20 + i * 32} y2="150" />
            ))}
          </g>
          <path d="M20 96 H300" stroke="#3a4a3c" strokeWidth="1" strokeDasharray="4 3" className="pa-drift" />
          <text x="250" y="92" fontSize="7.5" fill="#5c705f" fontFamily="ui-monospace, monospace">200 DMA</text>
          <g>
            {[
              [30, 70, 92, false], [50, 60, 84, false], [70, 78, 110, true],
              [90, 66, 96, false], [110, 40, 68, false], [130, 52, 74, true],
              [150, 30, 58, false], [170, 44, 66, true], [190, 20, 46, false],
              [210, 34, 60, true], [230, 16, 38, false], [250, 24, 44, false],
              [270, 12, 30, false],
            ].map(([x, top, bottom, down], i) => (
              <g key={i} className="pa-candle" style={{ "--d": `${i * 0.06}s` }}>
                <line x1={x} y1={top - 8} x2={x} y2={bottom + 6} stroke={down ? "#e5484d" : "#3fb950"} strokeWidth="1" />
                <rect x={x - 4} y={top} width="8" height={Math.max(bottom - top, 4)} fill={down ? "#e5484d" : "#3fb950"} opacity="0.9" />
              </g>
            ))}
          </g>
          <rect x="196" y="106" width="108" height="48" rx="5" fill="#0d130e" stroke="#2c3a2e" />
          <text x="206" y="120" fontSize="7" letterSpacing="1.5" fill="#6e8a70" fontFamily="Inter, sans-serif">MARKET SIGNAL</text>
          <text x="206" y="134" fontSize="10" fontWeight="700" fill="#3fb950" fontFamily="Inter, sans-serif" className="pa-flicker">INCREASE SIP</text>
          <text x="206" y="147" fontSize="7" fill="#5c705f" fontFamily="ui-monospace, monospace">-8.2% vs 200DMA</text>
        </svg>
      );

    case "chat":
      return (
        <svg viewBox="0 0 320 180" className="poster-svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="p-chat-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#181312" />
              <stop offset="100%" stopColor="#0a0808" />
            </linearGradient>
            <marker id="p-chat-arrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#7a5450" />
            </marker>
          </defs>
          <rect width="320" height="180" fill="url(#p-chat-bg)" />
          <rect x="14" y="34" width="112" height="86" rx="6" fill="#141010" stroke="#332423" />
          <rect x="14" y="34" width="112" height="16" rx="6" fill="#1d1615" />
          <circle cx="24" cy="42" r="2.4" fill="#8a5a58" />
          <text x="33" y="45" fontSize="7" fill="#a07270" fontFamily="Inter, sans-serif">Inbox</text>
          <g fontFamily="Inter, sans-serif" fontSize="7.5" fill="#8a726f">
            <text x="22" y="64">From: client@acme.co</text>
            <text x="22" y="76" fill="#c9b6b3">"App keeps crashing on</text>
            <text x="22" y="87" fill="#c9b6b3">checkout, need urgent fix"</text>
          </g>
          <path d="M128 76 H150" stroke="#7a5450" strokeWidth="1.4" markerEnd="url(#p-chat-arrow)" className="pa-flow" style={{ "--d": "0s" }} />
          <circle cx="166" cy="76" r="17" fill="none" stroke="#ff5b63" strokeWidth="1.6" className="pa-ring" />
          <text x="166" y="80" textAnchor="middle" fontSize="9" fill="#ff8a8f" fontFamily="Inter, sans-serif" fontWeight="700">AI</text>
          <path d="M183 76 H206" stroke="#7a5450" strokeWidth="1.4" markerEnd="url(#p-chat-arrow)" className="pa-flow" style={{ "--d": "0.5s" }} />
          <rect x="208" y="30" width="98" height="98" rx="6" fill="#12100f" stroke="#332e23" />
          <g fontFamily="Inter, sans-serif" fontSize="7">
            <text x="216" y="46" fill="#8a7a52" letterSpacing="1">CATEGORY</text>
            <text x="216" y="57" fill="#e8d9a8" fontWeight="600">Bug report</text>
            <text x="216" y="71" fill="#8a7a52" letterSpacing="1">PRIORITY</text>
            <text x="216" y="82" fill="#ff8a8f" fontWeight="700" className="pa-flicker">Urgent</text>
            <text x="216" y="96" fill="#8a7a52" letterSpacing="1">SENTIMENT</text>
            <text x="216" y="107" fill="#e8d9a8">Frustrated</text>
            <text x="216" y="121" fill="#8a7a52" letterSpacing="1">SUGGESTED REPLY</text>
          </g>
        </svg>
      );

    case "code":
      return (
        <svg viewBox="0 0 320 180" className="poster-svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="p-code-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#141416" />
              <stop offset="100%" stopColor="#08080a" />
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#p-code-bg)" />
          <rect x="16" y="24" width="188" height="126" rx="6" fill="#111214" stroke="#2b2c30" />
          <rect x="16" y="24" width="188" height="16" rx="6" fill="#1a1b1e" />
          <circle cx="27" cy="32" r="2.4" fill="#5a5b60" />
          <circle cx="35" cy="32" r="2.4" fill="#5a5b60" />
          <circle cx="43" cy="32" r="2.4" fill="#5a5b60" />
          <rect x="60" y="27" width="120" height="10" rx="3" fill="#232427" />
          <rect x="28" y="50" width="164" height="34" rx="3" fill="#1c1e22" className="pa-block" style={{ "--d": "0s" }} />
          <rect x="36" y="58" width="70" height="6" rx="2" fill="#3d4148" />
          <rect x="36" y="69" width="110" height="5" rx="2" fill="#2a2d31" />
          <rect x="28" y="90" width="50" height="46" rx="3" fill="#1c1e22" className="pa-block" style={{ "--d": "0.12s" }} />
          <rect x="82" y="90" width="50" height="46" rx="3" fill="#1c1e22" className="pa-block" style={{ "--d": "0.24s" }} />
          <rect x="136" y="90" width="56" height="46" rx="3" fill="#1c1e22" className="pa-block" style={{ "--d": "0.36s" }} />
          <rect x="212" y="24" width="92" height="126" rx="6" fill="#0d0e10" stroke="#26272b" />
          <g fontFamily="'JetBrains Mono', ui-monospace, monospace" fontSize="7.5">
            <text x="220" y="44" fill="#ff7b72" className="pa-type" style={{ "--d": "0.1s" }}>function</text>
            <text x="262" y="44" fill="#d2a8ff" className="pa-type" style={{ "--d": "0.1s" }}>Hero() {"{"}</text>
            <text x="226" y="58" fill="#79c0ff" className="pa-type" style={{ "--d": "0.2s" }}>return</text>
            <text x="226" y="72" fill="#7ee787" className="pa-type" style={{ "--d": "0.3s" }}>  &lt;section&gt;</text>
            <text x="226" y="100" fill="#7ee787" className="pa-type" style={{ "--d": "0.5s" }}>    &lt;CTA /&gt;</text>
            <text x="226" y="114" fill="#7ee787" className="pa-type" style={{ "--d": "0.6s" }}>  &lt;/section&gt;</text>
            <text x="220" y="128" fill="#e6edf3" className="pa-type" style={{ "--d": "0.7s" }}>{"}"}</text>
          </g>
        </svg>
      );

    case "roof":
      return (
        <svg viewBox="0 0 320 180" className="poster-svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="p-roof-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1210" />
              <stop offset="100%" stopColor="#0a0706" />
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#p-roof-sky)" />
          <path d="M20 104 L100 56 L180 104" fill="none" stroke="#a06a3e" strokeWidth="2" strokeLinejoin="round" className="pa-draw" pathLength="1" />
          <rect x="34" y="104" width="132" height="46" fill="#171210" stroke="#4a3527" />
          <path d="M46 104 V150 M64 92 V104 M100 72 V104 M136 92 V104 M154 104 V150" stroke="#4a3527" opacity="0.7" />
          <rect x="90" y="122" width="20" height="28" fill="#241a15" stroke="#4a3527" />
          <rect x="192" y="34" width="112" height="60" rx="8" fill="#161210" stroke="#4a2e2a" className="pa-pop" style={{ "--d": "0.2s" }} />
          <circle cx="206" cy="56" r="9" fill="none" stroke="#ff5b63" strokeWidth="1.4" className="pa-ring" />
          <text x="206" y="59" textAnchor="middle" fontSize="8" fill="#ff8a8f" fontWeight="700" fontFamily="Inter, sans-serif">AI</text>
          <g fontFamily="Inter, sans-serif" fontSize="6.8" fill="#c9a894">
            <text x="222" y="52">"What's your roof</text>
            <text x="222" y="62">pitch and material?"</text>
            <text x="222" y="78" fill="#8a6a52">Asphalt shingle · 6/12 pitch</text>
          </g>
          <rect x="192" y="106" width="112" height="40" rx="6" fill="#141010" stroke="#3a2620" className="pa-pop" style={{ "--d": "0.55s" }} />
          <text x="200" y="120" fontSize="7" letterSpacing="1" fill="#8a6a52" fontFamily="Inter, sans-serif">ESTIMATE</text>
          <text x="200" y="135" fontSize="12" fontWeight="700" fill="#ffb28a" fontFamily="Inter, sans-serif">$8,200 – $10,400</text>
        </svg>
      );

    case "cluster":
      return (
        <svg viewBox="0 0 320 180" className="poster-svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="p-cluster-bg" cx="50%" cy="40%" r="80%">
              <stop offset="0%" stopColor="#1a1013" />
              <stop offset="100%" stopColor="#08050a" />
            </radialGradient>
            <marker id="p-cl-arrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="#6a4f74" />
            </marker>
          </defs>
          <rect width="320" height="180" fill="url(#p-cluster-bg)" />
          <rect x="10" y="26" width="66" height="26" rx="4" fill="#141018" stroke="#3a2a44" className="pa-pop" style={{ "--d": "0s" }} />
          <text x="16" y="42" fontSize="8" fill="#a893c9" fontFamily="Inter, sans-serif" fontWeight="700">in LinkedIn</text>
          <rect x="10" y="58" width="66" height="26" rx="4" fill="#141018" stroke="#3a2a44" className="pa-pop" style={{ "--d": "0.15s" }} />
          <text x="16" y="74" fontSize="8" fill="#ff8a5b" fontFamily="Inter, sans-serif" fontWeight="700">◉ Reddit</text>
          <path d="M76 39 H108" stroke="#6a4f74" strokeWidth="1" markerEnd="url(#p-cl-arrow)" className="pa-flow" style={{ "--d": "0.2s" }} />
          <path d="M76 71 H108" stroke="#6a4f74" strokeWidth="1" markerEnd="url(#p-cl-arrow)" className="pa-flow" style={{ "--d": "0.45s" }} />
          <text x="112" y="58" fontSize="7" fill="#8a7696" fontFamily="Inter, sans-serif">embeddings</text>
          <g>
            <circle cx="168" cy="52" r="20" fill="none" stroke="#7c5cff" strokeWidth="1.4" className="pa-orbit" style={{ "--d": "0s" }} />
            <circle cx="160" cy="46" r="2.4" fill="#7c5cff" />
            <circle cx="176" cy="50" r="2.4" fill="#7c5cff" />
            <circle cx="170" cy="60" r="2.4" fill="#7c5cff" />
            <circle cx="210" cy="96" r="27" fill="none" stroke="#ff5b63" strokeWidth="1.4" className="pa-orbit" style={{ "--d": "0.8s" }} />
            <circle cx="198" cy="88" r="2.4" fill="#ff5b63" />
            <circle cx="220" cy="84" r="2.4" fill="#ff5b63" />
            <circle cx="205" cy="106" r="2.4" fill="#ff5b63" />
            <circle cx="222" cy="104" r="2.4" fill="#ff5b63" />
            <circle cx="168" cy="118" r="15" fill="none" stroke="#3fb950" strokeWidth="1.4" className="pa-orbit" style={{ "--d": "1.4s" }} />
            <circle cx="162" cy="114" r="2.2" fill="#3fb950" />
            <circle cx="174" cy="122" r="2.2" fill="#3fb950" />
          </g>
          <rect x="248" y="60" width="62" height="72" rx="5" fill="#12101a" stroke="#3a2a44" />
          <text x="256" y="74" fontSize="6.5" letterSpacing="1" fill="#8a7a9c" fontFamily="Inter, sans-serif">TOP TREND</text>
          <rect x="256" y="80" width="46" height="4" rx="2" fill="#7c5cff" className="pa-bar" style={{ "--w": "46px", "--d": "0.3s" }} />
          <rect x="256" y="88" width="34" height="4" rx="2" fill="#ff5b63" className="pa-bar" style={{ "--w": "34px", "--d": "0.5s" }} />
          <rect x="256" y="96" width="22" height="4" rx="2" fill="#3fb950" className="pa-bar" style={{ "--w": "22px", "--d": "0.7s" }} />
          <text x="256" y="118" fontSize="6.5" fill="#8a7a9c" fontFamily="Inter, sans-serif">Intelligence</text>
          <text x="256" y="128" fontSize="6.5" fill="#8a7a9c" fontFamily="Inter, sans-serif">report</text>
        </svg>
      );

    default:
      return null;
  }
}

/* ------------------------------ Ident intro ---------------------------- */

function Ident({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  const letters = "INTERNFLIX".split("");

  return (
    <div className="ident" role="presentation">
      <div className="ident__bars" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} style={{ "--d": `${i * 0.045}s` }} />
        ))}
      </div>
      <div className="ident__wordmark" aria-hidden="true">
        {letters.map((ch, i) => (
          <span key={i} className="ident__letter" style={{ "--d": `${0.25 + i * 0.05}s` }}>
            {ch}
          </span>
        ))}
      </div>
      <div className="ident__sweep" aria-hidden="true" />
    </div>
  );
}

/* ---------------------------- Scroll progress -------------------------- */

function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const pct = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${pct})`;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={barRef} />
    </div>
  );
}

/* -------------------------------- Hero ------------------------------- */

function Hero({ started, reduced }) {
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    if (reduced) return;
    const el = heroRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    let frame = 0;
    const onMove = (e) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        glow.style.setProperty("--mx", `${x}%`);
        glow.style.setProperty("--my", `${y}%`);
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const node = parallaxRef.current;
    if (!node) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = Math.min(window.scrollY, 900);
        node.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
        node.style.opacity = String(Math.max(1 - y / 620, 0));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const words = "From Curiosity to Client Impact".split(" ");

  return (
    <section className={`hero ${started ? "is-started" : ""}`} id="home" ref={heroRef}>
      <div className="hero__bg-image" aria-hidden="true">
        <img
          src="/images/landing.png"
          alt=""
          loading="eager"
        />
      </div>
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__spotlight" aria-hidden="true" ref={glowRef} />
      <div className="hero__vignette" aria-hidden="true" />

      <div className="hero__content" ref={parallaxRef}>
        <p className="hero__eyebrow" style={{ "--d": "0.1s" }}>
          <span className="hero__rec" aria-hidden="true" />
          Now playing · Internflix Original
        </p>

        <h1 className="hero__title">
          {words.map((w, i) => (
            <span className="hero__word" key={i}>
              <span className="hero__word-inner" style={{ "--d": `${0.2 + i * 0.08}s` }}>
                {w}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero__subtitle" style={{ "--d": "0.75s" }}>
          A journey through AI, automation, product development and client
          engineering — told the way a season of work actually unfolds.
        </p>

        <div className="hero__actions" style={{ "--d": "0.9s" }}>
          <button className="btn btn--primary btn--magnetic" onClick={() => { window.location.href = "/journey"; }}>
            <PlayIcon /> Watch EP1
          </button>
          <button className="btn btn--glass btn--magnetic" onClick={() => { window.location.href = "/originals/trend-intelligence"; }}>
            Latest episode <ArrowIcon />
          </button>
        </div>

        <p className="hero__meta" style={{ "--d": "1.05s" }}>Season 1 · 2026 · 7 episodes</p>
      </div>

      <div className="hero__footer" style={{ "--d": "1.2s" }}>
        <div className="hero__progress"><span /></div>
        <span className="hero__scroll-hint">
          <span className="hero__mouse" aria-hidden="true"><i /></span>
          Scroll
        </span>
      </div>

      <div className="hero__fade-bottom" aria-hidden="true" />
    </section>
  );
}

/* ------------------------------ Show Card ----------------------------- */

function ShowCard({ project, index }) {
  const open = () => { window.location.href = project.href; };

  return (
    <button
      type="button"
      className="card"
      onClick={open}
      aria-label={`Open ${project.title}`}
      style={{ "--i": index }}
    >
      <div className="card__frame">
        <div className="card__poster">
          <PosterArt type={project.poster} />
          <div className="card__sheen" aria-hidden="true" />
        </div>

        <div className="card__overlay">
          <div className="card__overlay-top">
            <span className="card__action" aria-hidden="true"><PlayIcon /></span>
            <span className={`card__status card__status--${project.status}`}>
              {STATUS_META[project.status].label}
            </span>
          </div>
          <div className="card__overlay-bottom">
            <p className="card__title">{project.title}</p>
            <p className="card__logline">{project.logline}</p>
            <p className="card__tags">{project.tags.join(" · ")}</p>
          </div>
        </div>
      </div>

      <div className="card__base">
        <p className="card__ep">{project.ep}</p>
        <p className="card__base-title">{project.title}</p>
      </div>
    </button>
  );
}

/* -------------------------------- Row --------------------------------- */

function ShowRow({ heading, subheading, children }) {
  const scrollerRef = useRef(null);
  const [ref, inView] = useInView();
  const [canLeft, canRight] = useScrollEdges(scrollerRef);

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (el) {
      el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 320), behavior: "smooth" });
    }
  };

  return (
    <section className={`row reveal ${inView ? "is-in" : ""}`} ref={ref}>
      <div className="row__heading">
        <h2 className="section-title">{heading}</h2>
        {subheading && <p className="row__subheading">{subheading}</p>}
      </div>

      <div className="row__viewport">
        <button
          type="button"
          className={`row__edge row__edge--left ${canLeft ? "is-visible" : ""}`}
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div className="row__scroller" ref={scrollerRef}>
          {children}
        </div>

        <button
          type="button"
          className={`row__edge row__edge--right ${canRight ? "is-visible" : ""}`}
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </section>
  );
}

/* --------------------------- Continue Watching -------------------------- */

function ContinueWatchingCard({ project, index }) {
  const meta = STATUS_META[project.status];
  const open = () => { window.location.href = project.href; };

  return (
    <button
      type="button"
      className="cw-card"
      onClick={open}
      aria-label={`Continue ${project.title}`}
      style={{ "--i": index }}
    >
      <div className="cw-card__poster">
        <PosterArt type={project.poster} />
        <div className="cw-card__play"><span><PlayIcon /></span></div>
      </div>
      <div className="cw-card__body">
        <div className="cw-card__title-row">
          <p className="cw-card__title">{project.title}</p>
          <span className={`cw-card__badge cw-card__badge--${project.status}`}>{meta.label}</span>
        </div>
        <p className="cw-card__logline">{project.logline}</p>
        <div className="cw-card__progress"><span style={{ "--w": meta.width }} /></div>
      </div>
    </button>
  );
}

/* ----------------------- Trending in My Learning ------------------------ */

const LEARNING = [
  { name: "LLMs", category: "Foundation" },
  { name: "LangChain", category: "Framework" },
  { name: "Prompt Engineering", category: "Explored" },
  { name: "LLM Providers", category: "Experimented with" },
  { name: "LCEL", category: "Learned" },
  { name: "Structured Output", category: "Built with" },
  { name: "Sequential Chains", category: "Built with" },
  { name: "Parallel Chains", category: "Built with" },
  { name: "Embeddings", category: "Learned" },
  { name: "Cosine Similarity", category: "Implemented" },
  { name: "AI Agents", category: "Explored" },
  { name: "AI Automation", category: "Built with" },
  { name: "n8n", category: "Explored" },
  { name: "Zapier", category: "Built with" },
  { name: "React", category: "Built with" },
  { name: "APIs", category: "Built with" },
  { name: "Clustering", category: "Worked deeply with" },
  { name: "AI Analysis", category: "Worked deeply with" },
  { name: "Data Processing", category: "Worked deeply with" },
  { name: "Debugging", category: "Worked deeply with" },
];

function LearningCard({ item, index }) {
  return (
    <article className="learning-card" style={{ "--i": index }}>
      <span className="learning-card__spark" aria-hidden="true" />
      <p className="learning-card__category">{item.category}</p>
      <h3 className="learning-card__name">{item.name}</h3>
    </article>
  );
}

function LearningRow() {
  const scrollerRef = useRef(null);
  const [ref, inView] = useInView();
  const [canLeft, canRight] = useScrollEdges(scrollerRef);

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (el) el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 320), behavior: "smooth" });
  };

  return (
    <section className={`learning-row reveal ${inView ? "is-in" : ""}`} ref={ref}>
      <div className="row__heading row__heading--split">
        <div>
          <h2 className="section-title">Trending in my learning</h2>
          <p className="row__subheading">Skills and concepts picked up across the season.</p>
        </div>
      </div>

      <div className="row__viewport">
        <button
          type="button"
          className={`row__edge row__edge--left ${canLeft ? "is-visible" : ""}`}
          onClick={() => scrollBy(-1)}
          aria-label="Scroll learning left"
        >
          ‹
        </button>

        <div className="learning-row__scroller" ref={scrollerRef}>
          {LEARNING.map((item, i) => (
            <LearningCard key={item.name + i} item={item} index={i} />
          ))}
        </div>

        <button
          type="button"
          className={`row__edge row__edge--right ${canRight ? "is-visible" : ""}`}
          onClick={() => scrollBy(1)}
          aria-label="Scroll learning right"
        >
          ›
        </button>
      </div>
    </section>
  );
}

/* ------------------------------- Featured ------------------------------- */

function FeaturedOriginal({ project, reduced }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const artRef = useRef(null);

  useEffect(() => {
    if (reduced) return;
    const node = artRef.current;
    if (!node) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const r = node.getBoundingClientRect();
        const progress = (window.innerHeight - r.top) / (window.innerHeight + r.height);
        const clamped = Math.max(0, Math.min(1, progress));
        // Reduced translate range (was ±40px) so the art layer can never
        // drift far enough to visually overlap the text content beside it.
        node.style.transform = `translate3d(0, ${(clamped - 0.5) * -24}px, 0) scale(1.06)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <section className={`featured reveal ${inView ? "is-in" : ""}`} ref={ref}>
      <div className="featured__art" aria-hidden="true" ref={artRef}>
        <PosterArt type={project.poster} />
      </div>
      <div className="featured__scrim" aria-hidden="true" />
      <div className="featured__edge" aria-hidden="true" />

      <div className="featured__content">
        <p className="featured__eyebrow">Flagship original · {project.ep}</p>
        <h2 className="featured__title">{project.title}</h2>
        <p className="featured__tags">{project.tags.join(" · ")}</p>
        <p className="featured__synopsis">
          Collecting and ranking signal from LinkedIn and Reddit, clustering it with
          embeddings, and turning the result into a client-facing intelligence report —
          built and refactored alongside the team that owns it in production.
        </p>
        <div className="featured__actions">
          <button className="btn btn--primary btn--magnetic" onClick={() => { window.location.href = project.href; }}>
            <PlayIcon /> Start episode
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Season CTA ------------------------------ */

function SeasonPreview() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <section className={`season-cta reveal ${inView ? "is-in" : ""}`} id="journey" ref={ref}>
      <p className="season-cta__eyebrow">Season 1</p>
      <h2 className="season-cta__title">From curiosity to client impact.</h2>
      <p className="season-cta__body">
        Seven project episodes, one internship journey, and a progression from
        first experiments to a live client engagement.
      </p>
      <button className="btn btn--primary btn--magnetic" onClick={() => { window.location.href = "/journey"; }}>
        Explore the journey <ArrowIcon />
      </button>
    </section>
  );
}

/* -------------------------------- Footer -------------------------------- */

function Footer() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <footer className={`footer reveal ${inView ? "is-in" : ""}`} id="whats-next" ref={ref}>
      <p className="footer__wordmark">INTERNFLIX</p>
      <p className="footer__tag">Season 1 was the internship. Season 2 is what comes next.</p>
    </footer>
  );
}

/* --------------------------------- App ---------------------------------- */

export default function Home() {
  const reduced = usePrefersReducedMotion();

  const [identDone, setIdentDone] = useState(IDENT_PLAYED);
  const [scrolled, setScrolled] = useState(false);

  const originals = PROJECTS;
  const continueWatching = [PROJECTS[3], PROJECTS[4], PROJECTS[5]];
  const flagship = PROJECTS[6]; // Trend Intelligence — matches the synopsis

  const finishIdent = () => {
    IDENT_PLAYED = true;
    setIdentDone(true);
  };

  useEffect(() => {
    if (reduced && !identDone) finishIdent();
  }, [reduced, identDone]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (identDone) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [identDone]);

  useEffect(() => {
    if (reduced) return;
    const nodes = Array.from(document.querySelectorAll(".btn--magnetic"));
    const cleanups = nodes.map((node) => {
      const onMove = (e) => {
        const r = node.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        node.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
      };
      const onLeave = () => { node.style.transform = ""; };
      node.addEventListener("pointermove", onMove);
      node.addEventListener("pointerleave", onLeave);
      return () => {
        node.removeEventListener("pointermove", onMove);
        node.removeEventListener("pointerleave", onLeave);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, [reduced, identDone]);

  return (
    <div className={`app ${scrolled ? "app--scrolled" : ""} ${identDone ? "app--ready" : ""}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

        .app {
          --bg: #050505;
          --surface: #101010;
          --surface-2: #181818;
          --surface-3: #222222;
          --text: #FFFFFF;
          --text-2: #B3B3B3;
          --text-3: #777777;
          --accent: #E50914;
          --accent-lift: #ff2b36;
          --accent-dim: #8f0a0f;
          --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
          --ease-soft: cubic-bezier(0.4, 0, 0.2, 1);

          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        .app *, .app *::before, .app *::after { box-sizing: border-box; }
        .app :focus-visible { outline: 2px solid var(--accent-lift); outline-offset: 3px; border-radius: 3px; }

        /* ------------------------------ Ident ------------------------------ */
        .ident {
          position: fixed; inset: 0; z-index: 200;
          background: #000;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          animation: ident-clear 0.7s var(--ease-out) 1.9s forwards;
        }
        @keyframes ident-clear {
          to { opacity: 0; visibility: hidden; transform: scale(1.06); }
        }
        .ident__bars {
          position: absolute; inset: 0; display: flex; gap: 2px;
          justify-content: center; align-items: center;
        }
        .ident__bars span {
          flex: 1; height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(229,9,20,0.5), transparent);
          transform: scaleY(0);
          animation: ident-bar 1.5s var(--ease-out) var(--d) forwards;
        }
        @keyframes ident-bar {
          0%   { transform: scaleY(0); opacity: 0; }
          40%  { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(0.02); opacity: 0; }
        }
        .ident__wordmark {
          position: relative; display: flex; gap: 0.04em;
          font-weight: 900; letter-spacing: 0.12em;
          font-size: clamp(1.6rem, 7vw, 4.5rem);
          color: var(--accent);
          text-shadow: 0 0 42px rgba(229,9,20,0.55);
        }
        .ident__letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(24px) scaleY(1.6);
          animation: ident-letter 0.85s var(--ease-out) var(--d) forwards;
        }
        @keyframes ident-letter {
          to { opacity: 1; transform: translateY(0) scaleY(1); }
        }
        .ident__sweep {
          position: absolute; top: 0; bottom: 0; width: 45%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,0.14), transparent);
          transform: translateX(-160%);
          animation: ident-sweep 1s var(--ease-soft) 0.95s forwards;
        }
        @keyframes ident-sweep { to { transform: translateX(320%); } }

        /* -------------------------- Scroll progress ------------------------ */
        .scroll-progress {
          position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 60;
          background: rgba(255,255,255,0.05);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .app--scrolled .scroll-progress { opacity: 1; }
        .scroll-progress span {
          display: block; height: 100%; transform-origin: 0 50%; transform: scaleX(0);
          background: linear-gradient(90deg, var(--accent), var(--accent-lift));
          box-shadow: 0 0 12px rgba(229,9,20,0.6);
        }

        /* ------------------------------ Grain ------------------------------ */
        /* FIX: mix-blend-mode on a position:fixed full-viewport layer forces
           the browser to recomposite the entire page beneath it on every
           scroll frame — this was the actual cause of the janky scrolling.
           Removed the blend mode; grain is now a cheap, isolated overlay. */
        .grain {
          position: fixed; inset: 0; z-index: 55; pointer-events: none;
          opacity: 0.03;
        }

        /* ----------------------------- Buttons ----------------------------- */
        .btn {
          display: inline-flex; align-items: center; gap: 0.55rem;
          border: none; border-radius: 4px;
          padding: 0.8rem 1.6rem;
          font-size: 0.95rem; font-weight: 600;
          cursor: pointer; font-family: inherit;
          position: relative; overflow: hidden;
          transition: transform 0.35s var(--ease-out), background-color 0.2s ease, box-shadow 0.3s ease;
        }
        .btn::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.28) 50%, transparent 80%);
          transform: translateX(-130%);
          transition: transform 0.7s var(--ease-soft);
        }
        .btn:hover::after { transform: translateX(130%); }
        .btn--primary {
          background: var(--accent); color: #fff;
          box-shadow: 0 6px 22px rgba(229,9,20,0.28);
        }
        .btn--primary:hover { background: var(--accent-lift); box-shadow: 0 10px 32px rgba(229,9,20,0.45); }
        .btn--glass {
          background: rgba(255,255,255,0.1); color: var(--text);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14);
        }
        .btn--glass:hover { background: rgba(255,255,255,0.18); }

        /* ------------------------------- Hero ------------------------------ */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
          padding: 0 3.5rem;
          overflow: hidden;
          background:
            radial-gradient(115% 85% at 12% 18%, #23100f 0%, transparent 58%),
            radial-gradient(90% 70% at 88% 82%, #150a14 0%, transparent 62%),
            var(--bg);
        }
        .hero__bg-image {
          position: absolute; inset: 0; z-index: 0; overflow: hidden;
        }
        .hero__bg-image img {
          width: 100%; height: 100%; object-fit: cover; object-position: center 32%;
          filter: saturate(1.05) brightness(0.92);
          animation: bg-kenburns 22s var(--ease-soft) infinite alternate;
          transform-origin: 60% 40%;
        }
        @keyframes bg-kenburns { from { transform: scale(1); } to { transform: scale(1.08); } }
        .hero__grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
          background-size: 68px 68px;
          mask-image: radial-gradient(75% 65% at 30% 40%, #000 0%, transparent 78%);
          -webkit-mask-image: radial-gradient(75% 65% at 30% 40%, #000 0%, transparent 78%);
          animation: grid-drift 26s linear infinite;
        }
        @keyframes grid-drift { to { background-position: 68px 68px, 68px 68px; } }
        .hero__spotlight {
          --mx: 30%; --my: 40%;
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(420px circle at var(--mx) var(--my), rgba(229,9,20,0.16), transparent 70%);
          transition: background 0.18s ease-out;
        }
        .hero__scrim {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to top, var(--bg) 2%, transparent 45%),
                      linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.68) 32%, rgba(0,0,0,0.28) 58%, transparent 78%);
        }
        .hero__vignette {
          position: absolute; inset: 0; pointer-events: none;
          box-shadow: inset 0 -150px 170px -90px rgba(0,0,0,0.95), inset 0 0 240px rgba(0,0,0,0.7);
        }
        .hero__fade-bottom {
          position: absolute; left: 0; right: 0; bottom: 0; height: 16vh; pointer-events: none;
          background: linear-gradient(to bottom, transparent, var(--bg));
        }

        .hero__content { position: relative; max-width: 40ch; z-index: 2; will-change: transform, opacity; }

        .hero__eyebrow, .hero__subtitle, .hero__actions, .hero__meta, .hero__footer {
          opacity: 0; transform: translateY(18px);
        }
        .hero.is-started .hero__eyebrow,
        .hero.is-started .hero__subtitle,
        .hero.is-started .hero__actions,
        .hero.is-started .hero__meta,
        .hero.is-started .hero__footer {
          animation: rise 0.9s var(--ease-out) var(--d, 0s) forwards;
        }
        @keyframes rise { to { opacity: 1; transform: translateY(0); } }

        .hero__eyebrow {
          display: inline-flex; align-items: center; gap: 0.55rem;
          color: var(--text-2); font-size: 0.82rem; font-weight: 500;
          letter-spacing: 0.02em; margin: 0 0 1.4rem;
        }
        .hero__rec {
          width: 7px; height: 7px; border-radius: 50%; background: var(--accent);
          box-shadow: 0 0 0 0 rgba(229,9,20,0.6);
          animation: rec-pulse 2.2s ease-out infinite;
        }
        @keyframes rec-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(229,9,20,0.55); }
          70%  { box-shadow: 0 0 0 9px rgba(229,9,20,0); }
          100% { box-shadow: 0 0 0 0 rgba(229,9,20,0); }
        }

        .hero__title {
          font-size: clamp(2.4rem, 6vw, 4.75rem);
          line-height: 1.02; font-weight: 800; letter-spacing: -0.025em;
          margin: 0 0 1.3rem;
        }
        .hero__word { display: inline-block; overflow: hidden; vertical-align: bottom; padding-right: 0.22em; }
        .hero__word-inner { display: inline-block; transform: translateY(110%); }
        .hero.is-started .hero__word-inner { animation: word-up 1s var(--ease-out) var(--d) forwards; }
        @keyframes word-up { to { transform: translateY(0); } }

        .hero__subtitle {
          color: var(--text-2); font-size: 1.06rem; line-height: 1.65;
          max-width: 46ch; margin: 0 0 2.1rem;
        }
        .hero__actions { display: flex; gap: 0.9rem; margin-bottom: 1.7rem; flex-wrap: wrap; }
        .hero__meta { color: var(--text-3); font-size: 0.85rem; letter-spacing: 0.03em; margin: 0; }

        .hero__footer {
          position: absolute; bottom: 2.6rem; left: 3.5rem; right: 3.5rem; z-index: 2;
          display: flex; align-items: center; gap: 1.6rem;
        }
        .hero__progress {
          flex: 1; max-width: 300px; height: 2px; background: rgba(255,255,255,0.12);
          border-radius: 2px; overflow: hidden;
        }
        .hero__progress span {
          display: block; height: 100%; width: 34%; background: var(--accent);
          box-shadow: 0 0 10px rgba(229,9,20,0.7);
          transform-origin: 0 50%;
          animation: bar-fill 1.4s var(--ease-out) 1.5s backwards;
        }
        @keyframes bar-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .hero__scroll-hint {
          display: inline-flex; align-items: center; gap: 0.6rem;
          color: var(--text-3); font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase;
        }
        .hero__mouse {
          width: 17px; height: 27px; border: 1px solid var(--text-3); border-radius: 9px;
          display: inline-flex; justify-content: center; padding-top: 5px;
        }
        .hero__mouse i {
          width: 2px; height: 5px; background: var(--text-2); border-radius: 1px;
          animation: wheel 1.8s var(--ease-soft) infinite;
        }
        @keyframes wheel {
          0%   { opacity: 0; transform: translateY(-3px); }
          40%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(8px); }
        }

        /* --------------------------- Reveal system -------------------------- */
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.75s var(--ease-out), transform 0.75s var(--ease-out); }
        .reveal.is-in { opacity: 1; transform: none; }

        /* ------------------------------- Rows ------------------------------- */
        .row { padding: 3rem 3.5rem; }
        .row__heading { margin-bottom: 1.35rem; }
        .row__heading--split { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; }
        .section-title {
          font-size: clamp(1.35rem, 2.2vw, 1.8rem); font-weight: 700;
          margin: 0 0 0.25rem; letter-spacing: -0.015em;
        }
        .row__subheading { color: var(--text-3); font-size: 0.85rem; margin: 0.2rem 0 0; }

        /* FIX: these two rules were missing entirely. The scroll-arrow
           <button> elements had no positioning or button-reset styling,
           so the browser fell back to native chrome — visible as a plain
           white/grey box floating below the row. */
        .row__viewport { position: relative; }
        .row__edge {
          position: absolute; top: 0; bottom: 0;
          width: 64px; z-index: 15;
          display: flex; align-items: center;
          border: none; background: none;
          margin: 0; padding: 0 0.75rem;
          cursor: pointer; font-family: inherit;
          color: var(--text); font-size: 1.9rem; line-height: 1;
          opacity: 0; pointer-events: none;
          transition: opacity 0.25s ease;
        }
        .row__viewport:hover .row__edge.is-visible { opacity: 1; pointer-events: auto; }
        .row__edge--left { left: -0.5rem; justify-content: flex-start; background: linear-gradient(to right, var(--bg) 30%, transparent); }
        .row__edge--right { right: -0.5rem; justify-content: flex-end; background: linear-gradient(to left, var(--bg) 30%, transparent); }

        .row__scroller {
          display: flex; gap: 1rem;
          overflow-x: auto; scroll-behavior: smooth; scrollbar-width: none;
          padding: 1.5rem 0 2.25rem;
          scroll-snap-type: x proximity;
        }
        .row__scroller::-webkit-scrollbar { display: none; }

        /* ------------------------------- Card ------------------------------- */
        .card {
          flex: 0 0 268px; scroll-snap-align: start;
          background: none; border: none; padding: 0; text-align: left;
          color: inherit; font-family: inherit; cursor: pointer;
          transition: transform 0.42s var(--ease-out), opacity 0.35s var(--ease-soft);
        }
        .reveal .card { opacity: 0; transform: translateY(22px); }
        .reveal.is-in .card { animation: card-in 0.7s var(--ease-out) calc(var(--i) * 0.07s) forwards; }
        @keyframes card-in { to { opacity: 1; transform: none; } }

        .row__scroller:hover .card { opacity: 0.55; }
        .row__scroller:hover .card:hover { opacity: 1; }

        .card__frame {
          position: relative; border-radius: 7px; overflow: hidden;
          transition: transform 0.42s var(--ease-out), box-shadow 0.42s var(--ease-out);
          transform-origin: center bottom;
        }
        .card:hover .card__frame, .card:focus-visible .card__frame {
          transform: scale(1.09) translateY(-8px);
          box-shadow: 0 26px 54px rgba(0,0,0,0.7), 0 0 0 1px rgba(229,9,20,0.35);
          z-index: 10;
        }
        .card__poster {
          position: relative; aspect-ratio: 16 / 9; overflow: hidden;
          background: linear-gradient(155deg, var(--surface-2), var(--surface));
          border: 1px solid rgba(255,255,255,0.06); border-radius: 7px;
        }
        .poster-svg { width: 100%; height: 100%; display: block; transition: transform 0.6s var(--ease-out); }
        .card:hover .poster-svg { transform: scale(1.06); }

        .card__sheen {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.14) 50%, transparent 65%);
          transform: translateX(-120%);
          transition: transform 0.85s var(--ease-soft);
        }
        .card:hover .card__sheen { transform: translateX(120%); }

        .card__overlay {
          position: absolute; inset: 0; border-radius: 7px;
          background: linear-gradient(to top, rgba(4,4,4,0.97) 8%, rgba(4,4,4,0.6) 52%, transparent 88%);
          opacity: 0; display: flex; flex-direction: column; justify-content: space-between;
          padding: 0.9rem; pointer-events: none;
          transition: opacity 0.28s var(--ease-soft);
        }
        .card:hover .card__overlay, .card:focus-visible .card__overlay { opacity: 1; }
        .card__overlay-top { display: flex; align-items: center; justify-content: space-between; }
        .card__action {
          width: 34px; height: 34px; border-radius: 50%;
          background: var(--text); color: #000;
          display: flex; align-items: center; justify-content: center;
          transform: scale(0.6); opacity: 0;
          transition: transform 0.4s var(--ease-out) 0.05s, opacity 0.3s ease 0.05s;
        }
        .card:hover .card__action, .card:focus-visible .card__action { transform: scale(1); opacity: 1; }
        .card__status {
          font-size: 0.62rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 0.24rem 0.55rem; border-radius: 3px;
        }
        .card__status--live { background: rgba(63,185,80,0.18); color: #59d06c; }
        .card__status--delivered { background: rgba(255,255,255,0.12); color: var(--text-2); }
        .card__status--in-development { background: rgba(229,9,20,0.2); color: #ff8a8f; }

        .card__overlay-bottom > * {
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.4s var(--ease-out), transform 0.4s var(--ease-out);
        }
        .card:hover .card__overlay-bottom > *, .card:focus-visible .card__overlay-bottom > * {
          opacity: 1; transform: none;
        }
        .card:hover .card__overlay-bottom > *:nth-child(1) { transition-delay: 0.08s; }
        .card:hover .card__overlay-bottom > *:nth-child(2) { transition-delay: 0.14s; }
        .card:hover .card__overlay-bottom > *:nth-child(3) { transition-delay: 0.2s; }
        .card__title { font-size: 0.95rem; font-weight: 700; margin: 0 0 0.3rem; }
        .card__logline { font-size: 0.75rem; color: var(--text-2); line-height: 1.45; margin: 0 0 0.4rem; }
        .card__tags { font-size: 0.66rem; color: var(--text-3); margin: 0; letter-spacing: 0.04em; }

        .card__base { padding: 0.75rem 0.15rem 0; }
        .card__ep { font-size: 0.7rem; color: var(--text-3); font-weight: 600; letter-spacing: 0.1em; margin: 0 0 0.2rem; }
        .card__base-title { font-size: 0.95rem; font-weight: 600; margin: 0; transition: color 0.25s ease; }
        .card:hover .card__base-title { color: #fff; }

        /* -------------------------- Continue watching ----------------------- */
        .cw-card {
          flex: 0 0 340px; scroll-snap-align: start;
          background: var(--surface); border-radius: 8px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          padding: 0; text-align: left; color: inherit; font-family: inherit; cursor: pointer;
          transition: transform 0.4s var(--ease-out), border-color 0.3s ease, box-shadow 0.4s var(--ease-out);
        }
        .reveal .cw-card { opacity: 0; transform: translateY(22px); }
        .reveal.is-in .cw-card { animation: card-in 0.7s var(--ease-out) calc(var(--i) * 0.1s) forwards; }
        .cw-card:hover, .cw-card:focus-visible {
          transform: translateY(-7px);
          border-color: rgba(229,9,20,0.4);
          box-shadow: 0 22px 44px rgba(0,0,0,0.6);
        }
        .cw-card__poster { position: relative; aspect-ratio: 16 / 8; overflow: hidden; }
        .cw-card__play {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          background: rgba(4,4,4,0.45); opacity: 0; color: #000;
          transition: opacity 0.28s var(--ease-soft);
        }
        .cw-card__play span {
          width: 46px; height: 46px; border-radius: 50%; background: #fff;
          display: flex; align-items: center; justify-content: center;
          transform: scale(0.7); transition: transform 0.4s var(--ease-out);
        }
        .cw-card:hover .cw-card__play, .cw-card:focus-visible .cw-card__play { opacity: 1; }
        .cw-card:hover .cw-card__play span { transform: scale(1); }
        .cw-card__body { padding: 1rem 1.1rem 1.2rem; }
        .cw-card__title-row { display: flex; align-items: center; justify-content: space-between; gap: 0.6rem; }
        .cw-card__title { font-weight: 600; font-size: 0.98rem; margin: 0; }
        .cw-card__logline { font-size: 0.78rem; color: var(--text-3); line-height: 1.5; margin: 0.4rem 0 0; }
        .cw-card__badge {
          flex-shrink: 0; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.06em;
          padding: 0.24rem 0.55rem; border-radius: 3px; text-transform: uppercase;
        }
        .cw-card__badge--live { background: rgba(63,185,80,0.18); color: #59d06c; }
        .cw-card__badge--delivered { background: rgba(255,255,255,0.12); color: var(--text-2); }
        .cw-card__badge--in-development { background: rgba(229,9,20,0.2); color: #ff8a8f; }
        .cw-card__progress {
          height: 3px; background: rgba(255,255,255,0.1); border-radius: 2px;
          overflow: hidden; margin-top: 0.9rem;
        }
        .cw-card__progress span {
          display: block; height: 100%; width: var(--w); background: var(--accent);
          transform-origin: 0 50%; transform: scaleX(0);
        }
        .reveal.is-in .cw-card__progress span { animation: bar-fill 1s var(--ease-out) 0.5s forwards; }

        /* ---------------------------- Learning row -------------------------- */
        .learning-row { padding: 3rem 3.5rem; }
        .learning-row__scroller {
          display: flex; gap: 0.8rem;
          overflow-x: auto; overflow-y: hidden; scrollbar-width: none;
          padding: 0.5rem 0 1rem;
        }
        .learning-row__scroller::-webkit-scrollbar { display: none; }
        .learning-card {
          position: relative; overflow: hidden;
          flex: 0 0 196px; min-height: 108px;
          background: var(--surface); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 7px; padding: 1rem;
          display: flex; flex-direction: column; justify-content: space-between;
          transition: transform 0.35s var(--ease-out), border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.35s ease;
        }
        .reveal .learning-card { opacity: 0; transform: translateY(16px); }
        .reveal.is-in .learning-card { animation: card-in 0.6s var(--ease-out) calc(var(--i) * 0.035s) forwards; }
        .learning-card:hover {
          border-color: rgba(229,9,20,0.55);
          background: var(--surface-2);
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.45);
        }
        .learning-card__spark {
          position: absolute; top: -40%; left: -30%; width: 60%; height: 180%;
          background: radial-gradient(circle, rgba(229,9,20,0.22), transparent 70%);
          opacity: 0; transition: opacity 0.4s ease, transform 0.6s var(--ease-out);
        }
        .learning-card:hover .learning-card__spark { opacity: 1; transform: translateX(70%); }
        .learning-card__category {
          position: relative;
          color: var(--text-3); font-size: 0.66rem; font-weight: 600;
          letter-spacing: 0.09em; text-transform: uppercase; margin: 0;
        }
        .learning-card__name { position: relative; color: var(--text); font-size: 1rem; font-weight: 600; margin: 0; }

        /* ------------------------------ Featured ---------------------------- */
        .featured {
          position: relative; margin: 1.5rem 3.5rem 3.5rem;
          border-radius: 12px; overflow: hidden; min-height: 460px;
          display: flex; align-items: flex-end;
          background: linear-gradient(155deg, #170d0e, var(--surface));
          border: 1px solid rgba(255,255,255,0.07);
        }
        .featured__art {
          position: absolute; right: 0; top: 0; width: 56%; height: 100%;
          will-change: transform;
          /* FIX: explicit stacking + no pointer events, so this layer can
             never sit above (or intercept clicks meant for) the text. */
          z-index: 0;
          pointer-events: none;
        }
        .featured__art .poster-svg { width: 100%; height: 100%; }
        .featured__scrim {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(100deg, #0a0607 26%, rgba(10,6,7,0.6) 54%, transparent 86%);
        }
        .featured__edge {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          box-shadow: inset 0 0 90px rgba(0,0,0,0.6);
        }
        .featured__content { position: relative; z-index: 2; padding: 3.25rem; max-width: 56ch; }
        .featured__eyebrow { color: var(--accent-lift); font-size: 0.8rem; font-weight: 600; margin: 0 0 0.7rem; letter-spacing: 0.02em; }
        .featured__title {
          font-size: clamp(1.85rem, 3.4vw, 2.7rem); font-weight: 800;
          margin: 0 0 0.55rem; letter-spacing: -0.02em;
        }
        .featured__tags { color: var(--text-2); font-size: 0.85rem; margin: 0 0 1.1rem; letter-spacing: 0.03em; }
        .featured__synopsis { color: var(--text-2); line-height: 1.7; margin: 0 0 1.9rem; font-size: 1rem; max-width: 52ch; }
        .featured__actions { display: flex; gap: 0.9rem; flex-wrap: wrap; }

        /* ----------------------------- Season CTA --------------------------- */
        .season-cta { text-align: center; padding: 5.5rem 2rem 6.5rem; max-width: 58ch; margin: 0 auto; }
        .season-cta__eyebrow { color: var(--accent-lift); font-size: 0.82rem; font-weight: 600; margin: 0 0 0.8rem; }
        .season-cta__title {
          font-size: clamp(1.7rem, 3.2vw, 2.4rem); font-weight: 700;
          margin: 0 0 0.9rem; letter-spacing: -0.02em;
        }
        .season-cta__body { color: var(--text-2); line-height: 1.7; margin: 0 0 2.2rem; }

        /* ------------------------------- Footer ----------------------------- */
        .footer { border-top: 1px solid rgba(255,255,255,0.08); padding: 2.75rem 3.5rem 3.25rem; text-align: center; }
        .footer__wordmark {
          color: var(--accent); font-weight: 900; letter-spacing: 0.16em;
          margin: 0 0 0.6rem; font-size: 1.05rem;
          text-shadow: 0 0 28px rgba(229,9,20,0.35);
        }
        .footer__tag { color: var(--text-3); font-size: 0.86rem; margin: 0; }

        /* -------------------------- Poster animations ----------------------- */
        .pa-breathe { animation: breathe 6s var(--ease-soft) infinite; transform-origin: center; }
        @keyframes breathe { 0%,100% { opacity: 0.6; transform: scale(0.94); } 50% { opacity: 1; transform: scale(1.06); } }

        .pa-node { animation: node-pulse 3.2s var(--ease-soft) var(--d, 0s) infinite; }
        @keyframes node-pulse { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }

        .pa-signal { stroke-dasharray: 0.25 0.75; stroke-dashoffset: 1; animation: signal 3.4s linear infinite; }
        @keyframes signal { to { stroke-dashoffset: -1; } }

        .pa-caret { animation: caret 1.1s steps(1) infinite; }
        @keyframes caret { 0%,50% { opacity: 1; } 51%,100% { opacity: 0; } }

        .pa-drift { stroke-dashoffset: 0; animation: dash-move 14s linear infinite; }
        @keyframes dash-move { to { stroke-dashoffset: -70; } }

        .pa-flicker { animation: flicker 4.5s var(--ease-soft) infinite; }
        @keyframes flicker { 0%,88%,100% { opacity: 1; } 92% { opacity: 0.35; } 96% { opacity: 1; } }

        .pa-ring { transform-origin: center; animation: ring 3.6s var(--ease-soft) infinite; }
        @keyframes ring { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }

        .pa-flow { stroke-dasharray: 4 5; animation: flow 1.6s linear var(--d, 0s) infinite; }
        @keyframes flow { to { stroke-dashoffset: -18; } }

        .pa-orbit { transform-origin: center; animation: orbit 7s var(--ease-soft) var(--d, 0s) infinite; }
        @keyframes orbit { 0%,100% { opacity: 0.65; transform: scale(0.97); } 50% { opacity: 1; transform: scale(1.03); } }

        .pa-type, .pa-candle, .pa-block, .pa-pop, .pa-draw, .pa-bar { opacity: 1; }
        .card:hover .pa-type { animation: type-in 0.5s var(--ease-out) var(--d, 0s) backwards; }
        @keyframes type-in { from { opacity: 0; transform: translateX(-6px); } }
        .card:hover .pa-candle { animation: candle-in 0.55s var(--ease-out) var(--d, 0s) backwards; transform-origin: center bottom; }
        @keyframes candle-in { from { opacity: 0; transform: scaleY(0.2); } }
        .card:hover .pa-block { animation: block-in 0.5s var(--ease-out) var(--d, 0s) backwards; }
        @keyframes block-in { from { opacity: 0; transform: translateY(8px); } }
        .card:hover .pa-pop, .featured:hover .pa-pop { animation: pop-in 0.55s var(--ease-out) var(--d, 0s) backwards; }
        @keyframes pop-in { from { opacity: 0; transform: translateY(10px) scale(0.94); } }
        .card:hover .pa-draw { stroke-dasharray: 1; animation: draw 0.9s var(--ease-out) backwards; }
        @keyframes draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .featured .pa-bar, .card:hover .pa-bar { animation: bar-grow 0.7s var(--ease-out) var(--d, 0s) backwards; transform-origin: left center; }
        @keyframes bar-grow { from { transform: scaleX(0); } }

        /* ------------------------------ Tablet ------------------------------ */
        @media (max-width: 1199px) {
          .hero, .row, .learning-row, .footer { padding-left: 2rem; padding-right: 2rem; }
          .hero__footer { left: 2rem; right: 2rem; }
          .featured { margin-left: 2rem; margin-right: 2rem; }
          .featured__art { width: 62%; opacity: 0.5; }
          .featured__content { padding: 2.5rem; }
        }

        /* ------------------------------ Mobile ------------------------------ */
        @media (max-width: 767px) {
          .hero, .row, .learning-row, .footer { padding-left: 1.15rem; padding-right: 1.15rem; }
          .hero { min-height: 88vh; padding-top: 5rem; }
          .hero__footer { left: 1.15rem; right: 1.15rem; bottom: 1.6rem; }
          .hero__scroll-hint { display: none; }
          .hero__spotlight { display: none; }
          .hero__bg-image img { object-position: center 22%; }
          .hero__scrim { background: linear-gradient(to top, var(--bg) 2%, transparent 40%), linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.85) 60%); }
          .row { padding-top: 2.25rem; padding-bottom: 2.25rem; }
          .row__edge { display: none; }
          .card { flex: 0 0 200px; }
          .card:hover .card__frame, .card:focus-visible .card__frame { transform: scale(1.03) translateY(-4px); }
          .row__scroller:hover .card { opacity: 1; }
          .cw-card { flex: 0 0 260px; }
          .featured { margin-left: 1.15rem; margin-right: 1.15rem; min-height: 380px; }
          .featured__art { display: none; }
          .featured__content { padding: 2rem 1.5rem; }
          .season-cta { padding: 3.5rem 1.5rem 4.5rem; }
        }

        /* --------------------------- Reduced motion -------------------------- */
        @media (prefers-reduced-motion: reduce) {
          .app *, .app *::before, .app *::after {
            animation: none !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
          .reveal { opacity: 1 !important; transform: none !important; }
          .hero__word-inner { transform: none !important; }
          .hero__eyebrow, .hero__subtitle, .hero__actions, .hero__meta, .hero__footer {
            opacity: 1 !important; transform: none !important;
          }
          .hero__bg-image img { animation: none !important; transform: none !important; }
          .card, .cw-card, .learning-card { opacity: 1 !important; transform: none !important; }
          .grain { display: none; }
        }
      `}</style>

      {!identDone && <Ident onDone={finishIdent} />}

      <ScrollProgress />

      <div className="grain" aria-hidden="true" />

      <Navbar />

      <Hero started={identDone} reduced={reduced} />

      <ShowRow heading="My originals" subheading="Seven projects, from first experiment to client delivery.">
        {originals.map((p, i) => (
          <ShowCard key={p.id} project={p} index={i} />
        ))}
      </ShowRow>

      <ShowRow heading="Continue watching" subheading="Where each build currently stands.">
        {continueWatching.map((p, i) => (
          <ContinueWatchingCard key={p.id} project={p} index={i} />
        ))}
      </ShowRow>

      <LearningRow />

      <FeaturedOriginal project={flagship} reduced={reduced} />

      <SeasonPreview />
      <Footer />
    </div>
  );
}