import type { Genre, Movie, PagedResponse } from "../types/tmbd";

const BASE = "https://api.themoviedb.org/3";

async function tmdbFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE}${path}`, {
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const getTrending = () =>
  tmdbFetch<PagedResponse<Movie>>("/trending/movie/week");

export const searchMovies = (query: string) =>
  tmdbFetch<PagedResponse<Movie>>(`/search/movie?query=${encodeURIComponent(query)}`);

export const getGenres = () =>
  tmdbFetch<{ genres: Genre[] }>("/genre/movie/list");