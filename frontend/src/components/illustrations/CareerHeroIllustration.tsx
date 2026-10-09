import React from "react";

export function CareerHeroIllustration({ className = "w-full max-w-[340px] h-auto" }: { className?: string }) {
  return (
    <div className={`relative select-none ${className}`}>
      {/* Background organic shapes */}
      <svg
        viewBox="0 0 400 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Soft Blush & Mauve Organic Glow Background */}
        <circle cx="280" cy="120" r="90" fill="#FAF6F8" />
        <ellipse cx="140" cy="180" rx="100" ry="70" fill="#F5EEF2" />
        <circle cx="310" cy="210" r="60" fill="#E6F3F2" />

        {/* Dotted Flight Path (curved loop inspired by paper airplane reference) */}
        <path
          d="M 50 250 C 90 280, 160 270, 180 210 C 200 150, 140 90, 200 60 C 250 35, 300 80, 330 110"
          stroke="#006764"
          strokeWidth="2"
          strokeDasharray="5 5"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* Growth Bar Charts / Milestones (Forest & Teal) */}
        <rect x="70" y="190" width="24" height="65" rx="5" fill="#143B34" opacity="0.9" />
        <rect x="105" y="150" width="24" height="105" rx="5" fill="#006764" opacity="0.85" />
        <rect x="140" y="120" width="24" height="135" rx="5" fill="#925775" opacity="0.85" />
        <rect x="175" y="90" width="24" height="165" rx="5" fill="#143B34" />

        {/* Target Milestone Flag on the tallest bar */}
        <line x1="187" y1="90" x2="187" y2="40" stroke="#19332F" strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M 187 40 L 225 52 L 187 64 Z"
          fill="#E47F9C"
          stroke="#C96582"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Application Folder Card with Checklist */}
        <g transform="translate(210, 140)">
          {/* Folder Tab & Back */}
          <rect x="0" y="10" width="130" height="95" rx="8" fill="#DCC5D1" />
          <path d="M 0 18 C 0 13, 5 10, 10 10 L 45 10 L 60 22 L 120 22 C 125 22, 130 26, 130 31 L 130 100 C 130 105, 125 105, 120 105 L 10 105 C 5 105, 0 105, 0 100 Z" fill="#FFFFFF" stroke="#E7DEDF" strokeWidth="1.5" />
          
          {/* Document peaking out */}
          <rect x="15" y="0" width="100" height="75" rx="4" fill="#FAF7F5" stroke="#E7DEDF" strokeWidth="1" />
          {/* Check lines */}
          <circle cx="28" cy="18" r="4" fill="#006764" />
          <line x1="38" y1="18" x2="95" y2="18" stroke="#687873" strokeWidth="2.5" strokeLinecap="round" />
          
          <circle cx="28" cy="34" r="4" fill="#925775" />
          <line x1="38" y1="34" x2="85" y2="34" stroke="#687873" strokeWidth="2.5" strokeLinecap="round" />

          <circle cx="28" cy="50" r="4" fill="#E47F9C" />
          <line x1="38" y1="50" x2="75" y2="50" stroke="#687873" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Briefcase Badge */}
          <rect x="75" y="55" width="42" height="30" rx="4" fill="#143B34" />
          <path d="M 87 55 V 50 A 3 3 0 0 1 90 47 H 102 A 3 3 0 0 1 105 50 V 55" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
          <path d="M 92 68 L 95 71 L 101 64" stroke="#E47F9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        {/* Flying Paper Plane (Floating Animation) */}
        <g className="animate-plane" transform="translate(310, 80) rotate(15)">
          {/* Plane Body */}
          <polygon
            points="0,0 70,-20 35,35"
            fill="#FFFFFF"
            stroke="#006764"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Left Wing fold shadow */}
          <polygon
            points="0,0 70,-20 30,10"
            fill="#E6F3F2"
            stroke="#006764"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          {/* Center crease */}
          <line x1="0" y1="0" x2="70" y2="-20" stroke="#006764" strokeWidth="1.5" />
        </g>

        {/* Decorative Sparkles and Milestone Dots */}
        <g fill="#E47F9C">
          <path d="M 50 70 L 53 77 L 60 80 L 53 83 L 50 90 L 47 83 L 40 80 L 47 77 Z" />
          <path d="M 280 40 L 282 45 L 287 47 L 282 49 L 280 54 L 278 49 L 273 47 L 278 45 Z" opacity="0.8" />
        </g>

        <circle cx="360" cy="190" r="4" fill="#925775" opacity="0.7" />
        <circle cx="60" cy="140" r="3" fill="#006764" opacity="0.6" />
      </svg>
    </div>
  );
}
