import { useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import FilmCards from '../films-common/FilmCards';
import FilmTable from '../films-common/FilmTable';
import FilterBox from '../films-common/FilterBox';

export default function FilmsRoutingUrl() {
  const films = useLoaderData().data ?? [];
  let [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  //{q: str, sortCol: column, desc: bool}
  const { q = '', sortCol, desc } = params;

  let filteredFilms;

  function handleSort(column) {
    //on créé un objet newSort, pour le nouvel état de recherche
    const newSort = {
      sortCol: column, //On spécifie la colonne à trier
      desc: false, //Par défaut, c'est un tri croissant.
    };
    //Si on trie une colonne existante, on inverse l'ordre
    if (sortCol === newSort.sortCol) {
      //on doit convertir un string en booléen et l'inverser.
      newSort.desc = !(desc === 'true');
    }
    updateSearch(newSort);
  }

  function updateSearch(newSearch) {
    const mergedSearch = { ...params, ...newSearch }; //fusion des paramètres nouveau et ancien
    setSearchParams(mergedSearch); //Sauvegardons ces paramètres
  }

  filteredFilms = films?.filter((film) =>
    film.title.toLowerCase().includes(q.toLowerCase())
  );

  if (sortCol) {
    filteredFilms.sort((a, b) => {
      return a[sortCol].localeCompare(b[sortCol]); //on trie d'après la colonne
    });
    if (desc) filteredFilms.reverse(); // on gère le tri descendant.
  }

  return (
    <>
      <h1>Films Marvel Routage Sans State juste Routage</h1>

      <FilterBox
        value={q}
        onSubmit={(text) => {
          updateSearch({ q: text });
        }}
      />

      <FilmTable
        films={filteredFilms}
        sortedBy={{ sortCol: sortCol, desc: desc }}
        onSort={handleSort}
      />
      <FilmCards films={filteredFilms} />
    </>
  );
}

export async function loaderSimple({ request }) {
  return fetch('https://mcuapi.herokuapp.com/api/v1/movies?limit=50');
}

export async function loaderWithErrorHandling({ request }) {
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
