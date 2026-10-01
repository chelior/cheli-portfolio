import React, { useState, useEffect, useRef } from "react";
import plusUrl from "@/assets/devhub-proto/plus.svg";
import copyUrl from "@/assets/devhub-proto/copy.svg";
import ellipsisUrl from "@/assets/devhub-proto/ellipsis.svg";
import checkedUrl from "@/assets/checkbox/checked.svg";

export const C = {
  ink: "#021D2D",
  muted: "#6D7275",
  link: "#6780FF",
  yellow: "#FFBC00",
  yellowHover: "#F0B000",
  yellowActive: "#E08E00",
  border: "#E1E7EA",
  line: "#E4E4E4",
  fieldBorder: "#BAC1C5",
  fieldBg: "#F5F7F8",
  placeholder: "#808D95",
  hoverBg: "#F5F7F8",
};

export const L = { fontFamily: "Lato, system-ui, sans-serif" };

const BTN_BASE =
  "inline-flex items-center justify-center gap-[4px] leading-none whitespace-nowrap select-none transition-colors duration-150 focus:outline-none";

const BTN_BG = {
  primary: "bg-[#FFBC00] hover:bg-[#F0B000] active:bg-[#E08E00]",
  outline: "bg-white hover:bg-[#F9FAFB] active:bg-[#EEF1F3]",
  subtle: "bg-white hover:bg-[#F5F7F8] active:bg-[#EEF1F3]",
};

export function Btn({ variant = "primary", icon, children, className = "", style, ...rest }) {
  const border =
    variant === "outline"
      ? `1px solid ${C.ink}`
      : variant === "subtle"
      ? `1px solid ${C.fieldBorder}`
      : "1px solid transparent";
  return (
    <button
      type="button"
      className={`${BTN_BASE} ${BTN_BG[variant] || BTN_BG.primary} ${className}`}
      style={{
        ...L,
        height: 32,
        minWidth: 60,
        padding: "7px 12px",
        borderRadius: 4,
        fontSize: 14,
        lineHeight: "17px",
        fontWeight: 400,
        color: C.ink,
        border,
        ...style,
      }}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}

export function IconBtn({ size = 32, src, alt = "", children, className = "", style, ...rest }) {
  return (
    <button
      type="button"
      aria-label={alt}
      className={`inline-flex items-center justify-center shrink-0 transition-colors duration-150 bg-transparent hover:bg-[rgba(225,231,234,0.45)] active:bg-[#E1E7EA] disabled:pointer-events-none focus:outline-none ${className}`}
      style={{ width: size, height: size, borderRadius: 4, ...style }}
      {...rest}
    >
      {src ? <img src={src} alt="" width={size <= 24 ? 16 : 20} height={size <= 24 ? 16 : 20} /> : children}
    </button>
  );
}

export const fieldStyle = {
  height: 32,
  padding: "0 4px 0 12px",
  borderRadius: 4,
  fontSize: 14,
  lineHeight: "16px",
  color: C.ink,
  background: "#fff",
  boxSizing: "border-box",
  fontFamily: L.fontFamily,
};

export const fieldCls = (invalid = false) =>
  invalid
    ? "outline-none placeholder:text-[#6D7275] shadow-[inset_0_0_0_1px_#FF4747] focus:shadow-[inset_0_0_0_2px_#21308D]"
    : "outline-none placeholder:text-[#6D7275] shadow-[inset_0_0_0_1px_#BAC1C5] hover:shadow-[inset_0_0_0_1px_#4D62D3] focus:shadow-[inset_0_0_0_2px_#21308D]";

export const ddMenuStyle = {
  background: "#fff",
  border: "1px solid #E4E4E4",
  borderRadius: 4,
  boxShadow: "0px 3px 16px rgba(204, 204, 204, 0.5)",
};

export const ddRowCls = (selected) =>
  selected ? "bg-[#F0F5FF]" : "hover:bg-[#F6F6F6]";

export const ddRowStyle = {
  height: 40,
  padding: "7.5px 12px",
  gap: 8,
  borderBottom: "1px solid #EFEFEF",
};

export function CheckBoxBox({ checked }) {
  return checked ? (
    <img src={checkedUrl} alt="" width={16} height={16} className="block shrink-0" />
  ) : (
    <span
      className="block shrink-0"
      style={{ width: 16, height: 16, borderRadius: 2, border: "1.5px solid #808D95", background: "#fff" }}
    />
  );
}

export function Tag({ flow }) {
  const auth = flow === "Authorization code flow";
  return (
    <span
      className="inline-flex items-center justify-center"
      style={{
        ...L,
        height: 24,
        padding: "0 8px",
        borderRadius: 4,
        fontSize: 12,
        lineHeight: "14px",
        fontWeight: 400,
        background: auth ? "#CFDFFF" : "#D2F1FB",
        color: auth ? "#21308D" : "#2F4F82",
        whiteSpace: "nowrap",
      }}
    >
      {flow}
    </span>
  );
}

export function Label({ children, link, onLink }) {
  return (
    <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
      <span style={{ ...L, fontSize: 12, lineHeight: "14px", fontWeight: 700, color: C.ink }}>{children}</span>
      {link && (
        <button
          type="button"
          onClick={onLink}
          className="inline-flex items-center gap-1 hover:underline focus:outline-none"
          style={{ ...L, fontSize: 12, lineHeight: "14px", color: C.link }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
          </svg>
          More info
        </button>
      )}
    </div>
  );
}

export function TextInput({ value, onChange, placeholder, invalid, mono, className = "", style, ...rest }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full ${fieldCls(invalid)} ${className}`}
      style={{ ...fieldStyle, fontFamily: mono ? "Lato, ui-monospace, monospace" : L.fontFamily, ...style }}
      {...rest}
    />
  );
}

export function FieldBox({ value, mono, onCopy, onReveal, revealable, revealed }) {
  return (
    <div
      className="flex items-center"
      style={{
        height: 32,
        borderRadius: 4,
        background: C.fieldBg,
        padding: "0 4px 0 12px",
        gap: 4,
        overflow: "hidden",
      }}
    >
      <span
        className="flex-1 truncate"
        style={{ ...L, fontSize: 14, lineHeight: "16px", color: C.ink, fontFamily: mono ? "Lato, monospace" : L.fontFamily }}
      >
        {revealed ? value : mono ? "••••••••••••" : value}
      </span>
      {onCopy && <IconBtn size={24} src={copyUrl} alt="Copy" onClick={onCopy} />}
      {revealable && (
        <IconBtn size={24} alt={revealed ? "Hide" : "Show"} onClick={onReveal}>
          {revealed ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="1.8">
              <path d="M2 2l20 20" />
              <path d="M6.7 6.7C4.6 8.1 3 10 2 12c2 4 6 7 10 7 2 0 3.8-.6 5.3-1.6" />
              <path d="M9.9 5.2A10 10 0 0 1 12 5c4 0 8 3 10 7-.7 1.4-1.7 2.7-2.9 3.8" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="1.8">
              <path d="M2 12c2-4 6-7 10-7s8 3 10 7c-2 4-6 7-10 7s-8-3-10-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </IconBtn>
      )}
    </div>
  );
}

export function Checkbox({ checked, onChange, children, className = "" }) {
  return (
    <label className={`flex items-start gap-[10px] cursor-pointer select-none ${className}`}>
      <span
        onClick={(e) => {
          e.preventDefault();
          onChange && onChange(!checked);
        }}
        className="shrink-0 flex items-center justify-center"
        style={{ marginTop: 1 }}
      >
        <CheckBoxBox checked={checked} />
      </span>
      <span style={{ ...L, fontSize: 13, lineHeight: "18px", color: C.ink }}>{children}</span>
    </label>
  );
}

export function Radio({ checked, onChange, children }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center gap-[10px] focus:outline-none"
      style={{ ...L, fontSize: 14, lineHeight: "18px", color: C.ink }}
    >
      <span className="shrink-0 block" style={{ width: 16, height: 16 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="7.25" stroke={checked ? C.ink : C.fieldBorder} strokeWidth="1.5" />
          {checked && <circle cx="8" cy="8" r="4" fill={C.ink} />}
        </svg>
      </span>
      {children}
    </button>
  );
}

export function Panel({ title, count, right, children, className = "" }) {
  return (
    <div className={`bg-white ${className}`} style={{ border: `1px solid ${C.border}`, borderRadius: 8 }}>
      <div
        className="flex items-center justify-between"
        style={{ padding: "13px 24px", borderBottom: `1px solid ${C.border}` }}
      >
        <span style={{ ...L, fontSize: 15, lineHeight: "20px", fontWeight: 700, color: C.ink }}>
          {title}
          {count != null && ` (${count})`}
        </span>
        <div className="flex items-center gap-4">{right}</div>
      </div>
      <div style={{ padding: "16px 24px" }}>{children}</div>
    </div>
  );
}

export function ReadMore() {
  return (
    <button type="button" className="hover:underline focus:outline-none" style={{ ...L, fontSize: 13, color: C.link }}>
      Read more
    </button>
  );
}

export function useClickOutside(ref, onOut, active = true) {
  useEffect(() => {
    if (!active) return;
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onOut();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [ref, onOut, active]);
}

export function EllipsisIcon() {
  return <img src={ellipsisUrl} alt="" width={16} height={16} />;
}

export { plusUrl, copyUrl, ellipsisUrl, checkedUrl };
