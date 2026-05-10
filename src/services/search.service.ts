import apiClient from './api-client';
import { TMDB_ENDPOINTS } from '@/constants/tmdb';
import { Movie } from '@/types/movie';
import { SearchResponse } from '@/types/api';

/**
 * Service handling search-related TMDB API calls.
 */
export const searchService = {
  /**
   * Searches for movies based on a query string.
   */
  async searchMovies(query: string, page = 1): Promise<SearchResponse<Movie>> {
    const { data } = await apiClient.get<SearchResponse<Movie>>(TMDB_ENDPOINTS.SEARCH_MOVIES, {
      params: {
        query,
        page,
      },
    });
    return data;
  },
};
