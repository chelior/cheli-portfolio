import React, { useState } from "react";
import { motion } from "framer-motion";
import MonitorMockup from "@/components/portfolio/MonitorMockup";
import ImageLightbox from "@/components/portfolio/ImageLightbox";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
};

export default function BeforeAfterSection({ before, after }) {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <>
      <motion.div {...fadeUp} className="px-6 md:px-12 mb-24 md:mb-36">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#6366F1] tracking-wide uppercase">
                  Before
                </span>
                <span className="font-mono text-xs text-[#0A0F1D]/50">
                  {before.label}
                </span>
              </div>
              <MonitorMockup
                src={before.src}
                alt={before.alt}
                onClick={() =>
                  setLightboxImage({ src: before.src, alt: before.alt })
                }
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-[#6366F1] tracking-wide uppercase">
                  After
                </span>
                <span className="font-mono text-xs text-[#0A0F1D]/50">
                  {after.label}
                </span>
              </div>
              <MonitorMockup
                src={after.src}
                alt={after.alt}
                onClick={() =>
                  setLightboxImage({ src: after.src, alt: after.alt })
                }
              />
            </div>
          </div>
        </div>
      </motion.div>
      <ImageLightbox
        src={lightboxImage?.src}
        alt={lightboxImage?.alt}
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </>
  );
}