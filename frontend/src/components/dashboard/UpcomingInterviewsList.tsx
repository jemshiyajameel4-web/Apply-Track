import React from "react";
import Link from "next/link";
import { UpcomingInterviewItem } from "@/types";
import { formatDate } from "@/lib/utils";
import { Calendar, Video, Clock, ChevronRight } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

interface UpcomingInterviewsListProps {
  interviews: UpcomingInterviewItem[];
}

export function UpcomingInterviewsList({ interviews }: UpcomingInterviewsListProps) {
  if (!interviews || interviews.length === 0) {
    return (
      <EmptyState
        icon={<Calendar className="w-6 h-6 text-[#4F46E5]" />}
        title="No upcoming interviews"
        description="Your scheduled interviews will appear here."
      />
    );
  }

  return (
    <div className="space-y-3">
      {interviews.map((item) => (
        <Link
          key={item.id}
          href={`/applications/${item.id}`}
          className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-[#F9FAFB]/70 hover:bg-white hover:border-[#C7D2FE] hover:shadow-xs transition-all group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex-shrink-0 group-hover:scale-105 transition-transform">
              <Video className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#111827] truncate">
                  {item.company_name}
                </span>
                {item.interview_type && (
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-purple-50 text-purple-700">
                    {item.interview_type}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6B7280] truncate mt-0.5">
                {item.position}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-right flex-shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#4F46E5] bg-white px-2.5 py-1 rounded-lg border border-[#E0E7FF]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(item.interview_date)}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#4F46E5] group-hover:translate-x-0.5 transition-all" />
          </div>
        </Link>
      ))}
    </div>
  );
}
