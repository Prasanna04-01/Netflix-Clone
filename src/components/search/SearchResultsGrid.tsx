"use client";

import { motion } from "framer-motion";
import { Movie } from "@/types/movie";
import { MovieCard } from "@/components/movie/MovieCard";
import { fadeIn, staggerContainer } from "@/constants/animations";

interface SearchResultsGridProps {
  results: Movie[];
}

/**
 * Responsive grid for displaying search results with entry animations.
 */
export const SearchResultsGrid = ({ results }: SearchResultsGridProps) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
    >
      {results.map((movie) => (
        <motion.div key={movie.id} variants={fadeIn}>
          <MovieCard movie={movie} className="min-w-0" />
        </motion.div>
      ))}
    </motion.div>
  );
};
