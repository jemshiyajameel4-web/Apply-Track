import React from "react";

export function EmptyInterviewsIllustration({ className = "w-36 h-36" }: { className?: string }) {
  return (
    <div className={`relative select-none flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <ellipse cx="100" cy="115" rx="70" ry="55" fill="#F5EEF2" />
        <circle cx="135" cy="75" r="30" fill="#FAF6F8" />

        {/* Calendar Card */}
        <g transform="translate(60, 55)">
          {/* Calendar base */}
          <rect x="0" y="0" width="80" height="75" rx="8" fill="#FFFFFF" stroke="#E7DEDF" strokeWidth="1.5" />
          {/* Top header bar (Mauve) */}
          <path d="M 0 8 C 0 3.5, 3.5 0, 8 0 L 72 0 C 76.5 0, 80 3.5, 80 8 L 80 20 L 0 20 Z" fill="#925775" />
          
          {/* Spiral binding rings */}
          <rect x="16" y="-4" width="4" height="8" rx="2" fill="#143B34" />
          <rect x="38" y="-4" width="4" height="8" rx="2" fill="#143B34" />
          <rect x="60" y="-4" width="4" height="8" rx="2" fill="#143B34" />

          {/* Clock icon inside calendar */}
          <circle cx="40" cy="46" r="15" fill="#FAF7F5" stroke="#006764" strokeWidth="1.5" />
          <polyline points="40,37 40,46 47,46" stroke="#006764" strokeWidth="2" strokeLinecap="round" />
          
          {/* Star accent */}
          <path d="M 62 30 L 64 34 L 68 35 L 64 37 L 62 41 L 60 37 L 56 35 L 60 34 Z" fill="#E47F9C" />
        </g>
      </svg>
    </div>
  );
}
