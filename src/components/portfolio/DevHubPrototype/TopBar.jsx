import React, { useRef, useState } from "react";
import { C, L, IconBtn, useClickOutside } from "./bits";
import helpUrl from "@/assets/devhub-proto/help-circle.svg";
import avatarUrl from "@/assets/devhub-proto/avatar.svg";

export default function TopBar({ crumbs = ["Apps"], account = "Twitch" }) {
  const [menu, setMenu] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setMenu(false), menu);

  return (
    <div
      className="relative shrink-0 flex items-center justify-between"
      style={{
        height: 64,
        padding: "0 48px",
        background: "#FFFFFF",
        borderBottom: `1px solid ${C.border}`,
        ...L,
      }}
    >
      {/* breadcrumb */}
      <div className="flex items-center gap-[6px] min-w-0">
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2.4">
                <path d="M9 6l6 6-6 6" />
              </svg>
            )}
            <span
              className="truncate"
              style={{
                fontSize: 12,
                lineHeight: "14px",
                fontWeight: 700,
                color: i === crumbs.length - 1 ? C.ink : C.muted,
                maxWidth: 560,
              }}
            >
              {c}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* right side */}
      <div className="flex items-center gap-2">
        <IconBtn src={helpUrl} alt="Help" />
        <button
          type="button"
          className="inline-flex items-center justify-center"
          style={{ ...L, height: 32, padding: "0 12px", borderRadius: 4, fontSize: 14, color: C.ink }}
        >
          {account}
        </button>
        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setMenu((m) => !m)}
            aria-label="Account menu"
            className="flex items-center justify-center focus:outline-none"
            style={{ width: 32, height: 32, padding: 0, border: 0, background: "transparent" }}
          >
            <img src={avatarUrl} alt="" width={32} height={32} />
          </button>
          {menu && <ProfileMenu />}
        </div>
      </div>
    </div>
  );
}

const AVATAR_HEAD =
  "M138.929 64.0842C141.527 64.0842 143.633 61.9781 143.633 59.38C143.633 56.7819 141.527 54.6758 138.929 54.6758C136.331 54.6758 134.224 56.7819 134.224 59.38C134.224 61.9781 136.331 64.0842 138.929 64.0842Z";
const AVATAR_BODY =
  "M135.526 66.5019C136.605 66.0551 137.761 65.8252 138.928 65.8252C140.096 65.8252 141.252 66.0551 142.33 66.5019C143.409 66.9486 144.389 67.6034 145.214 68.4289C146.04 69.2544 146.694 70.2344 147.141 71.3129C147.616 72.4589 147.317 73.5752 146.621 74.3629C145.945 75.1282 144.9 75.5898 143.795 75.5898H134.061C132.956 75.5898 131.912 75.1282 131.235 74.3629C130.539 73.5752 130.241 72.4589 130.715 71.3129C131.162 70.2344 131.817 69.2544 132.642 68.4289C133.468 67.6034 134.448 66.9486 135.526 66.5019Z";
const LOGOUT_TAG1 =
  "M46.9141 167.174L46.4453 166.705C46.3281 166.611 46.3281 166.424 46.4453 166.307L49.0938 163.752L43.2813 163.752C43.1172 163.752 43 163.611 43 163.471V162.814C43 162.65 43.1172 162.533 43.2813 162.533L49.0938 162.533L46.4453 159.955C46.3281 159.838 46.3281 159.65 46.4453 159.557L46.9141 159.088C47.0078 158.971 47.1953 158.971 47.3125 159.088L51.1563 162.932C51.2734 163.049 51.2734 163.213 51.1563 163.33L47.3125 167.174C47.1953 167.291 47.0078 167.291 46.9141 167.174Z";
const LOGOUT_TAG2 =
  "M41.25 169C40.0078 169 39 167.992 39 166.75L39 159.25C39 158.008 40.0078 157 41.25 157H43.2188C43.3594 157 43.5 157.117 43.5 157.281V157.844C43.5 157.984 43.3594 158.125 43.2188 158.125H41.25C40.6172 158.125 40.125 158.617 40.125 159.25L40.125 166.75C40.125 167.359 40.6172 167.875 41.25 167.875L43.2188 167.875C43.3594 167.875 43.5 167.992 43.5 168.156V168.719C43.5 168.859 43.3594 169 43.2188 169L41.25 169Z";

function ProfileMenu() {
  const legal = ["Contact", "Privacy", "Terms of use"];
  return (
    <div
      className="absolute right-0 z-40"
      style={{
        top: 40,
        width: 248,
        boxSizing: "border-box",
        padding: 8,
        gap: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        background: "#FFFFFF",
        borderRadius: 8,
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.15)",
        ...L,
      }}
    >
      {/* diamond caret */}
      <span
        style={{
          position: "absolute",
          width: 13.5,
          height: 6,
          left: 213,
          top: -6,
          background: "#FFFFFF",
          transform: "matrix(-1, 0, 0, 1, 0, 0)",
          zIndex: 2,
        }}
      />

      {/* user details */}
      <div
        style={{
          width: 232,
          height: 105,
          boxSizing: "border-box",
          padding: 16,
          gap: 16,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "stretch",
          background: "#F0F5FF",
          borderRadius: 8,
        }}
      >
        <span
          style={{
            width: 40,
            height: 40,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#D3E1F5",
            borderRadius: 20,
          }}
        >
          <svg width="40" height="40" viewBox="119 45 40 40">
            <path d={AVATAR_HEAD} fill="#1F1F1F" />
            <path d={AVATAR_BODY} fill="#1F1F1F" />
          </svg>
        </span>
        <span style={{ fontSize: 14, lineHeight: "17px", color: C.muted }}>Nadav.somberg@tipalti.com</span>
      </div>

      {/* logout list */}
      <div style={{ width: 232, height: 40, alignSelf: "stretch" }}>
        <button
          type="button"
          className="flex items-center hover:bg-[#F6F6F6] focus:outline-none"
          style={{
            width: 232,
            height: 40,
            minHeight: 40,
            boxSizing: "border-box",
            padding: "7.5px 12px",
            borderRadius: 4,
            background: "transparent",
          }}
        >
          <span
            style={{
              width: 24,
              height: 14,
              boxSizing: "border-box",
              padding: "2px 8px 0 4px",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <svg width="12" height="12" viewBox="39 157 12 12">
              <path d={LOGOUT_TAG1} fill="#021D2D" />
              <path d={LOGOUT_TAG2} fill="#021D2D" />
            </svg>
          </span>
          <span style={{ ...L, fontSize: 14, lineHeight: "17px", color: C.ink, padding: "4px 0" }}>Log out</span>
        </button>
      </div>

      {/* legal */}
      <div style={{ width: 232, height: 48.25, alignSelf: "stretch" }}>
        <div
          style={{
            width: 232,
            height: 28,
            boxSizing: "border-box",
            padding: "12px 12px 4px",
            gap: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            ...L,
            fontSize: 10,
            lineHeight: "12px",
            color: C.muted,
          }}
        >
          {legal.map((t) => (
            <span key={t} style={{ margin: "0 auto" }}>
              {t}
            </span>
          ))}
        </div>
        <div
          style={{
            width: 232,
            height: 20.25,
            boxSizing: "border-box",
            padding: "4px 12px",
            gap: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#FFFFFF",
            ...L,
            fontSize: 10,
            lineHeight: "12px",
            color: C.muted,
          }}
        >
          <span style={{ margin: "0 auto" }}>Tipalti © 2021</span>
          <span style={{ margin: "0 auto" }}>V: 21.1219.240.746</span>
          <span style={{ width: 14, height: 12.25, flexShrink: 0 }} />
        </div>
      </div>
    </div>
  );
}
