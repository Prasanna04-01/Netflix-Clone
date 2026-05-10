import { MovieVideo } from "@/types/movie";

/**
 * Strategy to select the most appropriate trailer from a list of TMDB videos.
 * Priority: Official Trailer > Trailer > Teaser > First available.
 */
export const selectBestVideo = (videos: MovieVideo[]): MovieVideo | null => {
  if (!videos || !Array.isArray(videos) || videos.length === 0) return null;

  // Filter for valid YouTube videos with keys first
  const validVideos = videos.filter(
    (video) =>
      video.site?.toLowerCase() === "youtube" &&
      typeof video.key === "string" &&
      video.key.trim().length > 0
  );

  if (validVideos.length === 0) return null;

  // 1. Look for Official Trailer
  const officialTrailer = validVideos.find(
    (video) => video.type === "Trailer" && video.official
  );
  if (officialTrailer) return officialTrailer;

  // 2. Look for any Trailer
  const anyTrailer = validVideos.find((v) => v.type === "Trailer");
  if (anyTrailer) return anyTrailer;

  // 3. Look for Teaser
  const teaser = validVideos.find((v) => v.type === "Teaser");
  if (teaser) return teaser;

  // 4. Fallback to first valid YouTube video
  return validVideos[0];
};
