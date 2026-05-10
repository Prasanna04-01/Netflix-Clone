export interface Movie {
  id: number;
  title: string;
  name?: string; // TV Shows use 'name' instead of 'title'
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  video: boolean;
  original_language: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  homepage: string | null;
  imdb_id: string | null;
  runtime: number | null;
  status: string;
  tagline: string | null;
  budget: number;
  revenue: number;
}

export interface MovieVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}
