import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Copy, Check, MessageCircle } from "lucide-react";

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
    <section id="contact" className="relative px-6 md:px-12 py-24 md:py-40 bg-[#090D16] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="font-mono text-sm text-[#F8FAFC]/60 tracking-wide mb-6 md:mb-8">
            Looking for my next role. Let's connect.
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
              className="inline-flex items-center justify-center gap-2 md:gap-3 font-heading font-medium text-[#F8FAFC] text-[32px] sm:text-[40px] md:text-[56px] lg:text-[72px] xl:text-[88px] leading-none tracking-[-0.03em] hover:text-[#3B82F6] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-4 rounded whitespace-nowrap overflow-visible py-4"
            >
              {EMAIL}
              <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9 shrink-0" />
            </motion.a>
          </div>

          {/* Copy button */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 font-mono text-xs text-[#F8FAFC]/50 hover:text-[#3B82F6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded px-2 py-1"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy email"}
            </button>
            <a
              href="https://wa.me/972503301290"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#F8FAFC]/50 hover:text-[#25D366] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] rounded px-2 py-1"
            >
              <MessageCircle size={14} />
              Send on WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-24 md:mt-32 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-[#F8FAFC]/50">
            © {new Date().getFullYear()} - Designed & Built with intention
          </p>
          <div className="flex items-center gap-8">
            <a
              href="https://www.linkedin.com/in/cheliganmor95836b215"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[#F8FAFC]/50 hover:text-[#3B82F6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
            >
              LinkedIn
            </a>
            <Link
              to="/cv"
              className="font-mono text-xs text-[#F8FAFC]/50 hover:text-[#3B82F6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
            >
              Read.cv
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}