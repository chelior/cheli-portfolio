import React from "react";

export default function MonitorMockup({ src, alt, onClick }) {
  return (
    <div className="w-full">
      <div className="bg-[#1a1a24] rounded-xl p-1.5 shadow-2xl">
        <img
          src={src}
          alt={alt}
          onClick={onClick}
          className={`w-full h-auto block rounded-md ${onClick ? "cursor-pointer" : ""}`}
        />
      </div>
      <div className="mx-auto w-10 h-5 bg-[#1a1a24]" />
      <div className="mx-auto w-36 h-2.5 bg-[#1a1a24] rounded-b-xl" />
    </div>
  );
}