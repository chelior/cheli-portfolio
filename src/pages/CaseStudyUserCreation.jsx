import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ChevronRight, Users, LayoutGrid, Eye, Check, Maximize2, X } from "lucide-react";
import { Link } from "react-router-dom";
import StartingPointSection from "@/components/portfolio/StartingPointSection";
import ImageLightbox from "@/components/portfolio/ImageLightbox";
import BeforeAfterSlider from "@/components/portfolio/BeforeAfterSlider";
import UserCreationPrototype from "@/components/portfolio/UserCreationPrototype";
import ContactModal from "@/components/portfolio/ContactModal";
import AnimatedCounter from "@/components/portfolio/AnimatedCounter";
import MoreProjects from "@/components/portfolio/MoreProjects";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const STARTING_POINT_IMAGES = [
  { src: "images/user-creation/starting point/1.svg", alt: "Step 1 — Profile" },
  { src: "images/user-creation/starting point/2.svg", alt: "Step 2 — Roles" },
  { src: "images/user-creation/starting point/3.svg", alt: "Step 3 — Additional Info" },
  { src: "images/user-creation/starting point/4.svg", alt: "Step 4 — Summary" },
];

const USER_CREATION_SOLUTIONS = [
  {
    num: "01",
    label: "Taming the Infinite Role List",
    subtitle: "Turning a sprawled checklist into a quick 2-second search",
    beforeBody: "An exposed checklist created endless vertical scrolling to locate edge-case roles.",
    afterBody: "A compact input with integrated search and dismissible chips.",
    image: "images/user-creation/Search field.svg?v=2",
    body: "Searching through open checklists created endless scrolling and cognitive drag. By combining inline search with dismissible chips inside a single compact field, we cut vertical space by 60% and made role assignment instant.",
  },
  {
    num: "02",
    label: "Dynamic Role Disclosure",
    subtitle: "Showing organization settings only when needed",
    beforeBody: "Non-approvers hit a confusing disabled Step 3, followed by a redundant summary step.",
    afterBody: "The Organization section reveals inline only when an approver role is selected.",
    image: "images/user-creation/newmodal.svg",
    preview: {
      defaultIndex: 1,
      tabs: [
        {
          label: "Before: Legacy Wizard",
          image: "images/user-creation/oldwizard.svg",
          alt: "Legacy wizard — disconnected multi-step flow for user creation",
          badge: "Legacy wizard: disconnected steps",
          tone: "muted",
        },
        {
          label: "After: New Modal",
          image: "images/user-creation/newmodal.svg",
          alt: "New single-screen modal — organization fields revealed inline",
          badge: "Single-screen modal: progressive disclosure",
          tone: "accent",
        },
      ],
    },
    body: "Non-approver roles were hitting disabled screens and redundant steps in the old wizard. We moved organization settings into an inline progressive disclosure pattern, keeping the default form light and only revealing advanced fields when an approver role is selected.",
  },
  {
    num: "03",
    label: "Scannable Form Hierarchy",
    subtitle: "Replacing an over-engineered wizard with inline structure",
    beforeBody: "Wizards suit heavy flows, but here they created artificial friction across 4 screens.",
    afterBody: "A single-view layout grouped into clear logical sections with immediate primary actions.",
    image: "images/user-creation/Sccanable form.svg",
    body: "Multi-step wizards work well for complex onboarding, but here they created unnecessary friction for a routine task. We collapsed four disconnected steps into a single scannable view with clear visual grouping, allowing admins to complete and submit the form in one continuous flow.",
  },
];

const ITERATIONS = [
  {
    num: "01",
    label: "Full-Screen Page",
    tag: "Considered",
    tradeOff: "High Cognitive Load",
    reason: "The full-screen page hid the data table, so users lost their place.",
    image: "images/user-creation/Design Explorations & Trade-offs /Full page 1.svg",
    alt: "Full-Screen Page — hand-drawn sketch",
    isWinner: false,
  },
  {
    num: "02",
    label: "Accordion (Inline Expansion)",
    tag: "Considered",
    tradeOff: "Layout Shifts",
    reason: "Configuring dynamic, conditional roles caused page jumping and layout shifts.",
    image: "images/user-creation/Design Explorations & Trade-offs /Accordeon 1.svg",
    alt: "Accordion inline expansion — hand-drawn sketch",
    isWinner: false,
  },
  {
    num: "03",
    label: "Dynamic Single-Screen Modal",
    tag: "Selected",
    tradeOff: "Selected Direction",
    reason: "Kept users in their workspace, collapsed 4 steps into 1 screen, and matched the design system.",
    image: "images/user-creation/Design Explorations & Trade-offs /Selected 1.svg",
    alt: "Dynamic single-screen modal — hand-drawn sketch",
    isWinner: true,
  },
];

const TAKEAWAYS = [
  {
    icon: <LayoutGrid size={18} />,
    title: "Respect System Patterns",
    body: "Sticking to the platform's established patterns, like modals, keeps the whole product feeling like one thing.",
  },
  {
    icon: <Eye size={18} />,
    title: "Use Progressive Disclosure",
    body: "Revealing advanced fields only when needed keeps the UI uncluttered.",
  },
  {
    icon: <Users size={18} />,
    title: "Test Early",
    body: "Reviewing concepts with the design team saved time by dropping flawed directions before development started.",
  },
];

const USER_CREATION_SLIDES = [
  { image: "images/user-creation/3376557ec_1Level-CF.svg", caption: "Level - CF" },
  { image: "images/user-creation/1c6175cd8_5Level-levelcadded.svg", caption: "Level - Level C Added" },
  { image: "images/user-creation/9d671433c_6Level-levelc.svg", caption: "Level - Level C" },
  { image: "images/user-creation/634a2d640_Footertooltip.svg", caption: "Footer Tooltip" },
  { image: "images/user-creation/1532e9144_Adminrole.svg", caption: "Admin Role" },
  { image: "images/user-creation/553151d88_Maxcustomfields.svg", caption: "Max Custom Fields" },
];

function SolutionTabbedPreview({ preview, onOpenLightbox }) {
  const [active, setActive] = useState(preview.defaultIndex ?? 0);
  const tabRefs = useRef([]);
  const tab = preview.tabs[active];

  const onKeyDown = (e, idx) => {
    let next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % preview.tabs.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + preview.tabs.length) % preview.tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = preview.tabs.length - 1;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div className="w-full">
      {/* Segmented pill control */}
      <div
        role="tablist"
        aria-label="Dynamic role disclosure preview"
        className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-5"
      >
        {preview.tabs.map((t, idx) => (
          <button
            key={t.label}
            ref={(el) => (tabRefs.current[idx] = el)}
            role="tab"
            id={`sol-tab-${idx}`}
            aria-selected={active === idx}
            aria-controls={`sol-panel-${idx}`}
            tabIndex={active === idx ? 0 : -1}
            onClick={() => setActive(idx)}
            onKeyDown={(e) => onKeyDown(e, idx)}
            className={`relative px-4 py-2 rounded-full text-[13px] font-body whitespace-nowrap transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
              active === idx ? "text-white" : "text-[#94A3B8] hover:text-[#E2E8F0]"
            }`}
          >
            {active === idx && (
              <motion.span
                layoutId="activeTab"
                className="absolute inset-0 rounded-full bg-[#F17E63]/15 border border-[#F17E63]/40 shadow-[0_0_16px_rgba(241,126,99,0.18)]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-[1]">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Full-width visual container */}
      <div
        role="tabpanel"
        id={`sol-panel-${active}`}
        aria-labelledby={`sol-tab-${active}`}
        className="rounded-2xl border border-white/[0.07] bg-slate-900/40 backdrop-blur-sm overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] cursor-pointer group hover:border-[#F17E63]/30 transition-colors duration-300"
        onClick={() => onOpenLightbox({ src: tab.image, alt: tab.alt })}
      >
        {/* Contextual status badge */}
        <div className="flex items-center gap-3 px-4 md:px-5 py-3 border-b border-white/[0.06]">
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className={`inline-flex items-center text-[11px] font-label uppercase tracking-wide px-2.5 py-1 rounded-full border backdrop-blur-sm ${
                tab.tone === "accent"
                  ? "bg-[#F17E63]/10 text-[#F17E63] border-[#F17E63]/25"
                  : "bg-white/[0.05] text-[#94A3B8] border-white/[0.08]"
              }`}
            >
              {tab.badge}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Crossfading image */}
        <div className="p-4 md:p-5">
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={tab.image}
              alt={tab.alt}
              loading="lazy"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.005 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-auto max-h-[400px] object-contain mx-auto rounded-xl block transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudyUserCreation() {
  const [scrolled, setScrolled] = useState(false);
  const [startingLightbox, setStartingLightbox] = useState(null);
  const [solutionsLightbox, setSolutionsLightbox] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [prototypeFullscreen, setPrototypeFullscreen] = useState(false);

  const spreadRef = useRef(null);
  const spreadInView = useInView(spreadRef, { once: true, amount: 0.3 });
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isStartingLightboxOpen = startingLightbox !== null;
  const startingPrev = () =>
    setStartingLightbox((prev) => (prev - 1 + STARTING_POINT_IMAGES.length) % STARTING_POINT_IMAGES.length);
  const startingNext = () =>
    setStartingLightbox((prev) => (prev + 1) % STARTING_POINT_IMAGES.length);

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
            Case Study · User Creation
          </span>
        </div>
      </nav>

      {/* ── 1. Hero — vertical ambient gradient from accent tint to dark canvas ── */}
      <div className="min-h-[970px] sm:min-h-[952px] md:min-h-[1025px] lg:min-h-[743px] xl:min-h-[647px] bg-gradient-to-b overflow-hidden relative pb-16 pt-12" style={{ background: "linear-gradient(to bottom, rgba(241,126,99,0.12) 0%, #090D16 75%)" }}>
        {/* Background Graphic Watermark — soft elegant texture */}
        <div
          aria-hidden="true"
          className="text-[120px] font-black tracking-tighter text-[#F8FAFC]/[0.04] select-none pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap leading-none"
        >
          USER CREATION
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 pt-16 md:pt-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left Column */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-label text-xs tracking-widest uppercase mb-4"
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
                <span className="text-[#E2E8F0]">Redesigning Enterprise User Management: From a Clunky 4-Step Wizard to a</span>{" "}
                <span className="text-[#F17E63]">Seamless Flow</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-[#94A3B8] text-base leading-relaxed max-w-lg mb-8"
              >
                How simplifying complex role assignments and permissions reduced onboarding time and eliminated admin drop-offs at Tipalti.
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

            {/* Right Column — clean product UI */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center lg:justify-end"
            >
              <div className="w-full max-w-[560px]">
                <img
                  src="images/user-creation/User creation-hero.svg?v=3"
                  alt="User Creation — single-screen dynamic modal"
                  className="w-full h-auto object-contain block"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>

          {/* Elevated UI showcase — raw interface, no device frames */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 md:mt-14 mb-4"
          >
            <div className="mx-auto">
              <img
                src="images/user-creation/Herolargemockup.svg?v=3"
                alt="User Creation — finalized single-screen flow"
                className="w-full h-auto object-contain block"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 2. The Starting Point — full-width dark: text left, original wizard steps right ── */}
      <section className="w-full py-14 md:py-20 bg-[#111827]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-[1fr_1.7fr] gap-10 lg:gap-16 items-center">
              <div>
                <h2 className="font-heading text-[#E2E8F0] text-[32px] md:text-[36px] leading-[1.2] tracking-[-0.02em] mt-0 mb-6">
                  The Starting Point
                </h2>
                <p className="font-body text-[#94A3B8] text-base leading-[1.7] max-w-lg">
                  At Tipalti, adding a new team member meant navigating a rigid 4-step wizard. Each step was siloed, forcing admins out of their main table context just to configure basic access.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center gap-1.5 md:gap-3">
                  {STARTING_POINT_IMAGES.map((img, i) => (
                    <React.Fragment key={i}>
                      <button
                        type="button"
                        onClick={() => setStartingLightbox(i)}
                        className="flex-1 min-w-0 rounded-lg overflow-hidden cursor-zoom-in hover:opacity-90 transition-opacity duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] block"
                        aria-label={`Expand ${img.alt}`}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-auto object-contain block rounded-lg"
                          loading="lazy"
                          draggable={false}
                        />
                      </button>
                      {i < STARTING_POINT_IMAGES.length - 1 && (
                        <span className="shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-md bg-[#1E2533] border border-white/[0.08] flex items-center justify-center">
                          <ChevronRight size={14} className="text-[#94A3B8]" />
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <p className="font-body text-sm text-[#94A3B8] text-center mt-4">
                  The original 4-step wizard flow
                </p>
              </div>
            </div>
        </div>

        <ImageLightbox
          src={STARTING_POINT_IMAGES[startingLightbox]?.src || ""}
          alt={STARTING_POINT_IMAGES[startingLightbox]?.alt || ""}
          isOpen={isStartingLightboxOpen}
          onClose={() => setStartingLightbox(null)}
          onPrev={startingPrev}
          onNext={startingNext}
        />
      </section>

      {/* ── 3. The Problem: pure editorial 2-column story, no cards ── */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div {...fadeUp} className="lg:col-span-7">
              <span className="font-label text-[11px] tracking-widest uppercase block mb-5 text-[#F8FAFC]/45">
                The Problem
              </span>
              <h3 className="font-subheading text-[#E2E8F0] text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.02em] mb-7">
                An Over-Engineered Flow for a Routine Task
              </h3>
              <p className="font-body text-[#94A3B8] text-base leading-relaxed mb-6">
                Adding a team member should take under a minute. Instead, administrators were forced through a rigid 4-step wizard that treated simple provisioning like complex system setup.
              </p>
              <p className="font-body text-[#94A3B8] text-base leading-relaxed">
                Users encountered disabled screens, scrolled through unending role checklists, and had to click through a redundant review step. What should have been a quick task turned into a friction point that drove task abandonment and daily frustration.
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="lg:col-span-5">
              <div className="divide-y divide-white/10">
                {[
                  {
                    title: "Artificial Wizard Friction",
                    body: "Forcing linear steps created artificial barriers for admins who already knew what they wanted to input.",
                  },
                  {
                    title: "Dead Ends & Redundant Screens",
                    body: "Non-approver roles were guided to a disabled Step 3 followed by a passive summary step that added clicks without utility.",
                  },
                  {
                    title: "List Bloat & Cognitive Drag",
                    body: "Unfiltered, fully exposed role checklists required excessive vertical scrolling just to configure standard permissions.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                    className="py-7 first:pt-0 last:pb-0"
                  >
                    <h4 className="font-heading text-[#E2E8F0] text-[17px] leading-[1.3] tracking-[-0.01em] mb-2.5">
                      {item.title}
                    </h4>
                    <p className="font-body text-[#94A3B8] text-sm leading-relaxed">{item.body}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. The Challenge — full-width orange banner: the "How might we" mission ── */}
      <section className="w-full py-20 md:py-28 min-h-[50vh] flex flex-col justify-center" style={{ backgroundColor: "#F17E63" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp}>
            <p className="font-heading text-white/80 text-[22px] md:text-[24px] tracking-[-0.02em] mt-0 mb-6">
              The Challenge
            </p>
            <p className="font-sans text-3xl md:text-4xl lg:text-[42px] font-medium text-white tracking-tight leading-[1.15] max-w-[1100px]">
              How might we turn a frustrating, <span className="whitespace-nowrap">drop-off-prone</span> <span className="whitespace-nowrap">4-step</span> wizard into <span className="whitespace-nowrap">a single-screen</span> flow<br />that feels effortless?
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 4. Design Explorations & Trade-offs ── */}
      <section className="w-full py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp}>
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0 mb-2">
              Design Explorations & Trade-offs
            </h2>
            <p className="font-body text-[#94A3B8] text-[16px] leading-relaxed mb-12 md:mb-16">
              I evaluated 3 structural patterns for platform consistency, cognitive load, and edge cases.
            </p>
          </motion.div>

          <div ref={spreadRef} className="grid md:grid-cols-3 gap-5 md:gap-6 mb-0 items-stretch">
            {ITERATIONS.map((iter, i) => {
              const simpleMotion = isMobile || reducedMotion;
              const spreadHidden = simpleMotion
                ? { opacity: 0, y: 40 }
                : {
                    opacity: 1,
                    x: i === 0 ? "110%" : i === 2 ? "-110%" : 0,
                    y: 24,
                    rotate: [-3, 0, 3][i],
                    scale: 0.94,
                  };
              const spreadVisible = simpleMotion
                ? { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } }
                : {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: iter.isWinner ? 1.03 : 1,
                    transition: { duration: 0.95, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] },
                  };

              return (
                <motion.div
                  key={i}
                  className="relative"
                  style={{ zIndex: 10 + i }}
                  initial="hidden"
                  animate={spreadInView ? "visible" : "hidden"}
                  variants={{ hidden: spreadHidden, visible: spreadVisible }}
                >
                  <motion.div
                    className={`relative bg-[#111827] rounded-xl overflow-hidden flex flex-col h-full ${
                      iter.isWinner
                        ? "border-2 border-[#F17E63] shadow-[0_8px_24px_rgba(241,126,99,0.12)]"
                        : "border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
                    }`}
                    initial="rest"
                    whileHover={iter.isWinner ? "hover" : "hover"}
                    variants={
                      iter.isWinner
                        ? {
                            rest: { y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
                            hover: { y: -6, transition: { type: "spring", stiffness: 300, damping: 24 } },
                          }
                        : {
                            rest: { opacity: 1, y: 0, transition: { duration: 0.25 } },
                            hover: { opacity: 0.72, y: 0, transition: { duration: 0.25 } },
                          }
                    }
                  >
                    {/* Winner — animated gradient border beam sweeping along the orange border */}
                    {iter.isWinner && (
                      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none" aria-hidden>
                        {!reducedMotion && spreadInView && (
                          <motion.div
                            className="absolute left-1/2 top-1/2 w-[220%] aspect-square -translate-x-1/2 -translate-y-1/2"
                            style={{
                              background:
                                "conic-gradient(from 0deg, transparent 0deg, transparent 250deg, rgba(251,191,36,0.85) 285deg, rgba(241,126,99,1) 315deg, transparent 345deg)",
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, ease: "linear", duration: 3.5 }}
                          />
                        )}
                        {/* Cover the center so only the 2px border ring shows the beam */}
                        <div className="absolute inset-[2px] rounded-[10px] bg-[#111827]" />
                      </div>
                    )}

                    {/* Winner — glow aura, radius expands on hover */}
                    {iter.isWinner && (
                      <motion.div
                        aria-hidden
                        className="absolute -inset-2 rounded-2xl bg-[#F17E63]/25 blur-xl pointer-events-none -z-10"
                        variants={{
                          rest: { opacity: 0.35, scale: 1 },
                          hover: { opacity: 0.6, scale: 1.04, transition: { duration: 0.35, ease: "easeOut" } },
                        }}
                      />
                    )}

                    <div className="relative z-[1] flex flex-col flex-1">
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
                          <span className="font-label text-[11px] text-[#F8FAFC]/40 tracking-wide">{iter.num}</span>
                          <span
                            className={`inline-flex items-center text-[10px] font-label uppercase tracking-wide px-2.5 py-1 rounded-full border ${
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

                        <h3 className="font-heading text-[#E2E8F0] text-[18px] leading-[1.3] tracking-[-0.02em] mb-2">
                          {iter.label}
                        </h3>

                        <p className="font-body text-sm leading-relaxed text-[#94A3B8] mb-0">
                          {iter.reason}
                        </p>
                      </div>
                    </div>

                    {/* Trade-off badge — revealed on hover for considered directions */}
                    {!iter.isWinner && (
                      <motion.span
                        className={`absolute top-3 right-3 z-10 text-[10px] font-label uppercase tracking-wide px-2.5 py-1 rounded-full border backdrop-blur-sm ${
                          i === 0
                            ? "bg-red-500/10 text-red-300/90 border-red-400/30"
                            : "bg-slate-400/10 text-slate-300/90 border-slate-400/30"
                        }`}
                        variants={{
                          rest: { opacity: 0, y: -6, scale: 0.96 },
                          hover: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: "easeOut" } },
                        }}
                      >
                        {iter.tradeOff}
                      </motion.span>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Key Solutions ── */}
      <section className="w-full py-14 md:py-20 bg-[#0F172A] border-y border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp}>
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0 mb-2">
              Key Solutions & Features
            </h2>
            <p className="font-body text-[#94A3B8] text-[16px] leading-relaxed max-w-[640px] mb-12 md:mb-16">
              How the redesigned flow solved the core problems
            </p>
          </motion.div>

          <div className="space-y-20 md:space-y-28">
            {USER_CREATION_SOLUTIONS.map((sol, i) => (
              <motion.div
                key={sol.num}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
              >
                {sol.preview ? (
                  <div className="grid gap-8 md:gap-10 items-center md:grid-cols-[1.3fr_1fr]">
                    <div className="self-center">
                      <SolutionTabbedPreview
                        preview={sol.preview}
                        onOpenLightbox={setSolutionsLightbox}
                      />
                    </div>

                    <div className="self-center">
                      <span className="inline-flex items-center font-mono text-xs text-[#F17E63] bg-[#F17E63]/10 px-2.5 py-1 rounded-md border border-[#F17E63]/20 mb-3">
                        {sol.num}
                      </span>
                      <h3 className="font-heading font-semibold text-[#F1F5F9] text-[22px] tracking-[-0.02em] mb-1">
                        {sol.label}
                      </h3>
                      <p className="text-sm text-[#94A3B8] mb-6">
                        {sol.subtitle}
                      </p>

                      <div className="relative">
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.07] rounded-2xl p-4">
                            <p className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] font-semibold mb-2">
                              BEFORE (PAIN)
                            </p>
                            <p className="text-sm text-[#94A3B8] leading-relaxed">
                              {sol.beforeBody}
                            </p>
                          </div>
                          <div className="bg-[#F17E63]/10 backdrop-blur-sm border border-[#F17E63]/20 rounded-2xl p-4">
                            <p className="text-[11px] font-mono uppercase tracking-wider text-[#F17E63] font-bold mb-2">
                              AFTER (SOLUTION)
                            </p>
                            <p className="text-sm font-medium text-[#E2E8F0] leading-relaxed">
                              {sol.afterBody}
                            </p>
                          </div>
                        </div>
                        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#111827] border border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.35)] items-center justify-center text-white/20 text-sm leading-none">
                          →
                        </div>
                      </div>
                      <div className="flex md:hidden justify-center mt-3 text-white/20 text-sm leading-none">→</div>

                      <p className="font-body text-sm text-[#94A3B8] leading-relaxed mt-4">
                        {sol.body}
                      </p>
                    </div>
                  </div>
                ) : (
                <div className={`grid gap-8 md:gap-10 items-center ${i % 2 === 1 ? "md:grid-cols-[1.25fr_1fr]" : "md:grid-cols-[1fr_1.25fr]"}`}>
                  <div className={`${i % 2 === 1 ? "md:order-2" : ""} self-center`}>
                    <span className="inline-flex items-center font-mono text-xs text-[#F17E63] bg-[#F17E63]/10 px-2.5 py-1 rounded-md border border-[#F17E63]/20 mb-3">
                      {sol.num}
                    </span>
                    <h3 className="font-heading font-semibold text-[#F1F5F9] text-[22px] tracking-[-0.02em] mb-1">
                      {sol.label}
                    </h3>
                    <p className="text-sm text-[#94A3B8] mb-6">
                      {sol.subtitle}
                    </p>

                    <div className="relative">
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.07] rounded-2xl p-4">
                          <p className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] font-semibold mb-2">
                            BEFORE (PAIN)
                          </p>
                          <p className="text-sm text-[#94A3B8] leading-relaxed">
                            {sol.beforeBody}
                          </p>
                        </div>
                        <div className="bg-[#F17E63]/10 backdrop-blur-sm border border-[#F17E63]/20 rounded-2xl p-4">
                          <p className="text-[11px] font-mono uppercase tracking-wider text-[#F17E63] font-bold mb-2">
                            AFTER (SOLUTION)
                          </p>
                          <p className="text-sm font-medium text-[#E2E8F0] leading-relaxed">
                            {sol.afterBody}
                          </p>
                        </div>
                      </div>
                      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#111827] border border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.35)] items-center justify-center text-white/20 text-sm leading-none">
                        →
                      </div>
                    </div>
                    <div className="flex md:hidden justify-center mt-3 text-white/20 text-sm leading-none">→</div>

                    <p className="font-body text-sm text-[#94A3B8] leading-relaxed mt-4">
                      {sol.body}
                    </p>
                  </div>

                  <div
                    className={`${i % 2 === 1 ? "md:order-1" : ""} self-center w-full rounded-2xl overflow-hidden border border-white/[0.07] bg-slate-900/40 backdrop-blur-sm p-4 md:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] cursor-pointer group hover:border-[#F17E63]/30 transition-colors duration-300 flex items-center justify-center`}
                    onClick={() => setSolutionsLightbox({ src: sol.image, alt: sol.label })}
                  >
                    <img
                      src={sol.image}
                      alt={sol.label}
                      className="w-full h-auto object-contain rounded-xl block transition-transform duration-700 group-hover:scale-[1.01]"
                      loading="lazy"
                    />
                  </div>
                </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <ImageLightbox
          src={solutionsLightbox?.src}
          alt={solutionsLightbox?.alt || ""}
          isOpen={!!solutionsLightbox}
          onClose={() => setSolutionsLightbox(null)}
        />
      </section>

      {/* ── 6. Final Experience: narrative merged into the live prototype showcase ── */}
      <section className="w-full py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="flex items-start justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="font-label text-[11px] tracking-widest uppercase text-[#F8FAFC]/45">
                  Final Experience
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#F17E63]/30 bg-[#F17E63]/10 px-3 py-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F17E63] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F17E63]" />
                  </span>
                  <span className="font-label text-[10px] tracking-widest uppercase text-[#F17E63]">
                    Live Prototype
                  </span>
                </span>
              </div>
              <h2 className="font-subheading text-[#E2E8F0] text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.02em] mb-6">
                The Unified Flow: Designed for Speed and Certainty
              </h2>
            </div>
            <button
              onClick={() => setPrototypeFullscreen(true)}
              className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] shrink-0 shadow-sm mt-1"
              aria-label="Expand prototype fullscreen"
            >
              <Maximize2 size={14} className="text-[#0A0F1D]" />
            </button>
          </motion.div>

          <motion.p {...fadeUp} className="font-body text-[#94A3B8] text-base leading-[1.75] max-w-[760px] mb-5">
            Rather than forcing administrators through an artificial linear wizard, the redesigned experience unifies profile setup, permissions, and organizational rules into a single continuous view. By leveraging inline search with dismissible chips, vertical footprint dropped by 60%, while progressive disclosure ensures advanced approver controls surface only when needed. The result is a calm, resilient interface that turns a multi-minute administrative hurdle into a confident 30-second workflow.
          </motion.p>

          <motion.p {...fadeUp} className="font-body text-sm text-[#94A3B8] leading-relaxed max-w-[760px] mb-10">
            <span className="text-[#E2E8F0]">Try it yourself.</span> This is a fully interactive prototype: click the <span className="text-[#E2E8F0]">Add user</span> button in the toolbar, then select <span className="text-[#E2E8F0]">Add users manually</span> to open the single-screen flow below.
          </motion.p>

          <motion.div {...fadeUp} className="rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <UserCreationPrototype />
          </motion.div>
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

      {/* ── 7. Before & After ── */}
      <section className="w-full py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0 mb-2">
              Before & After
            </h2>
            <p className="font-body text-[#94A3B8] text-[16px] leading-relaxed max-w-[640px] mb-12 md:mb-16">
              Drag to compare before and after
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="mb-0">
            <BeforeAfterSlider
              beforeImage={{ src: "images/user-creation/0ea01fb79_AddnewuserTM4.png", alt: "Before — 4-Step Wizard user creation flow" }}
              afterImage={{ src: "images/user-creation/202bc23cf_Addnewusercollapes.svg", alt: "After — single-screen dynamic modal" }}
            />
            <div className="max-w-[1024px] mx-auto grid md:grid-cols-2 gap-6 md:gap-8 mt-6">
              <div className="flex items-start gap-2.5">
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#94A3B8] shrink-0" />
                <span className="font-body text-sm text-[#94A3B8] leading-relaxed">4 disconnected steps, high drop-offs, zero context.</span>
              </div>
              <div className="flex items-start justify-end gap-2.5">
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0" />
                <span className="font-body text-sm text-[#94A3B8] leading-relaxed">A single unified modal with progressive disclosure.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Key Takeaways ── */}
      <section className="w-full py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="flex items-center gap-6 mb-12">
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0">
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

      <MoreProjects currentSlug="/case-study/user-creation" />

      {/* ── Footer CTA ── */}
      <section className="w-full py-14 md:py-20 border-t border-white/[0.08]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-6">
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
    </main>
  );
}
