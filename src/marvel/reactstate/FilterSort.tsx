import { useEffect, useState } from 'react';
import MovieCards from '../common/MovieCards';
import { Movie, SearchStateType } from '../common/MovieInterface';
import MovieTable from '../common/MovieTable';
import FilterBox from '../common/FilterBox';

export default function MoviesReact() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [{ filter, sortCol, desc }, setSearchState] = useState<SearchStateType>(
    {
      filter: '',
      sortCol: null,
      desc: false,
    }
  );

  let filteredMovies: Movie[];

  function handleSort(column: keyof Movie) {
    //create a new sort object, for the new state
    const newSort: SearchStateType = {
      filter: filter, //Keep the current sort
      sortCol: column, //column name to sort
      desc: false, //default is ascending sort
    };
    //if sorting existing column, invert order
    if (sortCol === newSort.sortCol) {
      newSort.desc = !desc;
    }
    setSearchState(newSort);
  }

  function handleFilter(filter: string) {
    setSearchState({ filter, sortCol, desc });
  }

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

  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (sortCol) {
    filteredMovies.sort((a, b) => {
      return (a[sortCol] as string).localeCompare(b[sortCol] as string);
    });
    if (desc) filteredMovies.reverse(); //sort descending column
  }

  return (
    <>
      <h1>Marvel Movies (sort and filter)</h1>

      <FilterBox
        value={filter}
        onChange={(text) => {
          handleFilter(text);
        }}
      />

      <MovieTable
        movies={filteredMovies}
        sortedBy={{ sortCol, desc }}
        onSort={handleSort}
      />
      <MovieCards movies={filteredMovies} />
    </>
  );
}
