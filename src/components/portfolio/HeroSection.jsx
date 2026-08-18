import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 pt-28 md:pt-36 pb-28 md:pb-36 overflow-hidden bg-white"
    >
      <FloatingShapes springX={springX} springY={springY} />

      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col items-center text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-[#6366F1]/8 rounded-full px-4 py-2 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6366F1] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6366F1]"></span>
          </span>
          <span className="font-mono text-xs text-[#6366F1] uppercase tracking-wide">
            Available for new challenges
          </span>
        </motion.div>

        <h1 className="font-heading font-extrabold text-[#0A0F1D] tracking-[-0.03em] text-[44px] md:text-[80px] lg:text-[96px] leading-[1.05] max-w-[1100px]">
          <Line delay={0.4}>Hi, I'm Cheli Gan Mor,</Line>{" "}
          <Line delay={0.55}>
            <span className="text-[#6366F1]">product designer.</span>
          </Line>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="font-body text-[18px] md:text-[20px] leading-[1.6] text-[#4A5568] max-w-[520px] mt-10"
        >
          Deep listener, relentless problem solver, figuring out the human side
          of complex tech.
        </motion.p>

        {/* Skill tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-12"
        >
          {["AI Tools", "Workflows", "Solutions", "Architecture", "User Research"].map((skill, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.6 + i * 0.1 }}
              whileHover={{ y: -3 }}
              className="font-mono text-xs text-[#0A0F1D]/60 uppercase tracking-wide border border-[#E5E7EB] rounded-full px-4 py-2 hover:border-[#6366F1] hover:text-[#6366F1] transition-colors cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] rounded"
        aria-label="Scroll to work"
      >
        <span className="font-mono text-xs text-[#0A0F1D]/50 uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={16} className="text-[#0A0F1D]/50" />
        </motion.div>
      </motion.button>
    </section>
  );
}

function Line({ children, delay }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  );
}

const SHAPES = [
  { type: "ring", color: "#FF4E7E", top: "14%", left: "8%", size: 60, depth: 1.5 },
  { type: "diamond", color: "#FF4E7E", top: "24%", left: "82%", size: 44, depth: 2 },
  { type: "cross", color: "#FF4E7E", top: "68%", left: "14%", size: 40, depth: 1.2 },
  { type: "zigzag", color: "#6366F1", top: "75%", left: "78%", size: 50, depth: 2.5 },
  { type: "square", color: "#6366F1", top: "42%", left: "90%", size: 36, depth: 1.8 },
  { type: "triangle", color: "#6366F1", top: "52%", left: "6%", size: 28, depth: 2.2 },
  { type: "ring", color: "#FF4E7E", top: "85%", left: "40%", size: 24, depth: 1.5 },
  { type: "diamond", color: "#FF4E7E", top: "10%", left: "48%", size: 28, depth: 2.8 },
];

function FloatingShapes({ springX, springY }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {SHAPES.map((shape, i) => (
        <FloatingShape key={i} shape={shape} index={i} springX={springX} springY={springY} />
      ))}
    </div>
  );
}

function FloatingShape({ shape, index, springX, springY }) {
  const tx = useTransform(springX, (v) => v * shape.depth * 40);
  const ty = useTransform(springY, (v) => v * shape.depth * 40);
  const rot = useTransform(springX, (v) => v * shape.depth * 20);

  const style = { x: tx, y: ty, rotate: rot, position: "absolute", top: shape.top, left: shape.left };

  return (
    <motion.div style={style} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5 + index * 0.08 }}>
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3 + index * 0.3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}>
        <ShapeSVG shape={shape} />
      </motion.div>
    </motion.div>
  );
}

function ShapeSVG({ shape }) {
  const { type, color, size } = shape;

  if (type === "ring") return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="26" stroke={color} strokeWidth="2" />
    </svg>
  );
  if (type === "diamond") return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <rect x="12" y="12" width="36" height="36" stroke={color} strokeWidth="2" transform="rotate(45 30 30)" />
    </svg>
  );
  if (type === "zigzag") return (
    <svg width={size * 1.4} height={size} viewBox="0 0 70 50" fill="none">
      <path d="M5 40 L18 10 L31 40 L44 10 L57 40" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (type === "square") return (
    <svg width={size} height={size} viewBox="0 0 50 50" fill="none">
      <rect x="6" y="6" width="38" height="38" stroke={color} strokeWidth="2" />
    </svg>
  );
  if (type === "cross") return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <path d="M15 5 V25 M5 15 H25" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  if (type === "triangle") return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <path d="M30 8 L52 48 L8 48 Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
  return null;
}