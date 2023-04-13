import { useState } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import MovieCards from '../common/MovieCards';
import { Movie, SearchStateType } from '../common/MovieInterface';
import MovieTable from '../common/MovieTable';
import FilterBox from '../common/FilterBox';

interface IData {
  data: Movie[];
}

export default function MoviesRouter() {
  const movies: Movie[] = (useLoaderData() as IData)?.data ?? [];
  const [{ filter, sortCol, desc }, setSearchState] = useState<SearchStateType>(
    {
      filter: '',
      sortCol: null,
      desc: false,
    }
  );

  let filteredMovies: Movie[];

  function handleSort(column: keyof Movie) {
    const newSort: SearchStateType = {
      filter: filter,
      sortCol: column,
      desc: false,
    };
    //if sorting same column, invert order
    if (sortCol === newSort.sortCol) {
      newSort.desc = !desc;
    }
    setSearchState(newSort);
  }

  function handleFilter(filter: string) {
    setSearchState({ filter, sortCol, desc });
  }

  filteredMovies = movies?.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (sortCol) {
    filteredMovies.sort((a, b) => {
      return (a[sortCol] as string).localeCompare(b[sortCol] as string);
    });
    if (desc) filteredMovies.reverse();
  }

  return (
    <>
      <h1>Marvel Movies Routing with State</h1>

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

//-------------------------------------------------

export async function loaderSimple() {
  return fetch('https://mcuapi.herokuapp.com/api/v1/movies?limit=50');
}

export async function loaderWithErrorHandling({ request }: LoaderFunctionArgs) {
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
  return res.json();
}
