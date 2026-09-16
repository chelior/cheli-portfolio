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
}) {
  return (
    <section className="w-full px-6 md:px-12 py-14 md:py-20">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeUp}>
          <h2 className="font-subheading font-medium text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0 mb-2">
            {title}
          </h2>
          <span className="font-mono text-xs text-[#0A0F1D]/50 mb-12 block">{subtitle}</span>
        </motion.div>
        <motion.div {...fadeUp} className="mb-0">
          {videoSrc ? (
            <div className="rounded-xl overflow-hidden shadow-lg border border-[#E5E7EB] bg-black">
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
            <div className="rounded-lg border border-dashed border-[#E5E7EB] bg-[#F5F5F7] py-20 md:py-32 flex flex-col items-center justify-center gap-3">
              <span className="font-mono text-xs text-[#0A0F1D]/40 uppercase tracking-wide">
                Prototype in progress
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}