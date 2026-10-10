import type { Movie } from "../types/tmbd";

interface Props {
  movie: Movie;
}

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }: Props) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";

  return (
    <article className="card">
      {movie.poster_patch ? (
        <img src={`${IMG_BASE}${movie.poster_patch}`} alt={movie.title} />
      ) : (
        <div className="placeholder">No poster available</div>
      )}
      <div className="card-body">
        <h3>{movie.title}</h3>
        <p>
          {year} | {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </article>
  )
}