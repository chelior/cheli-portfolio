import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Zap, Eye, Check } from "lucide-react";
import { Link } from "react-router-dom";
import StartingPointSection from "@/components/portfolio/StartingPointSection";
import ImageLightbox from "@/components/portfolio/ImageLightbox";
import DesignGallery from "@/components/portfolio/DesignGallery";
import BeforeAfterSection from "@/components/portfolio/BeforeAfterSection";
import PrototypeSection from "@/components/portfolio/PrototypeSection";
import HeroGif from "@/components/portfolio/HeroGif";
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
    reason: "Broke platform consistency - primary actions happen in modals.",
  },
  {
    num: "02",
    label: "Accordion (Collapse/Expand)",
    reason: "Felt bulky - expandable sections confused users.",
  },
  {
    num: "03",
    label: "Dynamic Modal",
    isWinner: true,
    reason: "Consistent, progressive disclosure, one frictionless screen.",
  },
];

const TAKEAWAYS = [
  {
    icon: <Zap size={18} />,
    title: "Respect System Patterns",
    body: "Sticking to the platform's established UX patterns (like modals) is crucial for keeping the experience cohesive across the product.",
  },
  {
    icon: <Eye size={18} />,
    title: "Use Progressive Disclosure",
    body: "Revealing advanced fields only when needed drastically reduces cognitive load and keeps the UI clean and approachable.",
  },
  {
    icon: <Users size={18} />,
    title: "Test Early",
    body: "Reviewing concepts with the design team early on saved valuable time by quickly eliminating flawed directions before dev investment.",
  },
];

const STARTING_POINT_IMAGES = [
  { src: "images/4248f1bef_AddnewuserTM1.png", alt: "Step 1 - Profile" },
  { src: "images/b1c2150d1_AddnewuserTM2.png", alt: "Step 2 - Roles" },
  { src: "images/70542a368_AddnewuserTM3.png", alt: "Step 3 - Additional Info" },
  { src: "images/0ea01fb79_AddnewuserTM4.png", alt: "Step 4 - Summary" },
];

const USER_CREATION_SLIDES = [
  { image: "images/3376557ec_1Level-CF.svg", caption: "Level - CF" },
  { image: "images/f440b0df0_2Level-addlevel.svg", caption: "Level - Add Level" },
  { image: "images/ce887cc86_3Level-input.svg", caption: "Level - Input" },
  { image: "images/14bbb1548_4Level-levelc.svg", caption: "Level - Level C" },
  { image: "images/1c6175cd8_5Level-levelcadded.svg", caption: "Level - Level C Added" },
  { image: "images/9d671433c_6Level-levelc.svg", caption: "Level - Level C" },
  { image: "images/634a2d640_Footertooltip.svg", caption: "Footer Tooltip" },
  { image: "images/1532e9144_Adminrole.svg", caption: "Admin Role" },
  { image: "images/553151d88_Maxcustomfields.svg", caption: "Max Custom Fields" },
];

export default function CaseStudyUserCreation() {
  const [scrolled, setScrolled] = useState(false);
  const [researchLightbox, setResearchLightbox] = useState(false);
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
            Case Study · User Creation
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
            B2B SaaS - UX/UI Design - 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-heading font-extrabold text-[#0A0F1D] tracking-[-0.02em] text-[36px] md:text-[52px] leading-[1.15] max-w-[900px]"
          >
            How I Streamlined and Shortened the{" "}
            <span className="text-[#6366F1]">User Creation</span> Process
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10"
          >
            <p className="font-body text-[#4A5568] text-[16px] leading-[1.6] max-w-[560px]">
              Transforming a bloated 4-step wizard into a single-screen dynamic
              modal - reducing cognitive load and eliminating drop-offs.
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
              { value: "1", label: "Single-screen flow" },
              { value: "75%", label: "Reduction in wizard steps" },
              { value: "0", label: "Redundant clicks" },
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

      {/* ── Team ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36 pt-32 md:pt-48">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-6 mb-12">
            <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
              My Role & The Team
            </h2>

          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <motion.div {...fadeUp}>
              <h3 className="font-mono text-xs text-[#6366F1] tracking-wide uppercase mb-6">
                The Team
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
              <h3 className="font-mono text-xs text-[#6366F1] tracking-wide uppercase mb-6">
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

      {/* ── Before / After ── */}
      <BeforeAfterSection
        before={{
          src: "images/0ea01fb79_AddnewuserTM4.png",
          alt: "Before - 4-step wizard user creation flow",
          label: "4-Step Wizard",
        }}
        after={{
          src: "images/202bc23cf_Addnewusercollapes.svg",
          alt: "After - single-screen dynamic modal user creation flow",
          label: "Dynamic Modal",
        }}
      />

      {/* ── The Starting Point ── */}
      <StartingPointSection images={STARTING_POINT_IMAGES} title="The Starting Point" subtitle="The original 4-step wizard flow" />

      {/* ── The Challenge ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36 bg-[#0A0F1D] py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <h2 className="font-heading font-bold text-white text-[32px] leading-[1.2] tracking-[-0.02em]">
              The Challenge
            </h2>
            <span className="font-mono text-xs text-white/70 mt-2 block">
              A Frustrating 4-Step Flow
            </span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <motion.div {...fadeUp}>
              <p className="font-body text-white/80 text-[16px] leading-[1.6]">
                The original 4-step user creation modal suffered from heavy friction.
              </p>

              <div className="mt-10 flex gap-0 overflow-hidden rounded-sm border border-white/10">
                {["Profile", "Roles", "Approver", "Summary"].map((step, i) => (
                  <div
                    key={step}
                    className="flex-1 px-3 py-4 border-r border-white/10 last:border-r-0 text-center"
                  >
                    <p className="font-mono text-[10px] text-white/60 mb-1">
                      Step {i + 1}
                    </p>
                    <p className="font-mono text-xs text-white/60">{step}</p>
                  </div>
                ))}
              </div>
              <p className="font-mono text-xs text-[#6366F1] mt-3">
                ↓ Flattened to a single dynamic screen
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <div className="space-y-6">
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
                  <div key={i} className="border-l-2 border-[#6366F1]/40 pl-5">
                    <h4 className="font-heading font-medium text-white text-base mb-1">
                      {item.title}
                    </h4>
                    <p className="font-body text-white/75 text-sm leading-relaxed">
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
      <section className="px-6 md:px-12 mb-24 md:mb-36">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-6 mb-12">
            <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Research & Inspiration
            </h2>

          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <motion.div {...fadeUp}>
              <p className="font-body text-[#4A5568] text-[16px] leading-[1.6] mb-8">
                I analyzed industry benchmarks on{" "}
                <span className="text-[#0A0F1D] font-medium">Mobbin</span> and
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
                  src="images/9a5dc147b_generated_image.png"
                  alt="Design research for user creation flows"
                  className="w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Exploration ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36 bg-[#E0E7FF] py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-6 mb-4">
            <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
              Key Solutions & Features
            </h2>

          </motion.div>
          <motion.p {...fadeUp} className="font-body text-[#4A5568] text-[16px] leading-[1.6] max-w-[600px] mb-14">
            I explored three potential design directions for the new flow,
            each evaluated against platform consistency, cognitive load, and testing feedback.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {ITERATIONS.map((iter, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`relative rounded-lg p-6 md:p-8 flex flex-col ${
                  iter.isWinner
                    ? "bg-[#6366F1] text-white"
                    : "bg-white border border-[#E5E7EB]"
                }`}
              >
                <div className="w-12 h-12 mb-6 relative flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-dashed"
                    style={{ borderColor: iter.isWinner ? "rgba(255,255,255,0.4)" : "rgba(10,15,29,0.2)" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15 + i * 4, repeat: Infinity, ease: "linear" }}
                  />
                  <span className={`relative z-10 font-mono text-sm font-medium ${
                    iter.isWinner ? "text-white" : "text-[#0A0F1D]/50"
                  }`}>
                    {iter.num}
                  </span>
                </div>

                <h3 className={`font-heading font-semibold text-[20px] tracking-[-0.02em] mb-2 ${
                  iter.isWinner ? "text-white" : "text-[#0A0F1D]"
                }`}>
                  {iter.label}
                </h3>

                <p className={`font-body text-sm leading-relaxed ${
                  iter.isWinner ? "text-white/80" : "text-[#4A5568]"
                }`}>
                  {iter.reason}
                </p>

                {iter.isWinner && (
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.4 + i * 0.12 }}
                    className="mt-6 inline-flex items-center gap-1 bg-white/20 text-white text-[10px] font-mono uppercase px-3 py-1 rounded-full self-start"
                  >
                    <Check size={12} />
                    Selected
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Gallery ── */}
      <DesignGallery slides={USER_CREATION_SLIDES} />

      {/* ── Prototype ── */}
      <PrototypeSection />

      {/* ── Key Takeaways ── */}
      <section className="px-6 md:px-12 mb-24 md:mb-36">
        <div className="max-w-[1100px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-6 mb-14">
            <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
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

      <ImageLightbox
        src="images/9a5dc147b_generated_image.png"
        alt="Design research for user creation flows"
        isOpen={researchLightbox}
        onClose={() => setResearchLightbox(false)}
      />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}