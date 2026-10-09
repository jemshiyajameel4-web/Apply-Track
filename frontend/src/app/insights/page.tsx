"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppLayout } from "@/components/layout/AppLayout";
import { dashboardApi, applicationsApi } from "@/lib/api";
import { DashboardStats, StatusDistributionItem, Application } from "@/types";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusDonutChart } from "@/components/dashboard/StatusDonutChart";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  TrendingUp,
  Award,
  Calendar,
  Briefcase,
  Layers,
  ArrowRight,
  PieChart as PieIcon,
  CheckCircle2,
  Percent,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function InsightsPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statusDist, setStatusDist] = useState<StatusDistributionItem[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInsightsData() {
      try {
        setLoading(true);
        const [statsData, distData, appsData] = await Promise.all([
          dashboardApi.getStats().catch(() => null),
          dashboardApi.getStatusDistribution().catch(() => []),
          applicationsApi.getAll({ limit: 100 }).catch(() => ({ items: [] })),
        ]);
        setStats(statsData);
        setStatusDist(distData);
        setApplications(appsData?.items || []);
      } catch (err) {
        console.error("Failed to load insights:", err);
      } finally {
        setLoading(false);
      }
    }
    loadInsightsData();
  }, []);

  const total = stats?.total_applications || 0;
  const interviews = stats?.interview_count || 0;
  const offers = stats?.offer_count || 0;
  const responseRate = stats?.interview_rate || (total > 0 ? Math.round((interviews / total) * 100) : 0);
  const offerRate = total > 0 ? ((offers / total) * 100).toFixed(1) : "0.0";
  const interviewConversion =
    interviews > 0 ? ((offers / interviews) * 100).toFixed(1) : "0.0";

  // Data for Funnel Bar Chart
  const funnelData = [
    { stage: "Applied", count: total, fill: "#006764" },
    { stage: "Interviews", count: interviews, fill: "#925775" },
    { stage: "Offers", count: offers, fill: "#143B34" },
  ];

  return (
    <AppLayout
      title="Application Insights"
      subtitle="Data-driven visibility into your job search pipeline, conversion rates, and milestones."
      showBackButton={true}
      backHref="/dashboard"
    >
      <div className="space-y-6">
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-[#143B34] to-[#006764] rounded-2xl p-6 text-white relative overflow-hidden shadow-sm">
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#E47F9C]/20 via-transparent to-transparent" />
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#DCC5D1]">
                CAREER ANALYTICS & METRICS
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif">
                Pipeline Health & Conversion
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF7F5]/80 max-w-xl">
                Track how effectively your applications convert into interviews and offers. Every metric is computed in real time from your saved data.
              </p>
            </div>

            <Link href="/applications/new">
              <Button
                variant="primary"
                size="sm"
                className="bg-[#E47F9C] hover:bg-[#d96e8d] text-[#143B34] font-semibold border-none self-start sm:self-auto shadow-xs"
              >
                + Track New Opportunity
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 KPI Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Applications"
              value={total}
              icon={<Briefcase className="w-5 h-5 text-[#006764]" />}
              subtitle="Submitted opportunities"
              variant="teal"
            />
            <StatCard
              title="Interviews"
              value={interviews}
              icon={<Calendar className="w-5 h-5 text-[#925775]" />}
              subtitle="Rounds scheduled or held"
              variant="mauve"
            />
            <StatCard
              title="Offers Received"
              value={offers}
              icon={<Award className="w-5 h-5 text-[#143B34]" />}
              subtitle="Formal offer letters"
              variant="forest"
            />
            <StatCard
              title="Response Rate"
              value={`${responseRate}%`}
              icon={<Percent className="w-5 h-5 text-[#C96582]" />}
              subtitle="Apps reaching interview stage"
              variant="blush"
            />
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status Donut Chart */}
          <div className="bg-white rounded-2xl border border-[#E7DEDF] p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#19332F]">
                  Application Pipeline
                </h3>
                <p className="text-xs text-[#687873]">
                  Current stage breakdown across all tracked applications
                </p>
              </div>
              <PieIcon className="w-4 h-4 text-[#006764]" />
            </div>

            {loading ? (
              <Skeleton className="h-64 w-full rounded-xl" />
            ) : (
              <StatusDonutChart data={statusDist} total={total} />
            )}
          </div>

          {/* Funnel Conversion Bar Chart */}
          <div className="bg-white rounded-2xl border border-[#E7DEDF] p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-[#19332F]">
                    Conversion Funnel
                  </h3>
                  <p className="text-xs text-[#687873]">
                    Progression from submission to final job offer
                  </p>
                </div>
                <TrendingUp className="w-4 h-4 text-[#925775]" />
              </div>

              {loading ? (
                <Skeleton className="h-64 w-full rounded-xl" />
              ) : total === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-[#687873]">
                  <Layers className="w-10 h-10 text-[#DCC5D1] mb-2" />
                  <p className="text-sm font-medium text-[#19332F]">No data for conversion funnel</p>
                  <p className="text-xs mt-1">Add your first job application to see conversion metrics.</p>
                </div>
              ) : (
                <div className="h-64 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={funnelData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7DEDF" />
                      <XAxis
                        dataKey="stage"
                        tick={{ fontSize: 12, fill: "#687873" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 12, fill: "#687873" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-xl border border-[#E7DEDF] bg-white p-2.5 shadow-md text-xs">
                                <p className="font-bold text-[#19332F]">
                                  {payload[0].payload.stage}
                                </p>
                                <p className="text-[#006764] font-semibold mt-0.5">
                                  {payload[0].value} {payload[0].value === 1 ? "application" : "applications"}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                        {funnelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Funnel summary footer */}
            <div className="grid grid-cols-2 gap-3 pt-4 mt-4 border-t border-[#E7DEDF]/50 text-center">
              <div className="bg-[#FAF7F5] p-3 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-[#687873] tracking-wider block">
                  Interview Conversion
                </span>
                <span className="text-base font-bold text-[#006764]">
                  {interviewConversion}%
                </span>
              </div>
              <div className="bg-[#FAF7F5] p-3 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-[#687873] tracking-wider block">
                  Overall Offer Rate
                </span>
                <span className="text-base font-bold text-[#143B34]">
                  {offerRate}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Table */}
        <div className="bg-white rounded-2xl border border-[#E7DEDF] p-5 sm:p-6 shadow-sm">
          <h3 className="text-base font-bold text-[#19332F] mb-1">
            Status Breakdown Details
          </h3>
          <p className="text-xs text-[#687873] mb-4">
            Complete inventory of application stages and their proportion of your pipeline
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#19332F]">
              <thead className="bg-[#FAF7F5] text-[11px] uppercase tracking-wider text-[#687873] border-b border-[#E7DEDF]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Stage</th>
                  <th className="py-3 px-4 font-semibold">Count</th>
                  <th className="py-3 px-4 font-semibold">Share of Total</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7DEDF]/50">
                {statusDist.map((item, idx) => {
                  const percent = total > 0 ? ((item.count / total) * 100).toFixed(1) : "0.0";
                  return (
                    <tr key={idx} className="hover:bg-[#FAF7F5]/80 transition-colors">
                      <td className="py-3 px-4 font-semibold text-[#19332F]">
                        {item.status}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#006764]">
                        {item.count}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-[#FAF7F5] h-2 rounded-full overflow-hidden border border-[#E7DEDF]">
                            <div
                              className="bg-[#006764] h-full rounded-full"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className="text-[11px] text-[#687873] font-medium">
                            {percent}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/applications?status=${encodeURIComponent(item.status)}`}
                          className="text-[#006764] hover:text-[#143B34] font-semibold inline-flex items-center gap-1"
                        >
                          <span>Filter</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
