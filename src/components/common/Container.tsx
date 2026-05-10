import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "header" | "footer";
}

/**
 * Container component for consistent horizontal alignment and max-width.
 * Centralizes page layout logic.
 */
export const Container = ({
  children,
  className,
  as: Component = "div",
}: ContainerProps) => {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-(--breakpoint-2xl) page-padding",
        className
      )}
    >
      {children}
    </Component>
  );
};
