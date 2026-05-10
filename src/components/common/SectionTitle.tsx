import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  subtitle?: string;
}

/**
 * Reusable SectionTitle for consistent heading styles across movie rows and pages.
 */
export const SectionTitle = ({
  children,
  className,
  subtitle,
}: SectionTitleProps) => {
  return (
    <div className={cn("mb-4 md:mb-6", className)}>
      <h2 className="heading-md text-white/90 transition-colors hover:text-white inline-block cursor-default">
        {children}
      </h2>
      {subtitle && (
        <p className="body-md mt-1 text-netflix-grey">{subtitle}</p>
      )}
    </div>
  );
};
