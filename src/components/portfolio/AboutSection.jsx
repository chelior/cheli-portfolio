import React, { useRef } from "react";
import { motion } from "framer-motion";

const INTERESTS = [
  { image: "images/d436789e1_image.png", caption: "OUTDOOR LOVER" },
  { image: "images/209c7f586_image.png", caption: "Always Reading" },
  { image: "images/233f92a8c_image.png", caption: "Sunset Chaser" },
  { image: "images/cfa292972_image.png", caption: "FOREVER STUDENT" },
];

const BIO = "I'm a product designer with over 4 years of experience. I enjoy untangling messy workflows and turning them into clean, structured, and intuitive solutions. Outside of design, you'll often find me reading and diving deep into topics that just feed my curiosity and soul. I love learning new things constantly, and having a full-stack developer partner means tech conversations never really stop at the office.";

const currentThinking = [
  "Where AI is heading next",
  "My next travel destination",
  "How the book I'm reading ends",
  "When to stick to standards vs. innovating",
  "AI-Assisted Design Tools",
  "Explaining my job to my family",
  "What to watch on TV tonight",
  "Edge cases and error states",
  "Where I see myself in 5 years",
  "Double-checking the flow so nothing breaks",
  "Accessibility Automation",
  "My next investment move",
];

const IMAGE_FILTER = "contrast(1.08) saturate(0.85)";

export default function AboutSection() {
  const tickerRef = useRef(null);

  return (
    <section id="about" className="relative px-6 md:px-12 py-24 md:py-32 bg-[#E0E7FF]">
      <div className="max-w-[1000px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
            About
          </h2>
        </motion.div>

        {/* Short bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 md:mb-24"
        >
          <p style={{ textWrap: "balance" }} className="font-body text-[#0A0F1D]/80 text-[18px] md:text-[20px] leading-[1.6] max-w-[744px]">
            {BIO}
          </p>
        </motion.div>

        {/* Intro text above images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-10"
        >
          <h3 className="font-mono text-xs text-[#6366F1] tracking-wide uppercase mb-3">
            Beyond the Screen
          </h3>
          <p className="font-body text-[#4A5568] text-base leading-relaxed max-w-[500px]">
            The little things that fuel my curiosity, creativity, and calm when I'm away from my desk.
          </p>
        </motion.div>

        {/* Interest grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {INTERESTS.map((interest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="group"
            >
              <div className="aspect-square overflow-hidden rounded-lg bg-[#F5F5F7] border border-[#0A0F1D]/5">
                <img
                  src={interest.image}
                  alt={interest.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  style={{ filter: IMAGE_FILTER }}
                  loading="lazy"
                />
              </div>
              <p className="font-mono text-xs text-[#0A0F1D]/60 mt-3 text-center uppercase tracking-wide">
                {interest.caption}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Current Thinking ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 md:mt-28 border-t border-[#0A0F1D]/10 pt-6 overflow-hidden"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse" />
            <span className="font-mono text-xs text-[#0A0F1D]/50 tracking-wide uppercase">
              Currently Thinking About
            </span>
          </div>
          <div ref={tickerRef} className="relative overflow-hidden h-7">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-8 absolute whitespace-nowrap"
            >
              {[...currentThinking, ...currentThinking, ...currentThinking].map((item, i) => (
                <span key={i} className="flex items-center gap-8">
                  <span className="font-body text-sm text-[#0A0F1D]/50">{item}</span>
                  <span className="text-[#0A0F1D]/20">•</span>
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}