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
      subtitle="Manage your personal career account and contact details."
      showAddButton={false}
    >
      <div className="space-y-6 max-w-2xl">
        {/* Profile Identity Card */}
        <div className="rounded-2xl border border-[#E7DEDF] bg-white p-6 shadow-sm flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#006764] text-white font-bold text-xl flex-shrink-0 shadow-sm border-2 border-[#E47F9C]/40">
            {userInitials}
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif text-[#143B34]">
              {user?.full_name}
            </h2>
            <p className="text-xs sm:text-sm text-[#687873]">{user?.email}</p>
            <div className="flex items-center gap-1.5 text-xs text-[#98A5A1] mt-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Member since {formatDate(user?.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <Card className="border-[#E7DEDF] rounded-2xl shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#006764]" />
              <CardTitle className="text-base font-bold text-[#19332F]">Personal Information</CardTitle>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              leftIcon={<User className="w-4 h-4 text-[#98A5A1]" />}
            />

            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4 text-[#98A5A1]" />}
            />

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                isLoading={isSaving}
                leftIcon={<Save className="w-4 h-4" />}
                className="bg-[#006764] hover:bg-[#005250] text-white shadow-xs"
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
