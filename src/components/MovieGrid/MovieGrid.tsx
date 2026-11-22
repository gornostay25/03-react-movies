import type { KeyboardEvent, MouseEvent } from "react";
import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  function handleCardClick(_event: MouseEvent<HTMLDivElement>, movie: Movie) {
    onSelect(movie);
  }

  function handleCardKeyDown(
    event: KeyboardEvent<HTMLDivElement>,
    movie: Movie,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(movie);
    }
  }

  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        const src = movie.poster_path
          ? `${POSTER_BASE}${movie.poster_path}`
          : undefined;

        return (
          <li key={movie.id}>
            <div
              className={css.card}
              onClick={(event) => handleCardClick(event, movie)}
              onKeyDown={(event) => handleCardKeyDown(event, movie)}
              role="button"
              tabIndex={0}
            >
              {src ? (
                <img
                  className={css.image}
                  src={src}
                  alt={movie.title}
                  loading="lazy"
                />
              ) : (
                <div
                  className={css.image}
                  role="img"
                  aria-label={movie.title}
                />
              )}
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
