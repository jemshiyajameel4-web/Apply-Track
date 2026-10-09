"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppLayout } from "@/components/layout/AppLayout";
import { dashboardApi, applicationsApi } from "@/lib/api";
import { UpcomingInterviewItem, Application } from "@/types";
import { formatDate, formatRelativeDate } from "@/lib/utils";
import { EmptyInterviewsIllustration } from "@/components/illustrations/EmptyInterviewsIllustration";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  Calendar as CalendarIcon,
  Clock,
  Building2,
  Briefcase,
  ChevronRight,
  ExternalLink,
  Plus,
  Video,
  MapPin,
  CheckCircle2,
  CalendarCheck,
} from "lucide-react";

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState<UpcomingInterviewItem[]>([]);
  const [allInterviewApps, setAllInterviewApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInterviews() {
      try {
        setLoading(true);
        const [upcoming, appsRes] = await Promise.all([
          dashboardApi.getUpcomingInterviews(20).catch(() => []),
          applicationsApi.getAll({ status: "Interview", limit: 50 }).catch(() => ({ items: [] })),
        ]);
        setInterviews(upcoming || []);
        setAllInterviewApps(appsRes?.items || []);
      } catch (err) {
        console.error("Failed to load interview calendar:", err);
      } finally {
        setLoading(false);
      }
    }
    loadInterviews();
  }, []);

  // Merge unique interviews
  const interviewList: {
    id: number;
    company_name: string;
    position: string;
    interview_date: string;
    interview_type: string;
  }[] = interviews.length > 0 
    ? interviews.map((item) => ({
        id: item.id,
        company_name: item.company_name,
        position: item.position,
        interview_date: item.interview_date,
        interview_type: item.interview_type || "Interview",
      }))
    : allInterviewApps
        .filter((app) => app.interview_date)
        .map((app) => ({
          id: app.id,
          company_name: app.company_name,
          position: app.position,
          interview_date: app.interview_date!,
          interview_type: app.interview_type || "Interview",
        }));

  return (
    <AppLayout
      title="Interview Calendar"
      subtitle="Track your scheduled interviews, technical rounds, and preparation milestones."
    >
      <div className="space-y-6">
        {/* Header summary banner */}
        <div className="bg-gradient-to-r from-[#143B34] to-[#006764] rounded-2xl p-6 text-white relative overflow-hidden shadow-sm">
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#E47F9C]/20 via-transparent to-transparent" />
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#DCC5D1]">
                SCHEDULE & PREPARATION
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif">
                {interviewList.length} Scheduled {interviewList.length === 1 ? "Interview" : "Interviews"}
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF7F5]/80 max-w-xl">
                Stay prepared for every discussion. Review company details, research technical expectations, and show up with confidence.
              </p>
            </div>

            <Link href="/applications/new">
              <Button
                variant="primary"
                size="sm"
                className="bg-[#E47F9C] hover:bg-[#d96e8d] text-[#143B34] font-semibold border-none self-start sm:self-auto shadow-xs"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                + Schedule Interview
              </Button>
            </Link>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-44 w-full rounded-2xl" />
            <Skeleton className="h-44 w-full rounded-2xl" />
            <Skeleton className="h-44 w-full rounded-2xl" />
            <Skeleton className="h-44 w-full rounded-2xl" />
          </div>
        ) : interviewList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E7DEDF] p-8 sm:p-12 text-center flex flex-col items-center justify-center shadow-sm">
            <EmptyInterviewsIllustration className="w-48 h-48 mb-4" />
            <h3 className="text-lg font-bold text-[#19332F] mb-1 font-serif">
              No upcoming interviews scheduled
            </h3>
            <p className="text-sm text-[#687873] max-w-md mx-auto mb-6">
              When recruiters and hiring managers reach out to schedule discussions, your timeline and meeting dates will appear here.
            </p>
            <Link href="/applications">
              <Button
                variant="primary"
                size="sm"
                className="bg-[#006764] hover:bg-[#005250] text-white"
                leftIcon={<Briefcase className="w-4 h-4" />}
              >
                View Applications
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interviewList.map((item, idx) => {
              const dateObj = new Date(item.interview_date);
              const day = isNaN(dateObj.getTime()) ? "—" : dateObj.getDate();
              const month = isNaN(dateObj.getTime())
                ? "DATE"
                : dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
              const time = isNaN(dateObj.getTime())
                ? ""
                : dateObj.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#E7DEDF] p-5 shadow-sm hover:shadow-md transition-all hover:border-[#006764]/40 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Date Block & Type Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#F5EEF2] border border-[#DCC5D1] flex flex-col items-center justify-center text-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <span className="text-[10px] font-bold text-[#925775] tracking-wider">
                            {month}
                          </span>
                          <span className="text-base font-extrabold text-[#19332F] leading-tight">
                            {day}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] font-medium text-[#925775] bg-[#F5EEF2] px-2 py-0.5 rounded-md border border-[#DCC5D1]">
                            {item.interview_type || "Technical Round"}
                          </span>
                          <p className="text-xs text-[#687873] mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#98A5A1]" />
                            {time ? `${time} • ` : ""}
                            {formatRelativeDate(item.interview_date)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Company & Position */}
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-[#19332F] group-hover:text-[#006764] transition-colors truncate">
                        {item.company_name}
                      </h4>
                      <p className="text-xs text-[#687873] flex items-center gap-1.5 truncate">
                        <Briefcase className="w-3.5 h-3.5 text-[#98A5A1]" />
                        {item.position}
                      </p>
                    </div>
                  </div>

                  {/* Action Link to Application Profile */}
                  <div className="pt-4 mt-4 border-t border-[#E7DEDF]/50 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#687873]">
                      Full Details
                    </span>
                    <Link
                      href={`/applications/${item.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#006764] hover:text-[#143B34] transition-colors group-hover:translate-x-0.5"
                    >
                      <span>View Application</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Preparation Tips Card */}
        <div className="bg-[#FAF7F5] border border-[#E7DEDF] rounded-2xl p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-[#006764]/10 text-[#006764] flex-shrink-0">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-[#19332F]">
                Interview Preparation Checklist
              </h4>
              <p className="text-xs text-[#687873] leading-relaxed">
                Review your resume highlights, prepare 2–3 questions about company architecture and culture, test your camera/audio setup 15 minutes before the meeting, and review your notes stored on ApplyTrack.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
