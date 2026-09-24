import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

export default function PrototypeSection({
  title = "Prototype",
  subtitle = "Interactive flow coming soon",
  videoSrc,
  children,
}) {
  return (
    <section className="w-full px-6 md:px-12 py-14 md:py-20">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeUp}>
          <h2 className="font-subheading font-medium text-[#F1F5F9] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0 mb-2">
            {title}
          </h2>
          <span className="font-mono text-xs text-[#94A3B8] mb-12 block">{subtitle}</span>
        </motion.div>
        <motion.div {...fadeUp} className="mb-0">
          {children ? (
            <div className="rounded-xl overflow-hidden shadow-lg border border-white/[0.08] bg-[#111827]">{children}</div>
          ) : videoSrc ? (
            <div className="rounded-xl overflow-hidden shadow-lg border border-white/[0.08] bg-black">
              <video
                src={videoSrc}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto block"
                poster=""
              />
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-white/[0.08] bg-[#111827] py-20 md:py-32 flex flex-col items-center justify-center gap-3">
              <span className="font-mono text-xs text-[#64748B] uppercase tracking-wide">
                Prototype in progress
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}