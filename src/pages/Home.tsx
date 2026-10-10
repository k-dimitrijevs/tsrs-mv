import { useEffect, useState } from "react";
import { getGenres, getTrending } from "../api/tmbd";
import type { Genre, Movie } from "../types/tmbd";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    let ignore = false;

    getTrending().then((data) => {
      if (!ignore) setMovies(data.results);
    }).catch((err: unknown) => {
      if (!ignore) setError(err instanceof Error ? err.message : "An unknown error occurred");
    }).finally(() => {
      if (!ignore) setLoadingMovies(false);
    })

    return () => {
      ignore = true;
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    getGenres().then((data) => {
      if (!ignore) setGenres(data.genres);
    }).catch((err: unknown) => {
      if (!ignore) setError(err instanceof Error ? err.message : "An unknown error occurred");
    }).finally(() => {
      if (!ignore) setLoadingGenres(false);
    });
    return () => {
      ignore = true;
    };
  }, []);

  if (loadingMovies || loadingGenres) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section>
      <h2>Trending Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {movies.map((movie) =>
          <MovieCard key={movie.id} movie={movie} genres={genres} />
        )}
      </div>
    </section>
  )
}