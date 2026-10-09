import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F7F8FA] text-center">
      <Logo size="lg" className="mb-6" />

      <span className="text-6xl font-extrabold text-[#0E6162] tracking-tight">
        404
      </span>
      <h1 className="mt-3 text-2xl font-bold text-[#111827]">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-[#6B7280] max-w-sm">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <div className="mt-6 flex items-center gap-3">
        <Link href="/dashboard">
          <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>
            Dashboard
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
