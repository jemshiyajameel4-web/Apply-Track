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
        bg: "bg-[#E7F3F3]",
        text: "text-[#0E6162]",
        dot: "bg-[#0E6162]",
        border: "border-[#CCE7E8]",
      };
    case "Interview":
      return {
        bg: "bg-[#F3E9EE]",
        text: "text-[#844C6A]",
        dot: "bg-[#844C6A]",
        border: "border-[#D8C2CE]",
      };
    case "Technical Round":
      return {
        bg: "bg-[#FCF2F5]",
        text: "text-[#DE7A96]",
        dot: "bg-[#DE7A96]",
        border: "border-[#F7C5D4]",
      };
    case "Offer":
      return {
        bg: "bg-[#E7EFEA]",
        text: "text-[#132E27]",
        dot: "bg-[#132E27]",
        border: "border-[#C4D9CD]",
      };
    case "Rejected":
      return {
        bg: "bg-[#F2EFF1]",
        text: "text-[#6F5B66]",
        dot: "bg-[#8E7985]",
        border: "border-[#DDD5D9]",
      };
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-700",
        dot: "bg-gray-500",
        border: "border-gray-200",
      };
  }
}
