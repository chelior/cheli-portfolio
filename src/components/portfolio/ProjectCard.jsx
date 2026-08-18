import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project, index, onOpen }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const isWip = project.wip;

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
      className="group relative"
    >
      <button
        onClick={handleClick}
        onMouseEnter={() => !isWip && setIsHovered(true)}
        onMouseLeave={() => !isWip && setIsHovered(false)}
        className={`w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] focus-visible:ring-offset-4 rounded-lg ${isWip ? "cursor-default" : ""}`}
      >
        {/* Image container */}
        <div className="relative overflow-hidden rounded-xl border border-[#0A0F1D]/10 shadow-lg bg-[#F5F5F7]">
          <div className="aspect-[3/2]">
            {project.composite ? (
              <div className="relative w-full h-full bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={project.composite.desktop}
                  alt={project.title}
                  className="w-full h-full object-contain"
                />
                <img
                  src={project.composite.mobile}
                  alt=""
                  className="absolute right-0 bottom-4 w-32 md:w-48 h-auto object-contain"
                  style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.2))" }}
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-md">
                  <div className="w-3 h-3 rounded-full border-2 border-[#6366F1] border-t-transparent animate-spin" />
                  <span className="font-mono text-[10px] text-[#6366F1] uppercase tracking-wide">In Progress</span>
                </div>
              </div>
            ) : isWip ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#E0E7FF] via-[#F0F4FF] to-[#F5F5F7]">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full border-2 border-[#6366F1]/30 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full border-2 border-[#6366F1] border-t-transparent animate-spin" />
                  </div>
                  <span className="font-mono text-xs text-[#6366F1] uppercase tracking-wide">
                    Work in Progress
                  </span>
                </div>
              </div>
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
            )}
          </div>

          {/* Hover overlay - only for non-WIP */}
          {!isWip && (
            <>
              <motion.div
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-[#0A0F1D]/60 flex flex-col justify-end p-6 md:p-10"
              >
                <div>
                  <p className="font-mono text-xs text-white/60 mb-2 tracking-wide uppercase">
                    {project.problem}
                  </p>
                  <p className="font-body text-white/90 text-[16px] leading-[1.6] max-w-md">
                    {project.solution}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.3 }}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white flex items-center justify-center"
              >
                <ArrowUpRight size={18} className="text-[#0A0F1D]" />
              </motion.div>
            </>
          )}
        </div>

        {/* Meta */}
        <div className="mt-5 flex items-start justify-between">
          <div>
            <h3 className="font-heading font-semibold text-[#0A0F1D] text-[24px] leading-[1.3] tracking-[-0.02em]">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-[#0A0F1D]/60 mt-1 tracking-wide">
              {project.category}
            </p>
          </div>
          {!isWip && (
            <span className="font-mono text-xs text-[#0A0F1D]/50 mt-1">
              {project.year}
            </span>
          )}
        </div>
      </button>
    </motion.article>
  );
}