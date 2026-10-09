import React from "react";
import Link from "next/link";
import { Application } from "@/types";
import { ApplicationStatusBadge } from "@/components/applications/ApplicationStatusBadge";
import { formatRelativeDate } from "@/lib/utils";
import { ChevronRight, ArrowRight, Building2 } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

interface RecentApplicationsListProps {
  applications: Application[];
}

export function RecentApplicationsList({ applications }: RecentApplicationsListProps) {
  if (!applications || applications.length === 0) {
    return (
      <EmptyState
        title="No applications tracked yet"
        description="Your recent job applications will show up here as you add them."
        actionLabel="Add Application"
        onAction={() => {
          if (typeof window !== "undefined") window.location.href = "/applications/new";
        }}
      />
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {applications.map((app) => {
        const initials = app.company_name.slice(0, 2).toUpperCase();

        return (
          <Link
            key={app.id}
            href={`/applications/${app.id}`}
            className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Company Initials Avatar */}
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F8FAF9] text-[#132E27] font-bold text-xs flex-shrink-0 group-hover:bg-[#E7F3F3] group-hover:text-[#0E6162] transition-colors border border-gray-100">
                {initials}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#111827] truncate group-hover:text-[#0E6162] transition-colors">
                  {app.company_name}
                </p>
                <p className="text-xs text-[#5A646E] truncate">
                  {app.position}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ApplicationStatusBadge status={app.status} size="sm" />
              <span className="hidden sm:inline text-xs text-[#8E98A2]">
                {formatRelativeDate(app.application_date)}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0E6162] group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>
        );
      })}

      <div className="pt-3 flex justify-end">
        <Link
          href="/applications"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E6162] hover:text-[#094849] transition-colors"
        >
          <span>View all applications</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
