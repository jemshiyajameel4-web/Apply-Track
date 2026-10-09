"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  BarChart3,
  User,
  Settings,
  LogOut,
  PlusCircle,
  X,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  onCloseMobile?: () => void;
}

export function Sidebar({ onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const mainNav = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Applications",
      href: "/applications",
      icon: Briefcase,
    },
    {
      name: "Interview Calendar",
      href: "/interviews",
      icon: Calendar,
    },
    {
      name: "Insights",
      href: "/insights",
      icon: BarChart3,
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
    <aside className="relative flex flex-col h-full w-[248px] bg-[#143B34] text-[#FAF7F5] select-none border-r border-[#0D2722] overflow-hidden shadow-xl">
      {/* Background low-contrast organic decorative shapes near bottom (Section 6.A) */}
      <div className="pointer-events-none absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-[#006764]/20 blur-2xl" />
      <div className="pointer-events-none absolute bottom-24 -left-12 w-32 h-32 rounded-full bg-[#925775]/15 blur-xl" />

      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-[#1D544A]/40 flex-shrink-0">
        <Logo size="md" textColor="text-white" linkTo="/dashboard" />
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-[#1D544A] transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Quick Action Button */}
      <div className="p-3.5 pb-2 flex-shrink-0">
        <Link
          href="/applications/new"
          onClick={onCloseMobile}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3.5 rounded-xl bg-[#006764] text-white text-xs font-semibold hover:bg-[#005250] active:bg-[#003D3B] transition-all shadow-sm hover:shadow-md border border-[#006764]/60 group"
        >
          <PlusCircle className="w-4 h-4 text-[#E47F9C] group-hover:rotate-90 transition-transform duration-200" />
          <span>+ Add Application</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-3 space-y-6 overflow-y-auto z-10 scrollbar-none">
        {/* Main Section */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#DCC5D1]/60">
            Menu
          </p>
          {mainNav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/applications" && pathname.startsWith("/applications") && pathname !== "/applications/new");
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 relative",
                  isActive
                    ? "bg-[#006764] text-white font-semibold shadow-xs"
                    : "text-[#FAF7F5]/75 hover:bg-[#1D544A]/60 hover:text-white"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#E47F9C] rounded-r-full" />
                )}
                <Icon
                  className={cn(
                    "w-4 h-4 flex-shrink-0 transition-colors",
                    isActive ? "text-[#E47F9C]" : "text-[#DCC5D1]/70"
                  )}
                />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Account Section */}
        <div className="space-y-1 pt-3 border-t border-[#1D544A]/40">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#DCC5D1]/60">
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
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 relative",
                  isActive
                    ? "bg-[#006764] text-white font-semibold shadow-xs"
                    : "text-[#FAF7F5]/75 hover:bg-[#1D544A]/60 hover:text-white"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#E47F9C] rounded-r-full" />
                )}
                <Icon
                  className={cn(
                    "w-4 h-4 flex-shrink-0 transition-colors",
                    isActive ? "text-[#E47F9C]" : "text-[#DCC5D1]/70"
                  )}
                />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Footer Profile (Section 6.A) */}
      <div className="p-3 border-t border-[#1D544A]/40 bg-[#0D2722]/60 z-10 flex-shrink-0">
        <div className="flex items-center justify-between p-1.5 rounded-xl">
          <Link
            href="/profile"
            onClick={onCloseMobile}
            className="flex items-center gap-2.5 min-w-0 hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-[#006764] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 border border-[#E47F9C]/40">
              {userInitials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {user?.full_name || "Job Seeker"}
              </p>
              <p className="text-[10px] text-[#DCC5D1]/70 truncate">
                {user?.email || "user@applytrack.io"}
              </p>
            </div>
          </Link>

          <button
            onClick={() => logout()}
            title="Sign out"
            className="p-1.5 text-gray-300 hover:text-[#E47F9C] hover:bg-[#1D544A] rounded-lg transition-colors flex-shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

