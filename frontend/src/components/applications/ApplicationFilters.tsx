"use client";

import React from "react";
import { ApplicationStatus } from "@/types";
import { cn } from "@/lib/utils";

interface ApplicationFiltersProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
}

export function ApplicationFilters({
  selectedStatus,
  onStatusChange,
  selectedSort,
  onSortChange,
}: ApplicationFiltersProps) {
  const statusOptions: { label: string; value: string }[] = [
    { label: "All", value: "All" },
    { label: "Applied", value: "Applied" },
    { label: "Interview", value: "Interview" },
    { label: "Technical Round", value: "Technical Round" },
    { label: "Offer", value: "Offer" },
    { label: "Rejected", value: "Rejected" },
  ];

  const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Company (A-Z)", value: "company_asc" },
    { label: "Company (Z-A)", value: "company_desc" },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
      {/* Status Pill Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {statusOptions.map((opt) => {
          const isSelected = selectedStatus === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onStatusChange(opt.value)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all select-none",
                isSelected
                  ? "bg-[#0E6162] text-white shadow-xs"
                  : "bg-white text-[#5A646E] border border-[#E2E8E5] hover:bg-[#F8FAF9] hover:text-[#0E6162]"
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Sort Select */}
      <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
        <label className="text-xs text-[#5A646E] whitespace-nowrap">Sort by:</label>
        <select
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-lg border border-[#E2E8E5] bg-white py-1.5 pl-3 pr-8 text-xs text-[#111827] focus:border-[#0E6162] focus:outline-none focus:ring-1 focus:ring-[#0E6162]"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
