import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Type, GitBranch, Columns, Palette, Eye, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import ImageLightbox from "@/components/portfolio/ImageLightbox";
import HeroGif from "@/components/portfolio/HeroGif";
import ContactModal from "@/components/portfolio/ContactModal";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const CHALLENGES = [
  {
    title: "Zero Prior Characterization",
    body: "4 years of organic, developer-driven growth led to severe feature bloat and a confusing structure.",
  },
  {
    title: "Hidden Power Features",
    body: "Advanced tools (like a built-in phone system) were buried under heavy navigation and overcrowded pages filled with ambiguous icons.",
  },
  {
    title: "Non-Tech Audience & Rigid Flows",
    body: "Primary users (managers and admins) struggled with long, manual processes like onboarding observers without flexible date pickers.",
  },
];

const RESEARCH = [
  {
    label: "System Auditing",
    body: "Conducted 10 intensive working sessions with the client to audit every page and map friction points.",
  },
  {
    label: "User Survey",
    body: "Deployed a concise 15-question survey to capture real usage habits from managers and administrative staff.",
  },
  {
    label: "Key Personas",
    body: "Comprehensive Managers (dual-screen operators tracking attendance and approvals), Admin Employees (daily operators), and Observers.",
  },
];

const SURVEY_SCREENS = [
  { src: "images/5d470fd86_formss1.png", alt: "Survey - Hard to find features in tiny icons", translation: "Hard to find features in tiny icons" },
  { src: "images/22626aae5_formss2.png", alt: "Survey - Report updates need separate window", translation: "Report updates need a separate window" },
  { src: "images/ce784e0a4_formss3.png", alt: "Survey - Need parallel view of active students", translation: "Need a parallel view of active students" },
  { src: "images/ca1fe5223_formss5.png", alt: "Survey - Add new fingerprint", translation: "Add new fingerprint" },
  { src: "images/9b36a8f55_formss6.png", alt: "Survey - Settings changes one by one", translation: "Settings changes one by one" },
  { src: "images/5775f5330_formss8.png", alt: "Survey - Inaccessible, outdated system", translation: "Inaccessible, outdated system" },
];

const SOLUTIONS = [
  {
    icon: <Type size={18} />,
    title: "Text-First Navigation & Decluttering",
    body: "Replaced redundant tabs with contextual filters and swapped ambiguous icons for clear text labels.",
  },
  {
    icon: <GitBranch size={18} />,
    title: "Dual-Path Onboarding",
    body: "Split observer creation into a shortened path for high-workload intake and a full path for later completion.",
  },
  {
    icon: <Columns size={18} />,
    title: "Master-Details Model",
    body: "Introduced a split-screen pattern for employee management, opening their full \u201CID\u201D interface side-by-side for seamless salary and history comparison.",
  },
  {
    icon: <Palette size={18} />,
    title: "Modern Aesthetic",
    body: "Designed a clean visual language from scratch to reduce fatigue while preserving the company logo.",
  },
];

const STARTING_POINT_IMAGES = [
  { src: "images/7bee2c0c1_Oldsystem-HomePage.png", alt: "Old system - Main dashboard" },
  { src: "images/70d5f602e_Oldsystem2.png", alt: "Old system - Student list" },
  { src: "images/a47b4b146_Oldsystem3.png", alt: "Old system - Report form" },
  { src: "images/cbde4d24c_Oldsystem5.png", alt: "Old system - Monthly report" },
];

const TAKEAWAYS = [
  {
    icon: <Eye size={18} />,
    title: "Clarity Beats Minimalism",
    body: "For non-tech enterprise users, clear text labels and explicit hierarchy outperform cryptic icons and hidden minimalism.",
  },
  {
    icon: <Scale size={18} />,
    title: "Managing Constraints",
    body: "Balancing rigid feature-retention demands and tight development timelines while protecting user experience.",
  },
];

function ImagePlaceholder({ alt, className = "" }) {
  return (
    <div className={`aspect-[4/3] rounded-lg border-2 border-dashed border-[#E5E7EB] flex items-center justify-center bg-[#F5F5F7] ${className}`}>
      <div className="text-center px-4">
        <span className="font-mono text-xs text-[#0A0F1D]/40 uppercase block">{alt}</span>
        <span className="font-mono text-[10px] text-[#0A0F1D]/30 uppercase block mt-1">Image coming soon</span>
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

  return (
    <main className="bg-[#FFFFFF] min-h-screen">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E5E7EB]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <Link
            to="/#work"
            className="flex items-center gap-2 font-heading text-[14px] font-medium uppercase tracking-[0.06em] text-[#0A0F1D]/50 hover:text-[#6366F1] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] rounded"
          >
            <ArrowLeft size={15} />
            Back to Work
          </Link>
          <span className="font-mono text-xs text-[#0A0F1D]/50 hidden md:block">
            Case Study · Sdarim
          </span>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 md:pt-44 pb-20 md:pb-32 px-6 md:px-12">
        <HeroGif size="large" />
        <div className="max-w-[1100px] mx-auto">
          <motion.p
            {...fadeUp}
            className="font-mono text-xs text-[#6366F1] tracking-widest uppercase mb-6"
          >
            B2B/Enterprise SaaS • UX/UI Design • 2023
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-heading font-extrabold text-[#0A0F1D] tracking-[-0.02em] text-[36px] md:text-[52px] leading-[1.15] max-w-[900px]"
          >
            Sdarim: From Feature Bloat to <span className="text-[#6366F1]">Intuitive Workflow</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10"
          >
            <p className="font-body text-[#4A5568] text-[16px] leading-[1.6] max-w-[560px]">
              Transforming a cluttered, uncharacterized 4-year-old enterprise platform
              into an intuitive system for non-tech-savvy users, reducing cognitive load
              and uncovering hidden features.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-14 md:mt-20 grid grid-cols-3 gap-4 max-w-[640px]"
          >
            {[
              { value: "11", label: "System Processes Mapped" },
              { value: "10", label: "Discovery Sessions" },
              { value: "3", label: "Core Personas" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                className="bg-[#F5F5F7] rounded-xl p-5 md:p-6"
              >
                <p className="font-heading font-bold text-[#0A0F1D] text-3xl md:text-4xl tracking-[-0.04em]">
                  {stat.value}
                </p>
                <p className="font-mono text-xs text-[#0A0F1D]/50 mt-3 uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── My Role & Context ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36 pt-32 md:pt-48">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
              My Role & Context
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <motion.div {...fadeUp}>
              <h3 className="font-mono text-xs text-[#6366F1] tracking-wide uppercase mb-6">
                My Role
              </h3>
              <h4 className="font-heading font-semibold text-[#0A0F1D] text-[24px] leading-[1.3] tracking-[-0.02em] mb-3">
                Product Designer
              </h4>
              <p className="font-body text-[#4A5568] text-base leading-[1.7]">
                End-to-end product redefinition: research, client meetings, wireframes, and UI.
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <h3 className="font-mono text-xs text-[#6366F1] tracking-wide uppercase mb-6">
                Context
              </h3>
              <h4 className="font-heading font-semibold text-[#0A0F1D] text-[24px] leading-[1.3] tracking-[-0.02em] mb-3">
                Project Company Environment
              </h4>
              <p className="font-body text-[#4A5568] text-base leading-[1.7]">
                Executed within a project company, collaborating with an external software
                team that built the system organically over 4 years for multiple Kollelim
                across Israel.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Before & After ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Before & After
            </h2>
            <span className="font-mono text-xs text-[#0A0F1D]/50 mt-2 block">
              The transformation at a glance
            </span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <motion.div {...fadeUp} className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#6366F1] tracking-wide uppercase">
                  Before
                </span>
                <span className="font-mono text-xs text-[#0A0F1D]/50">
                  Old System
                </span>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg border border-[#E5E7EB] flex-1">
                <img src="images/771c2c716_Oldsystem-HomePage.png" alt="Old system - Home Page" className="w-full h-full object-cover object-top block" />
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#6366F1] tracking-wide uppercase">
                  After
                </span>
                <span className="font-mono text-xs text-[#0A0F1D]/50">
                  Redesigned System
                </span>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg border border-[#E5E7EB]">
                <img src="images/3d0fd9abf_11HomePage_1x.png" alt="1.1 Home Page" className="w-full h-auto block" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How It Started ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
              How It Started
            </h2>
            <span className="font-mono text-xs text-[#0A0F1D]/50 mt-2 block">
              The original system before the redesign
            </span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {STARTING_POINT_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              >
                <div
                  className="bg-[#1a1a24] rounded-xl p-1.5 shadow-lg cursor-pointer"
                  onClick={() => setSurveyLightbox({ src: img.src, alt: img.alt })}
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-md">
                    <img src={img.src} alt={img.alt} className={`w-full h-full object-cover ${i === 3 ? "object-top" : "object-center"}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Challenge ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36 bg-[#0A0F1D] py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-heading font-bold text-white text-[32px] leading-[1.2] tracking-[-0.02em]">
              The Challenge
            </h2>
            <span className="font-mono text-xs text-white/70 mt-2 block">
              Feature Bloat, Hidden Features, Rigid Flows
            </span>
          </motion.div>

          <motion.p {...fadeUp} className="font-body text-white/80 text-[16px] leading-[1.6] max-w-[600px] mb-12">
            A 4-year-old enterprise platform built organically by developers, with zero prior
            characterization, serving non-tech-savvy users across multiple institutions.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {CHALLENGES.map((challenge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-l-2 border-[#6366F1]/40 pl-5"
              >
                <h4 className="font-heading font-medium text-white text-base mb-2">
                  {challenge.title}
                </h4>
                <p className="font-body text-white/75 text-sm leading-relaxed">
                  {challenge.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Research & Discovery ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Research & Discovery
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
            {RESEARCH.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-5"
              >
                <div className="w-8 h-8 rounded-full bg-[#6366F1]/8 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-mono text-xs text-[#6366F1] font-medium">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h4 className="font-heading font-medium text-[#0A0F1D] text-base mb-1">
                    {item.label}
                  </h4>
                  <p className="font-body text-[#4A5568] text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Survey screenshots */}
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-[#6366F1] tracking-wide uppercase">
                User Survey - Pain Points
              </span>
              <span className="font-mono text-xs text-[#0A0F1D]/50">
                Real feedback from the field
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {SURVEY_SCREENS.map((screen, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                  className="cursor-pointer"
                  onClick={() => setSurveyLightbox({ src: screen.src, alt: screen.alt })}
                >
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img src={screen.src} alt={screen.alt} className="w-full h-auto block" />
                  </div>
                  <p className="font-body text-sm text-[#4A5568] mt-3 leading-relaxed">
                    {screen.translation}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Key Solutions & Design Decisions ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36 bg-[#E0E7FF] py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-4">
            <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Key Solutions & Design Decisions
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-[#E5E7EB]">
              <span className="font-mono text-xs text-[#6366F1] uppercase tracking-wide">
                Client Constraint
              </span>
              <span className="font-body text-sm text-[#0A0F1D]">
                Keep all existing functionality
              </span>
            </div>
          </motion.div>

          {/* Alternating text + mockup rows */}
          <div className="space-y-16 md:space-y-24">
            {SOLUTIONS.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div className={i % 2 === 1 ? "md:order-2" : ""}>
                    <div className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center mb-5 text-[#6366F1]">
                      {solution.icon}
                    </div>
                    <h3 className="font-heading font-semibold text-[#0A0F1D] text-[24px] tracking-[-0.02em] mb-3">
                      {solution.title}
                    </h3>
                    <p className="font-body text-[#4A5568] text-base leading-[1.7]">
                      {solution.body}
                    </p>
                  </div>
                  <div className={i % 2 === 1 ? "md:order-1" : ""}>
                    <ImagePlaceholder alt={`Mockup - ${solution.title}`} className="shadow-lg" />
                  </div>
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
            <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Visual Language
            </h2>
          </motion.div>

          <motion.p {...fadeUp} className="font-body text-[#4A5568] text-[16px] leading-[1.7] max-w-[640px] mb-16">
            The company lacks a specific branding language. The design guidelines emphasized
            a modern and clean look, with maintaining the logo as the only strict requirement.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div {...fadeUp}>
              <h3 className="font-mono text-xs text-[#6366F1] tracking-wide uppercase mb-6">
                Typography
              </h3>
              <div className="rounded-xl border border-[#E5E7EB] p-8 md:p-10 bg-white">
                <p className="font-mono text-xs text-[#0A0F1D]/50 mb-6">Assistant</p>
                <p style={{ fontFamily: "'Assistant', sans-serif" }} className="text-[#0A0F1D] text-5xl md:text-6xl font-bold leading-tight mb-4">
                  אבגד 1234
                </p>
                <p style={{ fontFamily: "'Assistant', sans-serif" }} className="text-[#4A5568] text-base">
                  Assistant Font
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <h3 className="font-mono text-xs text-[#6366F1] tracking-wide uppercase mb-6">
                Color Palette
              </h3>
              <div className="rounded-xl border-2 border-dashed border-[#E5E7EB] p-8 md:p-10 h-full flex items-center justify-center min-h-[200px]">
                <p className="font-mono text-xs text-[#0A0F1D]/40 uppercase tracking-wide">
                  Color palette coming soon
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Design Details ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Design Details
            </h2>
            <span className="font-mono text-xs text-[#0A0F1D]/50 mt-2 block">
              Final screens & Master-Details layout
            </span>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-12 md:p-20 text-center"
          >
            <p className="font-mono text-xs text-[#0A0F1D]/50 uppercase tracking-wide mb-4">
              Coming Soon
            </p>
            <p className="font-body text-[#4A5568] text-base">
              Final screens and Master-Details layout demonstration will be added here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Key Takeaways ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-14">
            <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
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
                <div className="w-10 h-10 rounded-full border border-[#E5E7EB] group-hover:border-[#6366F1] group-hover:bg-[#6366F1]/5 flex items-center justify-center mb-5 transition-all text-[#0A0F1D]/60 group-hover:text-[#6366F1]">
                  {item.icon}
                </div>
                <h3 className="font-heading font-semibold text-[#0A0F1D] text-[24px] leading-[1.3] tracking-[-0.02em] mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-[#4A5568] text-base leading-[1.7]">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-t border-[#E5E7EB]">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center gap-6">
          <p className="font-mono text-xs text-[#0A0F1D]/50 tracking-wide uppercase">
            Next steps
          </p>
          <h3 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
            Interested in the full case study?
          </h3>
          <div className="flex items-center gap-5 mt-2">
            <Link
              to="/#work"
              className="inline-flex items-center font-heading text-[14px] font-medium uppercase tracking-[0.06em] text-[#0A0F1D]/60 hover:text-[#0A0F1D] hover:bg-[#F5F5F7] transition-colors px-6 py-3 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]"
            >
              All projects
            </Link>
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center bg-[#6366F1] hover:bg-[#0A0F1D] text-white font-heading text-[14px] font-medium uppercase tracking-[0.06em] px-6 py-3 rounded-sm transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] focus-visible:ring-offset-2"
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