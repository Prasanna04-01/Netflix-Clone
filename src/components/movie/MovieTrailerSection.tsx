"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play, X } from "lucide-react";
import { Button } from "@/components/common";
import { TrailerPlayer } from "@/components/player/TrailerPlayer";
import { useTrailer } from "@/hooks/useTrailer";
import { parseMovieId } from "@/utils/movie-route";

interface MovieTrailerSectionProps {
  movieId: number;
  title: string;
}

export const MovieTrailerSection = ({ movieId, title }: MovieTrailerSectionProps) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const parsedMovieId = useMemo(() => parseMovieId(movieId), [movieId]);
  const { video, loading, error, hasFetched } = useTrailer(parsedMovieId, isTrailerOpen);

  useEffect(() => {
    setIsTrailerOpen(false);
  }, [parsedMovieId]);

  const showTrailerFallback = isTrailerOpen && hasFetched && !loading && (!video?.key || error);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <Button
          size="lg"
          leftIcon={<Play className="fill-current h-5 w-5 md:h-6 md:w-6" />}
          className="rounded-sm bg-white text-black hover:bg-white/90 font-bold px-10"
          disabled={!parsedMovieId}
          isLoading={isTrailerOpen && loading}
          onClick={() => setIsTrailerOpen(true)}
        >
          Play Trailer
        </Button>

        {isTrailerOpen && (
          <Button
            type="button"
            variant="secondary"
            size="lg"
            leftIcon={<X className="h-5 w-5 md:h-6 md:w-6" />}
            className="rounded-sm font-bold px-8"
            onClick={() => setIsTrailerOpen(false)}
          >
            Close Trailer
          </Button>
        )}
      </div>

      {showTrailerFallback && (
        <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white/80 backdrop-blur-sm">
          <p className="text-lg font-semibold text-white">Trailer Not Available</p>
          <p className="mt-1 text-sm text-nexora-grey">
            TMDB does not currently provide a playable YouTube trailer for "{title}".
          </p>
        </div>
      )}

      <AnimatePresence initial={false}>
        {isTrailerOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
          >
            {video?.key ? (
              <TrailerPlayer
                videoId={video.key}
                className="w-full"
                autoplay
              />
            ) : loading ? (
              <div className="flex aspect-video items-center justify-center bg-nexora-black text-white">
                <p className="text-lg font-semibold">Loading trailer...</p>
              </div>
            ) : showTrailerFallback ? (
              <div className="flex aspect-video flex-col items-center justify-center bg-nexora-black px-6 text-center text-white">
                <p className="text-2xl font-bold">Trailer Not Available</p>
                <p className="mt-3 max-w-xl text-sm text-nexora-grey">
                  TMDB does not currently provide a playable YouTube trailer for "{title}".
                </p>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
