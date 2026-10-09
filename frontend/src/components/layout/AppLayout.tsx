"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Loader2 } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showAddButton?: boolean;
}

export function AppLayout({
  children,
  title,
  subtitle,
  showAddButton = true,
}: AppLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Handle ESC key to close mobile drawer (Section 70)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8FA]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#0E6162]" />
          <p className="text-sm font-medium text-[#5A646E]">
            Loading ApplyTrack...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#F7F8FA] text-[#111827] w-full overflow-x-hidden">
      {/* Desktop Sidebar (Fixed 240px) */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-[240px] lg:flex-col">
        <Sidebar />
      </div>

      {/* Mobile Drawer Navigation (Section 70) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sliding Sidebar */}
          <div className="fixed inset-y-0 left-0 w-[260px] bg-white shadow-2xl transition-transform animate-in slide-in-from-left duration-200">
            <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:pl-[240px] w-full min-w-0 overflow-x-hidden">
        <Header
          title={title}
          subtitle={subtitle}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          showAddButton={showAddButton}
        />

        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}

