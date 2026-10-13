import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Refined dark elevated surface — soft muted slate, subtle border, no harsh white
const CARD_OUTER = "relative overflow-hidden rounded-[20px] border border-white/[0.08] transition-colors duration-300 ease-in-out aspect-[4/3] flex items-center justify-center p-6 md:p-8 lg:p-10 bg-[#161B26]";
const CARD_INNER_PLAIN = "w-[80%] mx-auto overflow-hidden shadow-lg bg-[#0F172A] transition-all duration-500";

export default function ProjectCard({ project, index, onOpen, isDimmed, isActive }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const isWip = project.wip;
  const accent = project.accent || "#3B82F6";
  const dimmed = isDimmed && !isWip;
  const showAccent = (isActive || isHovered) && !isWip;

  const handleClick = () => {
    if (isWip) return;
    if (project.slug) {
      navigate(project.slug);
    } else {
      onOpen(project);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      animate={{ opacity: dimmed ? 0.3 : 1 }}
      className="group relative h-full flex flex-col transition-opacity duration-300"
    >
      <button
        onClick={handleClick}
        onMouseEnter={() => !isWip && setIsHovered(true)}
        onMouseLeave={() => !isWip && setIsHovered(false)}
        className={`w-full h-full flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-4 rounded-lg ${isWip ? "cursor-default" : ""}`}
      >
        {/* Image container — mockup stays 100% visible, no overlay; background tints edge-to-edge */}
        <div
          className={`${CARD_OUTER} ${showAccent ? "border-white/[0.12] shadow-[0_0_28px_rgba(59,130,246,0.18),0_16px_40px_rgba(0,0,0,0.5)] -translate-y-1" : "shadow-[0_8px_24px_rgba(0,0,0,0.35)]"} transition-colors duration-300 ease-in-out`}
          style={{
            backgroundColor: showAccent ? accent : "#161B26",
            borderColor: showAccent ? `${accent}` : `${accent}73`,
            boxShadow: showAccent ? `0 0 28px ${accent}30, 0 16px 40px rgba(0,0,0,0.5)` : "0 8px 24px rgba(0,0,0,0.35)",
          }}
        >
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            {project.composite ? (
              /* InSightec — desktop smaller, mobile fully visible right-down, both transparent */
              <div className="relative w-[78%] md:w-[75%] mx-auto h-full flex items-center justify-center overflow-visible">
                <img
                  src={project.composite.desktop}
                  alt={project.title}
                  className={`w-full h-auto object-contain block transition-transform duration-700 ease-out ${showAccent ? "scale-105" : "scale-100"}`}
                  style={{ filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.25))" }}
                  loading="lazy"
                />
                <img
                  src={project.composite.mobile}
                  alt=""
                  className={`absolute right-0 bottom-0 md:right-1 md:bottom-1 w-[40%] md:w-[36%] h-auto object-contain block transition-transform duration-700 ease-out ${
                    showAccent ? "scale-105" : "scale-100"
                  }`}
                  style={{ filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.32))" }}
                />
              </div>
            ) : isWip ? (
              <div
                className={`w-[80%] h-[80%] mx-auto rounded-xl flex items-center justify-center transition-transform duration-700 ease-out ${showAccent ? "scale-105" : "scale-100"}`}
                style={{ background: showAccent ? "white" : "linear-gradient(135deg, #E0E7FF 0%, #F0F4FF 50%, #F5F5F7 100%)" }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full border-2 border-[#3B82F6]/30 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full border-2 border-[#3B82F6] border-t-transparent animate-spin" />
                  </div>
                  <span className="font-label text-xs text-[#3B82F6] uppercase tracking-wide">Work in Progress</span>
                </div>
              </div>
            ) : project.id === 6 ? (
              /* InSightec — same size as other 3 cards (80% + centered), transparent, no white box */
              <img
                src={project.image}
                alt={project.title}
                className={`w-[80%] mx-auto h-auto object-contain object-center block transition-transform duration-700 ease-out ${
                  showAccent ? "scale-105" : "scale-100"
                }`}
                loading="lazy"
              />
            ) : (
              <div className={`${CARD_INNER_PLAIN} ${showAccent ? "scale-110" : "scale-100"}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-contain block"
                  loading="lazy"
                />
              </div>
            )}
          </div>
          {/* WIP overlay — noticeable but image remains visible */}
          {isWip && (
            <div className="absolute inset-0 bg-[#090D16]/45 backdrop-blur-[1px] flex flex-col items-center justify-center gap-2.5 z-20 rounded-[20px]">
              <span
                className="inline-flex items-center gap-2 text-white font-label text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/20"
                style={{ backgroundColor: accent, boxShadow: `0 4px 16px ${accent}66` }}
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                In Progress
              </span>
              <span className="font-label text-[11px] text-white/70 uppercase tracking-wide">Coming soon</span>
            </div>
          )}
          {/* Title — always visible inside the card, header-style type */}
          {!isWip && (
            <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6 bg-gradient-to-t from-black/85 via-black/45 to-transparent">
              <p className="font-subheading text-white text-[17px] md:text-[19px] lg:text-[21px] leading-[1.25] tracking-[-0.02em]">
                {project.title}
              </p>
            </div>
          )}
        </div>

        {/* Meta — muted gray headers as requested */}
        <div className="mt-4 min-h-[20px] flex items-start justify-between gap-4 w-full">
          <p className="font-label text-[11px] md:text-xs text-[#94A3B8] tracking-wide uppercase flex-1 min-w-0">
            {project.category}
          </p>
          {!isWip && (
            <span className="font-label text-xs font-normal text-[#94A3B8] shrink-0 text-right">
              {project.year}
            </span>
          )}
        </div>
      </button>
    </motion.article>
  );
}
