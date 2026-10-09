import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "success" | "warning" | "danger" | "info" | "neutral" | "purple";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "neutral",
  size = "md",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    primary: "bg-[#E7F3F3] text-[#0E6162] border border-[#CCE7E8]",
    success: "bg-[#E7EFEA] text-[#132E27] border border-[#C4D9CD]",
    warning: "bg-[#FDF3E7] text-[#B45309] border border-[#F9DFBE]",
    danger: "bg-[#FCF2F5] text-[#DE7A96] border border-[#F7C5D4]",
    info: "bg-[#E7F3F3] text-[#0E6162] border border-[#CCE7E8]",
    purple: "bg-[#F3E9EE] text-[#844C6A] border border-[#D8C2CE]",
    neutral: "bg-gray-100 text-gray-700 border border-gray-200",
  };

  const dotColors = {
    primary: "bg-[#0E6162]",
    success: "bg-[#132E27]",
    warning: "bg-[#B45309]",
    danger: "bg-[#DE7A96]",
    info: "bg-[#0E6162]",
    purple: "bg-[#844C6A]",
    neutral: "bg-gray-500",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 font-medium rounded-full gap-1",
    md: "text-xs px-2.5 py-1 font-medium rounded-full gap-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
}
