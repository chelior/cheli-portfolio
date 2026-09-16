import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Rocket, Layers, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import StartingPointSection from "@/components/portfolio/StartingPointSection";
import BeforeAfterSlider from "@/components/portfolio/BeforeAfterSlider";
import PrototypeSection from "@/components/portfolio/PrototypeSection";
import ContactModal from "@/components/portfolio/ContactModal";

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
    reason:
      "Designed a flexible information architecture that seamlessly manages multiple apps today, with dedicated UI entry points reserved for permissions and team management in phase two.",
  },
  {
    num: "02",
    label: "Global Context Switcher",
    reason:
      "Implemented a unified top-header context manager for effortless switching between applications, payer accounts, and user roles.",
  },
  {
    num: "03",
    label: "Performant Data Grids",
    reason:
      "Leveraged core Design System components to build fast, high-performance tables for Audit Logs and API Logs with robust filtering.",
  },
  {
    num: "04",
    label: "Self-Service Testing Framework",
    reason:
      "Integrated an in-app REST API testing interface directly within the portal, eliminating external dependencies on Tipalti support.",
  },
];

const CHALLENGES = [
  {
    title: "No Multi-Tenant Support",
    body: "Users were limited to a single app and user context, blocking multi-app management and team collaboration.",
  },
  {
    title: "Tight MVP Deadline",
    body: "High business urgency to ship quickly required a strict, phased scope.",
  },
  {
    title: "Scalable Architecture",
    body: "Built for Multi-App at launch while embedding UI foundations for future Multi-User integration.",
  },
  {
    title: "High Support Overhead",
    body: "External developers depended heavily on internal teams for API testing and troubleshooting.",
  },
];

const TAKEAWAYS = [
  {
    icon: <Rocket size={18} />,
    title: "MVP as a Finished Experience",
    body: "An MVP isn't a half-baked solution, but a focused, complete product. I learned to deliver a polished end-to-end experience from day one while preparing the architecture for future scale.",
  },
  {
    icon: <Layers size={18} />,
    title: "Design System = Business ROI",
    body: "Aligning complex enterprise products with a unified Design System doesn't just improve usability, it drastically cuts engineering effort and enables tight deadlines to be met.",
  },
  {
    icon: <UserCheck size={18} />,
    title: "Reducing Support Overhead",
    body: "Providing external developers with independent testing tools removes friction and slashes internal support overhead.",
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
            className="flex items-center gap-2 font-heading text-[14px] font-normal uppercase tracking-[0.06em] text-[#0A0F1D]/50 hover:text-[#FF4E7E] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4E7E] rounded"
          >
            <ArrowLeft size={15} />
            Back to Work
          </Link>
          <span className="font-mono text-xs text-[#0A0F1D]/50 hidden md:block">
            Case Study · DevHub
          </span>
        </div>
      </nav>

      {/* ── Hero — Brand Tinted Gradient Canvas (DevHub pink) — mirrors User Creation ── */}
      <div className="bg-gradient-to-b from-[#FFD6E7] via-[#FFF1F5] to-white rounded-b-[48px] overflow-hidden relative pb-16 pt-12">
        {/* Background Watermark — DEVHUB */}
        <div
          aria-hidden="true"
          className="text-[120px] font-black tracking-tighter text-slate-900/[0.04] select-none pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap leading-none"
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
                className="font-mono text-xs tracking-widest uppercase mb-4"
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
                <span className="text-slate-900">Modernizing </span>
                <span className="text-[#FF4E7E]">DevHub</span>
                <span className="text-slate-900">: From a Legacy Single-App Tool to a Flexible Developer Portal</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-slate-600 text-base leading-relaxed max-w-lg mb-8"
              >
                Transforming Tipalti's legacy single-app, single-user tool into a scalable multi-tenant developer portal with self-service API testing.
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
                    className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100/60"
                  >
                    <p className="font-heading font-bold text-slate-900 text-2xl tracking-tight leading-none">
                      {stat.value}
                    </p>
                    <p className="font-mono text-[11px] text-slate-500 mt-2 uppercase leading-tight">
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
            <h2 className="font-subheading font-medium text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0">
              My Role & The Team
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-0">
            <motion.div {...fadeUp}>
              <h3 className="font-mono text-xs text-[#FF4E7E] tracking-wide uppercase mb-6">
                The Core Team
              </h3>
              <div className="space-y-0">
                {TEAM.map((member, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-4 border-b border-[#E5E7EB]"
                  >
                    <span className="font-mono text-xs text-[#0A0F1D]/30 w-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-[#0A0F1D] text-base flex-1">
                      {member.role}
                    </span>
                    <span className="font-mono text-xs text-[#0A0F1D]/60">
                      {member.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <h3 className="font-mono text-xs text-[#FF4E7E] tracking-wide uppercase mb-6">
                Collaboration & Support
              </h3>
              <div className="space-y-0">
                {SUPPORTERS.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-4 border-b border-[#E5E7EB]"
                  >
                    <span className="font-mono text-xs text-[#0A0F1D]/30 w-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-[#0A0F1D] text-base flex-1">
                      {s.role}
                    </span>
                    <span className="font-mono text-xs text-[#0A0F1D]/60">
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
      <section className="px-6 md:px-12 mb-24 md:mb-36">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-heading font-medium text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Before & After
            </h2>
            <span className="font-mono text-xs text-[#0A0F1D]/50 mt-2 block">
              The transformation at a glance — drag to compare
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
      <section className="w-full my-0 px-6 md:px-12 py-28 md:py-32 bg-[#FF4E7E]" style={{ backgroundColor: "#FF4E7E" }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp}>
            <h2 className="font-subheading font-medium text-white text-[32px] leading-[1.2] tracking-[-0.02em] mt-0 mb-2">
              The Challenge
            </h2>
            <p className="font-mono text-xs text-white/80 mb-12 block">
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
      <section className="w-full my-0 px-6 md:px-12 py-14 md:py-20 bg-[#FFF1F5]" style={{ backgroundColor: "#FFF1F5" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start mb-0">
            <motion.div {...fadeUp}>
              <p className="font-body text-[#0A0F1D]/70 text-[16px] leading-[1.6]">
                Tipalti's legacy DevHub was built for a simple, limited "single-app, single-user" model. As the company and client base scaled, this created severe operational bottlenecks.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex-1 rounded-xl border border-pink-100/60 bg-white shadow-sm p-4 text-center">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-[#0A0F1D]/50 mb-1">Legacy</p>
                  <p className="font-heading font-semibold text-[#0A0F1D] text-sm">Single App / Single User</p>
                </div>
                <span className="text-[#FF4E7E] text-lg shrink-0">→</span>
                <div className="flex-1 rounded-xl border border-[#FF4E7E]/20 bg-white shadow-sm p-4 text-center">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-[#FF4E7E] mb-1">Modern</p>
                  <p className="font-heading font-semibold text-[#0A0F1D] text-sm">Multi-App / Multi-User</p>
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 bg-white border border-pink-100/60 rounded-full px-3.5 py-1.5 shadow-sm">
                <span className="text-[#FF4E7E] text-xs">↓</span>
                <span className="font-mono text-xs text-slate-600">Rebuilt as a scalable, multi-tenant portal</span>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <div className="space-y-4 mb-0">
                {CHALLENGES.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-pink-100/50 shadow-sm pl-5 pr-4 py-4 mb-0"
                    style={{ borderLeft: "3px solid #FF4E7E" }}
                  >
                    <h4 className="font-heading font-semibold text-slate-900 text-[15px] mb-1.5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#FF4E7E" }} />
                      {item.title}
                    </h4>
                    <p className="font-body text-slate-600 text-sm leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Research & Business ROI ── */}
      <section className="w-full px-6 md:px-12 py-20">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-6 mb-12">
            <h2 className="font-subheading font-medium text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0">
              Research & Business ROI
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start mb-0">
            <motion.div {...fadeUp}>
              <div className="space-y-6">
                {[
                  {
                    label: "Competitive Benchmarking",
                    body: "Analyzed YouTube demos and walkthroughs of leading developer portals to identify best practices and establish the core concept for DevHub.",
                  },
                  {
                    label: "Design System Alignment",
                    body: "Led a strategic move to Tipalti's modern Design System instead of patching legacy code, ensuring consistency and component reusability.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-8 h-8 rounded-full bg-[#FF4E7E]/8 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="font-mono text-xs text-[#FF4E7E] font-normal">
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
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}>
              <div className="bg-[#FF4E7E] rounded-xl p-8 text-white">
                <p className="font-mono text-xs text-white/70 uppercase mb-4">
                  Quantifiable ROI
                </p>
                <p className="font-heading font-medium text-5xl tracking-[-0.04em]">
                  27%
                </p>
                <p className="font-body text-white/80 text-sm mt-2">
                  Engineering effort reduced
                </p>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="font-body text-white/80 text-sm leading-relaxed">
                    Saving{" "}
                    <span className="text-white font-normal">35 dev days</span>{" "}
                    (from 168 down to 133) while delivering a superior user
                    experience.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Exploration & Solution ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36 bg-[#E0E7FF] py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-6 mb-4">
            <h2 className="font-subheading font-medium text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Key Solutions & Features
            </h2>
          </motion.div>
          <motion.p
            {...fadeUp}
            className="font-body text-[#4A5568] text-[16px] leading-[1.6] max-w-[600px] mb-14"
          >
            Four core solutions shaped the new developer portal, each addressing
            a critical bottleneck from the legacy system while laying the
            groundwork for future scalability.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {SOLUTIONS.map((sol, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="relative rounded-lg p-6 md:p-8 flex flex-col bg-white border border-[#E5E7EB]"
              >
                <div className="w-12 h-12 mb-6 relative flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-dashed"
                    style={{ borderColor: "rgba(10,15,29,0.2)" }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 15 + i * 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative z-10 font-mono text-sm font-normal text-[#0A0F1D]/50">
                    {sol.num}
                  </span>
                </div>

                <h3 className="font-heading font-medium text-[20px] tracking-[-0.02em] mb-2 text-[#0A0F1D]">
                  {sol.label}
                </h3>

                <p className="font-body text-sm leading-relaxed text-[#4A5568]">
                  {sol.reason}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Details — unified carousel gallery ── */}
      <StartingPointSection
        images={DEVHUB_SLIDES.map((s) => ({ src: s.image, alt: s.caption }))}
        title="Design Details"
        subtitle="Final screens & interactions"
      />

      {/* ── Live Prototype Experience ── */}
      <PrototypeSection
        title="Live Prototype Experience"
        subtitle="Demo of the live, published interactive prototype"
        videoSrc="images/devhub/Demo-DevHub.mp4"
      />

      {/* ── Key Takeaways ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-6 mb-14">
            <h2 className="font-subheading font-medium text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
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
                <div className="w-10 h-10 rounded-full border border-[#E5E7EB] group-hover:border-[#FF4E7E] group-hover:bg-[#FF4E7E]/5 flex items-center justify-center mb-5 transition-all text-[#0A0F1D]/60 group-hover:text-[#FF4E7E]">
                  {item.icon}
                </div>
                <h3 className="font-heading font-medium text-[#0A0F1D] text-[22px] leading-[1.3] tracking-[-0.02em] mb-3">
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
          <h3 className="font-subheading font-medium text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
            Interested in the full case study?
          </h3>
          <div className="flex items-center gap-5 mt-2">
            <Link
              to="/#work"
              className="inline-flex items-center font-heading text-[14px] font-normal uppercase tracking-[0.06em] text-[#0A0F1D]/60 hover:text-[#0A0F1D] hover:bg-[#F5F5F7] transition-colors px-6 py-3 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4E7E]"
            >
              All projects
            </Link>
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center bg-[#FF4E7E] hover:bg-[#0A0F1D] text-white font-heading text-[14px] font-normal uppercase tracking-[0.06em] px-6 py-3 rounded-sm transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4E7E] focus-visible:ring-offset-2"
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