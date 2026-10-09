"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { StatusDistributionItem } from "@/types";

interface StatusDonutChartProps {
  data: StatusDistributionItem[];
  total: number;
}

const PALETTE_FALLBACKS: Record<string, string> = {
  Applied: "#006764",
  Interview: "#925775",
  "Technical Round": "#E47F9C",
  Offer: "#143B34",
  Rejected: "#9E8C95",
};

export function StatusDonutChart({ data, total }: StatusDonutChartProps) {
  const chartData = data
    .filter((item) => item.count > 0)
    .map((item) => ({
      ...item,
      color: PALETTE_FALLBACKS[item.name] || item.color || "#006764",
    }));

  if (total === 0 || chartData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[240px] text-center p-4">
        <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-[#E7DEDF] bg-[#FAF6F8] flex items-center justify-center text-[#925775] font-bold text-lg mb-3">
          0
        </div>
        <p className="text-sm font-semibold text-[#19332F]">
          No applications recorded yet
        </p>
        <p className="text-xs text-[#687873] mt-1 max-w-xs">
          Add your active job submissions to see your stage-by-stage pipeline distribution.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
      {/* Chart container with center total */}
      <div className="relative w-[190px] h-[190px] flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              formatter={(value: any, name: any) => [`${value} applications`, name]}
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                border: "1px solid #E7DEDF",
                boxShadow: "0 8px 24px -4px rgba(20,59,52,0.12)",
                fontSize: "12px",
                color: "#19332F",
                fontWeight: 600,
              }}
            />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={56}
              outerRadius={84}
              paddingAngle={3}
              dataKey="count"
              strokeWidth={0}
            >
              {chartData.map((entry) => (
                <Cell key={`cell-${entry.status}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Total Count */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold text-[#19332F] tracking-tight">{total}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#687873]">Total</span>
        </div>
      </div>

      {/* Legend with counts and percentages */}
      <div className="flex-1 w-full space-y-2">
        {data.map((item) => {
          const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
          const itemColor = PALETTE_FALLBACKS[item.name] || item.color || "#006764";

          return (
            <div
              key={item.status}
              className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-xl hover:bg-[#FAF7F5] transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: itemColor }}
                />
                <span className="font-medium text-[#19332F] truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#687873] flex-shrink-0">
                <span className="font-bold text-[#19332F]">{item.count}</span>
                <span className="text-[11px] text-[#98A5A1] w-8 text-right font-medium">
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

