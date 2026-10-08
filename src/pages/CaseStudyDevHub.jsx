import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Rocket, TrendingUp, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";
import StartingPointSection from "@/components/portfolio/StartingPointSection";
import ImageLightbox from "@/components/portfolio/ImageLightbox";
import BeforeAfterSlider from "@/components/portfolio/BeforeAfterSlider";
import PrototypeSection from "@/components/portfolio/PrototypeSection";
import DevHubPrototype from "@/components/portfolio/DevHubPrototype";
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
  { role: "Full-Stack Developers", name: "Implementation" },
  { role: "UX Writer", name: "Content & Microcopy" },
  { role: "DevOps & QA Engineers", name: "Infrastructure & Quality" },
];

const SUPPORTERS = [
  { role: "Design System Lead", name: "Vue3 / Component Alignment" },
  { role: "Solutions Architects & Support Teams", name: "Internal Stakeholders" },
  { role: "External Developers & Payers", name: "User Insights" },
];

const SOLUTIONS = [
  {
    num: "01",
    label: "Multi-App to Multi-User",
    subtitle: "Flexible IA for today and tomorrow's teams",
    reason:
      "Designed a flexible information architecture that manages multiple apps today, with dedicated UI entry points reserved for permissions and team management in phase two.",
    beforeLabel: "BEFORE (PAIN)",
    beforeBody: "Locked to a single app + single user, blocking team collaboration.",
    afterLabel: "AFTER (SOLUTION)",
    afterBody: "Multi-app hub with clear entry points for future team permissions.",
    image: "images/devhub/devhub - my apps.png",
    bullets: [
      "Holds multiple apps today without clutter",
      "Future-proofed for permissions & teams",
      "Clean, scalable navigation model",
    ],
  },
  {
    num: "02",
    label: "Context Visibility & Scalable Navigation",
    subtitle: "Clear environment context today, easy expansion tomorrow",
    reason:
      "Added a persistent context anchor in the top navigation that grounds the user in their active payer environment while leaving a dedicated slot for upcoming multi-payer switching.",
    beforeLabel: "BEFORE (PAIN)",
    beforeBody: "Legacy navigation either lacked clear visibility of the active payer context or offered confusing controls that caused workflow errors.",
    afterLabel: "AFTER (SOLUTION)",
    afterBody: "Kept the active payer context visible in the top header and removed the dropdown chevron for the MVP, so users aren't misled before multi-payer switching arrives.",
    image: "images/devhub/prototype/payersnamemockup2.svg",
    bullets: [
      "Clear visual indicator of the active payer account to ensure error-free configuration",
      "Removed interactive chevron affordance to prevent user frustration during MVP",
      "Modular header structure engineered to enable full switcher functionality in Phase 2 with zero redesign",
    ],
  },
  {
    num: "03",
    label: "Performant Data Grids",
    subtitle: "Audit logs at enterprise scale",
    reason:
      "Used core Design System components to build high-performance tables for Audit Logs and API Logs with strong filtering.",
    beforeLabel: "BEFORE (PAIN)",
    beforeBody: "Slow, unfiltered tables with poor scanability at scale.",
    afterLabel: "AFTER (SOLUTION)",
    afterBody: "Design System grids that are fast, filterable, and ready for audits.",
    image: "images/devhub/prototype/oldnew1.svg",
    bullets: [
      "High-performance virtualized tables",
      "Strong multi-column filtering",
      "Consistent Design System patterns",
    ],
  },
];

const CHALLENGES = [
  {
    title: "No Multi-Tenant Support",
    body: "The platform limited users to a single app and user context, blocking multi-app management and team collaboration.",
  },
  {
    title: "Tight MVP Deadline",
    body: "High business urgency required a strict, phased scope.",
  },
  {
    title: "Scalable Architecture",
    body: "I designed for Multi-App at launch while embedding UI foundations for future Multi-User integration.",
  },
  {
    title: "High Support Overhead",
    body: "External developers depended on internal teams for API testing and troubleshooting.",
  },
];

const TAKEAWAYS = [
  {
    icon: <Rocket size={18} />,
    title: "MVP as a Finished Experience",
    body: "I learned to treat an MVP as a finished product: polished end-to-end from day one, with the architecture ready for future scale.",
  },
  {
    icon: <TrendingUp size={18} />,
    title: "Design System = Business ROI",
    body: "Aligning complex enterprise products with a unified Design System improves usability and cuts engineering effort, which makes tight deadlines possible.",
  },
  {
    icon: <LifeBuoy size={18} />,
    title: "Reducing Support Overhead",
    body: "External developers test on their own, so internal teams spend less time on support.",
  },
];

const STARTING_POINT_IMAGES = [
  { src: "images/devhub/f8a9b2071_Appdetails-Editmode52.png", alt: "App details - Edit mode" },
  { src: "images/devhub/c5c287de2_Authorizationcodeflow.png", alt: "Authorization code flow - View mode" },
  { src: "images/devhub/232ed612c_Createflow-clickonbackbutton381.png", alt: "Create application - Authorization code flow" },
  { src: "images/devhub/2bc144b05_Createflow-clickonbackbutton38.png", alt: "Create application - Client credentials flow" },
];

const DEVHUB_SLIDES = [
  { image: "images/devhub/4814ef766_1intialscreen.svg", caption: "Initial Screen" },
  { image: "images/devhub/9d97eb3bc_2createapppopup.svg", caption: "Create App Popup" },
  { image: "images/devhub/ec633d710_4appname.svg", caption: "App Name" },
  { image: "images/devhub/456679637_7scopesmultiselect.svg", caption: "Scopes Multiselect" },
  { image: "images/devhub/b5b110993_8Scopesmultiselected.svg", caption: "Scopes Multi-Selected" },
  { image: "images/devhub/f7b433f2b_9Createapp.svg", caption: "Create App" },
  { image: "images/devhub/ef11ad2a1_10Applicationcreatedtoast.svg", caption: "Application Created Toast" },
  { image: "images/devhub/96302926d_10Applicationcreatedtoast.svg", caption: "Application Created Toast" },
];

export default function CaseStudyDevHub() {
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);

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
            className="flex items-center gap-2 font-body text-[14px] font-normal uppercase tracking-[0.06em] text-[#F8FAFC]/50 hover:text-[#FF4E7E] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4E7E] rounded"
          >
            <ArrowLeft size={15} />
            Back to Work
          </Link>
          <span className="font-label text-xs text-[#F8FAFC]/50 hidden md:block">
            Case Study · DevHub
          </span>
        </div>
      </nav>

      {/* ── Hero — vertical ambient gradient from accent tint to dark canvas ── */}
      <div className="min-h-[970px] sm:min-h-[952px] md:min-h-[1025px] lg:min-h-[743px] xl:min-h-[647px] bg-gradient-to-b overflow-hidden relative pb-16 pt-12" style={{ background: "linear-gradient(to bottom, rgba(255,78,126,0.12) 0%, #090D16 75%)" }}>
        {/* Background Watermark — DEVHUB */}
        <div
          aria-hidden="true"
          className="text-[120px] font-black tracking-tighter text-[#F8FAFC]/[0.04] select-none pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap leading-none"
        >
          DEVHUB
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
                style={{ color: "#FF4E7E" }}
              >
                B2B SAAS · DEVELOPER PORTAL · 2025
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4"
              >
                <span className="text-[#E2E8F0]">Modernizing </span>
                <span className="text-[#FF4E7E]">DevHub</span>
                <span className="text-[#E2E8F0]">: From a Legacy Single-App Tool to a Flexible Developer Portal</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-[#94A3B8] text-base leading-relaxed max-w-lg mb-8"
              >
                I turned Tipalti's legacy single-app, single-user tool into a scalable multi-tenant developer portal with self-service API testing.
              </motion.p>

              {/* Metrics — 3 white cards elevated with soft shadows (pink tint) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="grid grid-cols-3 gap-3 max-w-[560px]"
              >
                {[
                  { value: "27%", label: "Time-to-market savings" },
                  { value: "3", label: "Multi-tenant contexts" },
                  { value: "100%", label: "Design System aligned" },
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

            {/* Right Column — flat raw UI preview (bottom-aligned with metric cards) */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-end justify-center lg:justify-end self-end"
            >
              <div className="w-full max-w-[560px]">
                <img
                  src="images/devhub/devhub - my apps.png"
                  alt="DevHub — multi-tenant developer portal"
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
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0">
              My Role & The Team
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-24 mb-0">
            <motion.div {...fadeUp}>
              <h3 className="font-label text-xs text-[#FF4E7E] tracking-wide uppercase mb-3">
                The Core Team
              </h3>
              <div className="space-y-0">
                {TEAM.map((member, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-4 border-b border-white/[0.08]"
                  >
                    <span className="font-label text-xs text-[#F8FAFC]/30 w-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-[#94A3B8] text-base flex-1">
                      {member.role}
                    </span>
                    <span className="font-label text-xs text-[#F8FAFC]/60">
                      {member.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <h3 className="font-label text-xs text-[#FF4E7E] tracking-wide uppercase mb-3">
                Collaboration & Support
              </h3>
              <div className="space-y-0">
                {SUPPORTERS.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-4 border-b border-white/[0.08]"
                  >
                    <span className="font-label text-xs text-[#F8FAFC]/30 w-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-[#94A3B8] text-base flex-1">
                      {s.role}
                    </span>
                    <span className="font-label text-xs text-[#F8FAFC]/60">
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
      <section className="px-6 md:px-12 py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-heading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Before & After
            </h2>
            <span className="font-label text-xs text-[#F8FAFC]/50 mt-2 block">
              Drag to compare before and after
            </span>
          </motion.div>
          <motion.div {...fadeUp}>
            <BeforeAfterSlider
              beforeImage={{ src: "images/devhub/f8a9b2071_Appdetails-Editmode52.png", alt: "Before — Legacy DevHub portal" }}
              afterImage={{ src: "images/devhub/devhub.after.mockup.svg", alt: "After — Modern DevHub" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── The Starting Point ── */}
      <StartingPointSection images={STARTING_POINT_IMAGES} />

      {/* ── The Challenge — Top Hero (solid DevHub pink) ── */}
      <section className="w-full my-0 px-6 md:px-12 py-14 md:py-20 bg-[#FF4E7E]" style={{ backgroundColor: "#FF4E7E" }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-subheading text-white text-[32px] leading-[1.2] tracking-[-0.02em] mt-0 mb-2">
              The Challenge
            </h2>
            <p className="font-label text-xs text-white/80 mb-12 block">
              A Rigid, Legacy Single-App & Single-User Tool
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="w-full max-w-full mb-0">
            <p className="font-sans text-3xl md:text-4xl font-medium text-white tracking-tight leading-snug w-full max-w-full mb-0">
              How might we evolve a rigid single-app, single-user tool into a scalable, multi-tenant developer portal without missing our tight MVP deadline?
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── The Challenge — Bottom Breakdown (light canvas, pink accents) ── */}
      <section className="w-full my-0 px-6 md:px-12 py-14 md:py-20 bg-[#0F172A] border-y border-white/[0.06]" style={{ backgroundColor: "#0F172A" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start mb-0">
            <motion.div {...fadeUp}>
              <p className="font-body text-[#F8FAFC] text-[16px] leading-[1.6] font-medium">
                Tipalti built its legacy DevHub around a limited "single-app, single-user" model. As the company and client base scaled, those limits created operational bottlenecks:
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex-1 rounded-xl border border-white/[0.08] bg-[#111827] shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-4 text-center">
                  <p className="font-label text-[10px] tracking-widest uppercase text-[#F8FAFC]/50 mb-1">Legacy</p>
                  <p className="font-body font-semibold text-[#E2E8F0] text-sm">Single App / Single User</p>
                </div>
                <span className="text-[#FF4E7E] text-lg shrink-0">→</span>
                <div className="flex-1 rounded-xl border border-[#FF4E7E]/20 bg-[#111827] shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-4 text-center">
                  <p className="font-label text-[10px] tracking-widest uppercase text-[#FF4E7E] mb-1">Modern</p>
                  <p className="font-body font-semibold text-[#E2E8F0] text-sm">Multi-App / Multi-User</p>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 bg-[#111827] border border-white/[0.08] rounded-full px-3.5 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                <span className="text-[#FF4E7E] text-xs">↓</span>
                <span className="font-label text-xs text-[#94A3B8]">Rebuilt as a scalable, multi-tenant portal</span>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <p className="font-body text-[#F8FAFC] text-[16px] leading-[1.6] font-medium mb-8">
                The Problems We Faced:
              </p>
              <div className="space-y-4 mb-0">
                {CHALLENGES.map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#111827] rounded-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] pl-5 pr-4 py-4 mb-0"
                    style={{ borderLeft: "3px solid #FF4E7E" }}
                  >
                    <h4 className="font-heading text-[#94A3B8] text-[15px] mb-1.5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#FF4E7E" }} />
                      {item.title}
                    </h4>
                    <p className="font-body text-[#94A3B8] text-sm leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Research & Business ROI ── */}
      <section className="w-full px-6 md:px-12 py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-6 mb-12">
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0">
              Research & Business ROI
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start mb-0">
            <motion.div {...fadeUp}>
              <div className="space-y-6 max-w-[450px]">
                {[
                  {
                    label: "Competitive Benchmarking",
                    body: "Analyzed YouTube demos and walkthroughs of leading developer portals to identify best practices and establish the core concept for DevHub.",
                  },
                  {
                    label: "Design System Alignment",
                    body: "Led the move to Tipalti's modern Design System instead of patching legacy code, so components stay consistent and reusable.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-8 h-8 rounded-full bg-[#FF4E7E]/8 border border-[#FF4E7E]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="font-label text-xs text-[#FF4E7E] font-normal">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-heading text-[#94A3B8] text-base mb-1">
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
              <div className="bg-[#FF4E7E] rounded-xl p-8 text-white">
                <p className="font-label text-xs text-white/70 uppercase mb-4">
                  Quantifiable ROI
                </p>
                <p className="font-heading text-5xl tracking-[-0.02em] tabular-nums">
                  <AnimatedCounter value={27} suffix="%" duration={1350} />
                </p>
                <p className="font-body text-white/80 text-sm mt-2">
                  Reduction in engineering effort
                </p>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="font-body text-white/80 text-sm leading-relaxed">
                    We saved{" "}
                    <span className="text-white font-normal">35 dev days</span>{" "}
                    (from 168 down to 133).
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Key Solutions & Features — rich alternating with mockups like Sdarim ── */}
      <section className="px-6 md:px-12 py-14 md:py-20 bg-[#090D16]">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-subheading text-[#F1F5F9] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Key Solutions & Features
            </h2>
          </motion.div>
          <motion.p
            {...fadeUp}
            className="font-body text-[#94A3B8] text-[16px] leading-relaxed max-w-[640px] mb-16 md:mb-20"
          >
            I built the new developer portal around three solutions, each
            addressing a bottleneck from the legacy system and preparing it for
            future scale.
          </motion.p>

          <div className="space-y-20 md:space-y-28">
            {SOLUTIONS.map((sol, i) => (
              <motion.div
                key={sol.num}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
                  {/* Content — text hierarchy like Sdarim */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className={`${i % 2 === 1 ? "md:order-2" : ""} self-center`}
                  >
                    <div>
                      <span className="inline-flex items-center font-label text-xs text-[#FF4E7E] bg-[#FF4E7E]/10 px-2.5 py-1 rounded-md border border-[#FF4E7E]/20 mb-3">
                        {sol.num}
                      </span>
                      <h3 className="font-heading text-[#F1F5F9] text-[22px] tracking-[-0.02em] mb-1">
                        {sol.label}
                      </h3>
                      {sol.subtitle && <p className="text-sm text-[#94A3B8] mb-6">{sol.subtitle}</p>}

                      <div className="relative">
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.07] rounded-2xl p-4">
                            <p className="text-[11px] font-label uppercase tracking-wider text-[#64748B] font-semibold mb-2">
                              {sol.beforeLabel}
                            </p>
                            <p className="text-sm text-[#94A3B8] leading-relaxed">{sol.beforeBody}</p>
                          </div>
                          <div className="bg-[#FF4E7E]/10 backdrop-blur-sm border border-[#FF4E7E]/20 rounded-2xl p-4">
                            <p className="text-[11px] font-label uppercase tracking-wider text-[#FF4E7E] font-bold mb-2">
                              {sol.afterLabel}
                            </p>
                            <p className="text-sm font-medium text-[#E2E8F0] leading-relaxed">{sol.afterBody}</p>
                          </div>
                        </div>
                        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-[#111827] border border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.35)] items-center justify-center text-white/20 text-sm leading-none">
                          →
                        </div>
                      </div>
                      <div className="flex md:hidden justify-center mt-3 text-white/20 text-sm leading-none">→</div>

                      {sol.bullets && (
                        <ul className="mt-4 space-y-2">
                          {sol.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2.5">
                              <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#FF4E7E] shrink-0" />
                              <span className="font-body text-sm text-[#94A3B8] leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <p className="font-body text-sm leading-relaxed text-[#94A3B8] mt-4">{sol.reason}</p>
                    </div>
                  </motion.div>

                  {/* Visual — mockup with dark translucent framing, contain, no cropping */}
                  <motion.div
                    initial={{ opacity: 0, y: 28, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className={`${i % 2 === 1 ? "md:order-1" : ""} self-center w-full`}
                  >
                    <div
                      className="rounded-2xl overflow-hidden border border-white/[0.07] bg-slate-900/40 backdrop-blur-sm p-4 md:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] cursor-pointer group hover:border-[#FF4E7E]/30 transition-colors duration-300"
                      onClick={() => sol.image && setLightbox({ src: sol.image, alt: sol.label })}
                    >
                      <img
                        src={sol.image}
                        alt={sol.label}
                        className="w-full h-auto object-contain rounded-xl block transition-transform duration-700 group-hover:scale-[1.01]"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ImageLightbox src={lightbox?.src} alt={lightbox?.alt || ""} isOpen={!!lightbox} onClose={() => setLightbox(null)} />

      {/* ── Design Details — unified carousel gallery ── */}
      <StartingPointSection
        images={DEVHUB_SLIDES.map((s) => ({ src: s.image, alt: s.caption }))}
        title="Detailed Design"
        subtitle="Final screens"
        compact
      />

      {/* ── Live Prototype Experience ── */}
      <PrototypeSection
        title="Live Prototype Experience"
        subtitle="Interactive flow: create an app, edit its details, or delete it"
        expandable
      >
        <DevHubPrototype />
      </PrototypeSection>

      {/* ── Key Takeaways ── */}
      <section className="px-6 md:px-12 py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-6 mb-12">
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Key Takeaways
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {TAKEAWAYS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <div className="w-10 h-10 rounded-full border border-white/[0.08] group-hover:border-[#FF4E7E] group-hover:bg-[#FF4E7E]/5 flex items-center justify-center mb-5 transition-all text-[#F8FAFC]/60 group-hover:text-[#FF4E7E]">
                  {item.icon}
                </div>
                <h3 className="font-heading text-[#E2E8F0] text-[22px] leading-[1.3] tracking-[-0.02em] mb-3">
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
      <section className="px-6 md:px-12 py-14 md:py-20 border-t border-white/[0.08]">
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
              className="inline-flex items-center font-body text-[14px] font-normal uppercase tracking-[0.06em] text-[#F8FAFC]/60 hover:text-[#E2E8F0] hover:bg-white/[0.08] transition-colors px-6 py-3 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4E7E]"
            >
              All projects
            </Link>
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center bg-[#FF4E7E] hover:bg-[#0A0F1D] text-white font-body text-[14px] font-normal uppercase tracking-[0.06em] px-6 py-3 rounded-sm transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4E7E] focus-visible:ring-offset-2"
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