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
    primary: "bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]",
    success: "bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]",
    warning: "bg-[#FEF3C7] text-[#D97706] border border-[#FED7AA]",
    danger: "bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]",
    info: "bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]",
    purple: "bg-[#F3E8FF] text-[#9333EA] border border-[#E9D5FF]",
    neutral: "bg-gray-100 text-gray-700 border border-gray-200",
  };

  const dotColors = {
    primary: "bg-[#4F46E5]",
    success: "bg-[#16A34A]",
    warning: "bg-[#D97706]",
    danger: "bg-[#DC2626]",
    info: "bg-[#0284C7]",
    purple: "bg-[#9333EA]",
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
