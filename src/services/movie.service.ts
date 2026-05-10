import { cache } from 'react';
import apiClient from './api-client';
import { TMDB_ENDPOINTS } from '@/constants/tmdb';
import { Movie, MovieDetails, MovieVideo } from '@/types/movie';
import { APIResponse } from '@/types/api';
import { parseMovieId } from '@/utils/movie-route';

/**
 * Service handling all movie-related TMDB API calls.
 * Separates API logic from the UI layer for better scalability.
 */
export const movieService = {
  /**
   * Fetches daily trending movies.
   */
  getTrendingMovies: cache(async (): Promise<Movie[]> => {
    const { data } = await apiClient.get<APIResponse<Movie>>(TMDB_ENDPOINTS.TRENDING_MOVIES);
    return data.results;
  }),

  /**
   * Fetches top-rated movies.
   */
  getTopRatedMovies: cache(async (): Promise<Movie[]> => {
    const { data } = await apiClient.get<APIResponse<Movie>>(TMDB_ENDPOINTS.TOP_RATED);
    return data.results;
  }),

  /**
   * Fetches popular movies.
   */
  getPopularMovies: cache(async (): Promise<Movie[]> => {
    const { data } = await apiClient.get<APIResponse<Movie>>(TMDB_ENDPOINTS.POPULAR);
    return data.results;
  }),

  /**
   * Fetches movies by genre ID.
   */
  getMoviesByGenre: cache(async (genreId: number): Promise<Movie[]> => {
    const { data } = await apiClient.get<APIResponse<Movie>>(TMDB_ENDPOINTS.MOVIES_BY_GENRE, {
      params: { with_genres: genreId },
    });
    return data.results;
  }),

  /**
   * Fetches detailed information for a specific movie.
   * Cached to prevent duplicate requests in App Router (e.g., between metadata and page).
   */
  getMovieDetails: cache(async (id: number): Promise<MovieDetails> => {
    const movieId = parseMovieId(id);

    if (!movieId) {
      throw new Error('Invalid movie ID');
    }

    const { data } = await apiClient.get<MovieDetails>(TMDB_ENDPOINTS.MOVIE_DETAILS(movieId));
    return data;
  }),

  /**
   * Fetches videos (trailers, teasers) for a specific movie.
   */
  getMovieVideos: cache(async (id: number): Promise<MovieVideo[]> => {
    const movieId = parseMovieId(id);

    if (!movieId) {
      throw new Error('Invalid movie ID');
    }

    const { data } = await apiClient.get<{ results: MovieVideo[] }>(
      TMDB_ENDPOINTS.MOVIE_VIDEOS(movieId)
    );
    return data.results;
  }),
};
