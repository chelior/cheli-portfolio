import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Type, Split, Columns, Palette, Eye, Scale, ChevronLeft, ChevronRight, ExternalLink, Search, Compass, Layers, Layout, Sparkles, Rocket, CheckCircle, PlayCircle, Play, Workflow, GitFork, Route, LayoutTemplate, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import ImageLightbox from "@/components/portfolio/ImageLightbox";
import BeforeAfterSlider from "@/components/portfolio/BeforeAfterSlider";
import StartingPointSection from "@/components/portfolio/StartingPointSection";
import ContactModal from "@/components/portfolio/ContactModal";
import AnimatedCounter from "@/components/portfolio/AnimatedCounter";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const CHALLENGES = [
  {
    title: "Zero Prior Characterization",
    body: "4 years of organic, developer-driven growth led to feature bloat and a confusing structure.",
  },
  {
    title: "Hidden Power Features",
    body: "Heavy navigation and overcrowded pages of ambiguous icons made advanced tools hard to find.",
  },
  {
    title: "Non-Tech Audience & Rigid Flows",
    body: "Primary users (managers and admins) struggled with long, manual processes like onboarding observers without flexible date pickers.",
  },
];

const RESEARCH = [
  {
    label: "System Auditing",
    body: "Conducted 10 working sessions with the client to audit every page and map friction points.",
  },
  {
    label: "User Survey",
    body: "Sent a user survey to capture usage habits from managers and administrative staff.",
  },
  {
    label: "Key Personas",
    body: "Comprehensive Managers (dual-screen operators tracking attendance and approvals), Admin Employees (daily operators), and Observers.",
  },
];

const SURVEY_SCREENS = [
  {
    src: "images/sdarim/5d470fd86_formss1.png",
    alt: "Survey - Hard to find features in tiny icons",
    translation: "Hard to find features in tiny icons",
    category: "Icons & Visuals",
    hebrew: "דוחות, אני רוצה להשתמש בעוד דברים, אך זה מאוד קשה למצוא כל דבר בתמונות הזעירות למעלה.",
    bg: "bg-[#FEF9C3]/70",
    border: "border-amber-200/40",
    accent: "bg-[#3B82F6]",
  },
  {
    src: "images/sdarim/22626aae5_formss2.png",
    alt: "Survey - Report updates need separate window",
    translation: "Report updates need a separate window",
    category: "Workflow Friction",
    hebrew: "עדכון הדוחות, צריך אפשרות לעדכן על הדוח בלי שכל דבר נצטרך להיכנס לחלון נפרד ולעשות שמירה.",
    bg: "bg-[#FFEDD5]/60",
    border: "border-orange-200/40",
    accent: "bg-[#F59E0B]",
  },
  {
    src: "images/sdarim/ce784e0a4_formss3.png",
    alt: "Survey - Need parallel view of active students",
    translation: "Need a parallel view of active students",
    category: "Bulk Management",
    hebrew: "לראות במקביל ובאופן פשוט את כל האברכים שכעת פעילים, או שהיו פעילים היום. בנוסף, השינוי של תעריף לשעה וכו', נעשה כיום באופן מסורבל מאד.",
    bg: "bg-[#DCFCE7]/60",
    border: "border-emerald-200/40",
    accent: "bg-[#0077FF]",
  },
  {
    src: "images/sdarim/ca1fe5223_formss5.png",
    alt: "Survey - Add new fingerprint",
    translation: "Add new fingerprint",
    category: "System Age",
    hebrew: "להוסיף טביעת אצבע חדשה",
    bg: "bg-[#FFE4E6]/60",
    border: "border-rose-200/40",
    accent: "bg-[#10B981]",
  },
  {
    src: "images/sdarim/9b36a8f55_formss6.png",
    alt: "Survey - Settings changes one by one",
    translation: "Settings changes one by one",
    category: "Workflow Friction",
    hebrew: "הוספת פרטים ושינוי הגדרות לאברכים קיימים (שצריך לעשות אחד אחד ואין אפשרות לבחירת אברכים ולסמן על כולם את ההגדרה הנצרכת)",
    bg: "bg-[#F3E8FF]/60",
    border: "border-[#3B82F6]/20/40",
    accent: "bg-[#F59E0B]",
  },
  {
    src: "images/sdarim/5775f5330_formss8.png",
    alt: "Survey - Inaccessible, outdated system",
    translation: "Inaccessible, outdated system",
    category: "System Age",
    hebrew: "מערכת לא נגישה , מיושנת קצת",
    bg: "bg-[#E0F2FE]/60",
    border: "border-sky-200/40",
    accent: "bg-[#E91103]",
  },
];

const SOLUTIONS = [
  {
    icon: <Type size={18} />,
    title: "Text-First Navigation & Decluttering",
    subtitle: "Replacing icon clutter with clear text filters.",
    beforeLabel: "BEFORE (PAIN)",
    beforeBody: "Navigation relied on redundant tabs and ambiguous icons that hid core actions.",
    afterLabel: "AFTER (SOLUTION)",
    afterBody: "Replaced redundant tabs with contextual filters and swapped ambiguous icons for clear text labels.",
    // legacy fallback
    painPoint: "Navigation relied on redundant tabs and ambiguous icons that hid core actions.",
    body: "Replaced redundant tabs with contextual filters and swapped ambiguous icons for clear text labels.",
    image: "images/sdarim/Text-First Navigation & Decluttering - filters@1x.svg",
  },
  {
    icon: <Split size={18} />,
    title: "Dual-Path Onboarding",
    subtitle: "Redesigning the intake flow to fit daily work.",
    beforeLabel: "BEFORE (PAIN)",
    beforeBody: "Monolithic wizard forced 14 required fields before saving a draft.",
    afterLabel: "AFTER (SOLUTION)",
    afterBody: "A small modal captures the essentials and defers the rest.",
    // keep legacy fields for fallback
    painPoint: "Monolithic wizard forced 14 required fields before saving a draft.",
    body: "A small modal captures the essentials and defers the rest.",
    image: "images/sdarim/Dual-Path Onboarding/DD.svg",
    processMap: "images/sdarim/Dual-Path Onboarding/UpdatedFlow.png",
    prototypeUrl:
      "https://www.figma.com/proto/Wa7MyQVZa55sZ6DlO1Qsbd/Sdarim---New?page-id=0%3A1&node-id=1-414&t=HSZkFFsXpd11c6rs-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A414",
    prototypeLabel: "View Interactive Prototype",
  },
  {
    icon: <Columns size={18} />,
    title: "Avrech Profile Architecture",
    subtitle: "Condensing an overloaded profile into a focused three-tab system.",
    beforeLabel: "BEFORE (PAIN)",
    beforeBody: "The legacy profile exposed too many fields and tabs at once, making it hard to navigate.",
    afterLabel: "AFTER (SOLUTION)",
    afterBody: "Replaced the cluttered legacy profile view with a clean 3 tab structure. Collapsible accordion sections within each tab cut cognitive load and make specific information quick to find.",
    painPoint: "The legacy profile exposed too many fields and tabs at once, making it hard to navigate.",
    body: "Replaced the cluttered legacy profile view with a clean 3 tab structure. Collapsible accordion sections within each tab cut cognitive load and make specific information quick to find.",
    image: "images/sdarim/2.6.2 Avrechim List - Edit Avrech t Tab1@1x.png",
  },
  {
    icon: <Palette size={18} />,
    title: "Homepage Redesign",
    subtitle: "Turning a cluttered dashboard into a home screen users can customize.",
    beforeLabel: "BEFORE (PAIN)",
    beforeBody: "The legacy homepage was crowded with bulky graphs, and attendance reports sat behind several tabs, which made them hard to access.",
    afterLabel: "AFTER (SOLUTION)",
    afterBody: "Consolidated the pie charts into one interactive chart with a toggle. Added quick access to attendance reports and a customizable shortcut area, so users can pin the features they use most and reach them from the home screen.",
    painPoint: "The legacy homepage was crowded with bulky graphs, and attendance reports sat behind several tabs, which made them hard to access.",
    body: "Consolidated the pie charts into one interactive chart with a toggle. Added quick access to attendance reports and a customizable shortcut area, so users can pin the features they use most and reach them from the home screen.",
    image: "images/sdarim/1.4.2 Home page - Shortcut added_1x.png",
    prototypeUrl:
      "https://www.figma.com/proto/Wa7MyQVZa55sZ6DlO1Qsbd/Sdarim---New?node-id=43-12912&t=YSVNA9KN6vnLo1jW-1&scaling=scale-down&content-scaling=fixed&page-id=43%3A12911",
    prototypeLabel: "View Interactive Prototype",
  },
];

const STARTING_POINT_IMAGES = [
  { src: "images/sdarim/7bee2c0c1_Oldsystem-HomePage.png", alt: "Old system - Main dashboard" },
  { src: "images/sdarim/70d5f602e_Oldsystem2.png", alt: "Old system - Student list" },
  { src: "images/sdarim/a47b4b146_Oldsystem3.png", alt: "Old system - Report form" },
  { src: "images/sdarim/cbde4d24c_Oldsystem5.png", alt: "Old system - Monthly report" },
];

const TAKEAWAYS = [
  {
    icon: <Eye size={18} />,
    title: "Clarity for Non-Tech Users",
    body: "Clear text labels and explicit hierarchy outperform cryptic icons and minimalism that hides what things do.",
  },
  {
    icon: <Scale size={18} />,
    title: "Managing Constraints",
    body: "I balanced rigid feature-retention demands and tight development timelines while protecting the user experience.",
  },
];

const DESIGN_DETAILS_SLIDES = [
  { image: "images/sdarim/1.1 Home Page_1x.png", caption: "1.1 Home Page_1x" },
  { image: "images/sdarim/2.2.1 Abrechim List - Default@1x (3).png", caption: "2.2.1 Abrechim List - Default@1x" },
  { image: "images/sdarim/2.2.3 Avrehim list - Avrech Popup 1@1x (3).png", caption: "2.2.3 Avrehim list - Avrech Popup 1@1x" },
  { image: "images/sdarim/2.2.4 Avrehim list - Avrech Popup 2@1x (1).png", caption: "2.2.4 Avrehim list - Avrech Popup 2@1x" },
  { image: "images/sdarim/2.2.5 Avrehim list - Avrech Popup 3@1x.png", caption: "2.2.5 Avrehim list - Avrech Popup 3@1x" },
  { image: "images/sdarim/2.3.1 Avrechim List - Edit Avrech t Tab1@1x (4).png", caption: "2.3.1 Avrechim List - Edit Avrech t Tab1@1x" },
  { image: "images/sdarim/2.3.3 Avrechim List - Edit Avrech Tab 2@1x (1).png", caption: "2.3.3 Avrechim List - Edit Avrech Tab 2@1x" },
  { image: "images/sdarim/2.3.5 Avrechim List - Edit Avrech Tab 3@1x (1).png", caption: "2.3.5 Avrechim List - Edit Avrech Tab 3@1x" },
  { image: "images/sdarim/4.1.1 Saved searches - List@1x (2).png", caption: "4.1.1 Saved searches - List@1x" },
  { image: "images/sdarim/4.1.2 Saved searches - New@1x (3).png", caption: "4.1.2 Saved searches - New@1x" },
  { image: "images/sdarim/15.1.1 Payment Report  - Empty@1x.png", caption: "15.1.1 Payment Report - Empty@1x" },
  { image: "images/sdarim/15.1.2 Payment Report - Add Info@1x (2).png", caption: "15.1.2 Payment Report - Add Info@1x" },
  { image: "images/sdarim/15.1.4 Payment Report - History Popup@1x.png", caption: "15.1.4 Payment Report - History Popup@1x" },
  { image: "images/sdarim/15.1.7.1 Payment Report - Edit Popup x2@1x (1).png", caption: "15.1.7.1 Payment Report - Edit Popup x2@1x" },
];

function ImagePlaceholder({ alt, className = "" }) {
  return (
    <div className={`aspect-[4/3] rounded-lg border-2 border-dashed border-white/[0.08] flex items-center justify-center bg-[#F5F5F7] ${className}`}>
      <div className="text-center px-4">
        <span className="font-label text-xs text-[#F8FAFC]/40 uppercase block">{alt}</span>
        <span className="font-label text-[10px] text-[#F8FAFC]/30 uppercase block mt-1">Image coming soon</span>
      </div>
    </div>
  );
}

export default function CaseStudySdarim() {
  const [scrolled, setScrolled] = useState(false);
  const [surveyLightbox, setSurveyLightbox] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [designIndex, setDesignIndex] = useState(0);
  const [designDirection, setDesignDirection] = useState(0);
  const [designLightbox, setDesignLightbox] = useState(false);

  const paginateDesign = useCallback((newDir) => {
    setDesignDirection(newDir);
    setDesignIndex((prev) => (prev + newDir + DESIGN_DETAILS_SLIDES.length) % DESIGN_DETAILS_SLIDES.length);
  }, []);

  const goToDesign = useCallback(
    (i) => {
      setDesignDirection(i > designIndex ? 1 : -1);
      setDesignIndex(i);
    },
    [designIndex]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") paginateDesign(1);
      if (e.key === "ArrowLeft") paginateDesign(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginateDesign]);

  const designVariants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <main className="bg-[#090D16] min-h-screen">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#090D16]/80 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <Link
            to="/#work"
            className="flex items-center gap-2 font-body text-[14px] font-normal uppercase tracking-[0.06em] text-[#F8FAFC]/50 hover:text-[#3B82F6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
          >
            <ArrowLeft size={15} />
            Back to Work
          </Link>
          <span className="font-label text-xs text-[#F8FAFC]/50 hidden md:block">
            Case Study · Sdarim
          </span>
        </div>
      </nav>

      {/* ── Hero — vertical ambient gradient from accent tint to dark canvas ── */}
      <div className="bg-gradient-to-b overflow-hidden relative pb-16 pt-12" style={{ background: "linear-gradient(to bottom, rgba(0,119,255,0.12) 0%, #090D16 75%)" }}>
        {/* Background Watermark — SDARIM */}
        <div
          aria-hidden="true"
          className="text-[120px] font-black tracking-tighter text-[#F8FAFC]/[0.04] select-none pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap leading-none"
        >
          SDARIM
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-16 md:pt-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-end">
            {/* Left Column */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-label text-xs tracking-widest uppercase mb-4"
                style={{ color: "#0077FF" }}
              >
                B2B/ENTERPRISE SAAS · UX/UI DESIGN · 2023
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4"
              >
                <span className="text-[#E2E8F0]">Sdarim: From Feature Bloat to </span>
                <span className="text-[#0077FF]">Intuitive Workflow</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-[#94A3B8] text-base leading-relaxed max-w-lg mb-8"
              >
                I turned a cluttered, uncharacterized 4-year-old enterprise platform into a system non-tech-savvy users could navigate, reducing cognitive load and uncovering hidden features.
              </motion.p>

              {/* Metrics — 3 white cards elevated with soft shadows (blue tint) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="grid grid-cols-3 gap-3 max-w-[560px]"
              >
                {[
                  { value: "11", label: "System Processes Mapped" },
                  { value: "10", label: "Discovery Sessions" },
                  { value: "3", label: "Core Personas" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                    className="bg-[#111827] rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] border border-white/[0.08]"
                  >
                    <p className="font-heading text-[#E2E8F0] text-2xl tracking-tight leading-none tabular-nums">
                      <AnimatedCounter value={stat.value} duration={1350} />
                    </p>
                    <p className="font-label text-[11px] text-[#94A3B8] mt-2 uppercase leading-tight">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Column — flat raw UI preview */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-end justify-center lg:justify-end self-end"
            >
              <div className="w-full max-w-[560px]">
                <img
                  src="images/sdarim/1.1 Home Page_1x.png"
                  alt="Sdarim — redesigned home page"
                  className="w-full h-auto object-contain block rounded-lg border border-border"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── My Role & Context ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36 pt-32 md:pt-48">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em]">
              My Role & Context
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <motion.div {...fadeUp}>
              <h3 className="font-label text-xs text-[#3B82F6] tracking-wide uppercase mb-6">
                My Role
              </h3>
              <h4 className="font-subheading text-[#E2E8F0] text-[24px] leading-[1.3] tracking-[-0.02em] mb-3">
                Product Designer
              </h4>
              <p className="font-body text-[#94A3B8] text-base leading-[1.7]">
                End-to-end product redefinition: research, client meetings, wireframes, and UI.
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <h3 className="font-label text-xs text-[#3B82F6] tracking-wide uppercase mb-6">
                Context
              </h3>
              <h4 className="font-subheading text-[#E2E8F0] text-[24px] leading-[1.3] tracking-[-0.02em] mb-3">
                Project Company Environment
              </h4>
              <p className="font-body text-[#94A3B8] text-base leading-[1.7]">
                I worked through a project company, collaborating with an external
                software team that built the system organically over 4 years for multiple
                Kollelim across Israel.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Before & After ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Before & After
            </h2>
            <span className="font-label text-xs text-[#F8FAFC]/50 mt-2 block">
              Drag to compare before and after
            </span>
          </motion.div>

          <motion.div {...fadeUp}>
            <BeforeAfterSlider
              beforeImage={{ src: "images/sdarim/771c2c716_Oldsystem-HomePage.png", alt: "Before — Old System Home Page" }}
              afterImage={{ src: "images/sdarim/3d0fd9abf_11HomePage_1x.png", alt: "After — Redesigned Home Page" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── How It Started — now carousel */}
      <section className="px-6 md:px-12 py-8 md:py-10 mb-12 md:mb-16 overflow-hidden" style={{ boxSizing: "border-box" }}>
        <div className="max-w-[1100px] mx-auto overflow-hidden">
          <motion.div {...fadeUp} className="mb-10 md:mb-12 relative z-10">
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em]">
              How It Started
            </h2>
            <span className="font-label text-xs text-[#F8FAFC]/50 mt-2 block">
              The original system before the redesign
            </span>
          </motion.div>

          <div className="relative overflow-hidden rounded-xl">
            <StartingPointSection images={STARTING_POINT_IMAGES} title="" subtitle="" noWrapper />
          </div>
        </div>
      </section>

      {/* ── The Challenge — Top Hero (solid Sdarim blue) ── */}
      <section className="w-full my-0 px-6 md:px-12 py-28 md:py-32 bg-[#0077FF]" style={{ backgroundColor: "#0077FF" }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-subheading text-white text-[32px] leading-[1.2] tracking-[-0.02em] mt-0 mb-2">
              The Challenge
            </h2>
            <p className="font-label text-xs text-white/80 mb-12 block">
              Feature Bloat, Hidden Features, Rigid Flows
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="w-full max-w-full mb-0">
            <p className="font-sans text-3xl md:text-4xl font-medium text-white tracking-tight leading-snug w-full max-w-full mb-0">
              How can we simplify a complex, crowded system so non-tech oriented users can manage their students clearly and efficiently?
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── The Challenge — Bottom Breakdown (light canvas, blue accents) ── */}
      <section className="w-full my-0 px-6 md:px-12 py-14 md:py-20 bg-[#0F172A] border-y border-white/[0.06]" style={{ backgroundColor: "#0F172A" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start mb-8">
            <motion.div {...fadeUp}>
              <h3 className="font-body text-[#F8FAFC] text-[16px] leading-[1.6] font-medium mb-4">Specific goals:</h3>
              <div className="bg-[#111827] rounded-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-5">
                <ul className="space-y-2.5">
                  {[
                    "Simplify navigation and workflows",
                    "Prioritize critical features for daily use",
                    "Establish a consistent, clear design",
                    "Optimize workflows to boost productivity",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0077FF] shrink-0" />
                      <span className="font-body text-[#F8FAFC]/70 text-[14px] leading-[1.6]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <h3 className="font-body text-[#F8FAFC] text-[16px] leading-[1.6] font-medium mb-4">Key metrics:</h3>
              <div className="bg-[#111827] rounded-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-5">
                <ul className="space-y-2.5">
                  {[
                    "Increased feature adoption & system utilization",
                    "Higher user engagement & satisfaction",
                    "Improved productivity & task efficiency",
                    "Reduced errors & support overhead",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0077FF] shrink-0" />
                      <span className="font-body text-[#F8FAFC]/70 text-[14px] leading-[1.6]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <p className="font-body text-[#F8FAFC] text-[16px] leading-[1.6] font-medium mb-8">
            The Problems We Faced:
          </p>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-0">
            {CHALLENGES.map((challenge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[#111827] rounded-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] pl-5 pr-4 py-4"
                style={{ borderLeft: "3px solid #0077FF" }}
              >
                <h4 className="font-heading text-[#94A3B8] text-[15px] mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#0077FF" }} />
                  {challenge.title}
                </h4>
                <p className="font-body text-[#94A3B8] text-sm leading-relaxed">{challenge.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Process — Alternating Timeline ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Design Process
            </h2>
          </motion.div>

          <div className="relative max-w-[900px] mx-auto">
            {/* Continuous center spine — bold vertical behind nodes */}
            <div className="absolute left-[22px] md:left-1/2 md:-translate-x-1/2 top-[22px] bottom-[22px] w-0.5 bg-slate-200 md:bg-gradient-to-b md:from-[#FF4D7F]/25 md:via-[#3B82F6]/25 md:to-[#10B981]/20" />

            <div className="space-y-10 md:space-y-6">
              {[
                {
                  num: "01",
                  title: "Research & Discovery",
                  desc: "Ran 10 stakeholder sessions and surveys, mapped workflows and pain points, and built a competitive research and inspiration board.",
                  Icon: Search,
                  color: "#FF4D7F",
                  badgeBg: "bg-[#FF4D7F]/10 border border-[#FF4D7F]/20",
                  border: "border-[#FF4D7F]/20",
                  glow: "rgba(255,77,127,0.25)",
                },
                {
                  num: "02",
                  title: "Wireframing & Prototyping",
                  desc: "Designed low fidelity flows and quick sketches to align on requirements.",
                  Icon: LayoutDashboard,
                  color: "#3B82F6",
                  badgeBg: "bg-[#3B82F6]/10 border border-[#3B82F6]/20",
                  border: "border-[#3B82F6]/20",
                  glow: "rgba(139,92,246,0.25)",
                },
                {
                  num: "03",
                  title: "Design Iterations",
                  desc: "Defined visual language, responsive layouts, and accessible components.",
                  Icon: Palette,
                  color: "#F97316",
                  badgeBg: "bg-[#F97316]/10 border border-[#F97316]/20",
                  border: "border-[#F97316]/20",
                  glow: "rgba(249,115,22,0.25)",
                },
                {
                  num: "04",
                  title: "Delivery & Handoff",
                  desc: "Ran usability testing and prototyping feedback loops.",
                  Icon: Rocket,
                  color: "#0EA5E9",
                  badgeBg: "bg-[#0EA5E9]/10 border border-[#0EA5E9]/20",
                  border: "border-[#0EA5E9]/20",
                  glow: "rgba(14,165,233,0.25)",
                },
              ].map((phase, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={phase.num}
                    className={`relative flex items-center group ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
                  >
                    {/* Card side */}
                    <div className={`flex-1 ml-[64px] md:ml-0 ${isLeft ? "md:mr-[56px]" : "md:ml-[56px]"}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="bg-[#111827] border border-white/[0.08] rounded-xl p-5 md:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <span
                          className={`inline-flex font-label text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-md mb-3 ${phase.badgeBg}`}
                          style={{ color: phase.color }}
                        >
                          {phase.num}
                        </span>
                        <h4 className="font-heading text-[#94A3B8] text-[16px] leading-[1.3]">
                          {phase.title}
                        </h4>
                        <p className="font-body text-[#94A3B8] text-[13px] leading-[1.6] mt-2">{phase.desc}</p>
                      </motion.div>
                    </div>

                    {/* Horizontal connector — mobile: from node to card */}
                    <div className="absolute left-[44px] top-1/2 -translate-y-1/2 w-[20px] h-0.5 bg-slate-200 group-hover:bg-slate-300 transition-colors md:hidden" />
                    {/* Horizontal connector — desktop: from center spine to card */}
                    <div
                      className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-0.5 w-8 bg-slate-200 group-hover:bg-slate-300 transition-colors ${
                        isLeft ? "right-1/2 mr-[22px]" : "left-1/2 ml-[22px]"
                      }`}
                      style={{
                        backgroundColor: undefined,
                      }}
                    />

                    {/* Center icon node — 44px */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
                      <div
                        className={`w-11 h-11 rounded-full bg-[#111827] border-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${phase.border}`}
                        style={{
                          boxShadow: `0 2px 8px ${phase.glow}`,
                        }}
                      >
                        <phase.Icon size={20} className={phase.Icon === LayoutDashboard ? "text-blue-400" : undefined} style={{ color: phase.Icon === LayoutDashboard ? undefined : phase.color }} />
                      </div>
                    </div>

                    {/* Spacer for opposite side on desktop */}
                    <div className="hidden md:block flex-1" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Research & Discovery ── */}
      <section className="px-6 md:px-12 py-16 md:py-20 lg:py-24 mb-24 md:mb-36">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-14 md:mb-16">
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Research & Discovery
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10 lg:gap-10 mb-20 md:mb-24">
            {RESEARCH.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-5"
              >
                <div className="w-8 h-8 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-label text-xs text-[#3B82F6] font-normal">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h4 className="font-heading text-[#94A3B8] text-base mb-2 leading-[1.4]">
                    {item.label}
                  </h4>
                  <p className="font-body text-[#94A3B8] text-sm leading-[1.7] mt-1">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Research Synthesis / Affinity Board — interactive sticky notes */}
          <motion.div
            {...fadeUp}
            className="rounded-2xl border border-white/[0.08] p-8 md:p-10"
            style={{
              backgroundColor: "#fcfcfd",
              backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="font-label text-xs text-[#3B82F6] tracking-wide uppercase">User Survey - Pain Points</span>
              <span className="font-label text-xs text-[#F8FAFC]/50">Direct quotes from users</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
              {SURVEY_SCREENS.map((screen, i) => {
                const rotations = [-2.5, 1.8, -1.5, 2.2, -2, 1.5];
                return (
                  <motion.div
                    key={screen.src}
                    initial={{ opacity: 0, y: 20, rotate: rotations[i] }}
                    whileInView={{ opacity: 1, y: 0, rotate: rotations[i] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    whileHover={{ rotate: 0, scale: 1.02, y: -4 }}
                    className="cursor-pointer"
                    style={{ transformOrigin: "center", transition: "transform 0.25s ease-out" }}
                    onClick={() => setSurveyLightbox({ src: screen.src, alt: screen.alt })}
                  >
                    <div
                      className={`relative h-full min-h-[260px] aspect-square flex flex-col p-6 ${screen.bg}`}
                      style={{
                        borderRadius: "2px",
                        boxShadow: "2px 8px 16px -2px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)",
                        boxSizing: "border-box",
                        border: "none",
                      }}
                    >
                      {/* Tape — semi-transparent masking tape overlapping top center edge */}
                      <div
                        className="absolute rounded-sm"
                        style={{
                          top: "-10px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "70px",
                          height: "22px",
                          background: "rgba(255, 255, 255, 0.6)",
                          backdropFilter: "blur(2px)",
                          borderRadius: "2px",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                        }}
                      />

                      {/* Dog-ear / folded corner — bottom-right */}
                      <div
                        className="absolute bottom-0 right-0"
                        style={{
                          width: "18px",
                          height: "18px",
                          background: "linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.06) 50%)",
                          filter: "drop-shadow(-2px -2px 2px rgba(0,0,0,0.06))",
                          clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
                          borderBottomRightRadius: "2px",
                        }}
                      />

                      {/* Category — subtle muted pill, not saturated */}
                      <span className="inline-flex self-start text-xs font-label uppercase tracking-wider text-black/60 bg-black/5 px-2.5 py-1 rounded-full mt-2 mb-3">
                        {screen.category}
                      </span>

                      {/* Hebrew — centered, 16px, 1.6, #1e293b */}
                      <div className="flex-1 flex flex-col justify-center py-2">
                        <p
                          className="text-[16px] leading-[1.6]"
                          style={{ direction: "rtl", textAlign: "right", fontFamily: "'Assistant', 'Heebo', sans-serif", color: "#1e293b" }}
                        >
                          {screen.hebrew}
                        </p>
                      </div>

                      {/* English Takeaway — subtle, no divider */}
                      <div className="mt-auto pt-2">
                        <p className="font-label text-xs text-[#94A3B8] leading-relaxed">{screen.translation}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Quantitative research findings — metric visualization */}
          <motion.div {...fadeUp} className="mt-16 md:mt-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-label text-xs text-[#3B82F6] tracking-wide uppercase">
                Quantitative Findings
              </span>
              <span className="font-label text-xs text-[#F8FAFC]/50">Survey results — pain-point prevalence</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
              {[
                {
                  value: 83,
                  label: 'reported difficulty finding core actions in the main menu',
                  badge: 'DISCOVERABILITY',
                  badgeClass: 'text-[#FF4D7F] bg-[#FF4D7F]/10 border border-[#FF4D7F]/20',
                  bar: 'linear-gradient(90deg, #FF4D7F, #FF8FAB)',
                  width: '83%',
                },
                {
                  value: 76,
                  label: 'felt the system was "overloaded with unnecessary information"',
                  badge: 'COGNITIVE LOAD',
                  badgeClass: 'text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20',
                  bar: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
                  width: '76%',
                },
                {
                  value: 64,
                  label: 'expressed a lack of confidence when performing new actions',
                  badge: 'CONFIDENCE',
                  badgeClass: 'text-amber-400 bg-amber-500/10 border border-amber-500/200/10 border border-amber-500/20',
                  bar: 'linear-gradient(90deg, #F97316, #FB923C)',
                  width: '64%',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-[#111827] border border-[#f1f5f9] rounded-2xl transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
                  style={{
                    padding: '32px 28px',
                    boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  <span
                    className={`inline-block font-label text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-md mb-3 ${item.badgeClass}`}
                  >
                    {item.badge}
                  </span>
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                    className="block text-5xl font-bold tracking-tight text-[#E2E8F0] mb-3 tabular-nums"
                  >
                    <AnimatedCounter value={item.value} suffix="%" duration={1350} />
                  </motion.span>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: item.width }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-full"
                    style={{
                      height: '5px',
                      background: item.bar,
                      borderRadius: '9999px',
                      marginBottom: '16px',
                    }}
                  />
                  <p className="text-[14px] leading-[1.5] text-[#94A3B8]">{item.label}</p>
                </motion.div>
              ))}
            </div>
            <p className="font-label text-xs text-[#64748B] mt-8 text-left leading-relaxed">Based on the user survey</p>
          </motion.div>

          {/* Competitive Research */}
          <motion.div {...fadeUp} className="mt-16 md:mt-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-label text-xs text-[#3B82F6] tracking-wide uppercase">
                Competitive Research
              </span>
              <span className="font-label text-xs text-[#F8FAFC]/50">Inspiration board — competitor breakdown</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              {/* Mashov */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#111827] rounded-2xl border border-white/[0.08] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-md transition-all"
              >
                <div
                  className="overflow-hidden rounded-lg cursor-pointer"
                  style={{ borderRadius: "8px" }}
                  onClick={() => setSurveyLightbox({ src: "images/sdarim/inspiration/mashov.png", alt: "Mashov — competitor screenshot" })}
                >
                  <img src="images/sdarim/inspiration/mashov.png" alt="Mashov" className="w-full h-auto object-contain object-top block rounded-lg" style={{ borderRadius: "8px" }} />
                </div>
                <h4 className="text-lg font-semibold text-[#E2E8F0] mt-5 mb-3 leading-[1.4]">Mashov</h4>
                <ul className="space-y-2.5">
                  {["Heavy text-based interface", "Minimal, outdated design", "Focus on function, not UX"].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#94A3B8] leading-[1.6]">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#3B82F6]/70 border border-[#3B82F6]/20 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* OpenEduCat */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-[#111827] rounded-2xl border border-white/[0.08] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-md transition-all"
              >
                <div
                  className="overflow-hidden rounded-lg cursor-pointer"
                  style={{ borderRadius: "8px" }}
                  onClick={() => setSurveyLightbox({ src: "images/sdarim/inspiration/OpenEduCat.png", alt: "OpenEduCat — competitor screenshot" })}
                >
                  <img src="images/sdarim/inspiration/OpenEduCat.png" alt="OpenEduCat" className="w-full h-auto object-contain object-top block rounded-lg" style={{ borderRadius: "8px" }} />
                </div>
                <h4 className="text-lg font-semibold text-[#E2E8F0] mt-5 mb-3 leading-[1.4]">OpenEduCat</h4>
                <ul className="space-y-2.5">
                  {["Basic dashboard with icon grid", "Practical but cluttered", "Lacks visual hierarchy"].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-[#94A3B8] leading-[1.6]">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#3B82F6]/70 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Key Insight — elevated light callout */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 md:mt-10 rounded-2xl border border-[#3B82F6]/20/60 p-8 md:p-10 flex items-start gap-4 bg-gradient-to-r from-blue-500/10/70 via-blue-500/5/50 to-blue-500/5/50 border-l-4 border-l-blue-400 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
            >
              <div className="w-9 h-9 rounded-full bg-[#111827] border border-[#3B82F6]/20 shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="font-label text-xs font-medium tracking-wider text-blue-400 mb-2">KEY INSIGHT</p>
                <p className="text-base md:text-lg font-medium text-[#E2E8F0] leading-[1.6]">
                  Competitors focus on function and skip UX.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Old System Mapping ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Old System Mapping
            </h2>
            <span className="font-label text-xs text-[#F8FAFC]/50 mt-2 block">
              Legacy information architecture — full system site map
            </span>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="relative group w-full cursor-pointer rounded-2xl overflow-hidden border border-white/[0.07] bg-slate-900/40 backdrop-blur-sm p-4 md:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            onClick={() => setSurveyLightbox({ src: "images/sdarim/old system mapping2.svg", alt: "Old System Mapping" })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSurveyLightbox({ src: "images/sdarim/old system mapping2.svg", alt: "Old System Mapping" });
              }
            }}
            aria-label="Expand Old System Mapping diagram"
          >
            <img
              src="images/sdarim/old system mapping2.svg"
              alt="Old System Mapping — Information Architecture site tree of the legacy system"
              className="w-full h-auto object-contain rounded-xl block"
            />
            <span className="absolute bottom-6 left-6 z-20 text-xs font-label font-medium tracking-wide text-[#94A3B8] bg-white/80 backdrop-blur-md border border-white/[0.08] px-3.5 py-1.5 rounded-full shadow-xs cursor-pointer transition-all duration-200 ease-out hover:bg-[#3B82F6]/10 hover:border-transparent hover:text-blue-400 hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 active:bg-[#3B82F6]/15 active:border-transparent active:translate-y-0 active:scale-95">
              🔍 Expand
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Key Solutions & Design Decisions ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36 bg-[#111827] border-y border-white/[0.06] py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-4">
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Key Solutions & Design Decisions
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-[#111827] rounded-full px-4 py-2 border border-white/[0.08]">
              <span className="font-label text-xs text-[#3B82F6] uppercase tracking-wide">
                Client Constraint
              </span>
              <span className="font-body text-sm text-[#E2E8F0]">
                Keep all existing functionality
              </span>
            </div>
          </motion.div>

          {/* Alternating text + mockup rows — refined like Chaachie: tight grid, caption above image, staggered scroll animations */}
          <div className="space-y-20 md:space-y-28">
            {SOLUTIONS.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
                  {/* Text — standardized to Dual-Path Onboarding template for every solution */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className={`${i % 2 === 1 ? "md:order-2" : ""} self-center`}
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-[#E2E8F0] mb-1">
                        {solution.title}
                      </h3>
                      {solution.subtitle && (
                        <p className="text-sm text-[#94A3B8] mb-6">
                          {solution.subtitle}
                        </p>
                      )}

                      <div className="relative">
                        <div className="grid grid-cols-2 gap-3 md:gap-4 items-stretch">
                          <div className="bg-[#111827]/80 backdrop-blur-sm border border-white/[0.08] rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                            <p className="text-[11px] font-label uppercase tracking-wider text-[#64748B] font-semibold mb-2">
                              {solution.beforeLabel || "BEFORE (PAIN)"}
                            </p>
                            <p className="text-sm text-[#94A3B8] leading-relaxed">
                              {solution.beforeBody || solution.painPoint}
                            </p>
                          </div>
                          <div className="bg-[#3B82F6]/10 backdrop-blur-sm border border-[#3B82F6]/20 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                            <p className="text-[11px] font-label uppercase tracking-wider text-blue-400 font-bold mb-2">
                              {solution.afterLabel || "AFTER (SOLUTION)"}
                            </p>
                            <p className="text-sm font-medium text-[#E2E8F0] leading-relaxed">
                              {solution.afterBody || solution.body}
                            </p>
                          </div>
                        </div>
                        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#111827] border border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.35)] items-center justify-center text-white/20 text-sm leading-none">
                          →
                        </div>
                      </div>
                      <div className="flex md:hidden justify-center mt-3 text-white/20 text-sm leading-none">→</div>

                      {solution.prototypeUrl && (
                        <a
                          href={solution.prototypeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white border border-[#3B82F6] hover:border-[#2563EB] hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] text-xs font-semibold px-5 py-2.5 rounded-full inline-flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all mt-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2"
                        >
                          {solution.prototypeLabel || "View Interactive Prototype"}
                          <span className="text-[11px] leading-none">↗</span>
                        </a>
                      )}
                    </div>
                  </motion.div>

                  {/* Mockup — subtle scale + y, like Chaachie’s image reveal */}
                  <motion.div
                    initial={{ opacity: 0, y: 28, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className={`${i % 2 === 1 ? "md:order-1" : ""} self-center w-full`}
                  >
                    {solution.title === "Text-First Navigation & Decluttering" ? (
                      <div
                        className="bg-white/[0.06]/70 border border-white/[0.08] rounded-2xl p-6 shadow-xs cursor-pointer group"
                        onClick={() => setSurveyLightbox({ src: solution.image, alt: solution.title })}
                      >
                        <img
                          src={solution.image}
                          alt={solution.title}
                          className="w-full h-auto object-contain rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] block"
                        />
                      </div>
                    ) : solution.title === "Dual-Path Onboarding" ? (
                      <div className="bg-white/[0.06]/60 rounded-2xl border border-white/[0.08] p-6 md:p-7 overflow-hidden">
                        {/* Balanced two-zone layout: dedicated trigger column beside Start, flowchart breathing room */}
                        <div className="grid grid-cols-1 md:grid-cols-[190px_1fr] gap-6 md:gap-8 items-start">
                          {/* UI TRIGGER — offset to sit beside Start area, not jammed top-left */}
                          <div className="flex flex-col md:pt-10">
                            <span className="font-label text-[10px] text-blue-400 font-semibold uppercase tracking-wider mb-2">
                              [ UI TRIGGER ]
                            </span>
                            <div
                              className="rounded-xl border border-slate-200/90 shadow-lg bg-[#111827] p-2.5 cursor-pointer hover:shadow-xl transition-shadow"
                              onClick={() => setSurveyLightbox({ src: solution.image, alt: "UI Trigger - Dropdown" })}
                            >
                              <img src={solution.image} alt="DD - UI Trigger" className="w-full h-auto block" />
                            </div>
                            <p className="font-label text-[10px] text-[#64748B] mt-2 leading-relaxed">Dropdown entry → initiates flow</p>
                          </div>
                          {/* Process Flowchart — transparent PNG blends seamlessly into card canvas */}
                          <div
                            className="relative min-w-0 cursor-pointer group"
                            onClick={() => setSurveyLightbox({ src: solution.processMap, alt: `${solution.title} - Updated Flow` })}
                          >
                            <img
                              src={solution.processMap}
                              alt={`${solution.title} - Updated Flow - Process Map`}
                              className="w-full h-auto object-contain block"
                              style={{ maxHeight: "520px" }}
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <p className="font-label text-[11px] text-[#94A3B8] mt-5 text-center">
                          Process Map — Short vs Long form flow
                        </p>
                      </div>
                    ) : solution.image ? (
                      <div className="space-y-4">
                        <div
                          className="rounded-xl overflow-hidden shadow-lg border border-white/[0.08] cursor-pointer group bg-[#111827]"
                          onClick={() => setSurveyLightbox({ src: solution.image, alt: solution.title })}
                        >
                          <img
                            src={solution.image}
                            alt={solution.title}
                            className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.01]"
                          />
                        </div>
                        {solution.processMap && (
                          <div
                            className="rounded-xl overflow-hidden shadow-lg border border-white/[0.08] cursor-pointer bg-[#111827] group"
                            onClick={() => setSurveyLightbox({ src: solution.processMap, alt: `${solution.title} - Process Map` })}
                          >
                            <img
                              src={solution.processMap}
                              alt={`${solution.title} process map`}
                              className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.01]"
                            />
                            <p className="font-label text-[11px] text-[#F8FAFC]/60 px-4 py-3 border-t border-white/[0.08] bg-[#F5F5F7]">
                              Process Map — Short vs Long form flow
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <ImagePlaceholder alt={`Mockup - ${solution.title}`} className="shadow-lg" />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual Language ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Visual Language
            </h2>
          </motion.div>

          <motion.p {...fadeUp} className="font-body text-[#94A3B8] text-[16px] leading-[1.7] max-w-[640px] mb-16">
            The company has no specific branding language. The design guidelines ask for
            a modern, clean look, with one strict requirement: keep the logo.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div {...fadeUp}>
              <h3 className="font-label text-xs text-[#3B82F6] tracking-wide uppercase mb-6">
                Typography
              </h3>
              <div className="rounded-xl border border-white/[0.08] p-6 md:p-8 bg-[#111827] shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                <p className="font-label text-xs text-[#F8FAFC]/50 mb-6">Assistant — אבגד 1234</p>
                <div className="divide-y divide-[#E5E7EB]/60">
                  {[
                    { label: "H1", size: "24px", weight: "Bold 700", sample: "Heading One — אבגד", style: { fontFamily: "'Assistant', sans-serif", fontSize: "24px", fontWeight: 700, lineHeight: "1.3" } },
                    { label: "H2", size: "20px", weight: "Bold 700", sample: "Heading Two — אבגד", style: { fontFamily: "'Assistant', sans-serif", fontSize: "20px", fontWeight: 700, lineHeight: "1.4" } },
                    { label: "H3", size: "18px", weight: "SemiBold 600", sample: "Heading Three — אבגד", style: { fontFamily: "'Assistant', sans-serif", fontSize: "18px", fontWeight: 600, lineHeight: "1.4" } },
                    { label: "H4", size: "16px", weight: "SemiBold 600", sample: "Heading Four — אבגד", style: { fontFamily: "'Assistant', sans-serif", fontSize: "16px", fontWeight: 600, lineHeight: "1.5" } },
                    { label: "Paragraph", size: "14px", weight: "Regular 400", sample: "The quick brown fox jumps over the lazy dog. אבגד הוזחטי", style: { fontFamily: "'Assistant', sans-serif", fontSize: "14px", fontWeight: 400, lineHeight: "1.7" } },
                    { label: "Small Text", size: "12px", weight: "Regular 400", sample: "Small descriptive text — טקסט קטן", style: { fontFamily: "'Assistant', sans-serif", fontSize: "12px", fontWeight: 400, lineHeight: "1.6" } },
                  ].map((item) => (
                    <div key={item.label} className="py-5 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-label text-[11px] font-normal text-[#3B82F6] uppercase tracking-wide">
                          {item.label}
                        </span>
                        <span className="font-label text-[11px] text-[#F8FAFC]/30">•</span>
                        <span className="font-label text-[11px] text-[#F8FAFC]/50">{item.size}</span>
                        <span className="font-label text-[11px] text-[#F8FAFC]/30">•</span>
                        <span className="font-label text-[11px] text-[#F8FAFC]/50">{item.weight}</span>
                      </div>
                      <div style={item.style} className="text-[#E2E8F0] antialiased">
                        {item.sample}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <h3 className="font-label text-xs text-[#3B82F6] tracking-wide uppercase mb-6">
                Color Palette
              </h3>
              <div className="rounded-xl border border-white/[0.08] p-6 md:p-8 bg-[#111827] shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                {/* Primary & Core Neutrals */}
                <div className="mb-8">
                  <p className="font-label text-[11px] text-[#F8FAFC]/50 uppercase tracking-wide mb-4">
                    Primary & Core Neutrals
                  </p>
                  <div className="flex flex-wrap gap-5 md:gap-6">
                    {[
                      { hex: "#0077FF", label: "Primary Blue" },
                      { hex: "#232222", label: "Dark Neutral" },
                      { hex: "#B2B2B2", label: "Gray" },
                      { hex: "#E4F1FF", label: "Light Tint" },
                      { hex: "#728090", label: "Slate" },
                    ].map((c) => (
                      <div key={c.hex} className="flex flex-col items-center gap-2">
                        <div
                          className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
                          style={{ backgroundColor: c.hex }}
                          aria-label={c.label}
                        />
                        <span className="font-label text-[11px] text-[#F8FAFC]/70">{c.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secondary & Accent Colors */}
                <div className="mb-8">
                  <p className="font-label text-[11px] text-[#F8FAFC]/50 uppercase tracking-wide mb-4">
                    Secondary & Accent Colors
                  </p>
                  <div className="flex flex-wrap gap-5 md:gap-6">
                    {[
                      { hex: "#00DEE8", label: "Teal" },
                      { hex: "#E3FBFF", label: "Teal Tint" },
                      { hex: "#F17E63", label: "Coral" },
                      { hex: "#FBD8CF", label: "Peach" },
                      { hex: "#B47AFF", label: "Purple" },
                    ].map((c) => (
                      <div key={c.hex} className="flex flex-col items-center gap-2">
                        <div
                          className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
                          style={{ backgroundColor: c.hex }}
                          aria-label={c.label}
                        />
                        <span className="font-label text-[11px] text-[#F8FAFC]/70">{c.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System / Feedback */}
                <div className="mb-8">
                  <p className="font-label text-[11px] text-[#F8FAFC]/50 uppercase tracking-wide mb-4">
                    System / Feedback
                  </p>
                  <div className="flex flex-wrap gap-5 md:gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
                        style={{ backgroundColor: "#E91103" }}
                        aria-label="Error Red"
                      />
                      <span className="font-label text-[11px] text-[#F8FAFC]/70">#E91103</span>
                      <span className="font-label text-[10px] text-[#F8FAFC]/40 -mt-1">Error</span>
                    </div>
                  </div>
                </div>

                {/* Gradient */}
                <div className="pt-6 border-t border-white/[0.08]">
                  <p className="font-label text-[11px] text-[#F8FAFC]/50 uppercase tracking-wide mb-4">
                    Gradient
                  </p>
                  <div className="flex flex-col items-center gap-2 w-fit">
                    <div
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
                      style={{ background: "linear-gradient(135deg, #C1DFFF 0%, #E4F1FF 100%)" }}
                      aria-label="Gradient C1DFFF to E4F1FF"
                    />
                    <span className="font-label text-[11px] text-[#F8FAFC]/70">#C1DFFF → #E4F1FF</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Design Details — unified carousel gallery ── */}
      <StartingPointSection
        images={DESIGN_DETAILS_SLIDES.map((s) => ({ src: s.image, alt: s.caption }))}
        title="Design Details"
        subtitle="Final screens in numerical order, duplicates removed"
      />
      {/* ── Key Takeaways ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-14">
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Key Takeaways
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {TAKEAWAYS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <div className="w-10 h-10 rounded-full border border-white/[0.08] group-hover:border-[#3B82F6] group-hover:bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center mb-5 transition-all text-[#F8FAFC]/60 group-hover:text-[#3B82F6]">
                  {item.icon}
                </div>
                <h3 className="font-subheading text-[#E2E8F0] text-[24px] leading-[1.3] tracking-[-0.02em] mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-[#94A3B8] text-base leading-[1.7]">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-t border-white/[0.08]">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center gap-6">
          <p className="font-label text-xs text-[#F8FAFC]/50 tracking-wide uppercase">
            Next steps
          </p>
          <h3 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em]">
            Interested in working together?
          </h3>
          <div className="flex items-center gap-5 mt-2">
            <Link
              to="/#work"
              className="inline-flex items-center font-body text-[14px] font-normal uppercase tracking-[0.06em] text-[#F8FAFC]/60 hover:text-[#E2E8F0] hover:bg-white/[0.08] transition-colors px-6 py-3 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            >
              All projects
            </Link>
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center bg-[#3B82F6] hover:bg-[#2563EB] shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_28px_rgba(59,130,246,0.35)] text-white font-body text-[14px] font-normal uppercase tracking-[0.06em] px-6 py-3 rounded-sm transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2"
            >
              Get in touch
            </button>
          </div>
        </div>
      </section>
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <ImageLightbox
        src={surveyLightbox?.src}
        alt={surveyLightbox?.alt}
        isOpen={!!surveyLightbox}
        onClose={() => setSurveyLightbox(null)}
      />
    </main>
  );
}