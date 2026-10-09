import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCount?: boolean;
  maxLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      showCount = true,
      maxLength = 2000,
      value,
      defaultValue,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const currentLength =
      typeof value === "string"
        ? value.length
        : typeof defaultValue === "string"
        ? defaultValue.length
        : 0;

    return (
      <div className="w-full space-y-1.5">
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={textareaId}
              className="block text-sm font-medium text-[#111827]"
            >
              {label}
              {required && <span className="text-[#DC2626] ml-1">*</span>}
            </label>
          )}

          {showCount && maxLength && (
            <span className="text-xs text-[#9CA3AF]">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>

        <textarea
          id={textareaId}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          required={required}
          className={cn(
            "w-full min-h-[100px] rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#111827] placeholder-gray-400 transition-colors",
            "focus:border-[#0E6162] focus:outline-none focus:ring-2 focus:ring-[#E7F3F3]",
            "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
            error
              ? "border-[#C24B6E] focus:border-[#C24B6E] focus:ring-[#FCF2F5]"
              : "border-[#E2E8E5] hover:border-[#D8C2CE]",
            className
          )}
          {...props}
        />

        {error && (
          <p className="text-xs font-medium text-[#DC2626]">{error}</p>
        )}

        {!error && helperText && (
          <p className="text-xs text-[#6B7280]">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
