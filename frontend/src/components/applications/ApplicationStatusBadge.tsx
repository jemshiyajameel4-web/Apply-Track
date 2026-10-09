import React from "react";
import { ApplicationStatus } from "@/types";
import { getStatusBadgeStyle } from "@/lib/utils";

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
  size?: "sm" | "md";
}

export function ApplicationStatusBadge({
  status,
  size = "md",
}: ApplicationStatusBadgeProps) {
  const styles = getStatusBadgeStyle(status);

  const sizeClass =
    size === "sm"
      ? "text-[11px] px-2 py-0.5 gap-1.5"
      : "text-xs px-2.5 py-1 gap-1.5";

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border select-none ${styles.bg} ${styles.text} ${styles.border} ${sizeClass}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
      {status}
    </span>
  );
}
