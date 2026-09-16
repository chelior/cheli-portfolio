import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Single dedicated class — how it was previously for the 3 correct cards (User Creation / DevHub / Sdarim)
// No browser chrome / Apple navbar, plain raw images, same sizing/margins/micro-animations for all 4
const CARD_OUTER = "relative overflow-hidden rounded-[20px] border transition-all duration-500 aspect-[4/3] flex items-center justify-center p-6 md:p-8 lg:p-10";
const CARD_INNER_PLAIN = "w-[80%] mx-auto overflow-hidden shadow-lg bg-white transition-all duration-500";

export default function ProjectCard({ project, index, onOpen, isDimmed, isActive }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const isWip = project.wip;
  const accent = project.accent || "#6366F1";
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
        className={`w-full h-full flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] focus-visible:ring-offset-4 rounded-lg ${isWip ? "cursor-default" : ""}`}
      >
        {/* Image container — SINGLE class for all 4, plain images, no device/browser frames */}
        <div
          className={CARD_OUTER}
          style={{
            backgroundColor: showAccent ? accent : "#FFFFFF",
            borderColor: showAccent ? accent : "rgba(10,15,29,0.08)",
            boxShadow: showAccent ? `0 20px 40px -12px ${accent}40` : "0 4px 20px -4px rgba(10,15,29,0.08)",
          }}
        >
          {/* Hover — full descriptive title (larger + bolder) */}
          {showAccent && !isWip && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10 pointer-events-none"
              style={{ background: `linear-gradient(to top, ${accent} 0%, ${accent}F0 65%, transparent 100%)` }}
            >
              <p className="font-heading font-medium text-white text-[16px] md:text-[18px] leading-[1.3] tracking-[-0.01em] line-clamp-3">
                {project.title}
              </p>
            </motion.div>
          )}
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            {project.composite ? (
              /* InSightec — same outer/padding as others, desktop starts same top but is taller and clipped at card bottom (no overflow outside) */
              <div className="relative w-[80%] mx-auto h-full flex items-center justify-center">
                <div className={`${CARD_INNER_PLAIN} w-full flex flex-col overflow-hidden ${showAccent ? "scale-110" : "scale-100"}`}>
                  <img
                    src={project.composite.desktop}
                    alt={project.title}
                    className={`w-full h-auto object-cover object-top block transition-transform duration-700 ease-out ${showAccent ? "scale-110" : "scale-100"}`}
                    loading="lazy"
                  />
                </div>
                <img
                  src={project.composite.mobile}
                  alt=""
                  className={`absolute -right-1 -bottom-1 w-[30%] md:w-[32%] h-auto object-contain block transition-transform duration-700 ease-out ${
                    showAccent ? "scale-110" : "scale-100"
                  }`}
                  style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.2))" }}
                />
              </div>
            ) : isWip ? (
              <div
                className={`w-[80%] h-[80%] mx-auto rounded-xl flex items-center justify-center transition-transform duration-700 ease-out ${showAccent ? "scale-105" : "scale-100"}`}
                style={{ background: showAccent ? "white" : "linear-gradient(135deg, #E0E7FF 0%, #F0F4FF 50%, #F5F5F7 100%)" }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full border-2 border-[#6366F1]/30 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full border-2 border-[#6366F1] border-t-transparent animate-spin" />
                  </div>
                  <span className="font-mono text-xs text-[#6366F1] uppercase tracking-wide">Work in Progress</span>
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
        </div>

        {/* Meta — uniform height */}
        <div className="mt-4 h-[64px] flex items-start justify-between gap-4 w-full">
          <div className="flex-1 min-w-0">
            <h3 className="font-subheading font-medium text-[#0A0F1D] text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.02em] truncate">
              {project.shortTitle || project.title}
            </h3>
            <p className="font-mono text-[11px] md:text-xs text-[#0A0F1D]/60 mt-1 tracking-wide uppercase">
              {project.category}
            </p>
          </div>
          {!isWip && (
            <span className="font-mono text-xs font-normal text-[#0A0F1D]/50 shrink-0 mt-1 ml-auto text-right">
              {project.year}
            </span>
          )}
        </div>
      </button>
    </motion.article>
  );
}
