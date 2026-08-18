import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, MessageCircle } from "lucide-react";

export default function ContactModal({ isOpen, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-[#0A0F1D]/40 hover:text-[#0A0F1D] transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <h3 className="font-heading font-bold text-[#0A0F1D] text-2xl tracking-[-0.02em] mb-2">
              Get in Touch
            </h3>
            <p className="font-body text-[#4A5568] text-sm mb-8">
              Choose how you'd like to reach me.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:cheliganmor@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#6366F1] hover:bg-[#6366F1]/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] group-hover:bg-[#6366F1] group-hover:text-white transition-all">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-heading font-semibold text-[#0A0F1D] text-sm">Email</p>
                  <p className="font-mono text-xs text-[#0A0F1D]/60">cheliganmor@gmail.com</p>
                </div>
              </a>
              <a
                href="https://wa.me/972503301290"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <p className="font-heading font-semibold text-[#0A0F1D] text-sm">WhatsApp / Phone</p>
                  <p className="font-mono text-xs text-[#0A0F1D]/60">+972 50-330-1290</p>
                </div>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}