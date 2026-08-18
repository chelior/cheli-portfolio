import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Copy, Check } from "lucide-react";

const EMAIL = "cheliganmor@gmail.com";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.15;
    const dy = (e.clientY - cy) * 0.15;
    setPos({ x: dx, y: dy });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative px-6 md:px-12 py-24 md:py-40 bg-[#FFFFFF]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="font-mono text-sm text-[#0A0F1D]/60 tracking-wide mb-6 md:mb-8">
            Looking for my next role - let's connect.
          </p>

          {/* Magnetic email button */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="inline-block"
          >
            <motion.a
              ref={btnRef}
              href={`mailto:${EMAIL}`}
              animate={{ x: pos.x, y: pos.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="inline-flex items-center gap-3 font-heading font-semibold text-[#0A0F1D] text-2xl md:text-5xl lg:text-6xl tracking-[-0.04em] hover:text-[#6366F1] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] focus-visible:ring-offset-4 rounded"
            >
              {EMAIL}
              <ArrowUpRight className="w-6 h-6 md:w-10 md:h-10" />
            </motion.a>
          </div>

          {/* Copy button */}
          <div className="mt-6">
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 font-mono text-xs text-[#0A0F1D]/50 hover:text-[#6366F1] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] rounded px-2 py-1"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy email"}
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-24 md:mt-32 pt-8 border-t border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-[#0A0F1D]/50">
            © {new Date().getFullYear()} - Designed & Built with intention
          </p>
          <div className="flex items-center gap-8">
            {["LinkedIn", "Read.cv"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-mono text-xs text-[#0A0F1D]/50 hover:text-[#6366F1] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] rounded"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}