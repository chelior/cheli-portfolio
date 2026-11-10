import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Copy, Check, MessageCircle } from "lucide-react";

const EMAIL = "cheliganmor@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/cheliganmor95836b215";
const WHATSAPP = "https://wa.me/972503301290";

// Footer palette: near-black, darker than every section above it, so the
// page reads as a lighter sheet lifting off it.
const FOOTER_BG = "#04060B";

/**
 * The one and only footer, shared by every page. It holds the contact CTA
 * (big email, copy, WhatsApp) and the © / LinkedIn / Read.cv row.
 * - The page slides up off the footer: the footer is position:fixed inside a
 *   clip-path wrapper, so it only shows through the wrapper's own box.
 *   If the footer is taller than the screen it falls back to normal flow.
 * - The giant name is scaled to the footer's width; only its top shows, and it
 *   rises as you scroll into the footer.
 */
// `sheetBg` must match the colour of the last section above the footer, so the
// rounded "lip" continues that section instead of showing as a separate band.
export default function SiteFooter({ sheetBg = "#0F172A" }) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const nameRef = useRef(null);
  const wordRef = useRef(null);
  const baselineRef = useRef(null);
  const btnRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [fits, setFits] = useState(true);
  const [copied, setCopied] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  // Wrapper height follows the footer's real height (changes with breakpoints/fonts).
  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const update = () => {
      setHeight(el.offsetHeight);
      setFits(el.offsetHeight <= window.innerHeight);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // Fit the name to the full footer width.
  useEffect(() => {
    const name = nameRef.current;
    const word = wordRef.current;
    if (!name || !word) return;
    const fit = () => {
      name.style.fontSize = "100px";
      const w = word.getBoundingClientRect().width;
      const cs = getComputedStyle(name);
      const avail = name.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      if (w > 0) name.style.fontSize = `${((100 * avail) / w) * 0.97}px`;
      // Cut the box off just above the letters' baseline, so the name sits low on
      // the very bottom edge of the page (the name has no descenders to lose).
      // offsetTop ignores the rise transform, so this measures the resting position.
      const marker = baselineRef.current;
      // Minus a little, so the bottom of the letters sinks just past the edge.
      if (marker) name.style.height = `${marker.offsetTop - parseFloat(name.style.fontSize) * 0.1}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end end"] });
  const rise = useTransform(scrollYProgress, [0, 1], ["70%", "0%"]);

  // Magnetic email link
  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.15,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.15,
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const year = new Date().getFullYear();

  return (
    <div id="contact" className="print:hidden">
      {/* Lip: the bottom edge of the page, rounded and casting a shadow onto the footer */}
      <div
        aria-hidden="true"
        className="relative z-10 h-10 md:h-14 rounded-b-[28px] md:rounded-b-[40px] shadow-[0_28px_60px_rgba(0,0,0,0.55)]"
        style={{ backgroundColor: sheetBg }}
      />

      <div
        ref={wrapRef}
        className="relative -mt-10 md:-mt-14"
        style={fits ? { height, clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" } : undefined}
      >
        <footer
          ref={innerRef}
          className={`${fits ? "fixed bottom-0 left-0 right-0" : "relative"} overflow-hidden text-[#F8FAFC]`}
          style={{ backgroundColor: FOOTER_BG }}
        >
          {/* Contact CTA */}
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-24 md:pt-32 text-center">
            <p className="font-label text-sm text-[#F8FAFC]/70 tracking-wide mb-4 md:mb-6">
              Open for my next role. Let's connect.
            </p>

            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setPos({ x: 0, y: 0 })}
              className="inline-block"
            >
              <motion.a
                ref={btnRef}
                href={`mailto:${EMAIL}`}
                animate={{ x: pos.x, y: pos.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                className="inline-flex items-center justify-center gap-2 md:gap-3 font-heading text-[#F8FAFC] text-[24px] sm:text-[40px] md:text-[56px] lg:text-[72px] leading-none tracking-[-0.02em] hover:text-[#60A5FA] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-4 focus-visible:ring-offset-[#04060B] rounded whitespace-nowrap py-3"
              >
                {EMAIL}
                <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7 lg:w-9 lg:h-9 shrink-0" />
              </motion.a>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 font-label text-xs text-[#F8FAFC]/60 hover:text-[#60A5FA] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] rounded px-2 py-1"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy email"}
              </button>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-label text-xs text-[#F8FAFC]/60 hover:text-[#25D366] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] rounded px-2 py-1"
              >
                <MessageCircle size={14} />
                Send on WhatsApp
              </a>
            </div>
          </div>

          {/* © / links row */}
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-14 md:mt-20 pt-6 border-t border-white/[0.1] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-label text-xs text-[#F8FAFC]/60">
              © {year} - Designed &amp; built by me
            </p>
            <nav className="flex items-center gap-8" aria-label="Footer">
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-xs text-[#F8FAFC]/60 hover:text-[#60A5FA] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] rounded"
              >
                LinkedIn
              </a>
              <Link
                to="/cv"
                className="font-label text-xs text-[#F8FAFC]/60 hover:text-[#60A5FA] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] rounded"
              >
                Read.cv
              </Link>
            </nav>
          </div>

          {/* Giant name: fitted to width, only its top inside the footer, rising on scroll */}
          <div
            ref={nameRef}
            aria-hidden="true"
            className="relative mt-8 md:mt-12 px-3 md:px-6 font-heading leading-none whitespace-nowrap text-center select-none pointer-events-none overflow-hidden text-[#3B82F6]/35"
          >
            <motion.span
              ref={wordRef}
              className="inline-block will-change-transform"
              style={reduceMotion ? undefined : { y: rise }}
            >
              Cheli Gan Mor
              <span ref={baselineRef} className="inline-block w-0 h-0 align-baseline" />
            </motion.span>
          </div>
        </footer>
      </div>
    </div>
  );
}
