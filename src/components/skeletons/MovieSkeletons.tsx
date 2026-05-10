"use client";

import { cn } from "@/utils/cn";

/**
 * Skeleton loader for a single movie card.
 */
export const MovieCardSkeleton = () => {
  return (
    <div className="relative aspect-[2/3] w-full min-w-[140px] md:min-w-[180px] lg:min-w-[220px] rounded-md bg-white/5 animate-pulse overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
};

/**
 * Skeleton loader for a full movie row.
 */
export const MovieRowSkeleton = () => {
  return (
    <div className="py-6 md:py-8">
      <div className="mb-4 h-8 w-48 rounded bg-white/5 animate-pulse" />
      <div className="flex gap-4 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
