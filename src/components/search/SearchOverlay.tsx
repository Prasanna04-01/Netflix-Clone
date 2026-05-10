"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/common";
import { SearchBar } from "./SearchBar";
import { SearchResultsGrid } from "./SearchResultsGrid";
import { SearchEmptyState } from "./SearchEmptyState";
import { SearchSkeleton } from "@/components/skeletons/SearchSkeleton";
import { useSearch } from "@/hooks/useSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { ROUTES } from "@/constants/navigation";
import { lockBodyScroll, unlockBodyScroll } from "@/utils/body-scroll-lock";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "overlay" | "page";
}

/**
 * Full-screen cinematic search overlay with live results.
 */
export const SearchOverlay = ({ isOpen, onClose, mode = "overlay" }: SearchOverlayProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isPageMode = mode === "page";
  const isActive = isPageMode || isOpen;
  
  // Initialize state from URL, but only once on mount
  const [query, setQuery] = useState(() => searchParams.get("q") || "");
  const { results, loading } = useSearch(query);
  const shouldReduceMotion = useReducedMotion();
  
  // Debounce the URL update to prevent excessive navigation and API calls
  const debouncedQuery = useDebounce(query, 500);

  const content = useMemo(() => (
    <Container className={isPageMode ? "pt-28 pb-20" : "pt-8 pb-20"}>
      {/* Header */}
      <div className="flex items-center justify-between mb-12 gap-6">
        <SearchBar
          value={query}
          onChange={setQuery}
          onClear={() => setQuery("")}
          className="max-w-2xl bg-netflix-dark/80 border-none focus:ring-2 focus:ring-netflix-red"
        />
        <button
          type="button"
          onClick={() => {
            if (isPageMode) {
              router.push(ROUTES.HOME, { scroll: false });
              return;
            }

            onClose();
          }}
          className="p-2 rounded-full hover:bg-white/5 text-netflix-grey hover:text-white transition-all shrink-0"
          aria-label="Close search"
        >
          <X className="h-8 w-8" />
        </button>
      </div>

      {/* Results Section */}
      <div className="min-h-[50vh]">
        {loading ? (
          <SearchSkeleton />
        ) : results.length > 0 ? (
          <div className="space-y-8">
            <h2 className="heading-md text-white/60">
              Results for "{query}"
            </h2>
            <SearchResultsGrid results={results} />
          </div>
        ) : (
          <SearchEmptyState query={query} />
        )}
      </div>
    </Container>
  ), [isPageMode, loading, onClose, query, results, router]);

  // Sync state -> URL (Debounced)
  useEffect(() => {
    // Only sync if the overlay is open
    if (!isActive) return;

    const currentQ = searchParams.get("q") || "";
    
    // Guard: Only update URL if the query has actually changed and is different from the URL
    if (debouncedQuery !== currentQ) {
      const params = new URLSearchParams(searchParams.toString());
      
      if (debouncedQuery.trim()) {
        params.set("q", debouncedQuery);
        router.replace(`${ROUTES.SEARCH}?${params.toString()}`, { scroll: false });
      } else {
        params.delete("q");
        if (pathname !== ROUTES.SEARCH || currentQ) {
          router.replace(ROUTES.SEARCH, { scroll: false });
        }
      }
    }
  }, [debouncedQuery, isActive, pathname, router, searchParams]);

  // Handle ESC key
  useEffect(() => {
    if (!isActive) {
      return;
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key !== "Escape") {
        return;
      }

      if (isPageMode) {
        router.push(ROUTES.HOME, { scroll: false });
        return;
      }

      onClose();
    };

    window.addEventListener("keydown", handleEsc);

    if (!isPageMode) {
      lockBodyScroll();
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);

      if (!isPageMode) {
        unlockBodyScroll();
      }
    };
  }, [isActive, isPageMode, onClose, router]);

  if (isPageMode) {
    return (
      <section className="min-h-screen bg-netflix-black">
        {content}
      </section>
    );
  }

  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
          className="fixed inset-0 z-[60] bg-netflix-black/95 backdrop-blur-xl overflow-y-auto no-scrollbar focus:outline-none"
          role="dialog"
          aria-modal="true"
          aria-label="Search movies"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
