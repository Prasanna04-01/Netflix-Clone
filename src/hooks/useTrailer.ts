"use client";

import { useState, useEffect } from "react";
import { MovieVideo } from "@/types/movie";
import { movieService } from "@/services/movie.service";
import { selectBestVideo } from "@/utils/video";

/**
 * Hook to fetch and select the best trailer for a movie.
 */
export const useTrailer = (movieId: number | null, enabled = true) => {
  const [video, setVideo] = useState<MovieVideo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!movieId || !enabled) {
      setVideo(null);
      setLoading(false);
      setError(false);
      setHasFetched(false);
      return;
    }

    let isMounted = true;

    const fetchVideo = async () => {
      try {
        if (isMounted) {
          setLoading(true);
          setError(false);
          setHasFetched(false);
        }

        const videos = await movieService.getMovieVideos(movieId);
        const bestVideo = selectBestVideo(videos);

        if (isMounted) {
          setVideo(bestVideo);
        }
      } catch (err) {
        if (isMounted) {
          setVideo(null);
          setError(true);
        }

        console.error("Failed to fetch trailer:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
          setHasFetched(true);
        }
      }
    };

    fetchVideo();

    return () => {
      isMounted = false;
    };
  }, [enabled, movieId]);

  return { video, loading, error, hasFetched };
};
