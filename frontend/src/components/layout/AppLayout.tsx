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
  showBackButton?: boolean;
  backHref?: string;
}

export function AppLayout({
  children,
  title,
  subtitle,
  showAddButton = true,
  showBackButton = false,
  backHref,
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
      <div className="flex min-h-screen items-center justify-center bg-[#FAF7F5]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#006764]" />
          <p className="text-sm font-medium text-[#687873]">
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
    <div className="flex min-h-screen bg-[#FAF7F5] text-[#19332F] w-full overflow-x-hidden">
      {/* Desktop Sidebar (Fixed 248px) */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-[248px] lg:flex-col">
        <Sidebar />
      </div>

      {/* Mobile Drawer Navigation (Section 70) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-[#143B34]/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sliding Sidebar */}
          <div className="fixed inset-y-0 left-0 w-[248px] bg-[#143B34] shadow-2xl transition-transform animate-in slide-in-from-left duration-200">
            <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:pl-[248px] w-full min-w-0 overflow-x-hidden">
        <Header
          title={title}
          subtitle={subtitle}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          showAddButton={showAddButton}
          showBackButton={showBackButton}
          backHref={backHref}
        />

        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}

