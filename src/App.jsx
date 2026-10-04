import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import Home from '@/pages/Home';
import CaseStudyUserCreation from '@/pages/CaseStudyUserCreation';
import CaseStudyDevHub from '@/pages/CaseStudyDevHub';
import CaseStudySdarim from '@/pages/CaseStudySdarim';
import CaseStudyInSightec from '@/pages/CaseStudyInSightec';
import DesignSystem from '@/pages/DesignSystem';
import Resume from '@/pages/Resume';

const SITE_PASSWORD = "StepInside2026";
const MAGIC_LINK_TOKEN = "OpenUp2026";

function getAccessToken() {
  try {
    const fromSearch = new URLSearchParams(window.location.search).get("access");
    if (fromSearch) return fromSearch;
    const hashQuery = window.location.hash.split("?")[1];
    return hashQuery ? new URLSearchParams(hashQuery).get("access") : null;
  } catch {
    return null;
  }
}

function stripAccessToken() {
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete("access");
    const qi = url.hash.indexOf("?");
    if (qi !== -1) {
      const params = new URLSearchParams(url.hash.slice(qi + 1));
      params.delete("access");
      const rest = params.toString();
      url.hash = url.hash.slice(0, qi) + (rest ? `?${rest}` : "");
    }
    window.history.replaceState(null, "", url.toString());
  } catch {}
}

function PasswordGate({ children }) {
  const [authed, setAuthed] = useState(() => {
    try {
      if (sessionStorage.getItem("siteAuthed") === "true") return true;
    } catch {}
    if (getAccessToken() === MAGIC_LINK_TOKEN) {
      try {
        sessionStorage.setItem("siteAuthed", "true");
      } catch {}
      stripAccessToken();
      return true;
    }
    return false;
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === SITE_PASSWORD) {
      try {
        sessionStorage.setItem("siteAuthed", "true");
      } catch {}
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (authed) return children;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#090D16] px-6 py-12 relative overflow-hidden">
      {/* Shapes — same system as homescreen, only in empty areas around centered card */}
      <div className="absolute inset-0 pointer-events-none">
        {PASSWORD_SHAPES.map((shape, i) => (
          <div key={i} className="absolute" style={{ top: shape.top, left: shape.left }}>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.07 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
              >
                <PasswordShapeSVG shape={shape} />
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-[#111827] rounded-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8 relative z-10">
        <h1 className="font-heading font-medium text-[#F8FAFC] text-xl tracking-[-0.02em] mb-2">Protected Portfolio</h1>
        <p className="font-body text-sm text-[#94A3B8] leading-relaxed mb-6">This portfolio is locked. Enter the password to continue.</p>
        <div className="space-y-4">
          <input
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 font-body text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
          />
          {error && <p className="font-mono text-xs text-[#FF4E7E]">Incorrect password. Try again.</p>}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] text-white font-heading text-[13px] font-medium uppercase tracking-[0.06em] px-6 py-3 rounded-xl transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
          >
            Enter
          </button>
        </div>
      </form>
    </div>
  );
}

const PASSWORD_SHAPES = [
  // scattered all over the screen — 5 pink / 4 blue / 4 orange
  { type: "ring", color: "#FF4E7E", top: "8%", left: "10%", size: 56, depth: 1.2 },
  { type: "diamond", color: "#FF8C42", top: "14%", left: "72%", size: 36, depth: 1.4 },
  { type: "cross", color: "#3B82F6", top: "18%", left: "42%", size: 32, depth: 1.3 },
  { type: "triangle", color: "#3B82F6", top: "28%", left: "88%", size: 28, depth: 1.5 },
  { type: "ring", color: "#FF8C42", top: "38%", left: "18%", size: 26, depth: 1.2 },
  { type: "square", color: "#3B82F6", top: "42%", left: "52%", size: 34, depth: 1.4 },
  { type: "cross", color: "#FF8C42", top: "48%", left: "78%", size: 28, depth: 1.3 },
  { type: "diamond", color: "#FF4E7E", top: "62%", left: "32%", size: 42, depth: 1.3 },
  { type: "zigzag", color: "#FF4E7E", top: "78%", left: "12%", size: 46, depth: 1.6 },
  { type: "ring", color: "#FF4E7E", top: "86%", left: "68%", size: 22, depth: 1.2 },
  { type: "cross", color: "#FF4E7E", top: "22%", left: "58%", size: 30, depth: 1.2 },
  { type: "ring", color: "#3B82F6", top: "58%", left: "10%", size: 30, depth: 1.3 },
  { type: "diamond", color: "#FF8C42", top: "68%", left: "58%", size: 28, depth: 1.4 },
  { type: "square", color: "#FF8C42", top: "84%", left: "88%", size: 34, depth: 1.4 },
];

function PasswordShapeSVG({ shape }) {
  const { type, color, size } = shape;
  if (type === "ring") return <svg width={size} height={size} viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="26" stroke={color} strokeWidth="2" /></svg>;
  if (type === "diamond") return <svg width={size} height={size} viewBox="0 0 60 60" fill="none"><rect x="12" y="12" width="36" height="36" stroke={color} strokeWidth="2" transform="rotate(45 30 30)" /></svg>;
  if (type === "zigzag") return <svg width={size * 1.4} height={size} viewBox="0 0 70 50" fill="none"><path d="M5 40 L18 10 L31 40 L44 10 L57 40" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (type === "square") return <svg width={size} height={size} viewBox="0 0 50 50" fill="none"><rect x="6" y="6" width="38" height="38" stroke={color} strokeWidth="2" /></svg>;
  if (type === "cross") return <svg width={size} height={size} viewBox="0 0 30 30" fill="none"><path d="M15 5 V25 M5 15 H25" stroke={color} strokeWidth="2" strokeLinecap="round" /></svg>;
  if (type === "triangle") return <svg width={size} height={size} viewBox="0 0 60 60" fill="none"><path d="M30 8 L52 48 L8 48 Z" stroke={color} strokeWidth="2" strokeLinejoin="round" /></svg>;
  return null;
}

function App() {
  return (
    <Router>
      <PasswordGate>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-study/user-creation" element={<CaseStudyUserCreation />} />
          <Route path="/case-study/dev-hub" element={<CaseStudyDevHub />} />
          <Route path="/case-study/sdarim" element={<CaseStudySdarim />} />
          <Route path="/case-study/insightec" element={<CaseStudyInSightec />} />
          <Route path="/design-system" element={<DesignSystem />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/cv" element={<Resume />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </PasswordGate>
    </Router>
  );
}

export default App
