import React, { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function WorkSection({ projects, onOpenProject }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="work" className="relative px-6 md:px-12 py-16 md:py-20 bg-[#090D16]">
      <div className="max-w-[1100px] mx-auto">
        {/* Section header — aligned with project grid tracks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-10"
        >
          <h2 className="font-subheading text-[#F8FAFC] text-[32px] leading-[1.2] tracking-[-0.02em]">
            Work
          </h2>
        </motion.div>

        {/* Project grid — 2 per row (2 rows), compact so all 4 visible together — spotlight hover */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          onMouseLeave={() => setHoveredId(null)}
        >
          {projects.map((project, i) => (
            <div key={project.id} onMouseEnter={() => setHoveredId(project.id)}>
              <ProjectCard
                project={project}
                index={i}
                onOpen={onOpenProject}
                isDimmed={hoveredId !== null && hoveredId !== project.id}
                isActive={hoveredId === project.id}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}