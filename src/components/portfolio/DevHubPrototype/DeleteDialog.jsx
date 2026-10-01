import React from "react";
import { C, L, Btn, IconBtn } from "./bits";

export default function DeleteDialog({ onCancel, onConfirm }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div
        className="flex flex-col"
        style={{
          width: 268,
          height: 224,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0px 8px 24px rgba(2, 29, 45, 0.24)",
          ...L,
        }}
      >
        <div
          className="flex items-center justify-between shrink-0"
          style={{ height: 50, padding: "0 16px 0 24px", borderBottom: `1px solid ${C.line}` }}
        >
          <span style={{ fontSize: 16, lineHeight: "20px", fontWeight: 700, color: C.ink }}>Delete this app?</span>
          <IconBtn alt="Close" size={28} onClick={onCancel}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#231D27" strokeWidth="1.8">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </IconBtn>
        </div>

        <div style={{ padding: 24, flex: "1 1 auto", minHeight: 0 }}>
          <p style={{ ...L, fontSize: 14, lineHeight: "18px", color: C.ink, margin: 0 }}>
            If you delete this app, you can no longer make API calls with it unless you set it up again.
          </p>
        </div>

        <div
          className="flex items-center justify-end shrink-0"
          style={{ padding: "16px 24px 24px", gap: 16 }}
        >
          <Btn variant="outline" style={{ padding: "0 12px" }} onClick={onCancel}>
            Cancel
          </Btn>
          <Btn style={{ padding: "0 12px" }} onClick={onConfirm}>
            Delete app
          </Btn>
        </div>
      </div>
    </div>
  );
}
