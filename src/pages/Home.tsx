import { useEffect, useState } from "react";
import { getTrending } from "../api/tmbd";
import type { Movie } from "../types/tmbd";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    getTrending().then((data) => {
      if (!ignore) setMovies(data.results);
    }).catch((err: unknown) => {
      if (!ignore) setError(err instanceof Error ? err.message : "An unknown error occurred");
    }).finally(() => {
      if (!ignore) setLoading(false);
    })

    return () => {
      ignore = true;
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section>
      <h2>Trending Movies</h2>
      <div className="grid">
        {movies.map((movie) =>
          <MovieCard key={movie.id} movie={movie} />
        )}
      </div>
    </section>
  )
}