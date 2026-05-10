"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface SearchEmptyStateProps {
  query: string;
}

/**
 * Empty state for search with cinematic appearance.
 */
export const SearchEmptyState = ({ query }: SearchEmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="mb-6 p-6 rounded-full bg-white/5">
        <Search className="h-12 w-12 text-netflix-grey opacity-20" />
      </div>
      <h3 className="heading-md text-white mb-2">
        {query ? `No results found for "${query}"` : "Search Netflix"}
      </h3>
      <p className="body-md max-w-sm">
        {query 
          ? "Try checking your spelling or using more general keywords to find what you're looking for." 
          : "Explore thousands of movies and TV shows by typing a title, genre, or actor."}
      </p>
    </motion.div>
  );
};
