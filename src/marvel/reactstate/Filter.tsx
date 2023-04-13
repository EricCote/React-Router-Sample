import { useEffect, useState } from 'react';
import MovieCards from '../common/MovieCards';
import { Movie } from '../common/MovieInterface';
import MovieTable from '../common/MovieTable';
import FilterBox from '../common/FilterBox';

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filter, setFilter] = useState<string>('');

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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h1>Marvel Movies with filter</h1>

      <FilterBox
        value={filter}
        onChange={(filter) => {
          setFilter(filter);
        }}
      />

      <MovieTable movies={filteredMovies} />

      <MovieCards movies={filteredMovies} />
    </>
  );
}
