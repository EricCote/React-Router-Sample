import { useEffect, useState } from 'react';
import FilmCards from '../common/FilmCards';
import { Film, SearchStateType } from '../common/FilmInterface';
import FilmTable from '../common/FilmTable';
import FilterBox from '../common/FilterBox';

export default function FilmsReact() {
  const [films, setFilms] = useState<Film[]>([]);
  const [{ filter, sortCol, desc }, setSearchState] = useState<SearchStateType>(
    {
      filter: '',
      sortCol: null,
      desc: false,
    }
  );

  let filteredFilms: Film[];

  function handleSort(column: keyof Film) {
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

  async function chargerFilms() {
    const response = await fetch(
      'https://mcuapi.herokuapp.com/api/v1/movies?limit=50'
    );
    const data = await response.json();
    setFilms(data.data);
  }

  useEffect(() => {
    chargerFilms();
  }, []);

  filteredFilms = films.filter((film) =>
    film.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (sortCol) {
    filteredFilms.sort((a, b) => {
      return (a[sortCol] as string).localeCompare(b[sortCol] as string);
    });
    if (desc) filteredFilms.reverse(); //sort descending column
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

      <FilmTable
        films={filteredFilms}
        sortedBy={{ sortCol, desc }}
        onSort={handleSort}
      />
      <FilmCards films={filteredFilms} />
    </>
  );
}
