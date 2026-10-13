import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ALL_PROJECTS = [
  {
    title: "Redesigning Enterprise User Management: From a Clunky 4-Step Wizard to a Seamless Flow",
    platform: "B2B SaaS Platform",
    slug: "/case-study/user-creation",
    image: "images/user-creation/TM mockup.png",
    accent: "#F17E63",
    tags: ["UX/UI Design", "Modal Flows"],
  },
  {
    title: "Modernizing DevHub: From a Legacy Single-App Tool to a Flexible Developer Portal",
    platform: "Developer Portal",
    slug: "/case-study/dev-hub",
    image: "images/devhub/devhub - my apps.png",
    accent: "#FF4E7E",
    tags: ["Developer Portal", "Design Systems"],
  },
  {
    title: "Sdarim: From Feature Bloat to Intuitive Workflow",
    platform: "Enterprise SaaS Platform",
    slug: "/case-study/sdarim",
    image: "images/sdarim/1.1 Home Page_1x.png",
    accent: "#0077FF",
    tags: ["Enterprise UX", "Information Architecture"],
  },
  {
    title: "InSightec: Uncovering Revenue Leaks Through Data Visualization",
    platform: "Data Visualization Platform",
    slug: "/case-study/insightec",
    image: "images/insightec/Insightech mockup.png",
    accent: "#B47AFF",
    tags: ["Data Visualization", "Analytics"],
  },
];

export default function MoreProjects({ currentSlug }) {
  const projects = ALL_PROJECTS.filter((p) => p.slug !== currentSlug).slice(0, 2);

  return (
    <section className="w-full px-6 md:px-12 py-14 md:py-20 border-t border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-10"
        >
          <h2 className="font-subheading text-[#E2E8F0] text-[26px] md:text-[32px] leading-[1.2] tracking-[-0.02em] mt-0 mb-2">
            More Projects
          </h2>
          <p className="font-body text-[#94A3B8] text-[15px] md:text-[16px] leading-relaxed max-w-[640px]">
            Two more case studies from the same product design practice.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5 max-w-[980px] mx-auto">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={proj.slug}
                style={{ "--accent": proj.accent, "--accent-glow": `${proj.accent}40` }}
                className="group block h-full bg-[#111827] rounded-xl overflow-hidden border border-white/[0.08] hover:border-[var(--accent)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.4),0_0_24px_var(--accent-glow)] hover:scale-[1.01] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                <div className="h-[180px] md:h-[200px] p-4 md:p-5 flex items-center justify-center">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    className="h-full w-full object-contain rounded-2xl border border-white/10 shadow-2xl shadow-black/60 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 flex flex-col gap-1.5">
                  <p className="font-label text-[10px] tracking-widest uppercase" style={{ color: proj.accent }}>
                    {proj.platform}
                  </p>
                  <h3 className="font-heading text-[#E2E8F0] text-[15px] leading-[1.4] tracking-[-0.01em] group-hover:text-white transition-colors">
                    {proj.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-label text-[9px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.06] text-[#94A3B8]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
