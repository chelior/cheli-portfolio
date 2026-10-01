import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const TOPBAR_H = 64;

const V = {
  positive: { bg: "#EEFFF9", border: "#009C63" },
  danger: { bg: "#FFF5F7", border: "#FD2D46" },
};

export default function Toast({ toast, onClose }) {
  const v = V[toast?.kind] || V.positive;

  return (
    <div
      className="absolute left-0 right-0 top-0 z-40 flex items-center justify-center pointer-events-none"
      style={{ height: TOPBAR_H }}
    >
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="flex items-start pointer-events-auto"
            style={{
              boxSizing: "border-box",
              height: 37,
              padding: 8,
              gap: 8,
              background: v.bg,
              border: `1px solid ${v.border}`,
              borderRadius: 4,
              fontFamily: "Lato, sans-serif",
            }}
          >
            <span className="flex items-center justify-center" style={{ width: 20, height: 20, flex: "none" }}>
              <svg width="20" height="20" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="7.5" fill={v.border} />
                {toast.kind === "danger" ? (
                  <path
                    d="M7.3 7.3l5.4 5.4M12.7 7.3l-5.4 5.4"
                    stroke="#fff"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M6.5 10.4l2.4 2.4 4.6-5"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </span>
            <div className="flex items-start" style={{ gap: 4, padding: "2px 0" }}>
              <span
                style={{
                  fontSize: 14,
                  lineHeight: "17px",
                  fontWeight: 400,
                  color: "#021D2D",
                  whiteSpace: "nowrap",
                  paddingRight: 4,
                }}
              >
                {toast.text}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Dismiss notification"
                className="flex items-center justify-center focus:outline-none"
                style={{ width: 16, height: 16, flex: "none" }}
              >
                <svg width="8.27" height="8.27" viewBox="121.866 12.866 8.268 8.268" fill="#231D27">
                  <path d="M129.931 13.0683C130.134 13.2707 130.134 13.5988 129.931 13.8012L126.733 16.9996L129.932 20.1985C130.134 20.4008 130.134 20.729 129.932 20.9314C129.729 21.1338 129.401 21.1338 129.199 20.9314L126 17.7326L122.802 20.9314C122.599 21.1338 122.271 21.1338 122.069 20.9314C121.866 20.729 121.866 20.4008 122.069 20.1985L125.267 16.9996L122.069 13.8012C121.867 13.5988 121.867 13.2707 122.069 13.0683C122.272 12.8659 122.6 12.8659 122.802 13.0683L126 16.2667L129.199 13.0683C129.401 12.8659 129.729 12.8659 129.931 13.0683Z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
