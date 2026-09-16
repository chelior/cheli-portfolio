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
          <h2 className="font-subheading font-medium text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em] mt-0 mb-2">
            {title}
          </h2>
          <p className="font-mono text-xs text-[#0A0F1D]/50 mb-12 block">
            {subtitle}
          </p>
        </motion.div>
      )}

      {showArchitecturalBlock && (
        <motion.div {...fadeUp} className="bg-white border border-neutral-200/80 rounded-xl p-6 md:p-8 lg:p-10 mb-12 shadow-sm">
          <div className="flex flex-col gap-8 md:gap-10">
            <div>
              <h3 className="font-heading font-medium text-[#0A0F1D] text-[18px] md:text-[19px] leading-[1.4] tracking-[-0.02em] mb-3">
                Searchable Dropdowns and Density Optimization
              </h3>
              <p className="font-body text-[#4A5568] text-[15px] md:text-[16px] leading-[1.7] md:leading-[1.8]">
                Integrating internal search directly inside dropdown selects dramatically reduced visual clutter on the canvas. Consolidating search and selection into unified fields eliminated sprawling lists, allowing what used to be multiple standalone steps to fit seamlessly into a single-screen dynamic modal.
              </p>
            </div>
            <div className="border-t border-neutral-200/60 pt-8 md:pt-10">
              <h3 className="font-heading font-medium text-[#0A0F1D] text-[18px] md:text-[19px] leading-[1.4] tracking-[-0.02em] mb-3">
                Dynamic Progressive Disclosure for Role Settings
              </h3>
              <p className="font-body text-[#4A5568] text-[15px] md:text-[16px] leading-[1.7] md:leading-[1.8]">
                The "Additional Info" stage is no longer exposed as a permanent screen or default section. It utilizes conditional progressive disclosure: only when the user selects the Approver role does the dedicated approval permissions area dynamically expand. Users configuring standard roles never encounter irrelevant fields, eliminating unnecessary cognitive friction.
              </p>
            </div>
          </div>
        </motion.div>
      )}

        {/* Coverflow — How It Started: center-focused, peeking sides, fixed height, no layout shift */}
        <motion.div {...fadeUp} className="relative" style={{ boxSizing: "border-box" }}>
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

                const translateX = offset * 52;
                const scale = isActive ? 1.05 : 0.85;
                const opacity = isActive ? 1 : isVisible ? 0.65 : 0;
                const zIndex = isActive ? 10 : 1;

                return (
                  <motion.div
                    key={i}
                    className={`absolute w-[72%] md:w-[62%] lg:w-[58%] ${isActive ? "cursor-zoom-in" : "cursor-pointer"}`}
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
                      className={`relative overflow-hidden bg-white flex flex-col rounded-lg border border-border ${
                        isActive ? "shadow-sm cursor-zoom-in" : "opacity-90"
                      }`}
                      style={{
                        willChange: "transform, opacity",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-auto object-contain block rounded-lg cursor-zoom-in"
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
            className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white shadow-md border border-[#E5E7EB] hover:bg-[#0A0F1D] hover:text-white hover:border-[#0A0F1D] text-[#0A0F1D] flex items-center justify-center transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] z-30"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white shadow-md border border-[#E5E7EB] hover:bg-[#0A0F1D] hover:text-white hover:border-[#0A0F1D] text-[#0A0F1D] flex items-center justify-center transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] z-30"
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
            className="mt-6 font-mono text-[11px] text-[#0A0F1D]/60 tracking-wide text-center"
          >
            {images[index].alt} — {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </motion.p>
        </AnimatePresence>

        <div className="mt-3 flex items-center justify-center gap-2 mb-0">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-[#6366F1]" : "w-1.5 bg-[#0A0F1D]/15 hover:bg-[#0A0F1D]/30"}`}
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
    <section className="w-full px-6 md:px-12 py-14 md:py-20" style={{ boxSizing: "border-box" }}>
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
