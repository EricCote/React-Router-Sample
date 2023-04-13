import { useEffect, useState } from 'react';
import MovieCards from '../common/MovieCards';
import { Movie } from '../common/MovieInterface';
import MovieTable from '../common/MovieTable';

export default function MoviesSimple() {
  const [movies, setMovies] = useState<Movie[]>([]);

  async function fetchMovies() {
    const response = await fetch(
      'https://mcuapi.herokuapp.com/api/v1/movies?limit=50'
    );
    const data = await response.json();
    setMovies(data.data);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <h1>Marvel Movies React simple</h1>

      <MovieTable movies={movies} />
      <MovieCards movies={movies} />
    </>
  );
}
