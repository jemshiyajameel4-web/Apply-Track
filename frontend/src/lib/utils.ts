import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApplicationStatus, Currency, SalaryPeriod } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "—";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatRelativeDate(dateString: string | null | undefined): string {
  if (!dateString) return "—";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays > 1 && diffDays < 30) return `${diffDays} days ago`;
    if (diffDays >= 30) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    }
    // Future date
    const futureDays = Math.abs(diffDays);
    if (futureDays === 1) return "Tomorrow";
    return `In ${futureDays} days`;
  } catch {
    return dateString;
  }
}

export function formatSalary(
  amount: number | null | undefined,
  currency: Currency = "INR",
  period: SalaryPeriod | null = "Annual"
): string {
  if (amount === null || amount === undefined || isNaN(amount) || amount === 0) {
    return "Not specified";
  }

  const currencySymbols: Record<Currency, string> = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const symbol = currencySymbols[currency] || "₹";
  const formattedNumber = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);

  const periodLabel =
    period === "Monthly" ? "/mo" : period === "Hourly" ? "/hr" : "/yr";

  return `${symbol}${formattedNumber} ${periodLabel}`;
}

export function getStatusBadgeStyle(status: ApplicationStatus): {
  bg: string;
  text: string;
  dot: string;
  border: string;
} {
  switch (status) {
    case "Applied":
      return {
        bg: "bg-[#E6F3F2]",
        text: "text-[#006764]",
        dot: "bg-[#006764]",
        border: "border-[#B2DCDA]",
      };
    case "Interview":
      return {
        bg: "bg-[#F5EEF2]",
        text: "text-[#925775]",
        dot: "bg-[#925775]",
        border: "border-[#DCC5D1]",
      };
    case "Technical Round":
      return {
        bg: "bg-[#FDF1F4]",
        text: "text-[#C96582]",
        dot: "bg-[#E47F9C]",
        border: "border-[#F7C9D6]",
      };
    case "Offer":
      return {
        bg: "bg-[#E8F3EE]",
        text: "text-[#143B34]",
        dot: "bg-[#143B34]",
        border: "border-[#C5DFD2]",
      };
    case "Rejected":
      return {
        bg: "bg-[#F5EFF2]",
        text: "text-[#7A6A72]",
        dot: "bg-[#9E8C95]",
        border: "border-[#E5D9DE]",
      };
    default:
      return {
        bg: "bg-[#FAF7F5]",
        text: "text-[#687873]",
        dot: "bg-[#98A5A1]",
        border: "border-[#E7DEDF]",
      };
  }
}
