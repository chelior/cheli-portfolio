import React from "react";
import sidebarOpenUrl from "@/assets/devhub-proto/sidebar-open.svg";
import sidebarClosedUrl from "@/assets/devhub-proto/sidebar-closed.svg";

export const SIDEBAR_W = 256;
export const SIDEBAR_W_CLOSED = 66;

export default function Sidebar({ collapsed, onToggle, onHome }) {
  const w = collapsed ? SIDEBAR_W_CLOSED : SIDEBAR_W;
  return (
    <div className="relative shrink-0 h-full" style={{ width: w, background: "#1C2547" }}>
      <img
        src={collapsed ? sidebarClosedUrl : sidebarOpenUrl}
        alt=""
        width={w}
        height={1080}
        className="block select-none pointer-events-none"
        draggable={false}
      />
      {/* collapse / expand hotspot — header right */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
        className="absolute focus:outline-none"
        style={{ top: 0, right: 0, width: collapsed ? w : 64, height: 88, background: "transparent" }}
      />
      {/* "Apps" tab hotspot — returns to the apps list */}
      {!collapsed && (
        <button
          type="button"
          onClick={onHome}
          aria-label="Apps"
          className="absolute focus:outline-none"
          style={{ left: 20, top: 92, width: 216, height: 48, background: "transparent" }}
        />
      )}
    </div>
  );
}
