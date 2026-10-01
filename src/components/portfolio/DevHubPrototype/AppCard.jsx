import React, { useRef, useState } from "react";
import { C, L, Tag, IconBtn, EllipsisIcon, useClickOutside } from "./bits";

export default function AppCard({ app, onOpen, onDelete, onToast }) {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setMenu(false), menu);

  const titleRef = useRef(null);
  const rowRef = useRef(null);
  const [truncated, setTruncated] = useState(false);
  const [tip, setTip] = useState(false);
  const [tipLeft, setTipLeft] = useState(0);

  const checkTruncation = () => {
    const el = titleRef.current;
    if (el) setTruncated(el.scrollWidth > el.clientWidth + 1);
  };

  const onRowMove = (e) => {
    const row = rowRef.current;
    if (!row) return;
    const r = row.getBoundingClientRect();
    const scale = r.width / row.offsetWidth || 1;
    const x = (e.clientX - r.left) / scale;
    const w = 221;
    setTipLeft(Math.max(0, Math.min(row.offsetWidth - w, x - w / 2)));
  };

  return (
    <div
      className="relative bg-white"
      style={{
        width: 501,
        minHeight: 292,
        padding: 20,
        borderRadius: 8,
        border: `1px solid ${C.fieldBorder}`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        ...L,
      }}
    >
      {/* header */}
      <div className="flex items-center relative" ref={rowRef} onMouseMove={onRowMove} style={{ gap: 8, height: 32 }}>
        <div className="flex-1 min-w-0 relative">
          <div
            ref={titleRef}
            className="truncate cursor-pointer"
            onClick={() => onOpen(app.id)}
            onMouseEnter={() => {
              checkTruncation();
              setTip(true);
            }}
            onMouseLeave={() => setTip(false)}
            style={{ fontSize: 16, lineHeight: "20px", fontWeight: 700, color: C.ink }}
          >
            {app.name}
          </div>
          {tip && truncated && (
            <div
              className="absolute z-30"
              style={{
                bottom: "calc(100% + 6px)",
                left: tipLeft,
                width: 221,
                padding: "11px 12px",
                borderRadius: 5,
                background: C.ink,
                color: "#FFFFFF",
                fontSize: 12,
                lineHeight: "15px",
                fontWeight: 600,
                textAlign: "center",
                filter: "drop-shadow(0px 0px 8px rgba(2, 29, 45, 0.24))",
                pointerEvents: "none",
              }}
            >
              {app.name}
            </div>
          )}
        </div>
        <div className="relative" ref={menuRef}>
          <IconBtn size={24} alt="App actions" onClick={() => setMenu((m) => !m)}>
            <EllipsisIcon />
          </IconBtn>
          {menu && (
            <div
              className="absolute z-30"
              style={{
                right: 0,
                top: "calc(100% + 6px)",
                width: 180,
                background: "#FFFFFF",
                borderRadius: 4,
                border: `1px solid ${C.line}`,
                boxShadow: "0px 3px 16px rgba(204, 204, 204, 0.5)",
                overflow: "hidden",
              }}
            >
              <MenuItem
                onClick={() => {
                  setMenu(false);
                  onOpen(app.id);
                }}
              >
                View or edit details
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setMenu(false);
                  onDelete(app.id);
                }}
              >
                Delete app
              </MenuItem>
            </div>
          )}
        </div>
      </div>

      {/* content: tag + panel */}
      <div className="flex flex-col" style={{ gap: 16 }}>
        <div>
          <Tag flow={app.flow} />
        </div>
        <div style={{ border: `1px solid ${C.line}`, borderRadius: 8, padding: 24 }}>
          <div className="flex" style={{ gap: 24 }}>
            <Value label="Created by" value={app.createdBy} />
            <Value label="Date Created" value={app.date} />
          </div>
          <div style={{ height: 28 }} />
          <div className="flex items-end" style={{ gap: 8 }}>
            <div className="flex-1 min-w-0">
              <LabelTiny>Client ID</LabelTiny>
              <div
                className="flex items-center"
                style={{
                  height: 24,
                  borderRadius: 4,
                  background: C.fieldBg,
                  padding: "0 2px 0 8px",
                  gap: 4,
                }}
              >
                <span className="flex-1 truncate" style={{ fontSize: 14, lineHeight: "16px", color: C.ink }}>
                  {app.clientId}
                </span>
                <IconBtn
                  size={24}
                  alt="Copy client ID"
                  onClick={() => {
                    if (navigator.clipboard) navigator.clipboard.writeText(app.clientId).catch(() => {});
                    onToast && onToast("positive", "Client ID copied.");
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="1.8">
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                  </svg>
                </IconBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center w-full text-left bg-transparent transition-colors hover:bg-[#F6F6F6] active:bg-[#F0F5FF] border-b border-[#EFEFEF] last:border-b-0 focus:outline-none"
      style={{ height: 40, padding: "0 12px", fontSize: 14, lineHeight: "17px", color: C.ink }}
    >
      {children}
    </button>
  );
}

function LabelTiny({ children }) {
  return <div style={{ fontSize: 12, lineHeight: "14px", fontWeight: 700, color: C.ink, marginBottom: 8 }}>{children}</div>;
}

function Value({ label, value }) {
  return (
    <div style={{ width: 198 }}>
      <LabelTiny>{label}</LabelTiny>
      <div
        className="flex items-center"
        style={{ height: 24, borderRadius: 4, background: C.fieldBg, padding: "0 8px", gap: 4 }}
      >
        <span className="flex-1 truncate" style={{ fontSize: 14, lineHeight: "16px", color: C.ink }}>
          {value}
        </span>
      </div>
    </div>
  );
}
