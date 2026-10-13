import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Rocket, TrendingUp, LifeBuoy } from "lucide-react";
import { Link } from "react-router-dom";
import StartingPointSection from "@/components/portfolio/StartingPointSection";
import ZoomableImage from "@/components/portfolio/ZoomableImage";
import ImageLightbox from "@/components/portfolio/ImageLightbox";
import BeforeAfterSlider from "@/components/portfolio/BeforeAfterSlider";
import PrototypeSection from "@/components/portfolio/PrototypeSection";
import DevHubPrototype from "@/components/portfolio/DevHubPrototype";
import ContactModal from "@/components/portfolio/ContactModal";
import MoreProjects from "@/components/portfolio/MoreProjects";
import AnimatedCounter from "@/components/portfolio/AnimatedCounter";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const SOLUTIONS = [
  {
    num: "01",
    label: "Multi-App to Multi-User",
    subtitle: "Flexible IA for today and tomorrow's teams",
    reason:
      "Legacy DevHub locked teams into a single app and user context. We redesigned the information architecture into a unified multi-app hub, while reserving deliberate UI touchpoints for future team permissions and collaboration in phase two.",
    beforeLabel: "BEFORE (PAIN)",
    beforeBody: "Locked to a single app + single user, blocking team collaboration.",
    afterLabel: "AFTER (SOLUTION)",
    afterBody: "Multi-app hub with clear entry points for future team permissions.",
    image: "images/devhub/devhub - my apps.png",
  },
  {
    num: "02",
    label: "Context Visibility & Scalable Navigation",
    subtitle: "Clear environment context today, easy expansion tomorrow",
    reason:
      "To prevent costly mistakes across payer environments, we added a persistent context anchor in the global header. For the MVP, we intentionally kept it static, avoiding confusing dropdown affordances while keeping the navigation modular for upcoming switcher functionality.",
    beforeLabel: "BEFORE (PAIN)",
    beforeBody: "Legacy navigation either lacked clear visibility of the active payer context or offered confusing controls that caused workflow errors.",
    afterLabel: "AFTER (SOLUTION)",
    afterBody: "Kept the active payer context visible in the top header and removed the dropdown chevron for the MVP, so users aren't misled before multi-payer switching arrives.",
    image: "images/devhub/prototype/payersnamemockup2.svg",
  },
  {
    num: "03",
    label: "Performant Data Grids",
    subtitle: "Audit logs at enterprise scale",
    reason:
      "Legacy logs were slow and difficult to scan. Leveraging core Design System patterns, we introduced virtualized scrolling and multi-column filtering, transforming raw data dumps into an intuitive troubleshooting surface built for scale.",
    beforeLabel: "BEFORE (PAIN)",
    beforeBody: "Slow, unfiltered tables with poor scanability at scale.",
    afterLabel: "AFTER (SOLUTION)",
    afterBody: "Design System grids that are fast, filterable, and ready for audits.",
    image: "images/devhub/prototype/oldnew1.svg",
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

        <div className="relative max-w-[1400px] mx-auto px-6 pt-16 md:pt-20">
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

          {/* Elevated UI showcase — raw interface, no device frames */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 md:mt-14 mb-4"
          >
            <div className="mx-auto">
              <ZoomableImage
                src="images/devhub/Herolargemockupdevhub 1.svg"
                alt="DevHub finalized multi-tenant developer portal"
                imgClassName="w-full h-auto object-contain block"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── The Starting Point ── */}
      <StartingPointSection images={STARTING_POINT_IMAGES} />

      {/* ── The Problem: pure editorial, no cards ── */}
      <section className="w-full my-0 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div {...fadeUp} className="lg:col-span-7">
              <span className="font-label text-[11px] tracking-widest uppercase block mb-5 text-[#F8FAFC]/45">
                The Problem
              </span>
              <h3 className="font-subheading text-[#E2E8F0] text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.02em] mb-7">
                Scaling Beyond Single-Developer Limits
              </h3>
              <p className="font-body text-[#94A3B8] text-base leading-relaxed mb-6">
                The original DevHub assumed a single developer managing a single application in isolation. That model collapsed as Tipalti&rsquo;s enterprise customer base matured and engineering teams scaled.
              </p>
              <p className="font-body text-[#94A3B8] text-base leading-relaxed">
                Organizations needed multiple engineers collaborating across sandboxes and production environments. Instead, they hit rigid walls: shared credentials, disconnected flows, and a heavy dependence on internal support just to run baseline API checks.
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="lg:col-span-5">
              <div className="divide-y divide-white/10">
                {[
                  {
                    title: "Multi-Tenant Complexity",
                    body: "Organizations had to coordinate multiple apps across diverse environments, but the architecture lacked workspace hierarchy.",
                  },
                  {
                    title: "High Support Overhead",
                    body: "External developers relied on internal engineering teams for basic troubleshooting and sandbox testing, stalling integration velocity.",
                  },
                  {
                    title: "Strict MVP Constraints",
                    body: "Business urgency required a fast phased delivery: solving immediate multi-app friction today while structuring the interface for future multi-user governance.",
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

      {/* ── The Challenge — Top Hero (solid DevHub pink) ── */}
      <section className="w-full my-0 py-20 md:py-28 min-h-[50vh] flex flex-col justify-center bg-[#FF4E7E]" style={{ backgroundColor: "#FF4E7E" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
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
              How might we evolve a rigid single-app, single-user tool into a scalable, multi-tenant<br />developer portal without missing our tight MVP deadline?
            </p>
          </motion.div>
        </div>
      </section>
      {/* ── Research & Business ROI ── */}
      <section className="w-full py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="flex items-center gap-6 mb-12">
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0">
              Research & Business ROI
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-0">
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
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="images/devhub/Research & Business ROI.svg"
                  alt="Research and business ROI breakdown"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Key Solutions & Features — rich alternating with mockups like Sdarim ── */}
      <section className="py-14 md:py-20 bg-[#090D16]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
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

          {/* Quantifiable ROI — compact closing stat */}
          <motion.div {...fadeUp} className="mt-16 md:mt-20">
            <div className="bg-[#FF4E7E] rounded-xl p-5 md:p-6 text-white max-w-[420px]">
              <p className="font-label text-[11px] text-white/70 uppercase mb-2">
                Quantifiable ROI
              </p>
              <p className="font-heading text-3xl leading-none tracking-[-0.02em] tabular-nums">
                <AnimatedCounter value={27} suffix="%" duration={1350} />
              </p>
              <p className="font-body text-white/80 text-xs mt-1.5">
                Reduction in engineering effort
              </p>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="font-body text-white/80 text-xs leading-relaxed">
                  We saved{" "}
                  <span className="text-white font-normal">35 dev days</span>{" "}
                  (from 168 down to 133).
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ImageLightbox src={lightbox?.src} alt={lightbox?.alt || ""} isOpen={!!lightbox} onClose={() => setLightbox(null)} />

      {/* ── Before & After ── */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
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

      {/* ── Detailed Design: 3-column component craft showcase ── */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp}>
            <span className="font-label text-[11px] tracking-widest uppercase block mb-5 text-[#F8FAFC]/45">
              Component Craft &amp; Edge Cases
            </span>
            <h3 className="font-subheading text-[#E2E8F0] text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.02em] mb-5">
              Detailed Design
            </h3>
            <p className="font-body text-[#94A3B8] text-base leading-relaxed max-w-[720px]">
              Precision at the component level: balancing enterprise data density with developer clarity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {[
              {
                image: "images/devhub/Edit application - Client credentials flow.svg",
                imageAlt: "Edit application - Client credentials flow with client ID and secret",
                tag: "API Credentials & Security",
                title: "Persistent Trust & Controlled Exposure",
                body: "Masked secrets by default with single-click reveal and instant clipboard feedback to prevent accidental exposure during workflows.",
              },
              {
                image: "images/devhub/authorization card.svg",
                imageAlt: "Authorization card showing app scopes and permissions",
                tag: "High-Density Tables",
                title: "App Hierarchy & Lifecycle",
                body: "Multi-parameter filtering with sticky headers, designed for scanning high-volume webhook events without page reload.",
              },
              {
                image: "images/devhub/top bar.svg",
                imageAlt: "DevHub top bar with environment context and navigation",
                tag: "Environment Guardrails",
                title: "Context Anchors for Safer Staging",
                body: "Explicit environment badges ensuring developers never trigger live production actions while testing in sandboxes.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.tag}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="border border-white/10 rounded-xl bg-[#0B0F17] shadow-xl p-4">
                  <ZoomableImage
                    src={item.image}
                    alt={item.imageAlt}
                    imgClassName="block w-full h-auto"
                  />
                </div>
                <span className="font-label text-[11px] tracking-widest uppercase block mt-6 mb-3 text-[#F8FAFC]/45">
                  {item.tag}
                </span>
                <h4 className="font-heading text-[#E2E8F0] text-[18px] leading-[1.3] tracking-[-0.01em] mb-3">
                  {item.title}
                </h4>
                <p className="font-body text-[#94A3B8] text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Prototype Experience ── */}
      <PrototypeSection
        title="Live Prototype Experience"
        subtitle="Interactive flow: create an app, edit its details, or delete it"
        expandable
      >
        <DevHubPrototype />
      </PrototypeSection>

      {/* ── Key Takeaways ── */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
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

      <MoreProjects currentSlug="/case-study/dev-hub" />

      {/* ── Footer CTA ── */}
      <section className="py-14 md:py-20 border-t border-white/[0.08]">
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