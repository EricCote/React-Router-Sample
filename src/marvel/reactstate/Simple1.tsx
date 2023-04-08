import { useEffect, useState } from 'react';
import FilmCards from '../common/FilmCards';
import { Film } from '../common/FilmInterface';
import FilmTable from '../common/FilmTable';

export default function FilmsSimple() {
  const [films, setFilms] = useState<Film[]>([]);

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

  return (
    <>
      <h1>Marvel Movies React simple</h1>

      <FilmTable films={films} />
      <FilmCards films={films} />
    </>
  );
}
