const MOVIE_ID_PATTERN = /^\d+$/;

export const isValidMovieId = (id: unknown): id is number => {
  return typeof id === "number" && Number.isSafeInteger(id) && id > 0;
};

export const parseMovieId = (id: unknown): number | null => {
  if (isValidMovieId(id)) {
    return id;
  }

  if (typeof id !== "string" || !MOVIE_ID_PATTERN.test(id)) {
    return null;
  }

  const parsedId = Number(id);
  return isValidMovieId(parsedId) ? parsedId : null;
};

export const getMovieHref = (id: unknown): string | null => {
  const movieId = parseMovieId(id);
  return movieId ? `/movie/${movieId}` : null;
};
