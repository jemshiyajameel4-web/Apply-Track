"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { StatusDistributionItem } from "@/types";

interface StatusDonutChartProps {
  data: StatusDistributionItem[];
  total: number;
}

export function StatusDonutChart({ data, total }: StatusDonutChartProps) {
  const chartData = data.filter((item) => item.count > 0);

  if (total === 0 || chartData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[260px] text-center">
        <div className="w-16 h-16 rounded-full border-4 border-dashed border-gray-200 flex items-center justify-center text-gray-400 mb-2">
          0
        </div>
        <p className="text-sm font-medium text-[#6B7280]">
          No applications recorded yet
        </p>
        <p className="text-xs text-[#9CA3AF] mt-0.5">
          Add applications to see status breakdown
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
      {/* Chart container with center total */}
      <div className="relative w-[200px] h-[200px] flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              formatter={(value: any, name: any) => [`${value} applications`, name]}
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: "12px",
              }}
            />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={4}
              dataKey="count"
            >
              {chartData.map((entry) => (
                <Cell key={`cell-${entry.status}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Total Count (Section 14) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-[#111827]">{total}</span>
          <span className="text-[11px] font-medium text-[#6B7280]">Total</span>
        </div>
      </div>

      {/* Legend with percentages */}
      <div className="flex-1 w-full space-y-2">
        {data.map((item) => {
          const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
          return (
            <div
              key={item.status}
              className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-[#111827]">{item.name}</span>
              </div>
              <div className="flex items-center gap-2 text-[#6B7280]">
                <span className="font-semibold text-[#111827]">{item.count}</span>
                <span className="text-[11px] text-[#9CA3AF] w-8 text-right">
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
