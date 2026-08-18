import React from "react";
import { motion } from "framer-motion";

export default function HeroGif({ size = "default" }) {
  const sizeClass = size === "large" ? "w-48 lg:w-64" : "w-36 lg:w-48";
  return (
    <div className="absolute inset-0 px-6 md:px-12 pointer-events-none">
      <div className="max-w-[1100px] mx-auto relative h-full">
        <motion.img
          src="images/b6679ffe7_Sdarim-chaos-on-fire.gif"
          alt="Chaos on fire"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className={`hidden md:block absolute right-0 bottom-6 ${sizeClass} h-auto rounded-lg`}
        />
      </div>
    </div>
  );
}