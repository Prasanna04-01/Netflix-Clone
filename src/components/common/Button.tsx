import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const variants = {
  primary: "bg-netflix-red text-white hover:bg-red-700 active:scale-95",
  secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10 active:scale-95",
  ghost: "bg-transparent text-white hover:bg-white/5 active:scale-95",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-6 py-2.5 text-base font-semibold",
  lg: "px-8 py-3 text-lg font-bold",
};

/**
 * Reusable Button component with a robust variant architecture.
 * Supports loading states, icons, and accessible attributes.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
        )}
        
        {!isLoading && leftIcon && (
          <span className="shrink-0">{leftIcon}</span>
        )}
        
        <span className={cn(isLoading && "opacity-0")}>
          {children}
        </span>

        {!isLoading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
