import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ImageLightbox from "@/components/portfolio/ImageLightbox";

const DEFAULT_SLIDES = [
  {
    image: "images/9e0da0110_Frame30975.svg",
    caption: "Design detail 01",
  },
  {
    image: "images/a1e7beda8_Frame30976.svg",
    caption: "Design detail 02",
  },
  {
    image: "images/448a8b286_Frame309761.svg",
    caption: "Design detail 03",
  },
  {
    image: "images/3de16e5fa_Frame30977.svg",
    caption: "Design detail 04",
  },
  {
    image: "images/4d7a6d30d_Frame309771.svg",
    caption: "Design detail 05",
  },
  {
    image: "images/adddc880e_Frame30978.svg",
    caption: "Design detail 06",
  },
  {
    image: "images/b28616675_Frame30979.svg",
    caption: "Design detail 07",
  },
  {
    image: "images/ea0396044_Frame30980.svg",
    caption: "Design detail 08",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function DesignGallery({ slides = DEFAULT_SLIDES }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const paginate = useCallback((newDir) => {
    setDirection(newDir);
    setIndex((prev) => (prev + newDir + slides.length) % slides.length);
  }, [slides]);

  const goTo = useCallback(
    (i) => {
      setDirection(i > index ? 1 : -1);
      setIndex(i);
    },
    [index]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section className="px-6 md:px-12 mb-24 md:mb-36">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div {...fadeUp} className="mb-12">
          <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
            Design Details
          </h2>
          <span className="font-mono text-xs text-[#0A0F1D]/50 mt-2 block">
            Final screens & interactions
          </span>
        </motion.div>

        {/* Carousel */}
        <motion.div {...fadeUp} className="relative">
          <div className="relative overflow-hidden rounded-lg bg-[#F5F5F7] border border-[#E5E7EB]">
            {/* Sizer — maintains container height to prevent layout shifts */}
            <img src={slides[index].image} alt="" aria-hidden="true" className="block w-full h-auto opacity-0" />
            {/* Animated slides — crossfade on top of sizer */}
            <AnimatePresence custom={direction} initial={false} mode="sync">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full"
              >
                <img
                  src={slides[index].image}
                  alt={slides[index].caption}
                  className="w-full h-auto block cursor-pointer"
                  onClick={() => setLightbox(true)}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]"
            aria-label="Previous"
          >
            <ChevronLeft size={20} className="text-[#0A0F1D]" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1]"
            aria-label="Next"
          >
            <ChevronRight size={20} className="text-[#0A0F1D]" />
          </button>
        </motion.div>

        {/* Caption */}
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-6 font-body text-sm text-[#4A5568] text-center md:text-left"
          >
            {slides[index].caption}
          </motion.p>
        </AnimatePresence>

        {/* Dots + counter */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-[#6366F1]" : "w-1.5 bg-[#0A0F1D]/15 hover:bg-[#0A0F1D]/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <span className="font-mono text-xs text-[#0A0F1D]/40">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <ImageLightbox
        src={slides[index].image}
        alt={slides[index].caption}
        isOpen={lightbox}
        onClose={() => setLightbox(false)}
      />
    </section>
  );
}