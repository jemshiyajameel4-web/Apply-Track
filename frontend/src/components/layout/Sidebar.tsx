"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  User,
  Settings,
  LogOut,
  PlusCircle,
  X,
} from "lucide-react";

interface SidebarProps {
  onCloseMobile?: () => void;
}

export function Sidebar({ onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const mainNav = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Applications",
      href: "/applications",
      icon: BriefcaseBusiness,
    },
  ];

  const secondaryNav = [
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  const userInitials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <aside className="flex flex-col h-full w-[240px] bg-white border-r border-[#E5E7EB] select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-gray-100">
        <Logo size="md" linkTo="/dashboard" />
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>


      {/* Quick Action */}
      <div className="p-4 pb-2">
        <Link
          href="/applications/new"
          onClick={onCloseMobile}
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-[#4F46E5] text-white text-sm font-medium hover:bg-[#4338CA] transition-colors shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Application</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-2 space-y-6 overflow-y-auto">
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
            Overview
          </p>
          {mainNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/applications" && pathname.startsWith("/applications"));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#EEF2FF] text-[#4F46E5]"
                    : "text-[#6B7280] hover:bg-gray-50 hover:text-[#111827]"
                )}
              >
                <Icon
                  className={cn("w-4 h-4", isActive ? "text-[#4F46E5]" : "text-[#9CA3AF]")}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="space-y-1 pt-2 border-t border-gray-100">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
            Account
          </p>
          {secondaryNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#EEF2FF] text-[#4F46E5]"
                    : "text-[#6B7280] hover:bg-gray-50 hover:text-[#111827]"
                )}
              >
                <Icon
                  className={cn("w-4 h-4", isActive ? "text-[#4F46E5]" : "text-[#9CA3AF]")}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-gray-100 bg-[#F9FAFB]/50">
        <div className="flex items-center justify-between p-2 rounded-lg">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">
              {userInitials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#111827] truncate">
                {user?.full_name || "Job Seeker"}
              </p>
              <p className="text-[11px] text-[#6B7280] truncate">
                {user?.email || "user@applytrack.io"}
              </p>
            </div>
          </div>

          <button
            onClick={() => logout()}
            title="Sign out"
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
