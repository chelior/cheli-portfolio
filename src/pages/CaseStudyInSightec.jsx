import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Split, TrendingDown, Layers, Compass, Users, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
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
    title: "Audience Mismatch",
    body: "The system failed to differentiate between executive needs (high-level, clean overview with zero filter fatigue) and analyst needs (deep-dive trend investigation).",
  },
  {
    title: "Hidden \u201CRevenue Leaks\u201D",
    body: "A massive portion of profitability comes from service and treatment contracts during the transitional window between device sales and installation. The legacy dashboard completely failed to highlight this critical gap.",
  },
  {
    title: "Visual Clutter & Platform Limits",
    body: "Overloaded graphs (such as Utilization metrics) and complex shifting dimensions overwhelmed users who were not advanced data analysts.",
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
    body: "Heavy platform users accustomed to QlikSense, requiring an advanced investigation screen with deep filtering, period comparisons, and trend analysis.",
  },
];

const SOLUTIONS = [
  {
    icon: <Split size={18} />,
    title: "Dual-Audience Screen Separation",
    body: "Divided the experience into two dedicated environments: a clean, high-level executive dashboard and a robust, data-dense investigation dashboard for analysts.",
  },
  {
    icon: <TrendingDown size={18} />,
    title: "Visualizing Revenue Leaks",
    body: "Introduced a clear comparative visualization mapping sold systems versus installed systems, surfacing unrealized service and treatment revenue streams for executive oversight.",
  },
  {
    icon: <Layers size={18} />,
    title: "Optimizing Complex Data",
    body: "Utilized UI containers to handle shifting data dimensions intuitively, and engineered a multi-dimensional summary graph to unify metrics measured in vastly different units.",
  },
  {
    icon: <Compass size={18} />,
    title: "Navigating Technical & Platform Constraints",
    body: "Handled strict rigidity in platform behavior (such as fixed mobile card ordering) by creatively balancing system limitations with user workflow requirements.",
  },
];

const TAKEAWAYS = [
  {
    icon: <Users size={18} />,
    title: "Persona-Driven Dashboards",
    body: "Designing for data-heavy systems requires a strict separation of concerns \u2014 giving executives immediate clarity while empowering analysts with deep exploratory tools.",
  },
  {
    icon: <Wrench size={18} />,
    title: "Bridging Design and Constraints",
    body: "Working within agency and legacy platform environments builds strong mental flexibility, proving that great UX can be achieved even when technical boundaries push back.",
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
            Case Study · InSightec
          </span>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 md:pt-44 pb-20 md:pb-32 px-6 md:px-12">
        <HeroGif />
        <div className="max-w-[1100px] mx-auto">
          <motion.p
            {...fadeUp}
            className="font-mono text-xs text-[#6366F1] tracking-widest uppercase mb-6"
          >
            B2B/Enterprise SaaS • UX/UI & Data Visualization • 2022
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-heading font-extrabold text-[#0A0F1D] tracking-[-0.02em] text-[36px] md:text-[52px] leading-[1.15] max-w-[900px]"
          >
            InSightec: Uncovering <span className="text-[#6366F1]">Revenue Leaks</span> Through Data Visualization
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10"
          >
            <p className="font-body text-[#4A5568] text-[16px] leading-[1.6] max-w-[560px]">
              Transforming a complex medical equipment sales and analytics platform
              into a clean, intuitive system tailored for two entirely distinct user
              groups: senior executives and financial analysts.
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
              { value: "2022", label: "Project Year" },
              { value: "2", label: "Core Audiences" },
              { value: "QlikSense", label: "Dev Platform" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                className="bg-[#F5F5F7] rounded-xl p-5 md:p-6"
              >
                <p className="font-heading font-bold text-[#0A0F1D] text-2xl md:text-3xl tracking-[-0.04em]">
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
                End-to-end product definition and design: research, client interviews,
                wireframes, UI design, and final mockups.
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <h3 className="font-mono text-xs text-[#6366F1] tracking-wide uppercase mb-6">
                The Context
              </h3>
              <h4 className="font-heading font-semibold text-[#0A0F1D] text-[24px] leading-[1.3] tracking-[-0.02em] mb-3">
                Project Company for InSightec
              </h4>
              <p className="font-body text-[#4A5568] text-base leading-[1.7]">
                Executed within a project company for InSightec, a leading medical
                device company developing ultrasound technology for treating essential
                tremors and Parkinson\u2019s disease.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── The Starting Point & The Problem ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36 bg-[#0A0F1D] py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-heading font-bold text-white text-[32px] leading-[1.2] tracking-[-0.02em]">
              The Starting Point & The Problem
            </h2>
            <span className="font-mono text-xs text-white/70 mt-2 block">
              Audience Mismatch, Hidden Revenue Leaks, Visual Clutter
            </span>
          </motion.div>

          <motion.p {...fadeUp} className="font-body text-white/80 text-[16px] leading-[1.6] max-w-[600px] mb-12">
            The company had a functioning sales model with real data, but the existing
            dashboard suffered from several critical bottlenecks.
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

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
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
        </div>
      </section>

      {/* ── Key Solutions & Design Decisions ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36 bg-[#E0E7FF] py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
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
                className="bg-white rounded-lg border border-[#E5E7EB] p-6 md:p-8"
              >
                <div className="w-10 h-10 rounded-full border border-[#E5E7EB] flex items-center justify-center mb-5 text-[#0A0F1D]/60">
                  {solution.icon}
                </div>
                <h3 className="font-heading font-semibold text-[#0A0F1D] text-[20px] tracking-[-0.02em] mb-2">
                  {solution.title}
                </h3>
                <p className="font-body text-[#4A5568] text-sm leading-relaxed">
                  {solution.body}
                </p>
              </motion.div>
            ))}
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
              Wireframes, Old vs. New comparison & final dashboard flows
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
              Wireframes, old vs. new comparison screens, and final dashboard flows
              will be added here.
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
    </main>
  );
}