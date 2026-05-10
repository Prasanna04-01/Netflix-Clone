import { TMDB_IMAGE_SIZES } from '@/constants/tmdb';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

/**
 * Reusable helper to generate TMDB poster URLs.
 */
export const getPosterUrl = (
  path: string | null | undefined,
  size: keyof typeof TMDB_IMAGE_SIZES.POSTER = 'MEDIUM'
): string => {
  if (!path) return '/placeholders/poster-placeholder.png'; // Fallback image path
  return `${IMAGE_BASE_URL}/${TMDB_IMAGE_SIZES.POSTER[size]}${path}`;
};

/**
 * Reusable helper to generate TMDB backdrop URLs.
 */
export const getBackdropUrl = (
  path: string | null | undefined,
  size: keyof typeof TMDB_IMAGE_SIZES.BACKDROP = 'LARGE'
): string => {
  if (!path) return '/placeholders/backdrop-placeholder.png'; // Fallback image path
  return `${IMAGE_BASE_URL}/${TMDB_IMAGE_SIZES.BACKDROP[size]}${path}`;
};
