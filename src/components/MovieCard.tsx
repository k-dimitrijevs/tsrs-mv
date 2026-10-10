import type { Genre, Movie } from "../types/tmbd";

interface Props {
  movie: Movie;
  genres: Genre[];
}

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie, genres }: Props) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";

  return (
    <article className="card">
      {movie.poster_path ? (
        <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} />
      ) : (
        <div className="placeholder">No poster available</div>
      )}
      <div className="card-body">
        <h3>{movie.title}</h3>
        <p>
          {year} | {movie.vote_average.toFixed(1)}
        </p>
        <p>Original language: {movie.original_language}</p>
        <p>Genres: {movie.genre_ids.map((id) => genres.find((g) => g.id === id)?.name).join(", ")}</p>
      </div>
    </article>
  )
}