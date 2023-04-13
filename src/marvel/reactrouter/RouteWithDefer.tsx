import { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import {
  Await,
  useLoaderData,
  defer,
  LoaderFunctionArgs,
} from 'react-router-dom';
import MovieCards from '../common/MovieCards';
import { Movie } from '../common/MovieInterface';
import MovieTable from '../common/MovieTable';

interface MovieResults {
  movies: Movie[];
}

export default function MoviesDefer() {
  const results: MovieResults = useLoaderData() as MovieResults;

  return (
    <>
      <h1>Marvel movies with Loader, Suspense, Await and Differ </h1>

      <Suspense
        fallback={
          <Spinner animation='border' role='status' variant='primary'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        }
      >
        <Await
          resolve={results?.movies}
          errorElement={<p>Error loading Movies!</p>}
        >
          {(movieWrapper) => {
            const movies = movieWrapper?.data ?? [];
            return (
              <>
                <MovieTable movies={movies} />

                <MovieCards movies={movies} />
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

//----------------------------------------------------------

export async function loaderDefer({ request }: LoaderFunctionArgs) {
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
  return defer({ movies: res.json() });
}
