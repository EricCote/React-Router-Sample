import { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import { Await, useLoaderData, defer } from 'react-router-dom';
import FilmCards from '../films-common/FilmCards';
import FilmTable from '../films-common/FilmTable';

export default function FilmsDefer() {
  const films = useLoaderData();

  return (
    <>
      <h1>Films Marvel avec Loader, Suspense, Await et Differ </h1>

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

                <FilmCards films={films} />
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

export async function loaderDefer({ request }) {
  let res;
  try {
    res = await fetch('https://mcuapi.herokuapp.com/api/v1/movies?limit=50', {
      signal: request.signal,
    });
  } catch {
    throw new Response('Service Unavailable', {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
  if (!res.ok) {
    throw new Response(res.statusText, {
      status: res.status,
      statusText: res.statusText,
    });
  }
  return defer({ films: res.json() });
}
