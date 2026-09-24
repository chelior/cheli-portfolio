import React from "react";
import { motion } from "framer-motion";

// Exactly 3 micro-animations per project, placed in the bottom-right empty white space.
// Each project has a unique arrangement, with 3 distinct sizes (small/medium/large)
// for visual hierarchy, slightly larger than previous for stronger presence,
// absolutely positioned to scatter across the zone without overflowing.

const LAYOUTS = {
  // Large 46, Medium 34, Small 22
  "user-creation": [
    { type: "ring", color: "#FF4E7E", top: "6%", left: "8%", size: 46 },
    { type: "zigzag", color: "#3B82F6", top: "44%", left: "52%", size: 34 },
    { type: "diamond", color: "#FF4E7E", top: "70%", left: "28%", size: 22 },
  ],
  // Large 44, Medium 32, Small 20
  "dev-hub": [
    { type: "square", color: "#3B82F6", top: "8%", left: "62%", size: 44 },
    { type: "ring", color: "#FF4E7E", top: "36%", left: "10%", size: 32 },
    { type: "triangle", color: "#3B82F6", top: "70%", left: "50%", size: 20 },
  ],
  // Large 48, Medium 30, Small 24
  sdarim: [
    { type: "diamond", color: "#FF4E7E", top: "10%", left: "12%", size: 48 },
    { type: "triangle", color: "#3B82F6", top: "40%", left: "66%", size: 30 },
    { type: "cross", color: "#FF4E7E", top: "72%", left: "30%", size: 24 },
  ],
  // Large 48, Medium 32, Small 22
  insightec: [
    { type: "zigzag", color: "#3B82F6", top: "8%", left: "38%", size: 48 },
    { type: "square", color: "#3B82F6", top: "50%", left: "8%", size: 32 },
    { type: "ring", color: "#FF4E7E", top: "68%", left: "64%", size: 22 },
  ],
};

const DEFAULT_SHAPES = LAYOUTS["user-creation"];

export default function CaseStudyHeroShapes({ variant, accent = "#3B82F6" }) {
  const shapes = LAYOUTS[variant] || DEFAULT_SHAPES;
  return (
    <div className="absolute inset-0 px-6 md:px-12 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="max-w-[1100px] mx-auto relative h-full">
        {/* Exactly 3 items scattered across bottom-right zone – no overflow, accent-driven */}
        <div className="hidden md:block absolute right-0 bottom-2 lg:bottom-4 w-[300px] h-[200px] lg:w-[420px] lg:h-[280px] overflow-hidden">
          {shapes.map((shape, i) => (
            <CompactShape key={`${variant}-${i}`} shape={{ ...shape, color: shape.color === "#3B82F6" ? accent : shape.color }} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CompactShape({ shape, index }) {
  return (
    <motion.div
      style={{ position: "absolute", top: shape.top, left: shape.left }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.95, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.35 + index * 0.08 }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3 + index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.15,
        }}
      >
        <ShapeSVG shape={shape} />
      </motion.div>
    </motion.div>
  );
}

function ShapeSVG({ shape }) {
  const { type, color, size } = shape;

  if (type === "ring")
    return (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="26" stroke={color} strokeWidth="2" />
      </svg>
    );
  if (type === "diamond")
    return (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <rect x="12" y="12" width="36" height="36" stroke={color} strokeWidth="2" transform="rotate(45 30 30)" />
      </svg>
    );
  if (type === "zigzag")
    return (
      <svg width={size * 1.4} height={size} viewBox="0 0 70 50" fill="none">
        <path
          d="M5 40 L18 10 L31 40 L44 10 L57 40"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (type === "square")
    return (
      <svg width={size} height={size} viewBox="0 0 50 50" fill="none">
        <rect x="6" y="6" width="38" height="38" stroke={color} strokeWidth="2" />
      </svg>
    );
  if (type === "cross")
    return (
      <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
        <path d="M15 5 V25 M5 15 H25" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  if (type === "triangle")
    return (
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
        <path d="M30 8 L52 48 L8 48 Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  return null;
}
