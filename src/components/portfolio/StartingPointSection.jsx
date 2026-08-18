import React, { useState } from "react";
import { motion } from "framer-motion";
import ImageLightbox from "@/components/portfolio/ImageLightbox";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

const FRAME_CLASS = "bg-[#1a1a24] rounded-xl p-1.5 shadow-lg cursor-pointer";

export default function StartingPointSection({
  images = [],
  title = "The Starting Point",
  subtitle = "The original interface before the redesign",
}) {
  const [lightbox, setLightbox] = useState({ open: false, src: "", alt: "" });

  return (
    <section className="px-6 md:px-12 mb-24 md:mb-36">
      <div className="max-w-[1100px] mx-auto">
        <motion.div {...fadeUp} className="mb-12">
          <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
            {title}
          </h2>
          <span className="font-mono text-xs text-[#0A0F1D]/50 mt-2 block">
            {subtitle}
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
            >
              <div
                className={FRAME_CLASS}
                onClick={() => setLightbox({ open: true, src: img.src, alt: img.alt })}
              >
                <img src={img.src} alt={img.alt} className="w-full h-auto block rounded-md" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <ImageLightbox
        src={lightbox.src}
        alt={lightbox.alt}
        isOpen={lightbox.open}
        onClose={() => setLightbox({ ...lightbox, open: false })}
      />
    </section>
  );
}