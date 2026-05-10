"use client";

import { useEffect, useState, memo } from "react";
import { Movie } from "@/types/movie";
import { movieService } from "@/services/movie.service";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { LoadingSpinner, ErrorState } from "@/components/common";

/**
 * Main HeroBanner component that manages data fetching and sub-component composition.
 * Optimized with React.memo to prevent unnecessary re-renders.
 */
export const HeroBanner = memo(() => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchHeroMovie = async () => {
      try {
        setLoading(true);
        const trendingMovies = await movieService.getTrendingMovies();
        // Pick a random movie from the trending list for a dynamic experience
        if (trendingMovies.length > 0) {
          const randomIndex = Math.floor(Math.random() * Math.min(trendingMovies.length, 5));
          setMovie(trendingMovies[randomIndex]);
        }
      } catch (err) {
        console.error("Failed to fetch hero movie:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroMovie();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-netflix-black">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="h-[70vh] w-full flex items-center justify-center bg-netflix-black">
        <ErrorState onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-netflix-black">
      <HeroBackground backdropPath={movie.backdrop_path} title={movie.title || movie.name || "Hero Movie"} />
      <HeroContent movie={movie} />
    </section>
  );
});

HeroBanner.displayName = "HeroBanner";
