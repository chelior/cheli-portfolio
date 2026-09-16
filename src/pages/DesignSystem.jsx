import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Mail,
  MessageCircle,
  X,
  Copy,
  Check,
  Search,
  Palette,
  Rocket,
  Eye,
  Scale,
  Sparkles,
  Type,
  Split,
  Columns,
  Layers,
  LayoutDashboard,
  Menu,
} from "lucide-react";

// ── Tokens ──────────────────────────────────────────────────────────

const BRAND_COLORS = [
  { name: "Primary", hex: "#6366F1", var: "--primary", usage: "CTA, links, accent" },
  { name: "Accent", hex: "#FF4E7E", var: "--accent", usage: "Hero shapes, highlights" },
  { name: "Ink", hex: "#0A0F1D", var: "--foreground", usage: "Headings, body" },
  { name: "Muted", hex: "#4A5568", var: "--muted-foreground", usage: "Body secondary" },
  { name: "Border", hex: "#E5E7EB", var: "--border", usage: "Dividers, card borders" },
  { name: "Surface", hex: "#F5F5F7", var: "--muted", usage: "Stat cards, placeholders" },
  { name: "Lavender", hex: "#E0E7FF", var: "custom", usage: "Section backgrounds" },
  { name: "White", hex: "#FFFFFF", var: "--background", usage: "Page bg, cards" },
];

const EXTENDED_PALETTE = [
  { hex: "#0077FF", label: "Primary Blue" },
  { hex: "#232222", label: "Dark Neutral" },
  { hex: "#B2B2B2", label: "Gray" },
  { hex: "#E4F1FF", label: "Light Tint" },
  { hex: "#728090", label: "Slate" },
  { hex: "#00DEE8", label: "Teal" },
  { hex: "#E3FBFF", label: "Teal Tint" },
  { hex: "#F17E63", label: "Coral" },
  { hex: "#FBD8CF", label: "Peach" },
  { hex: "#B47AFF", label: "Purple" },
  { hex: "#E91103", label: "Error" },
];

const SECTIONS = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "buttons", label: "Buttons" },
  { id: "badges", label: "Badges & Pills" },
  { id: "cards", label: "Cards" },
  { id: "navigation", label: "Navigation" },
  { id: "interactive", label: "Interactive" },
  { id: "feedback", label: "Feedback & Overlays" },
  { id: "audit", label: "Audit Notes" },
];

function Section({ id, kicker, title, desc, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-8">
        {kicker && (
          <p className="font-mono text-xs text-[#6366F1] tracking-widest uppercase mb-2">{kicker}</p>
        )}
        <h2 className="font-heading font-medium text-[#0A0F1D] text-[28px] md:text-[32px] leading-[1.2] tracking-[-0.02em]">
          {title}
        </h2>
        {desc && <p className="font-body text-[#4A5568] text-[15px] leading-[1.6] mt-3 max-w-[720px]">{desc}</p>}
      </div>
      {children}
    </section>
  );
}

function SubHeading({ children }) {
  return <h3 className="font-mono text-xs text-[#0A0F1D]/50 tracking-widest uppercase mb-4">{children}</h3>;
}

function Code({ children }) {
  return (
    <code className="font-mono text-[11px] tracking-normal normal-case bg-[#F5F5F7] border border-[#E5E7EB] px-2 py-1 rounded-md text-[#0A0F1D]/70">
      {children}
    </code>
  );
}

function Swatch({ hex, name, usage }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="group text-left bg-white border border-[#E5E7EB] rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div className="w-full h-20 rounded-lg border border-black/5 mb-3 relative overflow-hidden" style={{ backgroundColor: hex }}>
        {copied && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm font-mono text-xs text-white">
            Copied!
          </span>
        )}
      </div>
      <p className="font-heading font-medium text-[#0A0F1D] text-sm">{name}</p>
      <p className="font-mono text-[11px] text-[#0A0F1D]/60 normal-case tracking-normal">{hex}</p>
      {usage && <p className="font-body text-xs text-[#4A5568] mt-1">{usage}</p>}
    </button>
  );
}

export default function DesignSystem() {
  const [demoCopied, setDemoCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const copyDemo = () => {
    navigator.clipboard.writeText("cheliganmor@gmail.com");
    setDemoCopied(true);
    setTimeout(() => setDemoCopied(false), 1500);
  };

  return (
    <div className="bg-[#FCFCFD] min-h-screen">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-heading text-[13px] uppercase tracking-[0.06em] text-[#0A0F1D]/60 hover:text-[#0A0F1D] transition-colors"
            >
              <ArrowLeft size={14} /> Back to site
            </Link>
            <span className="hidden md:inline-flex h-4 w-px bg-[#E5E7EB]" />
            <span className="font-mono text-xs text-[#6366F1] uppercase tracking-widest hidden md:inline">Design System</span>
          </div>
          <span className="font-mono text-xs text-[#0A0F1D]/40 hidden md:inline">Internal · /design-system</span>
          <a
            href="#audit"
            className="inline-flex items-center gap-2 bg-[#0A0F1D] text-white font-heading text-xs uppercase tracking-[0.06em] px-4 py-2 rounded-full hover:bg-[#6366F1] transition-colors"
          >
            Jump to audit
          </a>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10 lg:gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block sticky top-24 self-start">
          <p className="font-mono text-[11px] text-[#0A0F1D]/40 uppercase tracking-widest mb-3">On this page</p>
          <nav className="space-y-1 border-l border-[#E5E7EB] pl-4">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block font-body text-sm text-[#4A5568] hover:text-[#6366F1] py-1.5 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </nav>
          <div className="mt-8 p-4 rounded-xl bg-[#E0E7FF] border border-[#6366F1]/10">
            <p className="font-heading font-medium text-[#0A0F1D] text-sm mb-1">How to use</p>
            <p className="font-body text-xs text-[#4A5568] leading-relaxed">
              This is a living gallery. Copy a class with <Code>click</Code> on swatches, compare button variants side-by-side, and check the audit at the bottom for inconsistencies.
            </p>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 space-y-16 md:space-y-20">
          {/* Header */}
          <div>
            <p className="font-mono text-xs text-[#6366F1] tracking-widest uppercase mb-3">Cheli Gan Mor · Portfolio</p>
            <h1 className="font-heading font-medium text-[#0A0F1D] tracking-[-0.02em] text-[36px] md:text-[48px] leading-[1.05]">
              Design System <span className="text-[#6366F1]">Gallery</span>
            </h1>
            <p className="font-body text-[#4A5568] text-[16px] md:text-[18px] leading-[1.6] mt-4 max-w-[760px]">
              Every button, card, badge and motion pattern actually in use — rendered live so you can see if it all hangs together. No mocked tokens — these are the real Tailwind classes from the codebase.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 font-mono text-xs bg-white border border-[#E5E7EB] rounded-full px-3 py-2">
                <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse" /> 8 brand tokens
              </span>
              <span className="inline-flex items-center font-mono text-xs bg-white border border-[#E5E7EB] rounded-full px-3 py-2">3 type families</span>
              <span className="inline-flex items-center font-mono text-xs bg-white border border-[#E5E7EB] rounded-full px-3 py-2">12 button states</span>
              <span className="inline-flex items-center font-mono text-xs bg-[#6366F1] text-white rounded-full px-3 py-2">Tailwind · Framer Motion</span>
            </div>
            {/* Mobile TOC */}
            <div className="lg:hidden mt-8 flex flex-wrap gap-2">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="font-mono text-xs bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Colors ── */}
          <Section
            id="colors"
            kicker="01 · Foundations"
            title="Colors"
            desc="Core portfolio brand is intentionally small — indigo primary, soft neutrals, and the Sdarim extended system underneath for case-study richness. Click a swatch to copy hex."
          >
            <SubHeading>Brand · Portfolio</SubHeading>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {BRAND_COLORS.map((c) => (
                <Swatch key={c.hex} hex={c.hex} name={c.name} usage={c.usage} />
              ))}
            </div>

            <SubHeading>Extended · Sdarim case study (visual language)</SubHeading>
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 md:p-8">
              <div className="flex flex-wrap gap-5 md:gap-6">
                {EXTENDED_PALETTE.map((c) => (
                  <div key={c.hex} className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#E5E7EB] shadow-sm" style={{ backgroundColor: c.hex }} />
                    <span className="font-mono text-[11px] text-[#0A0F1D]/70 normal-case tracking-normal">{c.hex}</span>
                    <span className="font-mono text-[10px] text-[#0A0F1D]/40 normal-case tracking-normal -mt-1">{c.label}</span>
                  </div>
                ))}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#E5E7EB] shadow-sm"
                    style={{ background: "linear-gradient(135deg, #C1DFFF 0%, #E4F1FF 100%)" }}
                  />
                  <span className="font-mono text-[11px] text-[#0A0F1D]/70 normal-case tracking-normal">#C1DFFF → #E4F1FF</span>
                  <span className="font-mono text-[10px] text-[#0A0F1D]/40 normal-case tracking-normal -mt-1">Gradient</span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Code>bg-[#6366F1]</Code>
                <Code>bg-[#0A0F1D]</Code>
                <Code>bg-[#F5F5F7]</Code>
                <Code>border-[#E5E7EB]</Code>
                <Code>text-[#4A5568]</Code>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {[
                { bg: "bg-[#0A0F1D]", fg: "text-white", label: "Dark sections", desc: "Challenge, footer dark bg. White text + 40% violet left border." },
                { bg: "bg-[#E0E7FF]", fg: "text-[#0A0F1D]", label: "Soft section", desc: "About / Solutions. Lavender #E0E7FF with white cards." },
                { bg: "bg-[#F5F5F7]", fg: "text-[#0A0F1D]", label: "Muted card", desc: "Stats, placeholders. #F5F5F7 with #E5E7EB border." },
              ].map((c) => (
                <div key={c.label} className={`${c.bg} ${c.fg} rounded-xl p-5 border border-black/5`}>
                  <p className="font-heading font-medium text-base">{c.label}</p>
                  <p className="font-body text-sm opacity-70 mt-1">{c.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Typography ── */}
          <Section
            id="typography"
            kicker="02 · Foundations"
            title="Typography"
            desc="Three families: Inter for headings/display, Google Sans Flex/Inter for body/subheading, JetBrains Mono for labels. Mono is forced to 500 weight + 0.12em tracking globally."
          >
            <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden">
              <div className="grid md:grid-cols-[220px_1fr] divide-y md:divide-y-0 md:divide-x divide-[#E5E7EB]">
                <div className="p-6">
                  <SubHeading>Spec</SubHeading>
                  <div className="space-y-3 font-mono text-xs normal-case tracking-normal">
                    <p>
                      <span className="text-[#0A0F1D]/50">Heading:</span> Inter 500
                    </p>
                    <p>
                      <span className="text-[#0A0F1D]/50">Body:</span> Google Sans Flex
                    </p>
                    <p>
                      <span className="text-[#0A0F1D]/50">Mono:</span> JetBrains Mono 500 + 0.12em
                    </p>
                    <p>
                      <span className="text-[#0A0F1D]/50">Display:</span> Inter (hero)
                    </p>
                  </div>
                  <div className="mt-6 space-y-2">
                    <Code>--font-heading</Code>
                    <Code>--font-body</Code>
                    <Code>--font-mono</Code>
                  </div>
                </div>
                <div className="p-6 md:p-8 space-y-8">
                  <div>
                    <p className="font-mono text-[11px] text-[#0A0F1D]/40 uppercase tracking-wide mb-2">Display · Hero 72–148px · -0.04em</p>
                    <p className="font-heading font-medium text-[#0A0F1D] text-[42px] md:text-[56px] leading-[0.9] tracking-[-0.04em]">
                      Hi, I'm Cheli <span className="text-[#6366F1]">product designer.</span>
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] text-[#0A0F1D]/40 uppercase tracking-wide mb-2">H1 · 36–52px · -0.02em · 1.15</p>
                    <p className="font-heading font-medium text-[#0A0F1D] text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.02em]">
                      Modernizing DevHub: From a Legacy Tool to a Flexible Portal
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] text-[#0A0F1D]/40 uppercase tracking-wide mb-2">H2 · 32px · Subheading</p>
                    <p className="font-subheading font-medium text-[#0A0F1D] text-[26px] leading-[1.2] tracking-[-0.02em]">Work · About · The Challenge</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] text-[#0A0F1D]/40 uppercase tracking-wide mb-2">Body · 16–20px · 1.6–1.7 · #4A5568</p>
                    <p className="font-body text-[#4A5568] text-[16px] leading-[1.7] max-w-[560px]">
                      Transforming a cluttered, uncharacterized 4-year-old enterprise platform into an intuitive system for non-tech-savvy users, reducing cognitive load.
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] text-[#0A0F1D]/40 uppercase tracking-wide mb-2">Mono Label · 11–12px · 0.12em · Uppercase</p>
                    <p className="font-mono text-xs text-[#6366F1] uppercase">B2B SaaS · Available for new challenges · 2023</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/60 p-4 flex gap-3">
              <span className="w-8 h-8 rounded-full bg-white border border-amber-200 flex items-center justify-center shrink-0 text-amber-600">
                <Eye size={14} />
              </span>
              <p className="font-body text-sm text-amber-900/80">
                <span className="font-medium">Type scale audit:</span> Hero uses 72/112/148, case-study H1 uses 36/52, section H2 is 32 across the board. Consider unifying to a 4-step scale (display / h1 / h2 / h3 = 72→32) and documenting it here.
              </p>
            </div>
          </Section>

          {/* ── Buttons ── */}
          <Section
            id="buttons"
            kicker="03 · Components"
            title="Buttons"
            desc="Every button style found in the app, rendered live. The white pill is the new standard for 'View Prototype' — all three instances now match."
          >
            <div className="space-y-8">
              {/* Primary */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 md:p-8">
                <SubHeading>Primary CTA — Get in touch</SubHeading>
                <div className="flex flex-wrap gap-4 items-center">
                  <button className="inline-flex items-center bg-[#6366F1] hover:bg-[#0A0F1D] text-white font-heading text-[14px] font-normal uppercase tracking-[0.06em] px-6 py-3 rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] focus-visible:ring-offset-2">
                    Get in touch
                  </button>
                  <button
                    disabled
                    className="inline-flex items-center bg-[#6366F1]/50 text-white font-heading text-[14px] uppercase tracking-[0.06em] px-6 py-3 rounded-sm cursor-not-allowed"
                  >
                    Disabled
                  </button>
                  <Code>bg-[#6366F1] hover:bg-[#0A0F1D] rounded-sm tracking-[0.06em]</Code>
                </div>
              </div>

              {/* White pill + Ghost */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 md:p-8">
                <SubHeading>White pill — View Interactive Prototype (new standard)</SubHeading>
                <div className="flex flex-wrap gap-4 items-center">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-2 bg-white border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] font-heading text-[13px] font-normal tracking-[0.02em] px-6 py-3 rounded-full shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5E7EB] focus-visible:ring-offset-2"
                  >
                    View Interactive Prototype <ExternalLink size={16} />
                  </a>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="bg-white border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] text-xs font-semibold px-5 py-2.5 rounded-full inline-flex items-center gap-2 shadow-sm transition-all"
                  >
                    View Interactive Prototype <span className="text-[11px]">↗</span>
                  </a>
                  <Code>bg-white border-[#E5E7EB] text-[#374151] rounded-full shadow-sm</Code>
                </div>
                <div className="mt-6 flex flex-wrap gap-3 text-[#0A0F1D]/50 font-mono text-xs">
                  <span>Small (xs, ↗) = Dual-Path onboarding</span>
                  <span>·</span>
                  <span>Default (13px, ExternalLink) = other solutions</span>
                </div>
              </div>

              {/* Ghost / Tertiary */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 md:p-8">
                <SubHeading>Ghost / Tertiary</SubHeading>
                <div className="flex flex-wrap gap-4 items-center">
                  <Link
                    to="#"
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center font-heading text-[14px] uppercase tracking-[0.06em] text-[#0A0F1D]/60 hover:text-[#0A0F1D] hover:bg-[#F5F5F7] px-6 py-3 rounded-sm transition-colors"
                  >
                    All projects
                  </Link>
                  <button className="font-heading text-[14px] uppercase tracking-[0.06em] text-[#0A0F1D]/60 hover:text-[#6366F1] transition-colors">
                    Work
                  </button>
                  <button className="font-heading text-[14px] uppercase tracking-[0.06em] text-[#0A0F1D]/50 hover:text-[#6366F1] inline-flex items-center gap-2">
                    <ArrowLeft size={15} /> Back to Work
                  </button>
                  <Code>text-[#0A0F1D]/60 hover:text-[#0A0F1D] hover:bg-[#F5F5F7]</Code>
                </div>
              </div>

              {/* Icon / Circle */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 md:p-8">
                <SubHeading>Icon buttons · Carousel & lightbox</SubHeading>
                <div className="flex flex-wrap gap-4 items-center">
                  <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md flex items-center justify-center transition-all hover:scale-110 border border-[#E5E7EB]">
                    <ChevronLeft size={20} className="text-[#0A0F1D]" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md flex items-center justify-center transition-all hover:scale-110 border border-[#E5E7EB]">
                    <ChevronRight size={20} className="text-[#0A0F1D]" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors">
                    <X size={18} />
                  </button>
                  <button
                    onClick={copyDemo}
                    className="inline-flex items-center gap-2 font-mono text-xs text-[#0A0F1D]/50 hover:text-[#6366F1] transition-colors px-2 py-1 rounded"
                  >
                    {demoCopied ? <Check size={14} /> : <Copy size={14} />} {demoCopied ? "Copied!" : "Copy email"}
                  </button>
                  <Code>rounded-full shadow-md backdrop-blur + scale-110 hover</Code>
                </div>
              </div>

              {/* Expand pill */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 md:p-8">
                <SubHeading>Utility pill — Expand</SubHeading>
                <div className="flex flex-wrap gap-4 items-center">
                  <span className="text-xs font-mono font-medium tracking-wide text-slate-600 bg-white/80 backdrop-blur-md border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-sm">
                    🔍 Expand
                  </span>
                  <Code>bg-white/80 backdrop-blur-md border slate-200/80 rounded-full</Code>
                </div>
              </div>

              {/* Magnetic / Email */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#0A0F1D] p-6 md:p-8">
                <SubHeading>
                  <span className="text-white/60">Emphasis — Magnetic email (dark bg)</span>
                </SubHeading>
                <a
                  href="mailto:cheliganmor@gmail.com"
                  className="inline-flex items-center gap-3 font-heading font-medium text-white text-[28px] md:text-[36px] tracking-[-0.03em] hover:text-[#6366F1] transition-colors"
                >
                  cheliganmor@gmail.com <ArrowUpRight className="w-6 h-6" />
                </a>
                <p className="font-mono text-xs text-white/50 mt-3">Framer Motion spring: stiffness 150, damping 15 — see ContactSection</p>
              </div>
            </div>
          </Section>

          {/* ── Badges ── */}
          <Section
            id="badges"
            kicker="04 · Components"
            title="Badges & Pills"
            desc="Mono labels, category pills, status badges and numbered steps — the small pieces that carry a lot of information hierarchy."
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <SubHeading>Status badge</SubHeading>
                <div className="inline-flex items-center gap-2 bg-[#6366F1]/8 rounded-full px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6366F1] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6366F1]" />
                  </span>
                  <span className="font-mono text-xs text-[#6366F1] uppercase">Available for new challenges</span>
                </div>
                <div className="mt-4">
                  <Code>bg-[#6366F1]/8 rounded-full + ping dot</Code>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <SubHeading>Skill tags</SubHeading>
                <div className="flex flex-wrap gap-2">
                  {["AI Tools", "Workflows", "Solutions", "Architecture", "User Research"].map((s) => (
                    <span
                      key={s}
                      className="font-mono text-xs text-[#0A0F1D]/60 uppercase border border-[#E5E7EB] rounded-full px-4 py-2 hover:border-[#6366F1] hover:text-[#6366F1] transition-colors cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <Code>border-[#E5E7EB] rounded-full hover:border-[#6366F1]</Code>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <SubHeading>Numbered badges</SubHeading>
                <div className="flex gap-3 flex-wrap">
                  <span className="inline-flex font-mono text-[11px] font-medium uppercase tracking-wider bg-[#FFF1F5] text-[#FF4D7F] px-2.5 py-1 rounded-md">
                    01
                  </span>
                  <span className="inline-flex font-mono text-[11px] font-medium uppercase tracking-wider bg-[#F5F3FF] text-[#8B5CF6] px-2.5 py-1 rounded-md">
                    02
                  </span>
                  <span className="inline-flex font-mono text-[11px] font-medium uppercase tracking-wider bg-[#FFF7ED] text-[#F97316] px-2.5 py-1 rounded-md">
                    03
                  </span>
                  <span className="inline-flex font-mono text-[11px] font-medium uppercase tracking-wider bg-[#F0F9FF] text-[#0EA5E9] px-2.5 py-1 rounded-md">
                    04
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#6366F1]/8 flex items-center justify-center font-mono text-xs text-[#6366F1]">1</span>
                  <span className="w-8 h-8 rounded-full bg-[#6366F1]/8 flex items-center justify-center font-mono text-xs text-[#6366F1]">2</span>
                  <span className="w-8 h-8 rounded-full bg-[#6366F1]/8 flex items-center justify-center font-mono text-xs text-[#6366F1]">3</span>
                </div>
                <div className="mt-4">
                  <Code>bg-[#FFF1F5] text-[#FF4D7F] rounded-md + circle 8×8</Code>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <SubHeading>Category & constraint pills</SubHeading>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex text-xs font-mono uppercase tracking-wider text-black/60 bg-black/5 px-2.5 py-1 rounded-full">
                    Workflow Friction
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-[#E5E7EB]">
                    <span className="font-mono text-xs text-[#6366F1] uppercase">Client Constraint</span>
                    <span className="font-body text-sm text-[#0A0F1D]">Keep all existing functionality</span>
                  </span>
                </div>
                <div className="mt-4">
                  <Code>bg-black/5 rounded-full + bg-white border rounded-full</Code>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <SubHeading>Metric badges (research)</SubHeading>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block font-mono text-[11px] font-medium uppercase px-2.5 py-1 rounded-md text-[#FF4D7F] bg-[#FFF1F5]">DISCOVERABILITY</span>
                  <span className="inline-block font-mono text-[11px] font-medium uppercase px-2.5 py-1 rounded-md text-purple-600 bg-purple-50">COGNITIVE LOAD</span>
                  <span className="inline-block font-mono text-[11px] font-medium uppercase px-2.5 py-1 rounded-md text-amber-600 bg-amber-50">CONFIDENCE</span>
                </div>
                <div className="mt-3 h-1 rounded-full w-32" style={{ background: "linear-gradient(90deg, #FF4D7F, #FF8FAB)" }} />
                <div className="mt-4">
                  <Code>gradient bar 5px + badge tint</Code>
                </div>
              </div>

              <div className="rounded-2xl border border-purple-100/60 p-6 flex gap-4 bg-gradient-to-r from-purple-50/70 via-rose-50/50 to-amber-50/50 border-l-4 border-l-purple-300 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-white border border-purple-200 shadow-sm flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles size={16} className="text-purple-600" />
                </div>
                <div>
                  <p className="font-mono text-xs font-medium tracking-wider text-purple-600 mb-1">KEY INSIGHT</p>
                  <p className="text-sm md:text-base font-medium text-slate-900 leading-snug">Competitors focus on function, but lack clear and user-friendly design.</p>
                </div>
              </div>
            </div>
          </Section>

          {/* ── Cards ── */}
          <Section
            id="cards"
            kicker="05 · Components"
            title="Cards"
            desc="Card is the core container — from project tiles to solution comps. Borders are almost always #E5E7EB on white, with rounded-xl/2xl and subtle shadows."
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Stat */}
              <div>
                <SubHeading>Stat card · Hero numbers</SubHeading>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "11", label: "System Processes Mapped" },
                    { value: "10", label: "Discovery Sessions" },
                    { value: "3", label: "Core Personas" },
                  ].map((s) => (
                    <div key={s.value} className="bg-[#F5F5F7] rounded-xl p-4">
                      <p className="font-heading font-medium text-[#0A0F1D] text-2xl tracking-[-0.04em]">{s.value}</p>
                      <p className="font-mono text-[11px] text-[#0A0F1D]/50 mt-2 uppercase leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <Code>bg-[#F5F5F7] rounded-xl p-5 + mono label</Code>
                </div>
              </div>

              {/* Solution */}
              <div>
                <SubHeading>Solution card — DevHub</SubHeading>
                <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 flex flex-col">
                  <div className="w-12 h-12 mb-4 relative flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-black/20" />
                    <span className="relative font-mono text-sm text-[#0A0F1D]/50">01</span>
                  </div>
                  <h3 className="font-heading font-medium text-[18px] tracking-[-0.02em] text-[#0A0F1D]">Global Context Switcher</h3>
                  <p className="font-body text-sm text-[#4A5568] mt-2">Implemented a unified top-header context manager for effortless switching.</p>
                </div>
                <div className="mt-3">
                  <Code>rounded-lg border p-6 + dashed circle</Code>
                </div>
              </div>

              {/* Challenge dark */}
              <div className="bg-[#0A0F1D] rounded-xl p-6">
                <SubHeading>
                  <span className="text-white/60">Challenge — dark variant</span>
                </SubHeading>
                <div className="border-l-2 border-[#6366F1]/40 pl-5">
                  <h4 className="font-heading font-medium text-white text-base mb-1">Hidden Power Features</h4>
                  <p className="font-body text-white/75 text-sm">Advanced tools buried under heavy navigation and overcrowded pages.</p>
                </div>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
                <SubHeading>Challenge — light variant</SubHeading>
                <div className="border-l-2 border-[#6366F1]/40 pl-5">
                  <h4 className="font-heading font-medium text-[#0A0F1D] text-base mb-1">Hidden Power Features</h4>
                  <p className="font-body text-[#4A5568] text-sm">Advanced tools buried under heavy navigation and overcrowded pages.</p>
                </div>
              </div>

              {/* Research row */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
                <SubHeading>Research step</SubHeading>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#6366F1]/8 flex items-center justify-center shrink-0">
                    <span className="font-mono text-xs text-[#6366F1]">1</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-medium text-[#0A0F1D] text-base">System Auditing</h4>
                    <p className="font-body text-[#4A5568] text-sm">Conducted 10 intensive working sessions to audit every page.</p>
                  </div>
                </div>
              </div>

              {/* Takeaway */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 group">
                <div className="w-10 h-10 rounded-full border border-[#E5E7EB] flex items-center justify-center mb-4 text-[#6366F1] group-hover:border-[#6366F1] group-hover:bg-[#6366F1]/5 transition-colors">
                  <Eye size={18} />
                </div>
                <h3 className="font-subheading font-medium text-[#0A0F1D] text-[18px]">Clarity Beats Minimalism</h3>
                <p className="font-body text-[#4A5568] text-sm mt-2">Clear text labels outperform cryptic icons for non-tech users.</p>
              </div>

              {/* Metric with bar */}
              <div className="bg-white border border-[#f1f5f9] rounded-2xl p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.04)]">
                <SubHeading>Metric bar</SubHeading>
                <span className="inline-block font-mono text-[11px] font-medium uppercase px-2.5 py-1 rounded-md mb-3 text-[#FF4D7F] bg-[#FFF1F5]">DISCOVERABILITY</span>
                <p className="text-4xl font-bold tracking-tight text-slate-900">83%</p>
                <div className="h-[5px] rounded-full mt-2 mb-3" style={{ background: "linear-gradient(90deg, #FF4D7F, #FF8FAB)", width: "83%" }} />
                <p className="text-sm text-[#475569]">reported difficulty finding core actions in the main menu</p>
              </div>

              {/* Project card mini */}
              <div>
                <SubHeading>Project card</SubHeading>
                <div className="relative overflow-hidden rounded-[20px] border border-black/5 bg-[#6366F1] p-6 flex items-center justify-center aspect-[4/3]">
                  <div className="w-[80%] bg-white shadow-lg p-2 text-center">
                    <p className="font-mono text-xs">Image 80% + shadow-lg</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, #6366F1, transparent)" }}>
                    <p className="font-heading font-medium text-white text-sm">Hover title overlay</p>
                  </div>
                </div>
              </div>

              {/* Before/After pill */}
              <div className="bg-slate-50/60 rounded-2xl border border-slate-200/70 p-6">
                <SubHeading>Before / After comps</SubHeading>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/50 backdrop-blur-sm border border-slate-200/60 rounded-xl p-3">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">BEFORE (PAIN)</p>
                    <p className="text-xs text-slate-600">Monolithic wizard forced 14 required fields.</p>
                  </div>
                  <div className="bg-white border border-indigo-100 rounded-xl p-3 shadow-sm">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 font-bold mb-1">AFTER (SOLUTION)</p>
                    <p className="text-xs font-medium text-slate-900">Lightweight modal captures essentials instantly.</p>
                  </div>
                </div>
              </div>

              {/* Sticky note */}
              <div>
                <SubHeading>Sticky note · Affinity board</SubHeading>
                <div
                  className="relative flex flex-col p-5 bg-[#FEF9C3]/70 min-h-[180px]"
                  style={{ borderRadius: "2px", boxShadow: "2px 8px 16px -2px rgba(0,0,0,0.08)" }}
                >
                  <div
                    className="absolute rounded-sm -top-2 left-1/2 -translate-x-1/2 w-[70px] h-[18px]"
                    style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(2px)", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
                  />
                  <span className="inline-flex self-start text-xs font-mono uppercase tracking-wider text-black/60 bg-black/5 px-2.5 py-1 rounded-full mb-3">
                    Icons & Visuals
                  </span>
                  <p className="text-[14px] leading-[1.6] text-[#1e293b] text-right" style={{ direction: "rtl", fontFamily: "Assistant, sans-serif" }}>
                    דוחות, אני רוצה להשתמש בעוד דברים, אך זה מאוד קשה למצוא.
                  </p>
                  <p className="font-mono text-xs text-slate-500 mt-auto pt-3">Hard to find features in tiny icons</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#E5E7EB] p-4 flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 font-mono text-xs">!</span>
                <p className="font-body text-sm text-[#4A5568]">
                  <span className="font-medium text-[#0A0F1D]">Card border tokens overlap:</span> Sdarim uses both <Code>border-[#E5E7EB]</Code> and <Code>border-slate-200/80</Code>. Standardize on one gray-100 value.
                </p>
              </div>
              <div className="rounded-xl border border-[#E5E7EB] p-4 flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <Layers size={12} />
                </span>
                <p className="font-body text-sm text-[#4A5568]">
                  Radius ramp: <Code>rounded-sm</Code> (CTA), <Code>rounded-lg</Code>, <Code>rounded-xl</Code>, <Code>rounded-2xl</Code>, <Code>rounded-full</Code>. Keep capped at these 5.
                </p>
              </div>
            </div>
          </Section>

          {/* ── Navigation ── */}
          <Section
            id="navigation"
            kicker="06 · Structure"
            title="Navigation"
            desc="Sticky blurred navbar, footer CTA, and the case-study Back link. All use uppercase 0.06em tracking for nav items."
          >
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E5E7EB] overflow-hidden bg-white">
                <div className="h-16 flex items-center justify-between px-6 border-b border-[#E5E7EB] bg-white/90 backdrop-blur-md">
                  <span className="font-heading font-medium text-[#0A0F1D] tracking-[-0.04em]">Cheli Gan Mor</span>
                  <div className="hidden md:flex items-center gap-6">
                    {["Work", "About", "Contact"].map((l) => (
                      <span
                        key={l}
                        className="font-heading text-[13px] uppercase tracking-[0.06em] text-[#0A0F1D]/60 hover:text-[#6366F1] cursor-pointer"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                  <span className="md:hidden p-2 border rounded">
                    <Menu size={16} />
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    <Code>bg-white/90 backdrop-blur-md border-b border-[#E5E7EB]</Code>
                    <Code>tracking-[0.06em] uppercase 14px</Code>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 md:p-8 text-center">
                <p className="font-mono text-xs text-[#0A0F1D]/50 uppercase mb-2">Next steps</p>
                <h3 className="font-subheading font-medium text-[#0A0F1D] text-2xl mb-4">Interested in the full case study?</h3>
                <div className="flex items-center justify-center gap-4">
                  <span className="inline-flex items-center font-heading text-sm uppercase tracking-[0.06em] text-[#0A0F1D]/60 hover:text-[#0A0F1D] hover:bg-[#F5F5F7] px-6 py-3 rounded-sm cursor-pointer">
                    All projects
                  </span>
                  <span className="inline-flex items-center bg-[#6366F1] hover:bg-[#0A0F1D] text-white font-heading text-sm uppercase tracking-[0.06em] px-6 py-3 rounded-sm cursor-pointer">
                    Get in touch
                  </span>
                </div>
                <div className="mt-4 flex justify-center gap-2">
                  <Code>rounded-sm</Code>
                  <Code>hover:bg-[#0A0F1D]</Code>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="font-mono text-xs text-[#0A0F1D]/50">© 2026 — Designed & Built with intention</p>
                <div className="flex gap-6">
                  <span className="font-mono text-xs text-[#0A0F1D]/50 hover:text-[#6366F1] cursor-pointer">LinkedIn</span>
                  <span className="font-mono text-xs text-[#0A0F1D]/50 hover:text-[#6366F1] cursor-pointer">Read.cv</span>
                </div>
              </div>
            </div>
          </Section>

          {/* ── Interactive ── */}
          <Section
            id="interactive"
            kicker="07 · Behavior"
            title="Interactive"
            desc="Carousels, sliders and micro-interactions — shown as static specs plus a mini live carousel."
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <SubHeading>Design gallery · controls</SubHeading>
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => setGalleryIndex((i) => Math.max(0, i - 1))}
                    className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] shadow flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div className="flex-1 h-24 rounded-xl bg-[#F5F5F7] border-2 border-dashed border-[#E5E7EB] flex items-center justify-center">
                    <span className="font-mono text-xs text-[#0A0F1D]/40">Slide {galleryIndex + 1} / 5</span>
                  </div>
                  <button
                    onClick={() => setGalleryIndex((i) => Math.min(4, i + 1))}
                    className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] shadow flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                <div className="mt-4">
                  <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`flex-1 mx-0.5 first:ml-0 last:mr-0 rounded-full transition-colors ${i === galleryIndex ? "bg-[#6366F1]" : "bg-transparent"}`} />
                    ))}
                  </div>
                  <div className="mt-3 flex justify-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setGalleryIndex(i)}
                        className={`h-1 w-1 rounded-full transition-all ${i === galleryIndex ? "bg-[#6366F1] scale-125" : "bg-black/15"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <SubHeading>Before / After slider</SubHeading>
                <div className="relative h-32 rounded-xl overflow-hidden border border-[#E5E7EB] bg-gradient-to-r from-[#F5F5F7] to-white flex">
                  <div className="flex-1 flex items-center justify-center border-r border-white font-mono text-xs text-[#0A0F1D]/50">Before</div>
                  <div className="flex-1 flex items-center justify-center font-mono text-xs text-[#0A0F1D]/50">After</div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white shadow" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center border border-[#E5E7EB]">
                    <span className="text-xs">↔</span>
                  </div>
                </div>
                <div className="mt-3">
                  <Code>drag to compare · BeforeAfterSlider</Code>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <SubHeading>Process timeline</SubHeading>
                <div className="relative pl-8">
                  <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-slate-200" />
                  <div className="space-y-4">
                    {[
                      { num: "01", title: "Research & Discovery", color: "#FF4D7F" },
                      { num: "02", title: "Wireframing & Prototyping", color: "#8B5CF6" },
                    ].map((p) => (
                      <div key={p.num} className="flex gap-3 items-center">
                        <div
                          className="w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center shrink-0 -ml-8"
                          style={{ borderColor: `${p.color}40` }}
                        >
                          <Search size={14} style={{ color: p.color }} />
                        </div>
                        <div className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 flex-1">
                          <p className="font-mono text-[11px] uppercase" style={{ color: p.color }}>
                            {p.num}
                          </p>
                          <p className="font-heading font-medium text-sm text-[#0A0F1D]">{p.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <SubHeading>Motion tokens</SubHeading>
                <div className="space-y-3 font-mono text-xs normal-case tracking-normal">
                  <p>
                    <span className="text-[#0A0F1D]/50">fadeUp:</span> y 40→0, 0.7s, once
                  </p>
                  <p>
                    <span className="text-[#0A0F1D]/50">Carousel:</span> x ±60, spring 150/15
                  </p>
                  <p>
                    <span className="text-[#0A0F1D]/50">Hover:</span> y -3 to -6, shadow-md, 200ms
                  </p>
                  <p>
                    <span className="text-[#0A0F1D]/50">Easings:</span> [0.22,1,0.36,1] / [0.16,1,0.3,1]
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Code>framer-motion</Code>
                  <Code>viewport: once</Code>
                </div>
              </div>
            </div>
          </Section>

          {/* ── Feedback ── */}
          <Section
            id="feedback"
            kicker="08 · Overlays"
            title="Feedback & Overlays"
            desc="Modals, lightboxes and inline confirmation patterns."
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <SubHeading>Contact modal</SubHeading>
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center bg-[#6366F1] hover:bg-[#0A0F1D] text-white font-heading text-sm uppercase tracking-[0.06em] px-5 py-2.5 rounded-sm transition-colors"
                >
                  Open contact modal
                </button>
                <div className="mt-4">
                  <Code>backdrop: bg-black/60 backdrop-blur-sm</Code>
                </div>
                {modalOpen && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
                    <div
                      className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button onClick={() => setModalOpen(false)} className="absolute top-5 right-5 text-[#0A0F1D]/40 hover:text-[#0A0F1D]">
                        <X size={22} />
                      </button>
                      <h3 className="font-heading font-medium text-[#0A0F1D] text-xl mb-2">Get in Touch</h3>
                      <p className="font-body text-[#4A5568] text-sm mb-6">Choose how you'd like to reach me.</p>
                      <div className="space-y-3">
                        <a
                          href="mailto:cheliganmor@gmail.com"
                          className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#6366F1] hover:bg-[#6366F1]/5 transition-all group"
                        >
                          <span className="w-10 h-10 rounded-full bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] group-hover:bg-[#6366F1] group-hover:text-white transition-colors">
                            <Mail size={18} />
                          </span>
                          <div>
                            <p className="font-heading font-medium text-[#0A0F1D] text-sm">Email</p>
                            <p className="font-mono text-xs normal-case tracking-normal text-[#0A0F1D]/60">cheliganmor@gmail.com</p>
                          </div>
                        </a>
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all group"
                        >
                          <span className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                            <MessageCircle size={18} />
                          </span>
                          <div>
                            <p className="font-heading font-medium text-[#0A0F1D] text-sm">WhatsApp</p>
                            <p className="font-mono text-xs normal-case tracking-normal text-[#0A0F1D]/60">+972 50-330-1290</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <SubHeading>Lightbox</SubHeading>
                <div className="h-32 rounded-xl bg-[#0A0F1D] flex items-center justify-center relative overflow-hidden">
                  <span className="font-mono text-xs text-white/60">ImageLightbox — fullscreen overlay</span>
                  <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <X size={14} />
                  </span>
                </div>
                <p className="font-body text-sm text-[#4A5568] mt-3">Dark overlay, centered image, click outside or Esc to close. Used for case-study images and gallery.</p>
              </div>
            </div>
          </Section>

          {/* ── Audit ── */}
          <Section
            id="audit"
            kicker="09 · Review"
            title="Does it all make sense?"
            desc="Quick audit from scanning the live codebase — what’s consistent, what to tighten up next."
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
                <h3 className="font-heading font-medium text-emerald-900 mb-3 flex items-center gap-2">
                  <Check size={16} className="text-emerald-600" /> What’s solid
                </h3>
                <ul className="space-y-2 font-body text-sm text-emerald-900/80">
                  <li>• 1 primary indigo (#6366F1) used everywhere for CTAs + links — very consistent.</li>
                  <li>• Mono labels are uniform: JetBrains Mono 500, 0.12em tracking, uppercase.</li>
                  <li>• Card system is coherent: white + #E5E7EB border + rounded-xl/2xl.</li>
                  <li>• Motion language is consistent: fadeUp (0.6–0.7s) + viewport once.</li>
                  <li>• White pill prototype button now unified (was 3 variants, now 1).</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
                <h3 className="font-heading font-medium text-amber-900 mb-3">Tighten up next</h3>
                <ul className="space-y-2 font-body text-sm text-amber-900/80">
                  <li>
                    • <span className="font-medium">Two gray borders:</span> #E5E7EB vs slate-200/80 — pick one token.
                  </li>
                  <li>
                    • <span className="font-medium">Two accent pinks:</span> #FF4E7E vs #FF4D7F — normalize.
                  </li>
                  <li>
                    • <span className="font-medium">Radius ramp:</span> 5 values (sm → full) — document when to use which.
                  </li>
                  <li>
                    • <span className="font-medium">Button radii split:</span> CTAs are sm (square), pills are full — intentional but worth noting.
                  </li>
                  <li>
                    • <span className="font-medium">Dark vs light challenge cards:</span> same content, two treatments — consider one.
                  </li>
                  <li>
                    • <span className="font-medium">Type scale:</span> hero 72→148, H1 36→52, H2 32 — could be 4 explicit steps.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div>
                <p className="font-heading font-medium text-[#0A0F1D]">Want this as a real system?</p>
                <p className="font-body text-sm text-[#4A5568]">Next step would be extracting tokens to Tailwind config + a Button component with variants (primary / ghost / pill).</p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-[#6366F1] hover:bg-[#0A0F1D] text-white font-heading text-sm uppercase tracking-[0.06em] px-6 py-3 rounded-sm transition-colors shrink-0"
              >
                Back to home <ArrowUpRight size={16} />
              </Link>
            </div>
          </Section>

          <p className="font-mono text-xs text-[#0A0F1D]/30 pt-8 border-t border-[#E5E7EB]">Generated from live repo · src/index.css + tailwind.config.js + components/portfolio/*</p>
        </div>
      </div>
    </div>
  );
}
