"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";


import { useAuth } from "@/lib/auth-context";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusDonutChart } from "@/components/dashboard/StatusDonutChart";
import { RecentApplicationsList } from "@/components/dashboard/RecentApplicationsList";
import { UpcomingInterviewsList } from "@/components/dashboard/UpcomingInterviewsList";
import { ConversionRatesCard } from "@/components/dashboard/ConversionRatesCard";
import { StatCardSkeleton, Skeleton } from "@/components/ui/Skeleton";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { dashboardApi } from "@/lib/api";
import {
  DashboardStats,
  StatusDistributionItem,
  Application,
  UpcomingInterviewItem,
} from "@/types";
import {
  Briefcase,
  Video,
  Award,
  XCircle,
  Calendar,
  PieChart,
  Clock,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statusDistribution, setStatusDistribution] = useState<
    StatusDistributionItem[]
  >([]);
  const [recentApplications, setRecentApplications] = useState<Application[]>(
    []
  );
  const [upcomingInterviews, setUpcomingInterviews] = useState<
    UpcomingInterviewItem[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const [statsData, distData, recentData, upcomingData] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getStatusDistribution(),
        dashboardApi.getRecentApplications(5),
        dashboardApi.getUpcomingInterviews(5),
      ]);

      setStats(statsData);
      setStatusDistribution(distData);
      setRecentApplications(recentData);
      setUpcomingInterviews(upcomingData);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const [greeting, setGreeting] = useState("Welcome back");

  useEffect(() => {
    fetchDashboardData();
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, [fetchDashboardData]);

  const firstName = user?.full_name ? user.full_name.split(" ")[0] : "there";

  return (
    <AppLayout
      title={`${greeting}, ${firstName}`}
      subtitle="Here's how your job search is progressing."
    >

      <div className="space-y-6">
        {/* KPI Cards Row (4 Cards - Sections 13, 62, 69) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard
                title="Total Applications"
                value={stats?.total_applications ?? 0}
                subtitle="All logged job applications"
                icon={<Briefcase className="w-5 h-5" />}
                iconBgColor="bg-[#E7F3F3]"
                iconColor="text-[#0E6162]"
              />

              <StatCard
                title="Interviews"
                value={
                  (stats?.interview_count ?? 0) +
                  (stats?.technical_round_count ?? 0)
                }
                subtitle={`${stats?.upcoming_interviews_count ?? 0} scheduled soon`}
                icon={<Video className="w-5 h-5" />}
                iconBgColor="bg-[#F3E9EE]"
                iconColor="text-[#844C6A]"
              />

              <StatCard
                title="Offers"
                value={stats?.offer_count ?? 0}
                subtitle={`${stats?.offer_rate ?? 0}% offer rate`}
                icon={<Award className="w-5 h-5" />}
                iconBgColor="bg-[#E7EFEA]"
                iconColor="text-[#132E27]"
              />

              <StatCard
                title="Rejections"
                value={stats?.rejected_count ?? 0}
                subtitle="Keep applying and iterating"
                icon={<XCircle className="w-5 h-5" />}
                iconBgColor="bg-[#FCF2F5]"
                iconColor="text-[#DE7A96]"
              />
            </>
          )}
        </div>

        {/* Middle Row: Status Distribution Chart + Upcoming Interviews (12-col grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Status Distribution (7 cols on lg) */}
          <div className="lg:col-span-7">
            <Card className="h-full flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-[#0E6162]" />
                  <CardTitle>Application Pipeline Distribution</CardTitle>
                </div>
                <span className="text-xs text-[#8E98A2]">Current stage</span>
              </CardHeader>

              {loading ? (
                <div className="py-12 flex justify-center">
                  <Skeleton className="w-48 h-48 rounded-full" />
                </div>
              ) : (
                <StatusDonutChart
                  data={statusDistribution}
                  total={stats?.total_applications ?? 0}
                />
              )}

              {/* Conversion Rates row */}
              <div className="pt-4 mt-2 border-t border-gray-100">
                <ConversionRatesCard
                  interviewRate={stats?.interview_rate ?? 0}
                  offerRate={stats?.offer_rate ?? 0}
                />
              </div>
            </Card>
          </div>

          {/* Upcoming Interviews (5 cols on lg) */}
          <div className="lg:col-span-5">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#844C6A]" />
                  <CardTitle>Upcoming Interviews</CardTitle>
                </div>
                {upcomingInterviews.length > 0 && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F3E9EE] text-[#844C6A]">
                    {upcomingInterviews.length} Scheduled
                  </span>
                )}
              </CardHeader>

              <div className="flex-1">
                {loading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-16 w-full rounded-xl" />
                    <Skeleton className="h-16 w-full rounded-xl" />
                  </div>
                ) : (
                  <UpcomingInterviewsList interviews={upcomingInterviews} />
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Row: Recent Applications List */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0E6162]" />
                <CardTitle>Recent Activity</CardTitle>
              </div>
              <span className="text-xs text-[#8E98A2]">Latest updates</span>
            </CardHeader>

            {loading ? (
              <div className="space-y-3 py-2">
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            ) : (
              <RecentApplicationsList applications={recentApplications} />
            )}
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
