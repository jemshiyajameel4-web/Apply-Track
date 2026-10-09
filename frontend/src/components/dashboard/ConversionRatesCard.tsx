import React from "react";
import { TrendingUp, Award } from "lucide-react";

interface ConversionRatesCardProps {
  interviewRate: number;
  offerRate: number;
}

export function ConversionRatesCard({
  interviewRate,
  offerRate,
}: ConversionRatesCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Interview Conversion Rate */}
      <div className="p-4 rounded-xl border border-gray-100 bg-[#F9FAFB]/70 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
            Interview Rate
          </span>
          <div className="p-1.5 rounded-lg bg-indigo-50 text-[#4F46E5]">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-[#111827]">
              {interviewRate}%
            </span>
            <span className="text-xs text-[#6B7280]">Target: &gt;20%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-gray-200 mt-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#4F46E5] transition-all duration-500"
              style={{ width: `${Math.min(interviewRate, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Offer Conversion Rate */}
      <div className="p-4 rounded-xl border border-gray-100 bg-[#F9FAFB]/70 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
            Offer Rate
          </span>
          <div className="p-1.5 rounded-lg bg-emerald-50 text-[#16A34A]">
            <Award className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-[#111827]">
              {offerRate}%
            </span>
            <span className="text-xs text-[#6B7280]">Target: &gt;5%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-gray-200 mt-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#16A34A] transition-all duration-500"
              style={{ width: `${Math.min(offerRate, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
