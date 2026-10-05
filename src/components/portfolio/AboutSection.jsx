import React from "react";
import { motion } from "framer-motion";

const INTERESTS = [
  { image: "images/shared/d436789e1_image.png", caption: "Outdoor lover" },
  { image: "images/shared/209c7f586_image.png", caption: "Always reading" },
  { image: "images/shared/233f92a8c_image.png", caption: "Sunset chaser" },
  { image: "images/shared/cfa292972_image.png", caption: "Forever student" },
];

const BIO = "I'm a product designer with over 4 years of experience. I enjoy untangling messy workflows and turning them into something that works. Outside of design, you'll often find me reading or down some rabbit hole. I love learning new things, and having a full-stack developer partner means tech conversations never stop at the office.";

const currentThinking = [
  "Where will my next workplace be?",
  "Should I start learning to DJ?",
  "What will my next book be?",
  "What will I watch on TV tonight?",
  "Which skills should I strengthen?",
  "Should I start studying numerology?",
  "When will the end of Figma come?",
  "When will AI take over the world?",
];

const IMAGE_FILTER = "contrast(1.08) saturate(0.85)";

export default function AboutSection() {
  return (
    <section id="about" className="relative px-6 md:px-12 py-24 md:py-32 bg-[#0F172A] border-y border-white/[0.06]">
      <div className="max-w-[1000px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-10"
        >
          <h2 className="font-subheading text-[#F8FAFC] text-[32px] leading-[1.2] tracking-[-0.02em]">
            About
          </h2>
        </motion.div>

        {/* Short bio — the section's primary statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 md:mb-24"
        >
          <p style={{ textWrap: "balance" }} className="font-body text-[#F8FAFC]/90 text-[18px] md:text-[20px] leading-[1.6] max-w-[744px]">
            {BIO}
          </p>
        </motion.div>

        {/* Intro text above images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-6 md:mb-8"
        >
          <h3 className="font-label text-xs text-[#3B82F6] tracking-wide uppercase mb-3">
            Beyond the Screen
          </h3>
          <p className="font-body text-[#94A3B8] text-base leading-relaxed max-w-[500px] md:max-w-none md:whitespace-nowrap">
            The little things that keep me curious and calm when I'm away from my desk.
          </p>
        </motion.div>

        {/* Interest grid — photographs, not cards: no hover affordance, nothing is clickable */}
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
            >
              <div className="aspect-square overflow-hidden rounded-lg bg-[#111827] border border-white/[0.08]">
                <img
                  src={interest.image}
                  alt={interest.caption}
                  className="w-full h-full object-cover"
                  style={{ filter: IMAGE_FILTER }}
                  loading="lazy"
                />
              </div>
              <p className="font-body text-[13px] text-[#F8FAFC]/55 mt-3 text-center">
                {interest.caption}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Current Thinking ticker — the one bold element in the section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 md:mt-24 border-t border-white/[0.08] pt-6 md:pt-8 overflow-hidden"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.35)] animate-pulse" />
            <span className="font-label text-xs text-[#F8FAFC]/50 tracking-wide uppercase">
              Currently Thinking About
            </span>
          </div>

          {/* Two identical copies + w-max: translating -50% lands exactly on the seam, so the loop is invisible */}
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex w-max will-change-transform"
          >
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center gap-8 pr-8"
              >
                {currentThinking.map((item, i) => (
                  <span key={i} className="flex items-center gap-8">
                    <span className="font-body text-[15px] md:text-[16px] leading-[1.4] tracking-[-0.015em] text-[#F8FAFC]/75">
                      {item}
                    </span>
                    <span className="text-[#3B82F6]/60 leading-none">•</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
