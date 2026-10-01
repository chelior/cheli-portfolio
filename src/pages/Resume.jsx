import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  GraduationCap,
  Briefcase,
  Sparkles,
} from "lucide-react";

const EMAIL = "cheliganmor@gmail.com";
const PHONE = "+972 503301290";
const PHONE_TEL = "+972503301290";
const LOCATION = "Ramat Gan";
const PDF_HREF = "images/CV/Cheli Gan Mor - CV 2026.pdf";
const LINKEDIN_HREF = "https://www.linkedin.com/in/cheliganmor95836b215";

const BRAND = "#3B82F6";

const EXPERIENCE = [
  {
    company: "Tipalti",
    role: "Product Designer",
    period: "2025 — 2026",
    location: "Enterprise Fintech Platform",
    bullets: [
      "Owned the end-to-end design of the Administration domain within an enterprise fintech platform.",
      "Designed complex configuration and permission-based workflows for multi-role environments.",
      "Translated technical and business requirements into scalable, system-level UX solutions.",
      "Collaborated with PMs and global R&D teams across sites.",
      "Worked within and contributed to a cross-product design system.",
      "Delivered wireframes, interactive prototypes, and full developer handoff.",
    ],
  },
  {
    company: "One BI",
    role: "UX/UI Designer",
    period: "2021 — 2025",
    location: "B2B Data & BI Platforms",
    bullets: [
      "Led design for complex B2B platforms focused on data visualization, including mashups, web applications, and internal tools.",
      "Designed and maintained components as part of a scalable design system; collaborated with QA and conducted user research.",
      "Created responsive designs for both web and mobile, with an emphasis on usability and accessibility.",
      "Produced low- and high-fidelity wireframes, built interactive prototypes, and conducted user testing.",
    ],
  },
];

const SKILLS = [
  "Figma",
  "Adobe Creative Suite",
  "AI for UX / Product Design",
  "Design Systems",
  "Data Visualization",
  "Responsive Design",
  "Wireframing",
  "Interactive Prototyping",
  "User Research",
  "User Testing",
  "Accessibility",
  "B2B SaaS",
];

const EDUCATION = [
  {
    school: "Figma Masterclass",
    program: "Advanced Design Masterclass Codesigner",
    year: "2025",
  },
  {
    school: "Codesigner",
    program: "UX Course",
    year: "2020",
  },
  {
    school: "The Open University",
    program: "Humanities and Social Sciences",
    year: "2016 — 2021",
  },
  {
    school: "Minshar for Art",
    program: "Visual Communication",
    year: "2014 — 2018",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6 },
};

export default function Resume() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-[#090D16] min-h-screen print:bg-white">
      <style>{`
        @media print {
          @page { margin: 14mm 12mm; size: A4; }
          nav, footer, .no-print { display: none !important; }
          body, main { background: white !important; }
          a { text-decoration: none !important; }
          .print-card, .print-section {
            break-inside: avoid;
            page-break-inside: avoid;
            box-shadow: none !important;
          }
          .print-header { box-shadow: none !important; border: 1px solid #E5E7EB !important; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      <nav
        className={`no-print fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#090D16]/80 backdrop-blur-md border-b border-white/[0.06]" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-heading text-[13px] font-normal uppercase tracking-[0.06em] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
          >
            <ArrowLeft size={15} />
            Back to portfolio
          </Link>

          <a
            href={PDF_HREF}
            download="Cheli Gan Mor - CV 2026.pdf"
            className="hidden md:inline-flex items-center gap-2 bg-slate-900 hover:bg-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.25)] text-white font-heading text-[13px] font-medium tracking-[0.04em] uppercase px-5 py-2.5 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2"
          >
            <Download size={14} />
            Download PDF
          </a>
        </div>
      </nav>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-12 md:pb-20">
        {/* ── Header / Hero ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="print-header print-card bg-[#111827] rounded-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-7 md:p-10 lg:p-12 mb-8 md:mb-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm text-[#64748B] mb-3 tracking-wide">
                UX/UI & Product Designer · B2B SaaS · Fintech
              </p>
              <h1 className="font-heading font-semibold text-[#F8FAFC] tracking-[-0.03em] text-[40px] md:text-[52px] leading-[0.95]">
                Cheli Gan Mor
              </h1>
              <p className="font-body font-normal text-[#94A3B8] text-[17px] md:text-[19px] leading-[1.4] mt-2.5">
                UX/UI Designer <span className="text-white/20 mx-1">·</span> Product Designer
              </p>

              <p className="font-body text-[#94A3B8] text-[15px] md:text-[16px] leading-[1.7] mt-6 max-w-[640px]">
                I&apos;m a UX/UI designer with 4+ years of experience creating intuitive, engaging digital products.
                I turn complex ideas into clean, impactful designs that users love. Curiosity drives me: I use AI
                to speed up my research and rapid sketching, then keep refining my process alongside the teams I
                work with.
              </p>

              {/* Unified contact row — cohesive understated pills */}
              <div className="flex flex-wrap gap-2 mt-7">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.08] rounded-full px-3.5 py-2 font-body text-sm text-[#94A3B8] hover:border-[#3B82F6]/30 hover:text-[#3B82F6] hover:bg-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                >
                  <Mail size={14} className="text-[#64748B]" />
                  {EMAIL}
                </a>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.08] rounded-full px-3.5 py-2 font-body text-sm text-[#94A3B8] hover:border-[#3B82F6]/30 hover:text-[#3B82F6] hover:bg-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                >
                  <Phone size={14} className="text-[#64748B]" />
                  {PHONE}
                </a>
                <span className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.08] rounded-full px-3.5 py-2 font-body text-sm text-[#94A3B8]">
                  <MapPin size={14} className="text-[#64748B]" />
                  {LOCATION}
                </span>
                <a
                  href={LINKEDIN_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.08] rounded-full px-3.5 py-2 font-body text-sm text-[#94A3B8] hover:border-[#3B82F6]/30 hover:text-[#3B82F6] hover:bg-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                >
                  <Linkedin size={14} className="text-[#64748B]" />
                  LinkedIn
                </a>
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.08] rounded-full px-3.5 py-2 font-body text-sm text-[#94A3B8] hover:border-[#3B82F6]/30 hover:text-[#3B82F6] hover:bg-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                >
                  <Globe size={14} className="text-[#64748B]" />
                  Portfolio
                </Link>
              </div>
            </div>

            {/* Right — Download + meta */}
            <div className="lg:w-[300px] shrink-0 flex flex-col gap-4">
              <a
                href={PDF_HREF}
                download="Cheli Gan Mor - CV 2026.pdf"
                className="no-print inline-flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl px-6 py-4 shadow-[0_0_20px_rgba(59,130,246,0.25)] font-heading text-[13px] font-medium uppercase tracking-[0.06em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 shadow-sm"
              >
                <Download size={16} />
                Download PDF
              </a>
              <p className="no-print font-body text-xs text-slate-400 text-center leading-relaxed">
                Or print via <span className="text-slate-500">⌘ + P</span>, optimized for A4
              </p>

              {/* At a glance — sans-serif, muted */}
              <div className="hidden lg:block bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 print-card">
                <p className="font-body text-sm font-medium text-[#F8FAFC] mb-3">At a glance</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="font-body text-sm text-[#94A3B8]">Experience</span>
                    <span className="font-body text-sm text-[#F8FAFC] font-medium">4+ Years</span>
                  </div>
                  <div className="h-px bg-white/[0.06]" />
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="font-body text-sm text-[#94A3B8]">Focus</span>
                    <span className="font-body text-sm text-[#F8FAFC]">B2B SaaS / Enterprise</span>
                  </div>
                  <div className="h-px bg-white/[0.06]" />
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="font-body text-sm text-[#94A3B8]">Base</span>
                    <span className="font-body text-sm text-[#F8FAFC]">{LOCATION}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a
            href={PDF_HREF}
            download="Cheli Gan Mor - CV 2026.pdf"
            className="no-print mt-6 flex md:hidden w-full items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] shadow-[0_0_20px_rgba(59,130,246,0.25)] text-white rounded-xl px-6 py-4 font-heading text-[13px] font-medium uppercase tracking-[0.06em] transition-colors"
          >
            <Download size={16} />
            Download PDF
          </a>
        </motion.section>

        {/* ── Section header — outside grid so cards align flush ── */}
        <motion.div {...fadeUp} className="flex items-center gap-3 print-section mb-6">
          <div className="w-8 h-8 rounded-full bg-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.25)] flex items-center justify-center text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]">
            <Briefcase size={14} />
          </div>
          <h2 className="font-heading font-medium text-[#F8FAFC] text-[20px] tracking-[-0.02em]">Work Experience</h2>
          <div className="flex-1 h-px bg-white/[0.08] ml-2 hidden md:block" />
          <span className="font-body text-sm text-[#64748B] hidden md:block">4+ Years</span>
        </motion.div>

        {/* ── Two-column layout — cards top-aligned ── */}
        <div className="grid lg:grid-cols-[1.6fr_0.9fr] gap-6 md:gap-8 items-start">
          {/* Left — Experience cards */}
          <div className="space-y-6">
            {EXPERIENCE.map((job, idx) => (
              <motion.article
                key={job.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="print-card bg-[#111827] rounded-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-6 md:p-8"
                style={{ breakInside: "avoid" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                  <div>
                    <h3 className="font-heading font-semibold text-[#F8FAFC] text-[18px] tracking-[-0.02em]">
                      {job.role}
                    </h3>
                    <p className="font-body text-[#94A3B8] text-sm mt-0.5">
                      <span className="font-medium text-[#F8FAFC]">{job.company}</span>
                      <span className="text-white/20 mx-1.5">·</span>
                      {job.location}
                    </p>
                  </div>
                  <span className="inline-flex items-center font-body text-sm text-[#94A3B8] bg-white/[0.06] border border-white/[0.08] rounded-full px-3 py-1 shrink-0">
                    {job.period}
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {job.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 font-body text-[#94A3B8] text-[14px] leading-[1.7]">
                      <span className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0" style={{ background: BRAND }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}

            <div className="lg:hidden space-y-5 mt-2">
              <SkillsCard />
              <EducationCard />
            </div>
          </div>

          {/* Right — Sidebar (desktop) — aligned to top of Work Experience */}
          <div className="hidden lg:block space-y-5">
            <SkillsCard />
            <EducationCard />
          </div>
        </div>

        <footer className="no-print mt-12 md:mt-16 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-[#64748B] text-center md:text-left">
            © {new Date().getFullYear()} Cheli Gan Mor — Designed & built with intention ·{" "}
            <a href={PDF_HREF} download className="underline decoration-dotted hover:text-[#3B82F6] text-[#64748B]">
              Download PDF
            </a>
          </p>
          <div className="flex items-center gap-3">
            <a
              href={LINKEDIN_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-[#64748B] hover:text-[#3B82F6] transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-white/20">·</span>
            <a href={`mailto:${EMAIL}`} className="font-body text-sm text-[#64748B] hover:text-[#3B82F6] transition-colors">
              Email
            </a>
            <span className="text-white/20">·</span>
            <Link to="/" className="font-body text-sm text-[#64748B] hover:text-[#3B82F6] transition-colors">
              Portfolio
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

function SkillsCard() {
  return (
    <motion.section
      {...fadeUp}
      className="print-card bg-[#111827] rounded-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-4"
      style={{ breakInside: "avoid" }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[#94A3B8]">
          <Sparkles size={14} />
        </div>
        <h2 className="font-heading font-medium text-[#F8FAFC] text-[16px] tracking-[-0.02em]">Skills & Tools</h2>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {SKILLS.map((s) => (
          <span
            key={s}
            className="inline-flex items-center bg-white/[0.06] border border-white/[0.08] rounded-full px-2.5 py-1 font-body text-xs text-[#94A3B8] hover:border-[#3B82F6]/30 hover:bg-white/[0.08] transition-colors cursor-default"
          >
            {s}
          </span>
        ))}
      </div>
    </motion.section>
  );
}

function EducationCard() {
  return (
    <motion.section
      {...fadeUp}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="print-card bg-[#111827] rounded-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-4"
      style={{ breakInside: "avoid" }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[#94A3B8]">
          <GraduationCap size={14} />
        </div>
        <h2 className="font-heading font-medium text-[#F8FAFC] text-[16px] tracking-[-0.02em]">Education & Certifications</h2>
        <span className="ml-auto hidden xl:inline-flex items-center bg-white/[0.06] border border-white/[0.08] rounded-full px-2.5 py-1 font-body text-[11px] text-[#64748B] shrink-0">
          Continuous learning
        </span>
      </div>

      <div className="space-y-0">
        {EDUCATION.map((e) => (
          <div key={e.school} className="flex items-start justify-between gap-2 py-1.5">
            <p className="font-body text-[13px] leading-snug min-w-0 flex-1 pr-2">
              <span className="font-medium text-[#F8FAFC]">{e.school}</span>
              <span className="text-white/20 mx-1.5">·</span>
              <span className="text-[#94A3B8] text-xs">{e.program}</span>
            </p>
            <span className="inline-flex items-center bg-white/[0.06] border border-white/[0.08] rounded-full px-2 py-0.5 font-body text-[11px] text-[#64748B] shrink-0 mt-0.5">
              {e.year}
            </span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
