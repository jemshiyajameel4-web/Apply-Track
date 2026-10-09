"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Menu, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onOpenMobileMenu: () => void;
  showAddButton?: boolean;
}

export function Header({
  title,
  subtitle,
  onOpenMobileMenu,
  showAddButton = true,
}: HeaderProps) {
  const { user } = useAuth();

  const userInitials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-[#E5E7EB] bg-white/95 px-3 sm:px-6 lg:px-8 backdrop-blur-xs">
      {/* Left side: Mobile Hamburger & Page Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden flex-shrink-0"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {title && (
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg lg:text-xl font-bold text-[#111827] tracking-tight truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="hidden md:block text-xs text-[#6B7280] truncate">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Right side: Action Button & User Avatar */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {showAddButton && (
          <Link href="/applications/new">
            <Button
              size="sm"
              variant="primary"
              leftIcon={<Plus className="w-4 h-4" />}
              className="text-xs sm:text-sm px-2.5 sm:px-3.5"
            >
              <span className="hidden sm:inline">Add Application</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </Link>
        )}

        <Link
          href="/profile"
          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#E7F3F3] text-[#0E6162] font-bold text-xs border border-[#CCE7E8] hover:ring-2 hover:ring-[#0E6162]/20 transition-all flex-shrink-0"
          title={user?.full_name || "Profile"}
        >
          {userInitials}
        </Link>
      </div>
    </header>
  );
}

