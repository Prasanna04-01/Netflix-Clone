"use client";

import { useEffect, useState, memo } from "react";
import { Movie } from "@/types/movie";
import { SectionTitle } from "@/components/common";
import { MovieCard } from "./MovieCard";
import { MovieSlider } from "./MovieSlider";
import { MovieRowSkeleton } from "@/components/skeletons/MovieSkeletons";
import { ErrorState } from "@/components/common";

interface MovieRowProps {
  title: string;
  fetchAction: () => Promise<Movie[]>;
}

/**
 * MovieRow component that handles data fetching and renders the slider.
 * Optimized with React.memo to prevent unnecessary re-renders when parent state changes.
 */
export const MovieRow = memo(({ title, fetchAction }: MovieRowProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchAction();
        setMovies(data);
      } catch (err) {
        console.error(`Error fetching ${title}:`, err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [fetchAction, title]);

  if (loading) return <MovieRowSkeleton />;
  
  if (error) {
    return (
      <div className="py-6">
        <SectionTitle className="px-1">{title}</SectionTitle>
        <ErrorState className="py-4" description={`Failed to load ${title.toLowerCase()}`} />
      </div>
    );
  }

  if (movies.length === 0) return null;

  return (
    <section className="py-4 md:py-6">
      <SectionTitle className="px-1">{title}</SectionTitle>
      <MovieSlider>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MovieSlider>
    </section>
  );
});

MovieRow.displayName = "MovieRow";
