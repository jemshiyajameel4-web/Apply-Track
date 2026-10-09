"use client";

import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/Toast";
import { usersApi } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { User, Mail, Calendar, Save, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const { user, updateUserState } = useAuth();
  const { error: toastError, success: toastSuccess } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || fullName.trim().length < 2) {
      toastError("Full name must be at least 2 characters.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toastError("Please enter a valid email address.");
      return;
    }

    setIsSaving(true);
    try {
      const updated = await usersApi.updateProfile({
        full_name: fullName.trim(),
        email: email.trim(),
      });
      updateUserState(updated);
      toastSuccess("Profile updated successfully.");
    } catch (err: any) {
      toastError(err.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const userInitials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <AppLayout
      title="User Profile"
      subtitle="Manage your account profile information."
      showAddButton={false}
    >
      <div className="space-y-6 max-w-2xl">
        {/* Profile Identity Card */}
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4F46E5] text-white font-bold text-xl flex-shrink-0 shadow-sm">
            {userInitials}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#111827]">
              {user?.full_name}
            </h2>
            <p className="text-sm text-[#6B7280]">{user?.email}</p>
            <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF] mt-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Member since {formatDate(user?.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#4F46E5]" />
              <CardTitle>Personal Information</CardTitle>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
            />

            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                isLoading={isSaving}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}
