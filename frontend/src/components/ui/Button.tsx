import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      leftIcon,
      rightIcon,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variantStyles = {
      primary:
        "bg-[#0E6162] text-white hover:bg-[#094849] active:bg-[#063637] focus:ring-[#0E6162] shadow-sm",
      secondary:
        "bg-[#E7F3F3] text-[#0E6162] hover:bg-[#CCE7E8] active:bg-[#99CFCF] focus:ring-[#0E6162]",
      outline:
        "border border-[#E2E8E5] bg-white text-[#111827] hover:bg-[#F8FAF9] hover:border-[#D8C2CE] active:bg-[#E7F3F3] focus:ring-[#0E6162] shadow-xs",
      danger:
        "bg-[#C24B6E] text-white hover:bg-[#A8385A] active:bg-[#8F2646] focus:ring-[#C24B6E] shadow-sm",
      ghost:
        "bg-transparent text-[#5A646E] hover:bg-[#F3E9EE] hover:text-[#844C6A] focus:ring-gray-400",
      link: "bg-transparent text-[#0E6162] hover:underline p-0 h-auto font-normal focus:ring-0",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2 gap-2",
      lg: "text-base px-5 py-2.5 gap-2.5",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          variant !== "link" && sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
