import React, { useState, useRef, useCallback } from "react";

export default function BeforeAfterSlider({ beforeImage, afterImage, beforeAlt = "Before", afterAlt = "After" }) {
  const containerRef = useRef(null);
  const [percentage, setPercentage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const updatePercentage = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPercentage(pct);
  }, []);

  const handleMouseMove = (e) => {
    updatePercentage(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) updatePercentage(e.touches[0].clientX);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);

  // Support click/touch to set position immediately
  const handleClick = (e) => updatePercentage(e.clientX);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1024px] mx-auto rounded-xl border border-white/[0.08] shadow-lg bg-[#111827] select-none group overflow-hidden"
      style={{ width: "100%", height: "auto", boxSizing: "border-box" }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      role="slider"
      aria-valuenow={Math.round(percentage)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Before after comparison"
    >
      {/* Before image — natural aspect, fully visible, defines container height; contain prevents cropping */}
      <img
        src={typeof beforeImage === "string" ? beforeImage : beforeImage?.src}
        alt={typeof beforeImage === "string" ? beforeAlt : beforeImage?.alt || beforeAlt}
        className="w-full h-auto block"
        style={{ width: "100%", height: "auto", objectFit: "contain", objectPosition: "center top", backgroundColor: "#111827", boxSizing: "border-box" }}
        draggable={false}
        loading="eager"
        decoding="async"
      />

      {/* After image — on top, clipped — same bounding box, contain ensures no header/sidebar/bottom cutoff */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${100 - percentage}% 0 0)`, overflow: "hidden", boxSizing: "border-box" }}
      >
        <img
          src={typeof afterImage === "string" ? afterImage : afterImage?.src}
          alt={typeof afterImage === "string" ? afterAlt : afterImage?.alt || afterAlt}
          className="absolute inset-0 w-full h-full block"
          style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center top", backgroundColor: "#111827", boxSizing: "border-box" }}
          draggable={false}
          loading="eager"
          decoding="async"
        />
        {/* After pill clipped with After layer — only visible inside revealed area (Option A) */}
        <span
          className="absolute bottom-3 right-3 bg-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.25)] text-white font-label text-[11px] tracking-wide uppercase px-3 py-1 rounded-full pointer-events-none shadow-md"
          style={{ opacity: percentage > 5 ? 1 : 0, transition: "opacity 150ms" }}
        >
          After
        </span>
      </div>

      {/* Vertical divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-[#111827] shadow-[0_0_8px_rgba(0,0,0,0.3)] pointer-events-none"
        style={{ left: `${percentage}%` }}
      />

      {/* Circular drag indicator */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#111827] shadow-lg border border-white/[0.08] flex items-center justify-center pointer-events-none transition-transform duration-100"
        style={{ left: `${percentage}%`, transform: `translate(-50%, -50%) ${isDragging ? "scale(1.1)" : "scale(1)"}` }}
      >
        <div className="flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#F8FAFC]/60">
            <path d="M4 2 L0 6 L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#F8FAFC]/60">
            <path d="M8 2 L12 6 L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Pill tags — synchronized with reveal (Option A + B): clipped with layers + fade */}
      <div className="absolute bottom-3 left-3 bg-[#0A0F1D]/80 backdrop-blur-sm text-white font-label text-[11px] tracking-wide uppercase px-3 py-1 rounded-full pointer-events-none transition-opacity duration-150" style={{ opacity: percentage < 95 ? 1 : 0 }}>
        Before
      </div>
      {/* After pill is already inside After layer above with clip + opacity; keep a fallback here for <5% hide is handled inside After layer */}

      {/* Invisible range input for accessibility */}
      <input
        type="range"
        min={0}
        max={100}
        value={percentage}
        onChange={(e) => setPercentage(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        aria-label="Reveal after image"
      />
    </div>
  );
}
