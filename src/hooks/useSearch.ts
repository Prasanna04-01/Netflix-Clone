"use client";

import { useState, useEffect, useCallback } from "react";
import { Movie } from "@/types/movie";
import { searchService } from "@/services/search.service";
import { useDebounce } from "./useDebounce";

/**
 * Custom hook to manage search logic, including debouncing and API states.
 */
export const useSearch = (query: string) => {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query, 500);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchService.searchMovies(searchQuery);
      setResults(data.results);
    } catch (err) {
      console.error("Search failed:", err);
      setError("Failed to fetch search results. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  return { results, loading, error };
};
