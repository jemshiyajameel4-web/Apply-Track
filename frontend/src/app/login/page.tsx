"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "@/components/ui/Logo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import {
  CheckCircle2,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { error: toastError, success: toastSuccess } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = "Please enter a valid email address";
    }

    if (!password) {
      errs.password = "Password is required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await login({ email: email.trim(), password });
      toastSuccess("Welcome back!");
      router.push("/dashboard");
    } catch (err: any) {
      toastError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail("demo@applytrack.io");
    setPassword("Password123");
    setErrors({});
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F7F8FA]">
      {/* Left Column: Dark Product Presentation (Section 10) */}
      <div className="hidden lg:flex flex-col justify-between bg-[#111827] p-12 text-white relative overflow-hidden">
        {/* Subtle decorative shapes */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-[#4F46E5]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <Logo size="lg" textColor="text-white" linkTo="/" />
        </div>

        <div className="relative z-10 space-y-6 max-w-md">
          <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Track every application.
            <br />
            <span className="text-[#818CF8]">Land your next opportunity.</span>
          </h2>
          <p className="text-sm text-gray-300">
            A focused, modern tracking system designed to give you total visibility and confidence in your job hunt.
          </p>

          {/* Three Feature Points (Section 10) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-[#818CF8] flex-shrink-0" />
              <span>Organize applications in one unified pipeline</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-[#818CF8] flex-shrink-0" />
              <span>Track interview stages and upcoming schedules</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-[#818CF8] flex-shrink-0" />
              <span>Understand your search with realtime conversion data</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-gray-400">
          © {new Date().getFullYear()} ApplyTrack. All rights reserved.
        </div>
      </div>

      {/* Right Column: White Background Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-[#E5E7EB] shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
          <div className="text-center sm:text-left">
            <div className="lg:hidden flex justify-center mb-6">
              <Logo size="md" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#111827]">
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-[#6B7280]">
              Please enter your details to sign in to your dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              leftIcon={<Lock className="w-4 h-4" />}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full mt-2"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>

          {/* Demo Account Quick Fill Button */}
          <div className="pt-2 border-t border-gray-100 text-center">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="inline-flex items-center gap-1.5 text-xs text-[#4F46E5] hover:text-[#4338CA] font-semibold transition-colors bg-[#EEF2FF] px-3 py-1.5 rounded-lg border border-[#C7D2FE]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autofill Demo Credentials (demo@applytrack.io)</span>
            </button>
          </div>

          <p className="text-center text-xs text-[#6B7280]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#4F46E5] hover:underline"
            >
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
