import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  textColor?: string;
  linkTo?: string;
}

export function Logo({
  className,
  size = "md",
  showText = true,
  textColor = "text-[#19332F]",
  linkTo = "/",
}: LogoProps) {
  const iconDimensions = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const textDimensions = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const content = (
    <div className={cn("flex items-center gap-2.5 font-bold tracking-tight select-none", className)}>
      {/* Abstract geometric symbol: Briefcase + Check mark progress */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-lg bg-gradient-to-br from-[#143B34] to-[#006764] text-white shadow-sm flex-shrink-0 border border-[#006764]/40",
          iconDimensions[size]
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-[62%] h-[62%]"
        >
          {/* Briefcase frame */}
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="#FAF7F5" />
          <rect width="20" height="14" x="2" y="6" rx="2" stroke="#FAF7F5" />
          {/* Progress checkmark in Rose Pink */}
          <path d="m9 13 2.2 2.2 4.3-4.5" stroke="#E47F9C" strokeWidth="2.6" />
        </svg>
      </div>

      {showText && (
        <span className={cn("font-bold tracking-tight", textDimensions[size], textColor)}>
          Apply<span className="text-[#006764]">Track</span>
        </span>
      )}
    </div>
  );

  if (linkTo) {
    return <Link href={linkTo}>{content}</Link>;
  }

  return content;
}
