import React from "react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: React.ReactNode;
  variant?: "teal" | "mauve" | "forest" | "blush" | "white";
  trend?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  variant = "white",
  trend,
}: StatCardProps) {
  const variantStyles = {
    teal: {
      card: "bg-white border-[#E7DEDF] hover:border-[#006764]",
      iconBg: "bg-[#E6F3F2] text-[#006764] border border-[#B2DCDA]",
      valueColor: "text-[#19332F]",
      subtleDot: "bg-[#006764]",
    },
    mauve: {
      card: "bg-white border-[#E7DEDF] hover:border-[#925775]",
      iconBg: "bg-[#F5EEF2] text-[#925775] border border-[#DCC5D1]",
      valueColor: "text-[#19332F]",
      subtleDot: "bg-[#925775]",
    },
    forest: {
      card: "bg-white border-[#E7DEDF] hover:border-[#143B34]",
      iconBg: "bg-[#E8F3EE] text-[#143B34] border border-[#C5DFD2]",
      valueColor: "text-[#19332F]",
      subtleDot: "bg-[#143B34]",
    },
    blush: {
      card: "bg-white border-[#E7DEDF] hover:border-[#E47F9C]",
      iconBg: "bg-[#FDF1F4] text-[#C96582] border border-[#F7C9D6]",
      valueColor: "text-[#19332F]",
      subtleDot: "bg-[#E47F9C]",
    },
    white: {
      card: "bg-white border-[#E7DEDF] hover:border-[#006764]",
      iconBg: "bg-[#FAF7F5] text-[#143B34] border border-[#E7DEDF]",
      valueColor: "text-[#19332F]",
      subtleDot: "bg-[#006764]",
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <div
      className={cn(
        "rounded-2xl p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md relative overflow-hidden group",
        currentVariant.card
      )}
    >
      {/* Top subtle accent highlight */}
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl flex-shrink-0 transition-transform group-hover:scale-105 duration-200",
            currentVariant.iconBg
          )}
        >
          {icon}
        </div>

        {trend && (
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#E8F3EE] text-[#143B34] border border-[#C5DFD2]">
            {trend}
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#687873]">
          {title}
        </p>
        <p className={cn("mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight font-sans", currentVariant.valueColor)}>
          {value}
        </p>
        {subtitle && (
          <p className="mt-1 text-xs text-[#98A5A1] font-normal leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

