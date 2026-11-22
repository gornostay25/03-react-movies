import { useState } from "react";
import toast from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import css from "./App.module.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  async function handleSearch(query: string) {
    setMovies([]);
    setError(false);
    setSelectedMovie(null);
    setLoading(true);

    try {
      const results = await fetchMovies(query);
      setLoading(false);

      if (results.length === 0) {
        toast.error("No movies found for your request");
        setMovies([]);
        return;
      }

      setMovies(results);
    } catch {
      setLoading(false);
      setError(true);
      setMovies([]);
    }
  }

  function handleSelectMovie(movie: Movie) {
    setSelectedMovie(movie);
  }

  function handleCloseModal() {
    setSelectedMovie(null);
  }

  const showGrid = !loading && !error && movies.length > 0;

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {!loading && error && <ErrorMessage />}
      {showGrid && <MovieGrid movies={movies} onSelect={handleSelectMovie} />}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
