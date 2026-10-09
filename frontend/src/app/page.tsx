"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import {
  Briefcase,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  BarChart3,
  Search,
} from "lucide-react";

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#111827] flex flex-col">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E5E7EB] bg-white/90 px-6 backdrop-blur-md lg:px-12">
        <Logo size="md" />

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">
                  Get Started Free
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-20 lg:px-12 lg:pt-24 lg:pb-28 text-center max-w-5xl mx-auto">
        {/* Subtle pill banner */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5] text-xs font-semibold mb-6 animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Next-Gen Job Application Tracker</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.15]">
          Take control of your{" "}
          <span className="text-[#4F46E5] underline decoration-[#C7D2FE] decoration-wavy decoration-2">
            job search
          </span>
          .
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[#6B7280] max-w-2xl mx-auto font-normal leading-relaxed">
          Track applications, schedule upcoming interviews, and understand your
          conversion analytics — all in one organized, distraction-free workspace.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link href="/register" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-md"
            >
              Start Tracking Free
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Explore Live Demo
            </Button>
          </Link>
        </div>

        {/* Dashboard Preview Mockup (Section 73) */}
        <div className="mt-14 rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-6 shadow-xl text-left">
          {/* Mock Browser Header */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs text-[#9CA3AF] font-mono hidden sm:inline">
                https://applytrack.io/dashboard
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                <CheckCircle className="w-3 h-3" /> Live Pipeline
              </span>
            </div>
          </div>

          {/* Mock KPI Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
            <div className="p-3.5 rounded-xl border border-gray-100 bg-[#F9FAFB]">
              <span className="text-[11px] font-semibold text-[#6B7280] uppercase">Total Applications</span>
              <p className="text-xl sm:text-2xl font-bold text-[#111827] mt-1">24</p>
              <span className="text-[11px] text-emerald-600 font-medium">+12% this month</span>
            </div>
            <div className="p-3.5 rounded-xl border border-gray-100 bg-[#F9FAFB]">
              <span className="text-[11px] font-semibold text-[#6B7280] uppercase">Interviews</span>
              <p className="text-xl sm:text-2xl font-bold text-[#4F46E5] mt-1">7</p>
              <span className="text-[11px] text-[#6B7280]">2 scheduled this week</span>
            </div>
            <div className="p-3.5 rounded-xl border border-gray-100 bg-[#F9FAFB]">
              <span className="text-[11px] font-semibold text-[#6B7280] uppercase">Offers</span>
              <p className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">2</p>
              <span className="text-[11px] text-[#6B7280]">8.3% offer rate</span>
            </div>
            <div className="p-3.5 rounded-xl border border-gray-100 bg-[#F9FAFB]">
              <span className="text-[11px] font-semibold text-[#6B7280] uppercase">Rejections</span>
              <p className="text-xl sm:text-2xl font-bold text-red-600 mt-1">5</p>
              <span className="text-[11px] text-[#6B7280]">Keep momentum</span>
            </div>
          </div>

          {/* Mock Table List snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#4F46E5] flex items-center justify-center font-bold text-xs">
                  GO
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">Google</p>
                  <p className="text-xs text-[#6B7280]">Frontend Engineer</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F3E8FF] text-[#9333EA]">
                Interview
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  ST
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">Stripe</p>
                  <p className="text-xs text-[#6B7280]">Full Stack Developer</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A]">
                Offer
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16 px-6 lg:px-12 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
              Built for high-performing job seekers
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6B7280]">
              Everything you need to organize your hunt without spreadsheets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-gray-100 bg-[#F9FAFB] hover:border-[#C7D2FE] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#111827]">
                Pipeline Organization
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                Log every role with compensation, job links, referral details, and custom interview notes.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-100 bg-[#F9FAFB] hover:border-[#C7D2FE] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-[#9333EA] flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#111827]">
                Interview Tracking
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                Keep upcoming phone screens, technical rounds, and behavioral loops top of mind.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-100 bg-[#F9FAFB] hover:border-[#C7D2FE] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#111827]">
                Conversion Analytics
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                Calculate real interview rates and offer rates directly from your verified data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 px-6 lg:px-12 text-center max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#111827] text-white shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Ready to organize your next career step?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            Join thousands of graduates and developers who track their job search with ApplyTrack.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/register">
              <Button size="lg" variant="primary">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer (Section 74) */}
      <footer className="mt-auto border-t border-[#E5E7EB] bg-white py-8 px-6 lg:px-12 text-center text-xs text-[#6B7280]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo size="sm" linkTo="/" />
            <span className="text-gray-300">|</span>
            <span>Track every application. Land your next opportunity.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-[#111827] transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="hover:text-[#111827] transition-colors">
              Register
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#111827] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
        <p className="mt-4 text-gray-400">
          © {new Date().getFullYear()} ApplyTrack. Built for developer portfolios.
        </p>
      </footer>
    </div>
  );
}
