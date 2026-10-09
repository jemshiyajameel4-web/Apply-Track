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
  User as UserIcon,
  ArrowRight,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { error: toastError, success: toastSuccess } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = "Full name must be at least 2 characters";
    }

    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = "Please enter a valid email address";
    }

    if (!password) {
      errs.password = "Password is required";
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      errs.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      errs.password = "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(password)) {
      errs.password = "Password must contain at least one number";
    }

    if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await register({
        full_name: fullName.trim(),
        email: email.trim(),
        password,
        confirm_password: confirmPassword,
      });
      toastSuccess("Account created successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      toastError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F7F8FA]">
      {/* Left Column: Brand/Product presentation */}
      <div className="hidden lg:flex flex-col justify-between bg-[#111827] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-[#4F46E5]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <Logo size="lg" textColor="text-white" linkTo="/" />
        </div>

        <div className="relative z-10 space-y-6 max-w-md">
          <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Start organizing your
            <br />
            <span className="text-[#818CF8]">career journey today.</span>
          </h2>
          <p className="text-sm text-gray-300">
            Create your account to unlock application pipelines, interview schedules, and realtime job-search metrics.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-[#818CF8] flex-shrink-0" />
              <span>100% Free for job seekers and students</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-[#818CF8] flex-shrink-0" />
              <span>Full private data isolation</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-[#818CF8] flex-shrink-0" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-gray-400">
          © {new Date().getFullYear()} ApplyTrack. All rights reserved.
        </div>
      </div>

      {/* Right Column: Registration Form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-[#E5E7EB] shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
          <div className="text-center sm:text-left">
            <div className="lg:hidden flex justify-center mb-6">
              <Logo size="md" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#111827]">
              Create an account
            </h1>
            <p className="mt-1.5 text-sm text-[#6B7280]">
              Get started with your personalized job tracker.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-3.5">
            <Input
              label="Full Name"
              placeholder="Sarah Jenkins"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
              leftIcon={<UserIcon className="w-4 h-4" />}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="sarah@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Password"
              type="password"
              placeholder="At least 8 chars with uppercase & number"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full mt-2"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-xs text-[#6B7280]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#4F46E5] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
