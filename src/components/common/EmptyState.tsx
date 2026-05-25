import { SearchX } from "lucide-react";
import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/**
 * Reusable EmptyState for zero-result screens (e.g., search, my list).
 */
export const EmptyState = ({
  title = "No results found",
  description = "Try adjusting your filters or search terms to find what you're looking for.",
  icon = <SearchX className="h-12 w-12 text-nexora-grey" />,
  className,
  children,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center",
        className
      )}
    >
      <div className="mb-6 opacity-50">{icon}</div>
      
      <h3 className="heading-md mb-2 text-white/90">{title}</h3>
      <p className="body-md mb-8 max-w-sm">{description}</p>
      
      {children}
    </div>
  );
};
