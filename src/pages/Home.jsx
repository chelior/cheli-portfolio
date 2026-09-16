import React, { useState } from "react";
import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import WorkSection from "@/components/portfolio/WorkSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ContactSection from "@/components/portfolio/ContactSection";
import ProjectLightbox from "@/components/portfolio/ProjectLightbox";

const PROJECTS = [
  {
    id: 1,
    title: "How I Streamlined and Shortened the User Creation Process",
    shortTitle: "User Creation",
    slug: "/case-study/user-creation",
    category: "B2B SaaS - UX/UI Design",
    year: "2026",
    image: "images/user-creation/TM mockup.png",
    accent: "#F17E63",
    problem: "A bloated 4-step wizard modal causing drop-offs and high cognitive load.",
    solution: "A single-screen dynamic modal with progressive disclosure - flattening 4 steps into 1 frictionless flow.",
    impact: "Eliminated drop-offs, improved consistency with platform patterns, and reduced cognitive load for admins.",
  },
  {
    id: 2,
    title: "Modernizing DevHub: From a Legacy Single-App Tool to a Flexible Developer Portal",
    shortTitle: "DevHub",
    slug: "/case-study/dev-hub",
    category: "B2B SaaS - Developer Portal",
    year: "2025",
    image: "images/devhub/devhub - my apps.png",
    accent: "#FF4E7E",
    problem: "A rigid, legacy single-app, single-user tool that couldn't scale with Tipalti's growing client base.",
    solution: "Rebuilt DevHub on Tipalti's modern Design System with multi-tenant support, a global context switcher, and self-service API testing.",
    impact: "27% time-to-market savings, cutting development effort by 35 dev days (from 168 to 133) while delivering a vastly superior UX.",
  },
  {
    id: 5,
    title: "Sdarim: From Feature Bloat to Intuitive Workflow",
    shortTitle: "Sdarim",
    slug: "/case-study/sdarim",
    category: "B2B/Enterprise SaaS - UX/UI Design",
    year: "2023",
    image: "images/sdarim/1.1 Home Page_1x.png",
    accent: "#0077FF",
    problem: "A cluttered, uncharacterized 4-year-old enterprise platform with severe feature bloat and hidden power features.",
    solution: "Redesigned with text-first navigation, dual-path onboarding, master-details model, and a modern aesthetic while keeping all existing functionality.",
    impact: "Reduced cognitive load for non-tech-savvy users, uncovered hidden features, and transformed a confusing system into an intuitive workflow.",
  },
  {
    id: 6,
    title: "InSightec: Uncovering Revenue Leaks Through Data Visualization",
    shortTitle: "InSightec",
    slug: "/case-study/insightec",
    category: "B2B/Enterprise SaaS - UX/UI & Data Visualization",
    year: "2022",
    image: "images/insightec/Insightech mockup.png",
    composite: {
      desktop: "images/insightec/e970e184d_INSIGHTCHDESKTOPMOCKUP.png",
      mobile: "images/insightec/05f6d6da5_insightechiphoneMOCKUP.png",
    },
    accent: "#B47AFF",
    problem: "A complex medical equipment sales analytics platform with audience mismatch, hidden revenue leaks, and visual clutter overwhelming non-analyst users.",
    solution: "Separated the experience into dual-audience dashboards, visualized revenue leaks with gap analysis, and optimized complex multi-dimensional data within platform constraints.",
    impact: "Surfaced unrealized service revenue streams and delivered executive clarity alongside analyst-level investigation tools.",
  },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <HeroSection />
      <WorkSection
        projects={PROJECTS}
        onOpenProject={setSelectedProject}
      />
      <AboutSection />
      <ContactSection />
      <ProjectLightbox
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}