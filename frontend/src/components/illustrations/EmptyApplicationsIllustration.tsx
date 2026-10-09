import React from "react";

export function EmptyApplicationsIllustration({ className = "w-36 h-36" }: { className?: string }) {
  return (
    <div className={`relative select-none flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Soft Background Pill */}
        <ellipse cx="100" cy="110" rx="75" ry="60" fill="#FAF6F8" />
        <circle cx="140" cy="80" r="35" fill="#E6F3F2" />

        {/* Curved Trail */}
        <path
          d="M 40 140 C 70 160, 110 130, 130 90"
          stroke="#006764"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />

        {/* Empty Application Folder */}
        <g transform="translate(55, 60)">
          <rect x="0" y="8" width="90" height="65" rx="6" fill="#DCC5D1" />
          <path
            d="M 0 14 C 0 10, 4 8, 8 8 L 30 8 L 42 16 L 82 16 C 86 16, 90 19, 90 23 L 90 70 C 90 74, 86 74, 82 74 L 8 74 C 4 74, 0 74, 0 70 Z"
            fill="#FFFFFF"
            stroke="#E7DEDF"
            strokeWidth="1.5"
          />
          {/* Magnifying Glass Searching */}
          <circle cx="45" cy="42" r="14" fill="#FAF7F5" stroke="#006764" strokeWidth="2" />
          <line x1="55" y1="52" x2="67" y2="64" stroke="#006764" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="38" y1="42" x2="52" y2="42" stroke="#E47F9C" strokeWidth="2" strokeLinecap="round" />
          <line x1="45" y1="35" x2="45" y2="49" stroke="#E47F9C" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Tiny Floating Paper Plane */}
        <g className="animate-plane" transform="translate(135, 65) scale(0.65)">
          <polygon points="0,0 45,-15 20,25" fill="#FFFFFF" stroke="#006764" strokeWidth="1.5" />
          <polygon points="0,0 45,-15 18,7" fill="#E6F3F2" stroke="#006764" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
