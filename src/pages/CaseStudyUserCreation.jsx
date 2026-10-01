import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Users, Zap, Eye, Check, Maximize2, X } from "lucide-react";
import { Link } from "react-router-dom";
import StartingPointSection from "@/components/portfolio/StartingPointSection";
import ImageLightbox from "@/components/portfolio/ImageLightbox";
import BeforeAfterSlider from "@/components/portfolio/BeforeAfterSlider";
import PrototypeSection from "@/components/portfolio/PrototypeSection";
import UserCreationPrototype from "@/components/portfolio/UserCreationPrototype";
import ContactModal from "@/components/portfolio/ContactModal";
import AnimatedCounter from "@/components/portfolio/AnimatedCounter";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const TEAM = [
  { role: "My Role", name: "Product Designer" },
  { role: "Product Manager", name: "Strategy & Prioritization" },
  { role: "Full-Stack Developer", name: "Implementation" },
  { role: "UX Writer", name: "Content & Microcopy" },
  { role: "QA Engineer", name: "Quality Assurance" },
];

const SUPPORTERS = [
  { role: "Design Team Lead", name: "Mentorship & Review" },
  { role: "Design System Lead", name: "Component Alignment" },
  { role: "Internal Product Design Team", name: "User Testing & Critique" },
];

const ITERATIONS = [
  {
    num: "01",
    label: "Full-Screen Page",
    tag: "Rejected",
    reason: "The full-screen page broke context switching; users lost immediate visibility into the underlying data table.",
    image: "images/user-creation/Design Explorations & Trade-offs /Full page 1.svg",
    alt: "Full-Screen Page — hand-drawn sketch",
    isWinner: false,
  },
  {
    num: "02",
    label: "Accordion (Inline Expansion)",
    tag: "Rejected",
    reason: "Configuring dynamic, conditional roles caused excessive page jumping and layout shifts.",
    image: "images/user-creation/Design Explorations & Trade-offs /Accordeon 1.svg",
    alt: "Accordion inline expansion — hand-drawn sketch",
    isWinner: false,
  },
  {
    num: "03",
    label: "Dynamic Single-Screen Modal",
    tag: "Selected Direction",
    reason: "Kept users grounded in the workspace context, collapsed 4 friction-heavy steps into 1 progressive screen, and aligned with design system standards.",
    image: "images/user-creation/Design Explorations & Trade-offs /Selected 1.svg",
    alt: "Dynamic single-screen modal — hand-drawn sketch",
    isWinner: true,
  },
];

const TAKEAWAYS = [
  {
    icon: <Zap size={18} />,
    title: "Respect System Patterns",
    body: "Sticking to the platform's established UX patterns, like modals, keeps the experience cohesive across the product.",
  },
  {
    icon: <Eye size={18} />,
    title: "Use Progressive Disclosure",
    body: "Revealing advanced fields only when needed reduces cognitive load and keeps the UI clean and approachable.",
  },
  {
    icon: <Users size={18} />,
    title: "Test Early",
    body: "Reviewing concepts with the design team saved time by eliminating flawed directions before dev investment.",
  },
];

const STARTING_POINT_IMAGES = [
  { src: "images/user-creation/4248f1bef_AddnewuserTM1.png", alt: "Step 1 - Profile" },
  { src: "images/user-creation/b1c2150d1_AddnewuserTM2.png", alt: "Step 2 - Roles" },
  { src: "images/user-creation/70542a368_AddnewuserTM3.png", alt: "Step 3 - Additional Info" },
  { src: "images/user-creation/0ea01fb79_AddnewuserTM4.png", alt: "Step 4 - Summary" },
];

const USER_CREATION_SLIDES = [
  { image: "images/user-creation/3376557ec_1Level-CF.svg", caption: "Level - CF" },
  { image: "images/user-creation/1c6175cd8_5Level-levelcadded.svg", caption: "Level - Level C Added" },
  { image: "images/user-creation/9d671433c_6Level-levelc.svg", caption: "Level - Level C" },
  { image: "images/user-creation/634a2d640_Footertooltip.svg", caption: "Footer Tooltip" },
  { image: "images/user-creation/1532e9144_Adminrole.svg", caption: "Admin Role" },
  { image: "images/user-creation/553151d88_Maxcustomfields.svg", caption: "Max Custom Fields" },
];

export default function CaseStudyUserCreation() {
  const [scrolled, setScrolled] = useState(false);
  const [researchLightbox, setResearchLightbox] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [prototypeFullscreen, setPrototypeFullscreen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            className="flex items-center gap-2 font-heading text-[14px] font-normal uppercase tracking-[0.06em] text-[#F8FAFC]/50 hover:text-[#3B82F6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
          >
            <ArrowLeft size={15} />
            Back to Work
          </Link>
          <span className="font-mono text-xs text-[#F8FAFC]/50 hidden md:block">
            Case Study · User Creation
          </span>
        </div>
      </nav>

      {/* ── Hero — vertical ambient gradient from accent tint to dark canvas ── */}
      <div className="bg-gradient-to-b overflow-hidden relative pb-16 pt-12" style={{ background: "linear-gradient(to bottom, rgba(241,126,99,0.12) 0%, #090D16 75%)" }}>
        {/* Background Graphic Watermark — soft elegant texture */}
        <div
          aria-hidden="true"
          className="text-[120px] font-black tracking-tighter text-[#F8FAFC]/[0.04] select-none pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap leading-none"
        >
          USER CREATION
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-16 md:pt-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left Column */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-mono text-xs tracking-widest uppercase mb-4"
                style={{ color: "#F17E63" }}
              >
                B2B SAAS · UX/UI DESIGN · 2026
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4"
              >
                <span className="text-[#E2E8F0]">How I Streamlined and Shortened the</span>{" "}
                <span className="text-[#F17E63]">User Creation</span>{" "}
                <span className="text-[#E2E8F0]">Process</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-[#94A3B8] text-base leading-relaxed max-w-lg mb-8"
              >
                I replaced a bloated 4-step wizard with a single-screen dynamic modal, reducing cognitive load and eliminating drop-offs.
              </motion.p>

              {/* Metrics — clean white cards */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="grid grid-cols-3 gap-3 max-w-[560px]"
              >
                {[
                  { value: "1", label: "Single-screen flow" },
                  { value: "75%", label: "Reduction in wizard steps" },
                  { value: "0", label: "Redundant clicks" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                    className="bg-[#111827] rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] border border-white/[0.08]"
                  >
                    <p className="font-heading font-bold text-[#E2E8F0] text-2xl tracking-tight leading-none tabular-nums">
                      <AnimatedCounter value={stat.value} duration={1350} />
                    </p>
                    <p className="font-mono text-[11px] text-[#94A3B8] mt-2 uppercase leading-tight">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Column — clean product UI */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center lg:justify-end"
            >
              <div className="w-full max-w-[560px]">
                <img
                  src="images/user-creation/TM mockup.png"
                  alt="User Creation — single-screen dynamic modal"
                  className="w-full h-auto object-contain block rounded-lg border border-border"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Team ── */}
      <section className="w-full px-6 md:px-12 py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-6 mb-12">
            <h2 className="font-subheading font-medium text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0">
              My Role & The Team
            </h2>

          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-0">
            <motion.div {...fadeUp}>
              <h3 className="font-mono text-xs text-[#3B82F6] tracking-wide uppercase mb-6">
                The Team
              </h3>
              <div className="space-y-0">
                {TEAM.map((member, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-4 border-b border-white/[0.08]"
                  >
                    <span className="font-mono text-xs text-[#F8FAFC]/30 w-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-[#94A3B8] text-base flex-1">
                      {member.role}
                    </span>
                    <span className="font-mono text-xs text-[#F8FAFC]/60">
                      {member.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <h3 className="font-mono text-xs text-[#3B82F6] tracking-wide uppercase mb-6">
                Collaboration & Support
              </h3>
              <div className="space-y-0">
                {SUPPORTERS.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-4 border-b border-white/[0.08]"
                  >
                    <span className="font-mono text-xs text-[#F8FAFC]/30 w-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-[#94A3B8] text-base flex-1">
                      {s.role}
                    </span>
                    <span className="font-mono text-xs text-[#F8FAFC]/60">
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Before & After ── */}
      <section className="w-full px-6 md:px-12 py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-heading font-medium text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0 mb-2">
              Before & After
            </h2>
            <p className="font-mono text-xs text-[#F8FAFC]/50 mb-12 block">
              Drag to compare before and after
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="mb-0">
            <BeforeAfterSlider
              beforeImage={{ src: "images/user-creation/0ea01fb79_AddnewuserTM4.png", alt: "Before — 4-Step Wizard user creation flow" }}
              afterImage={{ src: "images/user-creation/202bc23cf_Addnewusercollapes.svg", alt: "After — single-screen dynamic modal" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── The Starting Point ── */}
      <StartingPointSection images={STARTING_POINT_IMAGES} title="The Starting Point" subtitle="The original 4-step wizard flow" />

      {/* ── The Challenge Block 1 — Hero (Solid Brand Orange) ── */}
      <section className="w-full px-6 md:px-12 py-14 md:py-20 bg-[#F17E63]" style={{ backgroundColor: '#F17E63' }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-subheading font-medium text-white text-[32px] leading-[1.2] tracking-[-0.02em] mt-0 mb-2">
              The Challenge
            </h2>
            <p className="font-mono text-xs text-white/80 mb-12 block">
              A Frustrating 4-Step Flow
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="w-full max-w-full mb-0">
            <p className="font-sans text-3xl md:text-4xl font-medium text-white tracking-tight leading-snug w-full max-w-full mb-0">
              How might we turn a frustrating, drop-off-prone 4-step wizard into a single-screen flow that feels effortless?
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── The Challenge Block 2 — Breakdown (Clean Light Canvas) ── */}
      <section className="w-full px-6 md:px-12 py-14 md:py-20 bg-[#0F172A] border-y border-white/[0.06]" style={{ backgroundColor: '#0F172A' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start mb-0">
            <motion.div {...fadeUp}>
              <p className="font-body text-[#F8FAFC]/70 text-[16px] leading-[1.6]">
                The original 4-step user creation modal suffered from heavy friction.
              </p>

              {/* 4-step — light-tinted pill cards */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {["Profile", "Roles", "Approver", "Summary"].map((step, i) => (
                  <div
                    key={step}
                    className="bg-[#111827] rounded-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] px-4 py-3.5 text-center"
                  >
                    <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "#F17E63" }}>
                      Step {i + 1}
                    </p>
                    <p className="font-heading font-semibold text-[#E2E8F0] text-sm mt-1">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 inline-flex items-center gap-2 bg-[#111827] border border-white/[0.08] rounded-full px-3.5 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                <span className="text-[#F17E63] text-xs">↓</span>
                <span className="font-mono text-xs text-[#94A3B8]">Flattened to a single dynamic screen</span>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <div className="space-y-4">
                {[
                  {
                    title: "High Cognitive Load",
                    body: "Complex roles and conditional steps overwhelmed users.",
                  },
                  {
                    title: "Redundant Steps",
                    body: "Approver and summary screens added friction without value.",
                  },
                  {
                    title: "Drop-offs",
                    body: "A frustrating flow caused task abandonment and support tickets.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#111827] rounded-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] pl-5 pr-4 py-4"
                    style={{ borderLeft: "3px solid #F17E63" }}
                  >
                    <h4 className="font-heading font-semibold text-[#94A3B8] text-[15px] mb-1.5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#F17E63" }} />
                      {item.title}
                    </h4>
                    <p className="font-body text-[#94A3B8] text-sm leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Research ── */}
      <section className="w-full px-6 md:px-12 py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-6 mb-12">
            <h2 className="font-subheading font-medium text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0">
              Research & Inspiration
            </h2>

          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start mb-0">
            <motion.div {...fadeUp}>
              <p className="font-body text-[#94A3B8] text-[16px] leading-[1.6] mb-8">
                I analyzed industry benchmarks on{" "}
                <span className="text-[#E2E8F0] font-normal">Mobbin</span> and
                studied how top platforms handle
                user setup at scale.
              </p>
              <div className="space-y-6">
                {[
                  {
                    label: "Dynamic Fields",
                    body: "Replace rigid wizard steps with inline, contextual forms that respond to user choices in real time.",
                  },
                  {
                    label: "Smart Defaults",
                    body: "Pre-selecting common roles reduces clicks and lowers the cognitive load for admins creating users at volume.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-8 h-8 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="font-mono text-xs text-[#3B82F6] font-normal">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-heading font-medium text-[#94A3B8] text-base mb-1">
                        {item.label}
                      </h4>
                      <p className="font-body text-[#94A3B8] text-sm leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}>
              <div
                className="rounded-sm overflow-hidden bg-[#F0F0EC] max-w-[300px] ml-auto cursor-pointer"
                onClick={() => setResearchLightbox(true)}
              >
                <img
                  src="images/user-creation/9a5dc147b_generated_image.png"
                  alt="Design research for user creation flows"
                  className="w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Exploration — Design Explorations & Trade-offs ── */}
      <section className="w-full px-6 md:px-12 py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-subheading font-medium text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0 mb-2">
              Design Explorations & Trade-offs
            </h2>
            <p className="font-mono text-xs text-[#F8FAFC]/50 mb-12 block">
              I evaluated 3 structural patterns against platform consistency, cognitive load, and edge-case scalability.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-0">
            {ITERATIONS.map((iter, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className={`bg-[#111827] rounded-xl overflow-hidden flex flex-col ${
                  iter.isWinner
                    ? "border-2 border-[#F17E63] shadow-[0_8px_24px_rgba(241,126,99,0.12)]"
                    : "border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
                }`}
              >
                {/* Hand-drawn sketch preview — fully visible, no cropping */}
                <div className="w-full bg-[#111827] border-b border-white/[0.08] p-3 flex items-center justify-center">
                  <img
                    src={iter.image}
                    alt={iter.alt}
                    className="w-full h-auto object-contain block"
                    loading="lazy"
                  />
                </div>

                <div className="p-6 md:p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[11px] text-[#F8FAFC]/40 tracking-wide">{iter.num}</span>
                    <span
                      className={`inline-flex items-center text-[10px] font-mono uppercase tracking-wide px-2.5 py-1 rounded-full border ${
                        iter.isWinner
                          ? "bg-[#F17E63]/10 text-[#F17E63] border-[#F17E63]/20"
                          : "bg-neutral-100 text-neutral-600 border-neutral-200"
                      }`}
                    >
                      {iter.isWinner ? (
                        <span className="inline-flex items-center gap-1">
                          <Check size={10} /> {iter.tag}
                        </span>
                      ) : (
                        iter.tag
                      )}
                    </span>
                  </div>

                  <h3 className="font-heading font-medium text-[#E2E8F0] text-[18px] leading-[1.3] tracking-[-0.02em] mb-2">
                    {iter.label}
                  </h3>

                  <p className="font-body text-sm leading-relaxed text-[#94A3B8] mb-0">
                    {iter.reason}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Details — unified carousel gallery ── */}
      <StartingPointSection
        images={USER_CREATION_SLIDES.map((s) => ({ src: s.image, alt: s.caption }))}
        title="Design Details"
        subtitle="Final screens"
        showArchitecturalBlock
      />

      {/* ── Prototype ── */}
      <section className="w-full px-6 md:px-12 py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center justify-between gap-6 mb-2">
            <div>
              <h2 className="font-subheading font-medium text-[#F1F5F9] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0 mb-2">Prototype</h2>
              <span className="font-mono text-xs text-[#94A3B8] block">Interactive demo: add a user and see the single-screen flow</span>
            </div>
            {/* Reused expand button — identical to WizardStepsMockup image preview expand */}
            <button
              onClick={() => setPrototypeFullscreen(true)}
              className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] shrink-0 shadow-sm"
              aria-label="Expand prototype fullscreen"
            >
              <Maximize2 size={14} className="text-[#0A0F1D]" />
            </button>
          </div>
          <div className="mt-8 rounded-xl overflow-hidden shadow-lg border border-white/[0.08] bg-[#111827]">
            <UserCreationPrototype />
          </div>
        </div>
      </section>

      {/* Fullscreen modal — reuses ImageLightbox view (fixed inset-0 z-[100] bg-black/80) */}
      <AnimatePresence>
        {prototypeFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPrototypeFullscreen(false)}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-2 md:p-4 lg:p-6"
          >
            <button
              onClick={() => setPrototypeFullscreen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[1400px] max-h-[94vh] overflow-auto rounded-xl bg-white shadow-2xl"
            >
              <UserCreationPrototype />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Key Takeaways ── */}
      <section className="w-full px-6 md:px-12 py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-6 mb-12">
            <h2 className="font-subheading font-medium text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0">
              Key Takeaways
            </h2>

          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-0">
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
                <h3 className="font-subheading font-medium text-[#E2E8F0] text-[24px] leading-[1.3] tracking-[-0.02em] mb-3">
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
      <section className="w-full px-6 md:px-12 py-14 md:py-20 border-t border-white/[0.08]">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center gap-6">
          <p className="font-mono text-xs text-[#F8FAFC]/50 tracking-wide uppercase">
            Next steps
          </p>
          <h3 className="font-subheading font-medium text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em]">
            Interested in the full case study?
          </h3>
          <div className="flex items-center gap-5 mt-2">
            <Link
              to="/#work"
              className="inline-flex items-center font-heading text-[14px] font-normal uppercase tracking-[0.06em] text-[#F8FAFC]/60 hover:text-[#E2E8F0] hover:bg-white/[0.08] transition-colors px-6 py-3 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            >
              All projects
            </Link>
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center bg-[#3B82F6] hover:bg-[#2563EB] shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_28px_rgba(59,130,246,0.35)] text-white font-heading text-[14px] font-normal uppercase tracking-[0.06em] px-6 py-3 rounded-sm transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2"
            >
              Get in touch
            </button>
          </div>
        </div>
      </section>

      <ImageLightbox
        src="images/user-creation/9a5dc147b_generated_image.png"
        alt="Design research for user creation flows"
        isOpen={researchLightbox}
        onClose={() => setResearchLightbox(false)}
      />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}