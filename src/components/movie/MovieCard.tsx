"use client";

import { useState, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Star, Info } from "lucide-react";
import { Movie } from "@/types/movie";
import { getPosterUrl } from "@/utils/image";
import { cn } from "@/utils/cn";
import { getMovieHref, parseMovieId } from "@/utils/movie-route";

// Dynamically import heavy Modal to reduce initial bundle size
const MovieModal = dynamic(() => import("@/components/modals/MovieModal").then(mod => mod.MovieModal), {
  ssr: false,
});

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

/**
 * Premium MovieCard with hover animations and metadata overlay.
 * Optimized with React.memo and dynamic imports.
 */
export const MovieCard = memo(({ movie, className }: MovieCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const movieHref = getMovieHref(movie.id);
  const movieId = parseMovieId(movie.id);
  const movieLabel = movie.title || movie.name || "Untitled Movie";
  const rating = Number.isFinite(movie.vote_average) ? movie.vote_average.toFixed(1) : "N/A";

  const releaseYear = movie.release_date || movie.first_air_date 
    ? new Date(movie.release_date || movie.first_air_date!).getFullYear() 
    : "N/A";

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!movieId) return;
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="relative">
        {movieHref ? (
          <Link href={movieHref} aria-label={`View details for ${movieLabel}`}>
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={cn(
                "group relative aspect-[2/3] min-w-[140px] md:min-w-[180px] lg:min-w-[220px] cursor-pointer rounded-md overflow-hidden bg-netflix-dark",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-netflix-red focus-visible:ring-offset-2 focus-visible:ring-offset-netflix-black",
                className
              )}
            >
              <Image
                src={getPosterUrl(movie.poster_path, "MEDIUM")}
                alt={movieLabel || "Movie Poster"}
                fill
                sizes="(max-width: 768px) 140px, (max-width: 1024px) 180px, 220px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    onClick={handleOpenModal}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-colors"
                    aria-label="Quick View"
                  >
                    <Info className="h-4 w-4 text-white" />
                  </button>
                </div>
                
                <div className="absolute bottom-0 p-3 w-full">
                  <h3 className="text-sm md:text-base font-bold text-white line-clamp-1 mb-1">
                    {movieLabel}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] md:text-xs font-semibold text-white/90">
                    <div className="flex items-center gap-0.5 text-green-500" aria-label={`Rating: ${rating}`}>
                      <Star className="h-3 w-3 fill-current" />
                      <span>{rating}</span>
                    </div>
                    <span aria-label={`Release Year: ${releaseYear}`}>{releaseYear}</span>
                    <span className="px-1 border border-white/40 rounded-[2px] text-[8px] uppercase">
                      HD
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ) : (
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "group relative aspect-[2/3] min-w-[140px] md:min-w-[180px] lg:min-w-[220px] cursor-not-allowed rounded-md overflow-hidden bg-netflix-dark opacity-80",
              className
            )}
            aria-disabled="true"
          >
            <Image
              src={getPosterUrl(movie.poster_path, "MEDIUM")}
              alt={movieLabel || "Movie Poster"}
              fill
              sizes="(max-width: 768px) 140px, (max-width: 1024px) 180px, 220px"
              className="object-cover"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/30 to-transparent">
              <div className="absolute bottom-0 p-3 w-full">
                <h3 className="text-sm md:text-base font-bold text-white line-clamp-1 mb-1">
                  {movieLabel}
                </h3>
                <p className="text-[10px] md:text-xs text-white/70">
                  Details unavailable
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {movieId && (
        <MovieModal
          movie={movie}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
});

MovieCard.displayName = "MovieCard";
