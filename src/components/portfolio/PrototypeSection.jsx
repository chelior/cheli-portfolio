import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Maximize2, X } from "lucide-react";

export default function PrototypeSection({
  eyebrow = "Final Experience",
  live = true,
  title = "Prototype",
  subtitle = "Interactive flow coming soon",
  videoSrc,
  children,
  expandable = false,
  instructions,
}) {
  const reducedMotion = useReducedMotion();
  const [fullscreen, setFullscreen] = useState(false);
  const expandableContent = expandable && !!children;

  return (
    <section className="w-full px-6 md:px-12 py-14 md:py-20">
      <div className="max-w-[1304px] mx-auto">
        {/* Header — same layout as the User Creation "Final Experience" section */}
        <motion.div>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="font-label text-[11px] tracking-widest uppercase text-[#F8FAFC]/45">
              {eyebrow}
            </span>
            {live && (
              <span className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/25 bg-[#3B82F6]/10 px-3 py-1">
                <span className="relative flex h-1.5 w-1.5">
                  {!reducedMotion && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3B82F6] opacity-75" />
                  )}
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                </span>
                <span className="font-label text-[10px] tracking-widest uppercase text-blue-400">
                  Live Prototype
                </span>
              </span>
            )}
          </div>
          <h2 className="font-subheading text-[#E2E8F0] text-[26px] md:text-[36px] leading-[1.15] tracking-[-0.02em] mb-6">
            {title}
          </h2>
        </motion.div>

        {subtitle && (
          <motion.p
            className={`font-body text-[#94A3B8] text-base leading-[1.75] max-w-[760px] ${instructions ? "mb-5" : children ? "mb-6" : "mb-12"}`}
          >
            {subtitle}
          </motion.p>
        )}

        {/* "Try it yourself:" block — same style as User Creation */}
        {instructions && (
          <motion.div className="max-w-[760px] mb-6">
            <p className="font-heading text-[#F8FAFC] text-[22px] md:text-[26px] leading-tight tracking-[-0.02em] mb-2">
              Try it yourself:
            </p>
            <p className="font-body text-sm text-[#94A3B8] leading-[2.1]">{instructions}</p>
          </motion.div>
        )}

        {/* Expand button — same style and position as User Creation: right-aligned, just above the prototype */}
        {expandableContent && (
          <motion.div className="flex justify-end mb-3">
            <button
              onClick={() => setFullscreen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-label text-sm text-[#0A0F1D] shadow-sm hover:bg-white/85 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090D16]"
              aria-label="Expand prototype to fullscreen"
            >
              <Maximize2 size={16} />
              Expand prototype
            </button>
          </motion.div>
        )}

        <motion.div>
          {children ? (
            <div className="rounded-2xl border border-white/10 shadow-2xl overflow-hidden bg-[#111827]">{children}</div>
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
