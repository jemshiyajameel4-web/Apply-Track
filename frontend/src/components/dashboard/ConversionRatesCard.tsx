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
      <div className="p-4 rounded-xl border border-gray-100 bg-[#F8FAF9] flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#5A646E] uppercase tracking-wider">
            Interview Rate
          </span>
          <div className="p-1.5 rounded-lg bg-[#E7F3F3] text-[#0E6162]">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-[#111827]">
              {interviewRate}%
            </span>
            <span className="text-xs text-[#8E98A2]">Target: &gt;20%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-gray-200 mt-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#0E6162] transition-all duration-500"
              style={{ width: `${Math.min(interviewRate, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Offer Conversion Rate */}
      <div className="p-4 rounded-xl border border-gray-100 bg-[#F8FAF9] flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#5A646E] uppercase tracking-wider">
            Offer Rate
          </span>
          <div className="p-1.5 rounded-lg bg-[#F3E9EE] text-[#844C6A]">
            <Award className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-[#111827]">
              {offerRate}%
            </span>
            <span className="text-xs text-[#8E98A2]">Target: &gt;5%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-gray-200 mt-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#844C6A] transition-all duration-500"
              style={{ width: `${Math.min(offerRate, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
