import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";

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
  expandable = false,
}) {
  const [fullscreen, setFullscreen] = useState(false);
  const expandableContent = expandable && !!children;

  return (
    <section className="w-full px-6 md:px-12 py-14 md:py-20">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeUp} className={expandableContent ? "flex items-start justify-between gap-6" : ""}>
          <div>
            <h2 className="font-subheading text-[#F1F5F9] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0 mb-2">
              {title}
            </h2>
            <span className={`font-label text-xs text-[#94A3B8] block ${expandableContent ? "" : "mb-12"}`}>
              {subtitle}
            </span>
          </div>
          {expandableContent && (
            <button
              onClick={() => setFullscreen(true)}
              className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] shrink-0 shadow-sm mt-1"
              aria-label="Expand prototype fullscreen"
            >
              <Maximize2 size={14} className="text-[#0A0F1D]" />
            </button>
          )}
        </motion.div>
        <motion.div {...fadeUp} className={expandableContent ? "mt-8" : ""}>
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
              <span className="font-label text-xs text-[#64748B] uppercase tracking-wide">
                Prototype in progress
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Fullscreen overlay — mirrors CaseStudyUserCreation */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreen(false)}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-2 md:p-4 lg:p-6"
          >
            <button
              onClick={() => setFullscreen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[1400px] max-h-[94vh] overflow-auto rounded-xl bg-white shadow-2xl"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
