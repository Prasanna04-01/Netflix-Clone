"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Play, Plus, Star } from "lucide-react";
import Image from "next/image";
import { Movie, MovieDetails } from "@/types/movie";
import { movieService } from "@/services/movie.service";
import { useTrailer } from "@/hooks/useTrailer";
import { getBackdropUrl } from "@/utils/image";
import { Button } from "@/components/common";
import { TrailerPlayer } from "@/components/player/TrailerPlayer";
import { lockBodyScroll, unlockBodyScroll } from "@/utils/body-scroll-lock";
import { parseMovieId } from "@/utils/movie-route";

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Premium cinematic Movie Modal with integrated trailer playback and metadata.
 */
export const MovieModal = ({ movie, isOpen, onClose }: MovieModalProps) => {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const movieId = useMemo(() => parseMovieId(movie?.id), [movie?.id]);
  const { video, loading: trailerLoading, error: trailerError, hasFetched } = useTrailer(isOpen ? movieId : null);
  const shouldReduceMotion = useReducedMotion();

  // Reset trailer playback when movie changes or modal closes
  useEffect(() => {
    setIsPlayingTrailer(false);
  }, [movieId, isOpen]);

  useEffect(() => {
    if (!isOpen || !movie || !movieId) {
      setDetails(null);
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await movieService.getMovieDetails(movieId);

        if (isMounted) {
          setDetails(data);
        }
      } catch (err) {
        if (isMounted) {
          setDetails(null);
        }

        console.error("Failed to fetch movie details for modal:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDetails();
  }, [isOpen, movie, movieId]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    lockBodyScroll();

    return () => {
      unlockBodyScroll();
    };
  }, [isOpen]);

  // Handle ESC key only while open
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!movie || !movieId) return null;

  const releaseYear = movie.release_date || movie.first_air_date 
    ? new Date(movie.release_date || movie.first_air_date!).getFullYear() 
    : "N/A";

  const rating = Number.isFinite(movie.vote_average) ? movie.vote_average.toFixed(1) : "N/A";
  const canPlayTrailer = Boolean(video?.key);
  const showTrailerFallback = hasFetched && !trailerLoading && (!video?.key || trailerError);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-6 pointer-events-none">
          {/* Backdrop */}
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
            aria-label="Close modal backdrop"
          />

          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-nexora-dark shadow-2xl no-scrollbar focus:outline-none pointer-events-auto"
            role="dialog"
            aria-modal="true"
            aria-label={movie.title || movie.name || "Movie details"}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-nexora-black/60 text-white hover:bg-nexora-black/80 transition-all border border-white/10"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Content Container */}
            <div className="flex flex-col">
              {/* Header with Backdrop/Trailer */}
              <div className="relative aspect-video w-full bg-nexora-black">
                <div className="absolute inset-0 z-10">
                  {isPlayingTrailer && video?.key ? (
                    <>
                      <TrailerPlayer videoId={video.key} />
                      <button
                        type="button"
                        onClick={() => setIsPlayingTrailer(false)}
                        className="absolute top-4 left-4 z-30 rounded-full bg-nexora-black/60 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-nexora-black/80"
                      >
                        Close Trailer
                      </button>
                    </>
                  ) : isPlayingTrailer && trailerLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-nexora-black text-white">
                      <p className="text-lg font-semibold">Loading trailer...</p>
                    </div>
                  ) : isPlayingTrailer && showTrailerFallback ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-nexora-black px-6 text-center text-white">
                      <p className="text-2xl font-bold">Trailer Not Available</p>
                      <p className="mt-3 max-w-xl text-sm text-nexora-grey">
                        TMDB does not currently provide a playable YouTube trailer for this title.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsPlayingTrailer(false)}
                        className="mt-6 rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-white/20"
                      >
                        Back to Details
                      </button>
                    </div>
                  ) : (
                    <>
                      <Image
                        src={getBackdropUrl(movie.backdrop_path, "LARGE")}
                        alt={movie.title || movie.name || "Movie backdrop"}
                        fill
                        className="object-cover"
                        priority
                      />
                      {/* Gradient Overlay for Title/Actions */}
                      <div className="absolute inset-0 bg-gradient-to-t from-nexora-dark via-transparent to-transparent" />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute bottom-8 left-8 right-8 z-10">
                        <div className="flex items-center gap-4">
                          <Button
                            onClick={() => setIsPlayingTrailer(true)}
                            disabled={trailerLoading || (!canPlayTrailer && hasFetched)}
                            isLoading={trailerLoading}
                            leftIcon={<Play className="fill-current h-5 w-5" />}
                            className="rounded-sm bg-white text-black hover:bg-white/90 font-bold px-8 shadow-xl"
                          >
                            {showTrailerFallback ? "Trailer Not Available" : "Play Trailer"}
                          </Button>
                          <button
                            type="button"
                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/20 backdrop-blur-md"
                          >
                            <Plus className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Movie Details */}
              <div className="relative z-20 px-6 md:px-12 pb-12 -mt-12 md:-mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                  {/* Left: Info */}
                  <div className="md:col-span-2 space-y-6">
                    <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-xl tracking-tight">
                      {movie.title || movie.name}
                    </h2>
                    
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-1.5 text-green-500 font-bold">
                        <Star className="h-5 w-5 fill-current" />
                        <span>{rating} Rating</span>
                      </div>
                      <span className="text-nexora-grey">|</span>
                      <span className="text-white font-medium">{releaseYear}</span>
                      <span className="text-nexora-grey">|</span>
                      <span className="px-2 py-0.5 border border-white/40 rounded text-xs uppercase tracking-widest text-white/90">
                        HD
                      </span>
                    </div>

                    <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                      {movie.overview}
                    </p>
                  </div>

                  {/* Right: Meta */}
                  <div className="space-y-6 pt-2">
                    {loading && (
                      <p className="text-sm text-nexora-grey">Loading details...</p>
                    )}

                    {details && (
                      <div className="space-y-4">
                        <div>
                          <span className="text-nexora-grey text-sm block mb-1">Genres</span>
                          <p className="text-white text-sm font-medium">
                            {details.genres.map(g => g.name).join(", ")}
                          </p>
                        </div>
                        <div>
                          <span className="text-nexora-grey text-sm block mb-1">Original Language</span>
                          <p className="text-white text-sm font-medium uppercase">
                            {details.original_language}
                          </p>
                        </div>
                        <div>
                          <span className="text-nexora-grey text-sm block mb-1">Status</span>
                          <p className="text-white text-sm font-medium">
                            {details.status}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
