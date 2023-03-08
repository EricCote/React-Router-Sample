import { useLoaderData } from 'react-router-dom';
import FilmCard from './FilmCard';
import FilmTable from './FilmTable';
// on pourrait utiliser:
// XHR (XmlHttpRequest)
// jQuery (ajax)
// axios
// fetch (html5)

export default function Films() {
  const films = useLoaderData().data;

  return (
    <>
      <h1>Films Marvel</h1>

      <FilmTable films={films} />

      {films.map((film) => (
        <FilmCard film={film} key={film.id}></FilmCard>
      ))}
    </>
  );
}
