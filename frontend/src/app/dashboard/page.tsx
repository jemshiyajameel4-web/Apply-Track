"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusDonutChart } from "@/components/dashboard/StatusDonutChart";
import { RecentApplicationsList } from "@/components/dashboard/RecentApplicationsList";
import { UpcomingInterviewsList } from "@/components/dashboard/UpcomingInterviewsList";
import { ConversionRatesCard } from "@/components/dashboard/ConversionRatesCard";
import { StatCardSkeleton, Skeleton } from "@/components/ui/Skeleton";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CareerHeroIllustration } from "@/components/illustrations/CareerHeroIllustration";
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
  TrendingUp,
  Calendar,
  PieChart,
  Clock,
  Plus,
  ArrowRight,
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

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const firstName = user?.full_name ? user.full_name.split(" ")[0] : "there";

  return (
    <AppLayout
      title="Overview"
      subtitle={`Welcome back, ${firstName}.`}
      showAddButton={false}
    >
      <div className="space-y-7 w-full max-w-full">
        {/* Editorial Hero Banner Section (Section 6.C) */}
        <div className="relative overflow-hidden rounded-3xl border border-[#E7DEDF] bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
          {/* Subtle Organic Blush Background Shapes */}
          <div className="pointer-events-none absolute -top-12 -right-12 w-80 h-80 rounded-full bg-[#FAF6F8] blur-3xl opacity-80" />
          <div className="pointer-events-none absolute -bottom-16 left-1/3 w-64 h-64 rounded-full bg-[#E6F3F2] blur-3xl opacity-60" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6F8] border border-[#DCC5D1] text-[#925775] text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#E47F9C]" />
                <span>YOUR CAREER JOURNEY</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#19332F] leading-tight font-serif-display">
                Your next opportunity{" "}
                <span className="text-[#006764] italic underline decoration-[#E47F9C] decoration-wavy decoration-2">
                  starts here
                </span>
                .
              </h2>

              <p className="text-xs sm:text-sm text-[#687873] max-w-xl leading-relaxed font-normal">
                A clearer view of every application, every interview, and every step forward. Track your progress with confidence and momentum.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link href="/applications/new">
                  <Button
                    variant="primary"
                    size="md"
                    leftIcon={<Plus className="w-4 h-4" />}
                    className="shadow-sm hover:shadow-md font-semibold text-xs sm:text-sm"
                  >
                    + Add application
                  </Button>
                </Link>

                <Link href="/applications">
                  <Button
                    variant="outline"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="font-semibold text-xs sm:text-sm bg-white"
                  >
                    View applications
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <CareerHeroIllustration className="w-full max-w-[320px] sm:max-w-[340px] h-auto" />
            </div>
          </div>
        </div>

        {/* 4 Restrained KPI Cards (Section 6.D) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
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
                subtitle="All recorded opportunities"
                icon={<Briefcase className="w-5 h-5" />}
                variant="teal"
              />

              <StatCard
                title="Interviews"
                value={
                  (stats?.interview_count ?? 0) +
                  (stats?.technical_round_count ?? 0)
                }
                subtitle={`${stats?.upcoming_interviews_count ?? 0} scheduled upcoming`}
                icon={<Video className="w-5 h-5" />}
                variant="mauve"
              />

              <StatCard
                title="Offers"
                value={stats?.offer_count ?? 0}
                subtitle={`${stats?.offer_rate ?? 0}% offer rate`}
                icon={<Award className="w-5 h-5" />}
                variant="forest"
              />

              <StatCard
                title="Response Rate"
                value={`${stats?.interview_rate ?? 0}%`}
                subtitle="Interview conversion rate"
                icon={<TrendingUp className="w-5 h-5" />}
                variant="blush"
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
                  <PieChart className="w-4 h-4 text-[#006764]" />
                  <CardTitle>Application Pipeline Distribution</CardTitle>
                </div>
                <span className="text-xs text-[#98A5A1] font-medium">Live pipeline stages</span>
              </CardHeader>

              {loading ? (
                <div className="py-12 flex justify-center">
                  <Skeleton className="w-44 h-44 rounded-full" />
                </div>
              ) : (
                <StatusDonutChart
                  data={statusDistribution}
                  total={stats?.total_applications ?? 0}
                />
              )}

              {/* Conversion Rates row */}
              <div className="pt-4 mt-2 border-t border-[#E7DEDF]">
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
                  <Calendar className="w-4 h-4 text-[#925775]" />
                  <CardTitle>Upcoming Interviews</CardTitle>
                </div>
                <Link
                  href="/interviews"
                  className="text-xs font-semibold text-[#006764] hover:underline"
                >
                  View all
                </Link>
              </CardHeader>

              <div className="flex-1">
                {loading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-16 w-full rounded-2xl" />
                    <Skeleton className="h-16 w-full rounded-2xl" />
                  </div>
                ) : (
                  <UpcomingInterviewsList interviews={upcomingInterviews} />
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Row: Recent Activity Applications */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#006764]" />
                <CardTitle>Recent Activity</CardTitle>
              </div>
              <Link
                href="/applications"
                className="text-xs font-semibold text-[#006764] hover:underline"
              >
                View all applications &rarr;
              </Link>
            </CardHeader>

            {loading ? (
              <div className="space-y-3 py-2">
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
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

