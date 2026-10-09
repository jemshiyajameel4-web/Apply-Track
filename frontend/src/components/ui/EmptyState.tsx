import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Inbox } from "lucide-react";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-gray-200 bg-white/50",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-400 mb-3 border border-gray-100">
        {icon || <Inbox className="w-6 h-6" />}
      </div>
      <h3 className="text-base font-semibold text-[#111827]">{title}</h3>
      <p className="mt-1 text-sm text-[#6B7280] max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-4">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
