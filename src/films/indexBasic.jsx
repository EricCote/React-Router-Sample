import { useEffect, useState } from 'react';
import FilmCard from './FilmCard';
import FilmTable from './FilmTable';
import FilterBox from './FilterBox';

export default function Films() {
  const [films, setFilms] = useState([]);
  const [filter, setFilter] = useState('');

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

  const filteredFilms = films.filter((film) =>
    film.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h1>Films Marvel</h1>

      <FilterBox
        value={filter}
        onChange={(filter) => {
          setFilter(filter);
        }}
      />

      <FilmTable films={filteredFilms} />

      {filteredFilms.map((film) => (
        <FilmCard film={film} key={film.id}></FilmCard>
      ))}
    </>
  );
}
