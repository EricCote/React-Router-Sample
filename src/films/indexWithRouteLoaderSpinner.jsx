import { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import { Await, useLoaderData } from 'react-router-dom';
import FilmCard from './FilmCard';
import FilmTable from './FilmTable';
// on pourrait utiliser:
// XHR (XmlHttpRequest)
// jQuery (ajax)
// axios
// fetch (html5)

export default function Films() {
  const films = useLoaderData();

  return (
    <>
      <h1>Films Marvel</h1>

      <Suspense
        fallback={
          <Spinner animation='border' role='status' variant='primary'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        }
      >
        <Await
          resolve={films.films}
          errorElement={<p>Erreur à charger les films!</p>}
        >
          {(filmWrapper) => {
            const films = filmWrapper.data;
            return (
              <>
                <FilmTable films={films} />

                {films.map((film) => (
                  <FilmCard film={film} key={film.id}></FilmCard>
                ))}
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
