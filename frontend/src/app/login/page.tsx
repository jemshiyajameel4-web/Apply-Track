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

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#FAF7F5]">
      {/* Left Column: Dark Product Presentation (Section 10) */}
      <div className="hidden lg:flex flex-col justify-between bg-[#143B34] p-12 text-white relative overflow-hidden">
        {/* Subtle decorative shapes */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-[#006764]/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 rounded-full bg-[#E47F9C]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <Logo size="lg" textColor="text-white" linkTo="/" />
        </div>

        <div className="relative z-10 space-y-6 max-w-md">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
            Track every application.
            <br />
            <span className="text-[#E47F9C] italic">Land your next opportunity.</span>
          </h2>
          <p className="text-sm text-[#FAF7F5]/80 leading-relaxed">
            A focused, editorial career tracking workspace designed to give you total visibility and confidence in your job hunt.
          </p>

          {/* Three Feature Points */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-[#FAF7F5]/90">
              <CheckCircle2 className="w-5 h-5 text-[#E47F9C] flex-shrink-0" />
              <span>Organize applications in one unified pipeline</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#FAF7F5]/90">
              <CheckCircle2 className="w-5 h-5 text-[#E47F9C] flex-shrink-0" />
              <span>Track interview stages and upcoming schedules</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#FAF7F5]/90">
              <CheckCircle2 className="w-5 h-5 text-[#E47F9C] flex-shrink-0" />
              <span>Understand your search with verified conversion data</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-[#DCC5D1]/80">
          © {new Date().getFullYear()} ApplyTrack. All rights reserved.
        </div>
      </div>

      {/* Right Column: Warm Ivory Background Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-[#E7DEDF] shadow-sm">
          <div className="text-center sm:text-left">
            <div className="lg:hidden flex justify-center mb-6">
              <Logo size="md" />
            </div>
            <h1 className="text-2xl font-bold font-serif text-[#143B34]">
              Welcome back
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-[#687873]">
              Please enter your credentials to access your dashboard.
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
              leftIcon={<Mail className="w-4 h-4 text-[#98A5A1]" />}
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              leftIcon={<Lock className="w-4 h-4 text-[#98A5A1]" />}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full mt-2 bg-[#006764] hover:bg-[#005250] text-white shadow-xs"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-xs text-[#687873]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-bold text-[#006764] hover:underline"
            >
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
