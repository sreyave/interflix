import { Routes, Route } from "react-router-dom";

// Main pages
import Home from "../pages/Home/Home";
import JourneyPage from "../pages/Journey/Journey";
import WhatsNextPage from "../pages/WhatsNext/WhatsNext";

// Originals
import AIWorldExploration
  from "../pages/Originals/AIWorldExploration/AIWorldExploration";

import LLMEngineering
  from "../pages/Originals/LLMEngineering/LLMEngineering";

import SipInvestmentAdvisor
  from "../pages/Originals/SipInvestmentAdvisor/SipInvestmentAdvisor";

import AISupportDesk
  from "../pages/Originals/AISupportDesk/AISupportDesk";

import IntoProduction
  from "../pages/Originals/IntoProduction/IntoProduction";

import RoofProAi
  from "../pages/Originals/RoofProAi/RoofProAi";

import TrendIntelligence
  from "../pages/Originals/TrendIntelligence/TrendIntelligence";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Main pages */}
      <Route path="/" element={<Home />} />
      <Route path="/journey" element={<JourneyPage />} />
      <Route path="/whats-next" element={<WhatsNextPage />} />

      {/* Originals */}
      <Route
        path="/originals/ai-world-exploration"
        element={<AIWorldExploration />}
      />

      <Route
        path="/originals/llm-engineering"
        element={<LLMEngineering />}
      />

      <Route
        path="/originals/sip-investment-advisor"
        element={<SipInvestmentAdvisor />}
      />

      <Route
        path="/originals/ai-support-desk"
        element={<AISupportDesk />}
      />

      <Route
        path="/originals/into-production"
        element={<IntoProduction />}
      />

      <Route
        path="/originals/roofpro-ai"
        element={<RoofProAi />}
      />

      <Route
        path="/originals/trend-intelligence"
        element={<TrendIntelligence />}
      />
    </Routes>
  );
}