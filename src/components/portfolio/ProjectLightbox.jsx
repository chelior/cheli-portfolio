import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

export default function ProjectLightbox({ project, onClose }) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#0A0F1D]/95 flex flex-col"
          onClick={onClose}
        >
          {/* Close button */}
          <div className="flex justify-end p-4 md:p-8">
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]"
              aria-label="Close"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          {/* Content */}
          <div
            className="flex-1 overflow-y-auto px-6 md:px-16 pb-16"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-[1100px] mx-auto"
            >
              {/* Image */}
              <div className="rounded-sm overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="mt-10 md:mt-16 grid md:grid-cols-[1fr_1fr] gap-10 md:gap-20">
                <div>
                  <p className="font-mono text-xs text-white/40 tracking-wide uppercase mb-3">
                    {project.category} — {project.year}
                  </p>
                  <h2 className="font-heading font-bold text-white text-[32px] leading-[1.2] tracking-[-0.02em]">
                    {project.title}
                  </h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-mono text-xs text-[#6366F1] tracking-wide uppercase mb-2">The Problem</h4>
                    <p className="text-white/70 text-base leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs text-[#6366F1] tracking-wide uppercase mb-2">The Solution</h4>
                    <p className="text-white/70 text-base leading-relaxed">{project.solution}</p>
                  </div>
                  {project.impact && (
                    <div>
                      <h4 className="font-mono text-xs text-[#6366F1] tracking-wide uppercase mb-2">Impact</h4>
                      <p className="text-white/70 text-base leading-relaxed">{project.impact}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}