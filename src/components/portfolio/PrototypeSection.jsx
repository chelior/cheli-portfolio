import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

export default function PrototypeSection() {
  return (
    <section className="px-6 md:px-12 mb-24 md:mb-36">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeUp} className="mb-12">
          <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
            Prototype
          </h2>
          <span className="font-mono text-xs text-[#0A0F1D]/50 mt-2 block">
            Interactive flow coming soon
          </span>
        </motion.div>
        <motion.div {...fadeUp}>
          <div className="rounded-lg border border-dashed border-[#E5E7EB] bg-[#F5F5F7] py-20 md:py-32 flex flex-col items-center justify-center gap-3">
            <span className="font-mono text-xs text-[#0A0F1D]/40 uppercase tracking-wide">
              Prototype in progress
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}