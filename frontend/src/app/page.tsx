"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { CareerHeroIllustration } from "@/components/illustrations/CareerHeroIllustration";
import {
  Briefcase,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  BarChart3,
  Search,
  Check,
  Target,
  Award,
} from "lucide-react";

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#19332F] flex flex-col selection:bg-[#E47F9C]/30">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E7DEDF] bg-[#FAF7F5]/90 px-6 backdrop-blur-md lg:px-12">
        <Logo size="md" />

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button
                variant="primary"
                size="sm"
                className="bg-[#006764] hover:bg-[#005250] text-white shadow-xs"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#19332F] hover:bg-[#FAF7F5] hover:text-[#006764]"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-[#006764] hover:bg-[#005250] text-white shadow-xs"
                >
                  Get Started Free
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section: Asymmetrical 2-column composition (Section 12) */}
      <section className="relative px-6 pt-12 pb-16 lg:px-12 lg:pt-20 lg:pb-24 max-w-7xl mx-auto w-full">
        {/* Subtle decorative background glow */}
        <div className="pointer-events-none absolute -top-10 -left-10 w-96 h-96 rounded-full bg-[#E6F3F2]/60 blur-3xl -z-10" />
        <div className="pointer-events-none absolute top-40 right-10 w-80 h-80 rounded-full bg-[#F5EEF2]/60 blur-3xl -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F3F2] border border-[#B2DCDA] text-[#006764] text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#E47F9C]" />
              <span>Career Opportunity Tracker</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#143B34] tracking-tight leading-[1.15]">
              Your next chapter starts with{" "}
              <span className="text-[#925775] italic">one application</span>.
            </h1>

            <p className="text-base sm:text-lg text-[#687873] max-w-xl leading-relaxed font-normal">
              Bring your job search into focus. Organize opportunities, follow
              interview progress, and see how far you have come with real-time
              conversion analytics.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link href={isAuthenticated ? "/dashboard" : "/register"}>
                <Button
                  size="lg"
                  variant="primary"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="bg-[#006764] hover:bg-[#005250] text-white w-full sm:w-auto shadow-md"
                >
                  Start tracking
                </Button>
              </Link>
              <Link href={isAuthenticated ? "/dashboard" : "/login"}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#E7DEDF] bg-white text-[#19332F] hover:bg-[#FAF7F5] w-full sm:w-auto"
                >
                  Explore the dashboard
                </Button>
              </Link>
            </div>

            {/* Micro highlights */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#687873] border-t border-[#E7DEDF]/60">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#006764]" />
                <span>Zero spreadsheet chaos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#006764]" />
                <span>Interview timeline reminders</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#006764]" />
                <span>Real conversion rates</span>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Illustration & Live Card Mockups */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* Central Vector Hero Art */}
              <div className="relative z-10 w-full flex justify-center">
                <CareerHeroIllustration className="w-full max-w-md h-auto" />
              </div>

              {/* Floating Mini Application Card 1 */}
              <div className="absolute -top-4 -left-4 z-20 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl border border-[#E7DEDF] shadow-lg animate-float max-w-[210px] hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#E6F3F2] text-[#006764] font-bold text-xs flex items-center justify-center border border-[#B2DCDA]">
                    GO
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#19332F] truncate">
                      Google
                    </p>
                    <p className="text-[10px] text-[#687873] truncate">
                      Frontend Engineer
                    </p>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-semibold bg-[#F5EEF2] text-[#925775] px-2 py-0.5 rounded-md border border-[#DCC5D1]">
                    Interview Round 2
                  </span>
                  <span className="text-[10px] text-[#98A5A1]">Tomorrow</span>
                </div>
              </div>

              {/* Floating Mini Card 2: Offer */}
              <div className="absolute -bottom-4 -right-2 z-20 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl border border-[#E7DEDF] shadow-lg animate-float-delayed max-w-[200px] hidden sm:block">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#E8F3EE] text-[#143B34] flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#143B34] block">
                      Offer Received
                    </span>
                    <p className="text-xs font-bold text-[#19332F]">Stripe • ₹28 LPA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section: 3 Clear Steps */}
      <section className="py-16 px-6 lg:px-12 bg-white border-y border-[#E7DEDF]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#925775]">
              SIMPLE THREE-STEP WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#143B34] mt-1">
              How ApplyTrack powers your search
            </h2>
            <p className="mt-2 text-sm text-[#687873]">
              From the moment you hit submit on a job board to your signed offer letter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl border border-[#E7DEDF] bg-[#FAF7F5] relative group hover:border-[#006764]/40 transition-all shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#006764] text-white flex items-center justify-center font-bold text-sm mb-4 shadow-sm">
                1
              </div>
              <h3 className="text-base font-bold text-[#19332F] mb-2">
                Add your applications
              </h3>
              <p className="text-xs sm:text-sm text-[#687873] leading-relaxed">
                Log company names, salary expectations, locations, job URLs, and initial recruiter notes in seconds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl border border-[#E7DEDF] bg-[#FAF7F5] relative group hover:border-[#925775]/40 transition-all shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#925775] text-white flex items-center justify-center font-bold text-sm mb-4 shadow-sm">
                2
              </div>
              <h3 className="text-base font-bold text-[#19332F] mb-2">
                Track every stage
              </h3>
              <p className="text-xs sm:text-sm text-[#687873] leading-relaxed">
                Move status seamlessly from Applied through Technical Rounds and Final Interviews with clear date badges.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl border border-[#E7DEDF] bg-[#FAF7F5] relative group hover:border-[#143B34]/40 transition-all shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#143B34] text-white flex items-center justify-center font-bold text-sm mb-4 shadow-sm">
                3
              </div>
              <h3 className="text-base font-bold text-[#19332F] mb-2">
                Prepare for your next opportunity
              </h3>
              <p className="text-xs sm:text-sm text-[#687873] leading-relaxed">
                Keep questions, prep notes, and meeting dates organized so you walk into discussions ready to succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section (Section 12 Headings) */}
      <section className="py-16 px-6 lg:px-12 bg-[#FAF7F5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#006764]">
              DESIGNED FOR PURPOSE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#143B34] mt-1">
              Everything in focus. Nothing lost.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl border border-[#E7DEDF] bg-white shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E6F3F2] text-[#006764] flex items-center justify-center flex-shrink-0 border border-[#B2DCDA]">
                <Layers className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-[#19332F]">
                  Every application, organized
                </h3>
                <p className="text-xs sm:text-sm text-[#687873] leading-relaxed">
                  Search, filter, and sort your entire job pipeline with instant status indicators and compensation tags.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl border border-[#E7DEDF] bg-white shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F5EEF2] text-[#925775] flex items-center justify-center flex-shrink-0 border border-[#DCC5D1]">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-[#19332F]">
                  Your next interview, in focus
                </h3>
                <p className="text-xs sm:text-sm text-[#687873] leading-relaxed">
                  Dedicated interview schedule view that highlights upcoming rounds and preparation milestones.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl border border-[#E7DEDF] bg-white shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FDF1F4] text-[#C96582] flex items-center justify-center flex-shrink-0 border border-[#F7C9D6]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-[#19332F]">
                  Progress you can actually see
                </h3>
                <p className="text-xs sm:text-sm text-[#687873] leading-relaxed">
                  Visual funnel analytics and status distributions computed strictly from your live verified applications.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl border border-[#E7DEDF] bg-white shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8F3EE] text-[#143B34] flex items-center justify-center flex-shrink-0 border border-[#C5DFD2]">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-[#19332F]">
                  Your opportunities, all in one place
                </h3>
                <p className="text-xs sm:text-sm text-[#687873] leading-relaxed">
                  Store job descriptions, salary benchmarks, recruiter details, and timeline logs securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA Section (Deep Forest Green, Section 12) */}
      <section className="py-16 px-6 lg:px-12 max-w-6xl mx-auto w-full">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#143B34] text-white shadow-xl relative overflow-hidden text-center">
          <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#006764]/40 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#E47F9C]/15 blur-2xl" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#DCC5D1]">
              CAREER EMPOWERMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Make every application count.
            </h2>
            <p className="text-sm sm:text-base text-[#FAF7F5]/80 max-w-lg mx-auto">
              Track opportunities with clarity and focus. Get started today and stay organized through your dream offer.
            </p>
            <div className="pt-4 flex justify-center">
              <Link href={isAuthenticated ? "/dashboard" : "/register"}>
                <Button
                  size="lg"
                  className="bg-[#E47F9C] hover:bg-[#d96e8d] text-[#143B34] font-bold px-8 shadow-md border-none"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Get started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E7DEDF] bg-white py-8 px-6 lg:px-12 text-xs text-[#687873]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size="sm" linkTo="/" />
            <span className="text-[#E7DEDF]">|</span>
            <span>Track every application. Land your next opportunity.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-[#006764] transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="hover:text-[#006764] transition-colors">
              Register
            </Link>
            <Link href="/dashboard" className="hover:text-[#006764] transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
        <p className="mt-4 text-center text-[#98A5A1]">
          © {new Date().getFullYear()} ApplyTrack. Built for career excellence.
        </p>
      </footer>
    </div>
  );
}
