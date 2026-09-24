import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImageLightbox from "@/components/portfolio/ImageLightbox";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

export default function StartingPointSection({
  images = [],
  title = "The Starting Point",
  subtitle = "The original interface before the redesign",
  noWrapper = false,
  showArchitecturalBlock = false,
  compact = false,
}) {
  const [index, setIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const isLightboxOpen = lightboxIndex !== null;

  const paginate = useCallback((newDir) => {
    setIndex((prev) => (prev + newDir + images.length) % images.length);
  }, [images.length]);

  const goTo = useCallback((i) => setIndex(i), []);

  const openLightbox = useCallback((i) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const lightboxPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);
  const lightboxNext = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (isLightboxOpen) return;
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate, isLightboxOpen]);

  if (!images.length) return null;

  const innerContent = (
    <>
        {title && (
        <motion.div {...fadeUp}>
          <h2 className="font-subheading font-medium text-[#E2E8F0] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0 mb-2">
            {title}
          </h2>
          <p className="font-mono text-xs text-[#F8FAFC]/50 mb-12 block">
            {subtitle}
          </p>
        </motion.div>
      )}

      {showArchitecturalBlock && (
        <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-8 md:gap-10 items-start mb-12">
          {/* Column 1 — title outside card */}
          <div>
            <h3 className="font-heading font-semibold text-[#94A3B8] text-[16px] tracking-[-0.02em] mb-4">
              Searchable Dropdowns and Density Optimization
            </h3>
            <div className="bg-[#111827] rounded-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-5">
              <ul className="space-y-2.5">
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0077FF] shrink-0" />
                  <span className="font-body text-[#94A3B8] text-[14px] leading-[1.6]">
                    Integrated internal search directly inside dropdown selects to dramatically reduce visual clutter.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0077FF] shrink-0" />
                  <span className="font-body text-[#94A3B8] text-[14px] leading-[1.6]">
                    Consolidated search and selection into unified fields, eliminating sprawling lists.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0077FF] shrink-0" />
                  <span className="font-body text-[#94A3B8] text-[14px] leading-[1.6]">
                    Enabled multiple standalone steps to fit seamlessly into a single-screen dynamic modal.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {/* Column 2 — title outside card */}
          <div>
            <h3 className="font-heading font-semibold text-[#94A3B8] text-[16px] tracking-[-0.02em] mb-4">
              Dynamic Progressive Disclosure for Role Settings
            </h3>
            <div className="bg-[#111827] rounded-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-5">
              <ul className="space-y-2.5">
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0077FF] shrink-0" />
                  <span className="font-body text-[#94A3B8] text-[14px] leading-[1.6]">
                    &ldquo;Additional Info&rdquo; hidden by default — no longer a permanent screen or section.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0077FF] shrink-0" />
                  <span className="font-body text-[#94A3B8] text-[14px] leading-[1.6]">
                    Conditional expansion only when the Approver role is selected.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0077FF] shrink-0" />
                  <span className="font-body text-[#94A3B8] text-[14px] leading-[1.6]">
                    Standard roles never encounter irrelevant fields, eliminating unnecessary cognitive friction.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

        {/* Coverflow — How It Started: center-focused, peeking sides, fixed height, no layout shift — constrained frame below header */}
        <motion.div {...fadeUp} className="relative overflow-hidden rounded-xl" style={{ boxSizing: "border-box" }}>
          <div
            className="relative w-full h-[280px] sm:h-[340px] md:h-[420px] lg:h-[460px] overflow-visible select-none"
            style={{ boxSizing: "border-box" }}
          >
            <div className="absolute inset-0 flex items-center justify-center" style={{ boxSizing: "border-box" }}>
              {images.map((img, i) => {
                let offset = i - index;
                if (offset > images.length / 2) offset -= images.length;
                if (offset < -images.length / 2) offset += images.length;

                const isActive = offset === 0;
                const isPrev = offset === -1;
                const isNext = offset === 1;
                const isVisible = Math.abs(offset) <= 1;

                const translateX = offset * 44;
                const scale = isActive ? 1 : 0.85;
                const opacity = isActive ? 1 : isVisible ? 0.45 : 0;
                const zIndex = isActive ? 20 : 10;

                return (
                  <motion.div
                    key={i}
                    className={`absolute w-[72%] md:w-[62%] lg:w-[58%] ${isActive ? "cursor-zoom-in scale-100" : "cursor-pointer -mx-10 scale-[0.85]"}`}
                    style={{
                      zIndex,
                      boxSizing: "border-box",
                      transformOrigin: "center",
                      top: "50%",
                    }}
                    initial={false}
                    animate={{
                      x: `${translateX}%`,
                      y: "-50%",
                      scale,
                      opacity,
                    }}
                    transition={{
                      transform: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    }}
                    onClick={() => {
                      if (isActive) {
                        openLightbox(i);
                      } else {
                        goTo(i);
                      }
                    }}
                  >
                    <div
                      className={`relative overflow-hidden bg-[#111827] flex flex-col border border-border h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px] ${
                        isActive
                          ? "rounded-xl shadow-2xl cursor-zoom-in"
                          : "rounded-xl shadow-md opacity-90 blur-[0.6px]"
                      }`}
                      style={{
                        willChange: "transform, opacity",
                        backfaceVisibility: "hidden",
                        filter: isActive ? "none" : "blur(0.6px)",
                      }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover object-top block rounded-xl cursor-zoom-in"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="absolute inset-0 z-20"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                const threshold = 40;
                if (info.offset.x < -threshold) paginate(1);
                else if (info.offset.x > threshold) paginate(-1);
              }}
              style={{ cursor: "grab" }}
            />
          </div>

          <button
            onClick={() => paginate(-1)}
            className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#111827] shadow-md border border-white/[0.08] hover:bg-[#0A0F1D] hover:text-white hover:border-[#0A0F1D] text-[#E2E8F0] flex items-center justify-center transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] z-30"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#111827] shadow-md border border-white/[0.08] hover:bg-[#0A0F1D] hover:text-white hover:border-[#0A0F1D] text-[#E2E8F0] flex items-center justify-center transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] z-30"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mt-6 font-mono text-[11px] text-[#F8FAFC]/60 tracking-wide text-center"
          >
            {images[index].alt} — {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </motion.p>
        </AnimatePresence>

        <div className="mt-3 flex items-center justify-center gap-2 mb-0">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-[#3B82F6]" : "w-1.5 bg-[#0A0F1D]/15 hover:bg-[#0A0F1D]/30"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </>
  );

  if (noWrapper) {
    return (
      <>
        {innerContent}
        <ImageLightbox
          src={images[lightboxIndex]?.src || ""}
          alt={images[lightboxIndex]?.alt || ""}
          isOpen={isLightboxOpen}
          onClose={closeLightbox}
          onPrev={lightboxPrev}
          onNext={lightboxNext}
        />
      </>
    );
  }

  return (
    <section className={`w-full px-6 md:px-12 ${compact ? "py-10 md:py-16" : "py-14 md:py-20"}`} style={{ boxSizing: "border-box" }}>
      <div className="max-w-[1100px] mx-auto">
        {innerContent}
      </div>
      <ImageLightbox
        src={images[lightboxIndex]?.src || ""}
        alt={images[lightboxIndex]?.alt || ""}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onPrev={lightboxPrev}
        onNext={lightboxNext}
      />
    </section>
  );
}
