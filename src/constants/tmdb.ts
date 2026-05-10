export const TMDB_ENDPOINTS = {
  TRENDING_MOVIES: '/trending/movie/day',
  TRENDING_TV: '/trending/tv/day',
  TOP_RATED: '/movie/top_rated',
  POPULAR: '/movie/popular',
  UPCOMING: '/movie/upcoming',
  GENRES: '/genre/movie/list',
  MOVIE_DETAILS: (id: number) => `/movie/${id}`,
  MOVIE_VIDEOS: (id: number) => `/movie/${id}/videos`,
  SEARCH_MOVIES: '/search/movie',
  MOVIES_BY_GENRE: '/discover/movie',
} as const;

export const TMDB_IMAGE_SIZES = {
  POSTER: {
    SMALL: 'w185',
    MEDIUM: 'w342',
    LARGE: 'w500',
    ORIGINAL: 'original',
  },
  BACKDROP: {
    SMALL: 'w300',
    MEDIUM: 'w780',
    LARGE: 'w1280',
    ORIGINAL: 'original',
  },
} as const;
