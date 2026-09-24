import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
// cubic-bezier(0.16, 1, 0.3, 1) approximated via easeOutExpo for snappy start + smooth decel
// duration 1.2-1.5s per spec, default 1.35s

export default function AnimatedCounter({
  value,
  duration = 1350,
  className = "",
  suffix: suffixProp = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  // Parse numeric target and suffix from value prop
  const raw = String(value);
  const match = raw.match(/^(-?\d+(?:\.\d+)?)(.*)$/);
  // Non-numeric values like "QlikSense" — render static without animation to preserve layout
  const isNumeric = !!match;
  const target = match ? parseFloat(match[1]) : 0;
  const inferredSuffix = match ? match[2] : "";
  const suffix = suffixProp || inferredSuffix;

  const isInteger = Number.isInteger(target);

  useEffect(() => {
    if (!isNumeric || !isInView) return;
    let rafId;
    let start = null;

    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = eased * target;
      setDisplay(isInteger ? Math.round(current) : Math.round(current * 10) / 10);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setDisplay(target);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, duration, isInteger, isNumeric]);

  if (!isNumeric) {
    return (
      <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums", display: "inline-block" }}>
        {raw}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums", display: "inline-block" }}
      aria-live="polite"
    >
      <span style={{ fontVariantNumeric: "tabular-nums" }}>{display}</span>
      {suffix && <span className="inline-block ml-[1px]">{suffix}</span>}
    </span>
  );
}
