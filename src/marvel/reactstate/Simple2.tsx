import { useEffect, useState } from 'react';
import FilmCards from '../common/FilmCards';
import { Film } from '../common/FilmInterface';
import FilmTable from '../common/FilmTable';
// import FilterBox from '../common/FilterBox';

export default function FilmsSimple() {
  const [films, setFilms] = useState<Film[]>([]);
  // const [filter, setFilter] = useState<string>('');

  async function fetchMovies() {
    const response = await fetch(
      'https://mcuapi.herokuapp.com/api/v1/movies?limit=50'
    );
    const data = await response.json();
    setFilms(data.data);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  // const filteredFilms = films.filter((film) =>
  //   film.title.toLowerCase().includes(filter.toLowerCase())
  // );

  return (
    <>
      <h1>Marvel Movies React Simple</h1>

      {/* <FilterBox
        value={filter}
        onChange={(filter) => {
          setFilter(filter);
        }}
      /> */}

      <FilmTable films={films} />
      <FilmCards films={films} />
    </>
  );
}
