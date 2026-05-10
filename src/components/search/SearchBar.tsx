"use client";

import { useRef, useEffect } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { cn } from "@/utils/cn";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  className?: string;
  autoFocus?: boolean;
}

/**
 * Premium search input with clear button and focus management.
 */
export const SearchBar = ({
  value,
  onChange,
  onClear,
  className,
  autoFocus = true,
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <div className={cn("relative group w-full", className)}>
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-netflix-grey group-focus-within:text-white transition-colors" />
      
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for movies, TV shows..."
        className={cn(
          "w-full h-14 pl-12 pr-12 bg-white/5 border border-white/10 rounded-full",
          "text-lg text-white placeholder:text-netflix-grey outline-none",
          "focus:bg-white/10 focus:border-white/20 focus:ring-2 focus:ring-netflix-red/20 transition-all"
        )}
      />

      {value && (
        <button
          onClick={onClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 text-netflix-grey hover:text-white transition-all"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
