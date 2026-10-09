import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  trend?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconBgColor = "bg-[#EEF2FF]",
  iconColor = "text-[#4F46E5]",
  trend,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-all hover:border-gray-300">
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0",
            iconBgColor,
            iconColor
          )}
        >
          {icon}
        </div>

        {trend && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
            {trend}
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
          {title}
        </p>
        <p className="mt-1 text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
          {value}
        </p>
        {subtitle && (
          <p className="mt-1 text-xs text-[#9CA3AF]">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
