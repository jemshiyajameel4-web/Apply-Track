"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Menu, Plus, Search, Bell, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onOpenMobileMenu: () => void;
  showAddButton?: boolean;
  showBackButton?: boolean;
  backHref?: string;
}

export function Header({
  title,
  subtitle,
  onOpenMobileMenu,
  showAddButton = true,
  showBackButton = false,
  backHref,
}: HeaderProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [headerSearch, setHeaderSearch] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      router.push(`/applications?search=${encodeURIComponent(headerSearch.trim())}`);
    } else {
      router.push("/applications");
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
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-[#E7DEDF] bg-white/95 px-3 sm:px-6 lg:px-8 backdrop-blur-md">
      {/* Left side: Back Button, Mobile Hamburger & Page Title */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="rounded-xl p-2 text-[#19332F] hover:bg-[#FAF7F5] border border-transparent hover:border-[#E7DEDF] lg:hidden flex-shrink-0 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {showBackButton && (
          <button
            onClick={() => (backHref ? router.push(backHref) : router.back())}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#E7DEDF] bg-[#FAF7F5] text-xs font-semibold text-[#19332F] hover:bg-white hover:border-[#006764] hover:text-[#006764] transition-all flex-shrink-0 group shadow-2xs"
            title="Go back"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#006764] group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Back</span>
          </button>
        )}

        {title && (
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg lg:text-xl font-bold text-[#19332F] tracking-tight truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="hidden md:block text-xs text-[#687873] truncate">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Center/Right: Quick Search bar (Desktop) */}
      <div className="hidden md:flex items-center flex-1 max-w-xs mx-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#98A5A1]" />
          <input
            type="text"
            placeholder="Search roles, companies..."
            value={headerSearch}
            onChange={(e) => setHeaderSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF7F5] border border-[#E7DEDF] rounded-xl text-[#19332F] placeholder-[#98A5A1] focus:outline-none focus:border-[#006764] focus:ring-2 focus:ring-[#E6F3F2] transition-all"
          />
        </form>
      </div>

      {/* Right side: Actions & User Avatar */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Quick link to Interviews notification */}
        <Link
          href="/interviews"
          className="relative p-2 rounded-xl text-[#687873] hover:text-[#006764] hover:bg-[#FAF7F5] border border-transparent hover:border-[#E7DEDF] transition-all"
          title="Interview Calendar"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E47F9C]" />
        </Link>

        {showAddButton && (
          <Link href="/applications/new">
            <Button
              size="sm"
              variant="primary"
              leftIcon={<Plus className="w-4 h-4" />}
              className="text-xs sm:text-xs font-semibold px-2.5 sm:px-3.5 shadow-sm hover:shadow-md"
            >
              <span className="hidden sm:inline">+ Add Application</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </Link>
        )}

        <Link
          href="/profile"
          className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-[#E6F3F2] text-[#006764] font-bold text-xs border border-[#B2DCDA] hover:border-[#006764] hover:ring-2 hover:ring-[#006764]/15 transition-all flex-shrink-0"
          title={user?.full_name || "Profile"}
        >
          {userInitials}
        </Link>
      </div>
    </header>
  );
}


