import React from "react";
import Link from "next/link";
import { UpcomingInterviewItem } from "@/types";
import { formatDate } from "@/lib/utils";
import { Calendar, Video, Clock, ChevronRight } from "lucide-react";
import { EmptyInterviewsIllustration } from "@/components/illustrations/EmptyInterviewsIllustration";

interface UpcomingInterviewsListProps {
  interviews: UpcomingInterviewItem[];
}

export function UpcomingInterviewsList({ interviews }: UpcomingInterviewsListProps) {
  if (!interviews || interviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center h-full min-h-[220px]">
        <EmptyInterviewsIllustration className="w-28 h-28 mb-3" />
        <h4 className="text-sm font-bold text-[#19332F]">No upcoming interviews</h4>
        <p className="text-xs text-[#687873] mt-1 max-w-xs">
          When you set interview dates on your active applications, they will appear right here.
        </p>
        <Link
          href="/applications/new"
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#006764] hover:text-[#005250] hover:underline"
        >
          <span>Schedule an interview &rarr;</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {interviews.map((item) => (
        <Link
          key={item.id}
          href={`/applications/${item.id}`}
          className="flex items-center justify-between p-3.5 rounded-2xl border border-[#E7DEDF] bg-white hover:border-[#925775]/50 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Pale Blush Date Block (Section 6.G) */}
            <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-[#FAF6F8] border border-[#DCC5D1] text-[#925775] flex-shrink-0 group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4 mb-0.5 text-[#006764]" />
              <span className="text-[10px] font-bold uppercase tracking-tight">
                {item.interview_date ? new Date(item.interview_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "TBD"}
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-[#19332F] truncate">
                  {item.company_name}
                </span>
                {item.interview_type && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F5EEF2] text-[#925775] border border-[#DCC5D1]">
                    {item.interview_type}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#687873] truncate mt-0.5 font-medium">
                {item.position}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#006764] bg-[#E6F3F2] px-2.5 py-1 rounded-lg border border-[#B2DCDA]">
              <Clock className="w-3 h-3" />
              <span>{formatDate(item.interview_date)}</span>
            </span>
            <ChevronRight className="w-4 h-4 text-[#98A5A1] group-hover:text-[#006764] group-hover:translate-x-0.5 transition-all" />
          </div>
        </Link>
      ))}
    </div>
  );
}

