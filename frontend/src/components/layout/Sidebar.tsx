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
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-[#0E6162] text-white text-sm font-medium hover:bg-[#094849] transition-colors shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Application</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-2 space-y-6 overflow-y-auto">
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#8E98A2]">
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
                    ? "bg-[#E7F3F3] text-[#0E6162] font-semibold"
                    : "text-[#5A646E] hover:bg-[#F3E9EE]/60 hover:text-[#844C6A]"
                )}
              >
                <Icon
                  className={cn("w-4 h-4", isActive ? "text-[#0E6162]" : "text-[#8E98A2]")}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="space-y-1 pt-2 border-t border-gray-100">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#8E98A2]">
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
                    ? "bg-[#E7F3F3] text-[#0E6162] font-semibold"
                    : "text-[#5A646E] hover:bg-[#F3E9EE]/60 hover:text-[#844C6A]"
                )}
              >
                <Icon
                  className={cn("w-4 h-4", isActive ? "text-[#0E6162]" : "text-[#8E98A2]")}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-gray-100 bg-[#F8FAF9]">
        <div className="flex items-center justify-between p-2 rounded-lg">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#0E6162] text-white flex items-center justify-center font-semibold text-xs flex-shrink-0">
              {userInitials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#111827] truncate">
                {user?.full_name || "Job Seeker"}
              </p>
              <p className="text-[11px] text-[#5A646E] truncate">
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
