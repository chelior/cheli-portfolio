import React from "react";
import { motion } from "framer-motion";

export default function CoreQuestionSpotlight({ question, accent = "#3B82F6", eyebrow = "Core Question" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="my-10 md:my-12 py-10 md:py-12"
    >
      <div className="max-w-[860px] mx-auto">
        <div
          className="relative rounded-2xl bg-[#111827] border border-white/[0.08] px-6 md:px-10 py-8 md:py-10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
          style={{ borderColor: `${accent}18`, boxShadow: `0 8px 32px -12px ${accent}18` }}
        >
          {/* accent top rule */}
          <div className="absolute top-0 left-6 right-6 h-1 rounded-full" style={{ background: accent, opacity: 0.9 }} />
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: accent }}>
            {eyebrow}
          </p>
          <blockquote className="font-display font-semibold text-slate-900 text-2xl md:text-3xl lg:text-[32px] leading-[1.25] tracking-tight">
            “{question}”
          </blockquote>
        </div>
      </div>
    </motion.div>
  );
}

// Dark variant for sections with bg-[#0A0F1D]
export function CoreQuestionSpotlightDark({ question, accent = "#3B82F6", eyebrow = "Core Question" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="my-10 md:my-12 py-2"
    >
      <div className="max-w-[860px] mx-auto">
        <div className="relative rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/10 px-6 md:px-10 py-8 md:py-10">
          <div className="absolute top-0 left-6 right-6 h-1 rounded-full" style={{ background: accent }} />
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: accent }}>
            {eyebrow}
          </p>
          <blockquote className="font-display font-semibold text-white text-2xl md:text-3xl lg:text-[32px] leading-[1.25] tracking-tight">
            “{question}”
          </blockquote>
          <div className="mt-4 h-px w-full" style={{ background: `${accent}30` }} />
        </div>
      </div>
    </motion.div>
  );
}
