import React from "react";

export default function MonitorMockup({ src, alt, onClick }) {
  return (
    <div className="w-full">
      <img
        src={src}
        alt={alt}
        onClick={onClick}
        className={`w-full h-auto object-contain block rounded-lg border border-border ${onClick ? "cursor-pointer" : ""}`}
      />
    </div>
  );
}