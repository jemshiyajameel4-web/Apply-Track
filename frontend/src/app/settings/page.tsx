"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/Toast";
import { usersApi } from "@/lib/api";
import {
  Lock,
  Sun,
  Shield,
  LogOut,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function SettingsPage() {
  const { logout } = useAuth();
  const { error: toastError, success: toastSuccess } = useToast();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      toastError("Current password is required.");
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      toastError("New password must be at least 8 characters long.");
      return;
    }

    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      toastError("New password must contain uppercase, lowercase, and numeric characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toastError("New passwords do not match.");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await usersApi.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      });
      toastSuccess("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toastError(err.message || "Failed to update password.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <AppLayout
      title="Settings"
      subtitle="Manage your account security and preferences."
      showAddButton={false}
    >
      <div className="space-y-6 max-w-2xl">
        {/* Security / Password Card (Section 34) */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#0E6162]" />
              <CardTitle>Security & Password</CardTitle>
            </div>
            <span className="text-xs text-[#8E98A2]">Update credentials</span>
          </CardHeader>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <Input
              label="New Password"
              type="password"
              placeholder="Min 8 chars, uppercase, lowercase, and number"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
            />

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                isLoading={isUpdatingPassword}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Update Password
              </Button>
            </div>
          </form>
        </Card>

        {/* Appearance Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <CardTitle>Appearance & Theme</CardTitle>
            </div>
          </CardHeader>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
            <div>
              <p className="text-sm font-semibold text-[#111827]">
                Light SaaS Mode
              </p>
              <p className="text-xs text-[#6B7280]">
                ApplyTrack is optimized for clean, high-contrast light presentation.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" /> Active
            </span>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-100">
          <CardHeader className="border-red-50">
            <div className="flex items-center gap-2 text-[#DC2626]">
              <LogOut className="w-4 h-4" />
              <CardTitle className="text-[#DC2626]">Account Session</CardTitle>
            </div>
          </CardHeader>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#111827]">
                Sign Out
              </p>
              <p className="text-xs text-[#6B7280]">
                Terminate active session on this device.
              </p>
            </div>

            <Button variant="danger" size="sm" onClick={() => logout()}>
              Log Out
            </Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
