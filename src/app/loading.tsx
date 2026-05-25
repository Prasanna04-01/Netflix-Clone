import { Container } from "@/components/common";
import { MovieRowSkeleton } from "@/components/skeletons/MovieSkeletons";

/**
 * Global loading state for the homepage.
 * Matches the cinematic layout structure.
 */
export default function HomeLoading() {
  return (
    <div className="relative min-h-screen bg-nexora-black overflow-hidden">
      {/* Hero Skeleton */}
      <div className="relative h-screen w-full bg-white/5 animate-pulse flex items-center">
        <Container>
          <div className="max-w-2xl space-y-6">
            <div className="h-20 w-3/4 bg-white/10 rounded" />
            <div className="h-6 w-1/2 bg-white/10 rounded" />
            <div className="flex gap-4">
              <div className="h-12 w-32 bg-white/10 rounded" />
              <div className="h-12 w-32 bg-white/10 rounded" />
            </div>
          </div>
        </Container>
      </div>

      {/* Rows Skeletons */}
      <div className="relative z-30 -mt-32">
        <Container>
          <MovieRowSkeleton />
          <MovieRowSkeleton />
          <MovieRowSkeleton />
        </Container>
      </div>
    </div>
  );
}
