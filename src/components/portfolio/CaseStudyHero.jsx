import React from "react";
import { motion } from "framer-motion";
import CaseStudyHeroShapes from "@/components/portfolio/CaseStudyHeroShapes";
import AnimatedCounter from "@/components/portfolio/AnimatedCounter";

function hexToRgba(hex, alpha = 1) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Dynamic project-themed hero
 * - Uses var(--project-accent) for theming
 * props:
 *  accent: hex string (e.g. "#3B82F6")
 *  overline: string
 *  title: React node or string with highlighted accent word (pass titleAccent for colored span)
 *  titleNode: optional React node for full custom title (if provided, title/titleAccent ignored)
 *  description: string
 *  stats: [{value, label}]
 *  preview: { src, alt }
 *  variant: string for CaseStudyHeroShapes
 */
export default function CaseStudyHero({
  accent = "#3B82F6",
  overline,
  title,
  titleAccent,
  titleNode,
  description,
  stats = [],
  preview,
  variant,
}) {
  const tintSoft = hexToRgba(accent, 0.14);
  const tintMid = hexToRgba(accent, 0.07);
  const borderTint = hexToRgba(accent, 0.18);
  const glow = hexToRgba(accent, 0.22);

  return (
    <section
      style={{
        "--project-accent": accent,
        background: `linear-gradient(to bottom, ${hexToRgba(accent, 0.12)} 0%, #090D16 75%)`,
      }}
      className="relative pt-28 md:pt-36 pb-16 md:pb-20 px-6 md:px-12 overflow-hidden bg-gradient-to-b"
    >

      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 xl:gap-16 items-center">
        {/* ── Left ── */}
        <div className="relative min-w-0">
          {overline && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-label text-xs tracking-widest uppercase mb-5"
              style={{ color: accent }}
            >
              {overline}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-[#F8FAFC] tracking-[-0.02em] text-[34px] md:text-[46px] lg:text-[48px] leading-[1.1] max-w-[640px]"
          >
            {titleNode
              ? titleNode
              : title && titleAccent
                ? (() => {
                    const parts = title.split(titleAccent);
                    return (
                      <>
                        {parts[0]}
                        <span style={{ color: accent }}>{titleAccent}</span>
                        {parts[1] ?? ""}
                      </>
                    );
                  })()
                : title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-body text-[#94A3B8] text-[16px] md:text-[17px] leading-[1.65] max-w-[560px] mt-6"
            >
              {description}
            </motion.p>
          )}

          {/* Metrics — frosted glass + tinted border + ambient glow on hover */}
          {stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-10 grid grid-cols-3 gap-3 md:gap-4 max-w-[640px]"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.08 }}
                  whileHover={{ y: -3 }}
                  className="group relative bg-[#111827] rounded-xl p-4 md:p-5 transition-all duration-300 border border-white/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                >
                  <p className="font-heading text-[#F8FAFC] text-[22px] md:text-[28px] leading-none tracking-[-0.01em] tabular-nums">
                    <AnimatedCounter value={stat.value} duration={1350} />
                  </p>
                  <p className="font-label text-[11px] md:text-xs text-[#F8FAFC]/55 mt-2.5 uppercase leading-tight">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* ── Right — floating preview — no localized glow, sits naturally over ambient gradient ── */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:pl-4 flex items-center justify-center"
        >
          {/* Geometric shapes tinted with project accent — placed behind mockup */}
          <div className="absolute inset-0 -z-10 opacity-90">
            <CaseStudyHeroShapes variant={variant} accent={accent} />
          </div>

          {/* Flat preview — no device frame */}
          {preview?.src && (
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[560px]"
            >
              <img
                src={preview.src}
                alt={preview.alt || "Project preview"}
                className="w-full h-auto object-contain block rounded-lg border border-border"
                loading="eager"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}