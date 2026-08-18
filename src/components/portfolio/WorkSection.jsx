import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function WorkSection({ projects, onOpenProject }) {
  return (
    <section id="work" className="relative px-6 md:px-12 py-24 md:py-32 bg-[#FFFFFF]">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="font-heading font-bold text-[#0A0F1D] text-[32px] leading-[1.2] tracking-[-0.02em]">
            Selected Work
          </h2>
          <span className="font-mono text-xs text-[#0A0F1D]/50 mt-2 block">
            {String(projects.length).padStart(2, "0")} Projects
          </span>
        </motion.div>

        {/* Project grid — staggered */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-x-8 md:gap-y-16">
          {projects.map((project, i) => (
            <div key={project.id} className={i % 2 === 1 ? "md:mt-16" : ""}>
              <ProjectCard
                project={project}
                index={i}
                onOpen={onOpenProject}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}