import { useState } from 'react';
import {
  URLSearchParamsInit,
  useLoaderData,
  useSearchParams,
} from 'react-router-dom';
import FilmCards from '../common/FilmCards';
import { Film } from '../common/FilmInterface';
import FilmTable from '../common/FilmTable';
import FilterBox from '../common/FilterBox';

interface IData {
  data: Film[];
}

interface SearchParamsObject {
  filter?: string;
  sortCol?: keyof Film | null;
  desc?: string;
  q?: string;
}

export default function FilmsRoutingUrl() {
  const films = (useLoaderData() as IData)?.data ?? [];
  let [searchParams, setSearchParams] = useSearchParams();
  //searchParams: https://url?q=str&sortCol=column&desc=bool
  const params: SearchParamsObject = Object.fromEntries(searchParams);
  //params= {q: str, sortCol: column, desc: "bool"}
  const { q = '', sortCol, desc } = params;

  let filteredFilms;

  function handleSort(column: keyof Film) {
    const newSort: SearchParamsObject = {
      sortCol: column,
      desc: 'false',
    };

    if (sortCol === newSort.sortCol) {
      //convert string to boolean and back
      newSort.desc = (!(desc === 'true')).toString();
    }
    updateSearch(newSort);
  }

  function updateSearch(newSearch: SearchParamsObject) {
    const mergedSearch: SearchParamsObject = { ...params, ...newSearch }; //merge old and new params
    setSearchParams(mergedSearch as URLSearchParamsInit); //set new search params
  }

  filteredFilms = films?.filter((film) =>
    film.title.toLowerCase().includes(q.toLowerCase())
  );

  if (sortCol) {
    filteredFilms.sort((a, b) => {
      return (a[sortCol] as string).localeCompare(b[sortCol] as string); //on trie d'après la colonne
    });
    if (desc) filteredFilms.reverse(); // on gère le tri descendant.
  }

  return (
    <>
      <h1>Marvel Movies with Url Routing</h1>

      <FilterBox
        value={q}
        onSubmit={(text) => {
          updateSearch({ q: text });
        }}
      />

      <FilmTable
        films={filteredFilms}
        sortedBy={{ sortCol: sortCol ?? null, desc: desc === 'true' }}
        onSort={handleSort}
      />
      <FilmCards films={filteredFilms} />
    </>
  );
}
