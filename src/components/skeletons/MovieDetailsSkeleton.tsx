import { MovieRowSkeleton } from "./MovieSkeletons";

/**
 * Full page skeleton for the movie details page.
 */
export const MovieDetailsSkeleton = () => {
  return (
    <div className="relative min-h-screen bg-nexora-black overflow-hidden">
      {/* Backdrop Skeleton */}
      <div className="absolute top-0 left-0 w-full h-[70vh] bg-white/5 animate-pulse" />
      
      <div className="relative z-20 pt-[35vh] md:pt-[40vh] pb-20 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Poster Skeleton */}
          <div className="hidden md:block w-[240px] lg:w-[320px] aspect-[2/3] rounded-xl bg-white/5 animate-pulse shrink-0" />
          
          {/* Content Skeleton */}
          <div className="flex-grow">
            <div className="h-12 w-3/4 bg-white/5 rounded animate-pulse mb-4" />
            <div className="h-6 w-1/2 bg-white/5 rounded animate-pulse mb-8" />
            
            <div className="flex gap-4 mb-8">
              <div className="h-10 w-32 bg-white/5 rounded animate-pulse" />
              <div className="h-10 w-32 bg-white/5 rounded animate-pulse" />
            </div>
            
            <div className="space-y-3 mb-12">
              <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
              <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
