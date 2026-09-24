import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Work", href: "#work", type: "scroll" },
    { label: "About", href: "#about", type: "scroll" },
    { label: "Contact", href: "#contact", type: "scroll" },
    { label: "CV", href: "/cv", type: "route" },
  ];

  const scrollTo = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#090D16]/80 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-heading font-medium text-[#F8FAFC] tracking-[-0.04em] text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 rounded"
          >
            Cheli Gan Mor
          </button>

          <div className="hidden md:flex items-center gap-10">
            {links.map((l) =>
              l.type === "route" ? (
                <Link
                  key={l.href}
                  to={l.href}
                  className="font-heading text-[14px] font-normal uppercase tracking-[0.06em] text-[#F8FAFC]/60 hover:text-[#3B82F6] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 rounded"
                >
                  {l.label}
                </Link>
              ) : (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="font-heading text-[14px] font-normal uppercase tracking-[0.06em] text-[#F8FAFC]/60 hover:text-[#3B82F6] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 rounded"
                >
                  {l.label}
                </button>
              )
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#090D16] flex flex-col items-center justify-center gap-12 md:hidden border-t border-white/[0.06]"
          >
            {links.map((l) =>
              l.type === "route" ? (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-heading text-4xl font-normal text-[#F8FAFC] tracking-[-0.04em] hover:text-[#3B82F6] transition-colors"
                >
                  {l.label}
                </Link>
              ) : (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="font-heading text-4xl font-normal text-[#F8FAFC] tracking-[-0.04em] hover:text-[#3B82F6] transition-colors"
                >
                  {l.label}
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}