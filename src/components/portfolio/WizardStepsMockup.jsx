import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, ArrowLeft, Maximize2 } from "lucide-react";
import ImageLightbox from "@/components/portfolio/ImageLightbox";

const STEPS = [
  {
    num: "01",
    name: "Profile",
    image: "images/4248f1bef_AddnewuserTM1.png",
  },
  {
    num: "02",
    name: "Roles",
    image: "images/b1c2150d1_AddnewuserTM2.png",
  },
  {
    num: "03",
    name: "Additional Info",
    image: "images/70542a368_AddnewuserTM3.png",
  },
  {
    num: "04",
    name: "Summary",
    image: "images/0ea01fb79_AddnewuserTM4.png",
  },
];

export default function WizardStepsMockup() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="w-full px-4 md:px-8">
      {/* Desktop: 2x2 grid with flow arrows (snake pattern) */}
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] grid-rows-[auto_auto_auto] gap-x-6 gap-y-2 items-center">
        <StepCard step={STEPS[0]} index={0} className="col-start-1 row-start-1" onOpen={() => setLightbox(STEPS[0])} />
        <FlowArrow direction="right" delay={0.3} className="col-start-2 row-start-1" />
        <StepCard step={STEPS[1]} index={1} className="col-start-3 row-start-1" onOpen={() => setLightbox(STEPS[1])} />
        <div className="col-start-3 row-start-2 flex justify-center">
          <FlowArrow direction="down" delay={0.6} />
        </div>
        <StepCard step={STEPS[3]} index={3} className="col-start-1 row-start-3" onOpen={() => setLightbox(STEPS[3])} />
        <FlowArrow direction="left" delay={0.9} className="col-start-2 row-start-3" />
        <StepCard step={STEPS[2]} index={2} className="col-start-3 row-start-3" onOpen={() => setLightbox(STEPS[2])} />
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden space-y-3">
        {STEPS.map((step, i) => (
          <React.Fragment key={i}>
            <StepCard step={step} index={i} onOpen={() => setLightbox(step)} />
            {i < 3 && (
              <div className="flex justify-center py-1">
                <FlowArrow direction="down" delay={i * 0.2} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <ImageLightbox
        src={lightbox?.image}
        alt={lightbox ? `Step ${lightbox.num}: ${lightbox.name}` : ""}
        isOpen={!!lightbox}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
}

function StepCard({ step, index, className, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`flex flex-col ${className || ""}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-xs text-[#6366F1] font-medium">{step.num}</span>
        <span className="font-mono text-xs text-[#0A0F1D]/50 uppercase tracking-wide">{step.name}</span>
      </div>
      <div
        onClick={onOpen}
        className="bg-[#1a1a24] rounded-xl p-1.5 shadow-lg cursor-pointer group relative transition-shadow hover:shadow-xl"
      >
        <div className="aspect-[16/9] rounded-md overflow-hidden bg-[#F5F5F7]">
          <img
            src={step.image}
            alt={`Step ${step.num}: ${step.name}`}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Maximize2 size={14} className="text-[#0A0F1D]" />
        </div>
      </div>
    </motion.div>
  );
}

function FlowArrow({ direction, delay, className }) {
  const icons = { right: ArrowRight, down: ArrowDown, left: ArrowLeft };
  const Icon = icons[direction];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={`flex items-center justify-center ${className || ""}`}
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: delay + 0.5 }}
      >
        <Icon size={20} className="text-[#6366F1]" strokeWidth={2} />
      </motion.div>
    </motion.div>
  );
}