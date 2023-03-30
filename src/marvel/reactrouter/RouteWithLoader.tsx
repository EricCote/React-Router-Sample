import { useState } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import FilmCards from '../common/FilmCards';
import { Film, SearchStateType } from '../common/FilmInterface';
import FilmTable from '../common/FilmTable';
import FilterBox from '../common/FilterBox';

interface IData {
  data: Film[];
}

export default function FilmsRouter() {
  const films: Film[] = (useLoaderData() as IData).data ?? [];
  const [{ filter, sortCol, desc }, setSearchState] = useState<SearchStateType>(
    {
      filter: '',
      sortCol: null,
      desc: false,
    }
  );

  let filteredFilms: Film[];

  function handleSort(column: keyof Film) {
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

  filteredFilms = films?.filter((film) =>
    film.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (sortCol) {
    filteredFilms.sort((a, b) => {
      return (a[sortCol] as string).localeCompare(b[sortCol] as string);
    });
    if (desc) filteredFilms.reverse();
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

      <FilmTable
        films={filteredFilms}
        sortedBy={{ sortCol, desc }}
        onSort={handleSort}
      />
      <FilmCards films={filteredFilms} />
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
