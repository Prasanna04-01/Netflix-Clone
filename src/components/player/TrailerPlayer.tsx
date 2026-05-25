"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import type { YouTubeProps } from "react-youtube";
import { LoadingSpinner } from "@/components/common";
import { cn } from "@/utils/cn";

const YouTube = dynamic(() => import("react-youtube"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-nexora-black">
      <LoadingSpinner size="lg" />
    </div>
  ),
});

interface TrailerPlayerProps {
  videoId: string; // Renamed from videoKey for consistency with YouTube component
  className?: string;
  onReady?: () => void;
  autoplay?: boolean;
}

/**
 * Responsive YouTube Player with cinematic styling and robust loading/error states.
 */
export const TrailerPlayer = ({ videoId, className, onReady, autoplay = true }: TrailerPlayerProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const normalizedVideoId = videoId?.trim();

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [normalizedVideoId]);

  const opts = useMemo<YouTubeProps["opts"]>(() => ({
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: autoplay ? 1 : 0,
      modestbranding: 1,
      rel: 0,
      controls: 1,
      playsinline: 1,
      iv_load_policy: 3,
      origin: typeof window !== "undefined" ? window.location.origin : undefined,
      mute: autoplay ? 0 : 0,
    },
  }), [autoplay]);

  const handleReady = (event: any) => {
    setIsLoaded(true);
    onReady?.();
    // Safely attempt to play
    try {
      if (autoplay) {
        event.target.unMute?.();
      }
      event.target.playVideo();
    } catch (e) {
      console.warn("[TrailerPlayer] Autoplay prevented:", e);
    }
  };

  if (!normalizedVideoId) return null;

  return (
    <div className={cn("relative aspect-video w-full bg-black overflow-hidden", className)}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-nexora-black">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-nexora-dark text-white p-4 text-center">
          <p className="font-bold mb-2">Trailer Unavailable</p>
          <p className="text-sm text-nexora-grey">This video could not be loaded from YouTube.</p>
        </div>
      )}

      <YouTube
        videoId={normalizedVideoId}
        opts={opts}
        onReady={handleReady}
        onError={() => {
          setHasError(true);
          setIsLoaded(false);
        }}
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-700",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        iframeClassName="h-full w-full border-none"
      />
    </div>
  );
};
