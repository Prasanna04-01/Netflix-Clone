import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/utils/cn";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * Reusable ErrorState for handling data fetching or application errors.
 * Includes an optional retry mechanism.
 */
export const ErrorState = ({
  title = "Something went wrong",
  description = "We're having trouble loading this content right now. Please try again later.",
  onRetry,
  className,
}: ErrorStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center",
        className
      )}
    >
      <div className="mb-4 rounded-full bg-nexora-red/10 p-4">
        <AlertCircle className="h-8 w-8 text-nexora-red" />
      </div>
      
      <h3 className="heading-md mb-2 text-white">{title}</h3>
      <p className="body-md mb-8 max-w-md">{description}</p>
      
      {onRetry && (
        <Button
          variant="secondary"
          onClick={onRetry}
          leftIcon={<RotateCcw className="h-4 w-4" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
