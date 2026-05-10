export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  TIMEOUT: 10000, // 10 seconds
  DEFAULT_PARAMS: {
    language: 'en-US',
    include_adult: false,
  },
} as const;

export const ERROR_MESSAGES = {
  FETCH_ERROR: 'Failed to fetch data from the server.',
  UNAUTHORIZED: 'Unauthorized access. Please check your API key.',
  NOT_FOUND: 'The requested resource was not found.',
  DEFAULT: 'An unexpected error occurred.',
} as const;
