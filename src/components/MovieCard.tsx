import type { Genre, Movie } from "../types/tmbd";

interface Props {
  movie: Movie;
  genres: Genre[];
}

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie, genres }: Props) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";

  return (
    <article className="col-span-1 overflow-hidden rounded-lg shadow-md bg-neutral-700 text-neutral-100">
      {movie.poster_path ? (
        <img 
          className="w-full aspect-2/3 object-cover"
          src={`${IMG_BASE}${movie.poster_path}`} 
          alt={movie.title} 
        />
      ) : (
        <div className="aspect-2/3 bg-neutral-500 flex items-center justify-center">
          <span className="text-neutral-400">No poster available</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-bold">{movie.title}</h3>
        <p className="text-sm text-neutral-400">
          {year} | {movie.vote_average.toFixed(1)}
        </p>
        <p className="text-sm text-neutral-300">Original language: {movie.original_language}</p>
        <p className="text-sm text-neutral-300">Genres: {movie.genre_ids.map((id) => genres.find((g) => g.id === id)?.name).join(", ")}</p>
      </div>
    </article>
  )
}