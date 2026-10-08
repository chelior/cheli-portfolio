import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Split, TrendingDown, Layers, Compass, Users, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import CaseStudyHero from "@/components/portfolio/CaseStudyHero";
import BeforeAfterSlider from "@/components/portfolio/BeforeAfterSlider";
import StartingPointSection from "@/components/portfolio/StartingPointSection";
import { CoreQuestionSpotlightDark } from "@/components/portfolio/CoreQuestionSpotlight";
import ContactModal from "@/components/portfolio/ContactModal";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const CHALLENGES = [
  {
    title: "Audience Mismatch",
    body: "One screen had to serve executives, who wanted a clean, high-level overview without filter fatigue, and analysts, who needed to investigate trends in depth.",
  },
  {
    title: "Hidden \u201CRevenue Leaks\u201D",
    body: "A large share of profitability comes from service and treatment contracts during the transitional window between device sales and installation. The legacy dashboard did not surface this gap.",
  },
  {
    title: "Visual Clutter & Platform Limits",
    body: "Overloaded graphs (such as Utilization metrics) and complex shifting dimensions overwhelmed users without a data analysis background.",
  },
];

const RESEARCH = [
  {
    label: "Sales Process Mapping",
    body: "Analyzed the full lifecycle from device sale to installation, timeline durations, repair margins, and geographic sales distribution.",
  },
  {
    label: "Senior Executives",
    body: "Required a clean, minimalist, filter-free executive screen (YTD) to answer critical business questions at a single glance.",
  },
  {
    label: "Financial Analysts",
    body: "Heavy platform users accustomed to QlikSense, requiring an advanced investigation screen with detailed filtering, period comparisons, and trend analysis.",
  },
];

const SOLUTIONS = [
  {
    icon: <Split size={18} />,
    title: "Dual-Audience Screen Separation",
    body: "Divided the experience into two dedicated environments: a clean, high-level executive dashboard and a data-dense investigation dashboard for analysts.",
  },
  {
    icon: <TrendingDown size={18} />,
    title: "Visualizing Revenue Leaks",
    body: "Added a side-by-side comparison of sold systems versus installed systems, so executives could see the service and treatment revenue that went unrealized.",
  },
  {
    icon: <Layers size={18} />,
    title: "Optimizing Complex Data",
    body: "Used UI containers to handle shifting data dimensions, and built a multi-dimensional summary graph that unifies metrics measured in different units.",
  },
  {
    icon: <Compass size={18} />,
    title: "Working Within Technical & Platform Constraints",
    body: "Worked within strict platform behavior (such as fixed mobile card ordering) and balanced system limits against what user workflows required.",
  },
];

const DESIGN_DETAILS_SLIDES = [
  { src: "images/insightec/UI Sales dashboard 2_2x.png", alt: "Executive dashboard — flat UI overview" },
  { src: "images/shared/cfa292972_image.png", alt: "Investigation dashboard — flat UI detail" },
  { src: "images/shared/d436789e1_image.png", alt: "Revenue leak visualization — flat UI" },
  { src: "images/shared/209c7f586_image.png", alt: "Data grid — flat UI" },
];

const TAKEAWAYS = [
  {
    icon: <Users size={18} />,
    title: "Persona-Driven Dashboards",
    body: "Designing for data-heavy systems requires a strict separation of concerns: executives get immediate clarity, analysts get exploratory tools.",
  },
  {
    icon: <Wrench size={18} />,
    title: "Bridging Design and Constraints",
    body: "Working within agency and legacy platform environments sharpened my thinking. I delivered both dashboards even when technical boundaries were tight.",
  },
];

export default function CaseStudyInSightec() {
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

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
            className="flex items-center gap-2 font-body text-[14px] font-normal uppercase tracking-[0.06em] text-[#F8FAFC]/50 hover:text-[#3B82F6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
          >
            <ArrowLeft size={15} />
            Back to Work
          </Link>
          <span className="font-label text-xs text-[#F8FAFC]/50 hidden md:block">
            Case Study · InSightec
          </span>
        </div>
      </nav>

      <CaseStudyHero
        accent="#B47AFF"
        variant="insightec"
        overline="B2B/Enterprise SaaS • UX/UI & Data Visualization • 2022"
        title="InSightec: Uncovering Revenue Leaks Through Data Visualization"
        titleAccent="Revenue Leaks"
        description="I turned a complex medical equipment sales and analytics platform into a clean, intuitive system tailored for two very different user groups: senior executives and financial analysts."
        stats={[
          { value: "2022", label: "Project Year" },
          { value: "2", label: "Core Audiences" },
          { value: "QlikSense", label: "Dev Platform" },
        ]}
        preview={{ src: "images/insightec/Insightech mockup.png", alt: "InSightec — dual-audience dashboard visualization" }}
      />

      {/* ── My Role & Context ── */}
      <section className="px-6 md:px-12 py-14 md:py-20">
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
                End-to-end product definition and design: research, client interviews,
                wireframes, UI design, and final mockups.
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <h3 className="font-label text-xs text-[#3B82F6] tracking-wide uppercase mb-6">
                The Context
              </h3>
              <h4 className="font-subheading text-[#E2E8F0] text-[24px] leading-[1.3] tracking-[-0.02em] mb-3">
                Project Company for InSightec
              </h4>
              <p className="font-body text-[#94A3B8] text-base leading-[1.7]">
                I worked through a project company for InSightec, a leading medical
                device company that develops ultrasound technology for treating essential
                tremors and Parkinson's disease.
              </p>
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
              beforeImage={{ src: "images/insightec/e970e184d_INSIGHTCHDESKTOPMOCKUP.png", alt: "Before — Legacy analytics dashboard" }}
              afterImage={{ src: "images/insightec/05f6d6da5_insightechiphoneMOCKUP.png", alt: "After — Redesigned dual-audience dashboard" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── The Starting Point & The Problem ── */}
      <section className="px-6 md:px-12 py-14 md:py-20 bg-[#0A0F1D]">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-heading text-white text-[32px] leading-[1.2] tracking-[-0.02em]">
              The Starting Point & The Problem
            </h2>
            <span className="font-label text-xs text-white/70 mt-2 block">
              Audience Mismatch, Hidden Revenue Leaks, Visual Clutter
            </span>
          </motion.div>

          <CoreQuestionSpotlightDark
            accent="#B47AFF"
            question="How might we surface hidden revenue leaks, give executives instant clarity, and give analysts the tools to explore in depth?"
          />

          <motion.p {...fadeUp} className="font-body text-white/80 text-[16px] leading-[1.6] max-w-[600px] mb-12">
            The company had a working sales model with real data, but the existing
            dashboard had several bottlenecks.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {CHALLENGES.map((challenge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-l-2 border-[#3B82F6]/40 pl-5"
              >
                <h4 className="font-heading text-white text-base mb-2">
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
      <section className="px-6 md:px-12 py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Research & Discovery
            </h2>
          </motion.div>

          <div className="space-y-6 max-w-[450px]">
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
                  <h4 className="font-heading text-[#94A3B8] text-base mb-1">
                    {item.label}
                  </h4>
                  <p className="font-body text-[#94A3B8] text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Solutions & Design Decisions ── */}
      <section className="px-6 md:px-12 py-14 md:py-20 bg-[#111827] border-y border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-subheading text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Key Solutions & Design Decisions
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {SOLUTIONS.map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[#111827] rounded-lg border border-white/[0.08] p-6 md:p-8"
              >
                <div className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center mb-5 text-[#F8FAFC]/60">
                  {solution.icon}
                </div>
                <h3 className="font-subheading text-[#E2E8F0] text-[20px] tracking-[-0.02em] mb-2">
                  {solution.title}
                </h3>
                <p className="font-body text-[#94A3B8] text-sm leading-relaxed">
                  {solution.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Details — unified carousel gallery ── */}
      <StartingPointSection
        images={DESIGN_DETAILS_SLIDES}
        title="Detailed Design"
        subtitle="Wireframes, Old vs. New comparison & final dashboard flows"
      />

      {/* ── Key Takeaways ── */}
      <section className="px-6 md:px-12 py-14 md:py-20">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
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