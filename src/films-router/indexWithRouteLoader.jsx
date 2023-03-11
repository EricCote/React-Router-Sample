import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import FilmCard from './FilmCard';
import FilmTable from './FilmTable';
import FilterBox from './FilterBox';
// on pourrait utiliser:
// XHR (XmlHttpRequest)
// jQuery (ajax)
// axios
// fetch (html5)

export default function Films() {
  const films = useLoaderData().data;
  const [sortedBy, setSort] = useState({ column: null, isDescending: false });
  const [filter, setFilter] = useState('');

  let filteredFilms;

  function sort(column) {
    const newSort = { column, isDescending: false }; //Si on trie une nouvelle colonne, c'est ascendant.
    if (sortedBy.column === newSort.column)
      newSort.isDescending = !sortedBy.isDescending; //Si on trie un colonne existante, c'est descendant
    setSort(newSort);
  }

  filteredFilms = films.filter((film) =>
    film.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (sortedBy.column) {
    filteredFilms.sort((a, b) => {
      return a[sortedBy.column].localeCompare(b[sortedBy.column]); //on trie d'après la colonne
    });
    if (sortedBy.isDescending) filteredFilms.reverse(); // on gère le tri descendant.
  }

  return (
    <>
      <h1>Films Marvel</h1>

      <FilterBox
        value={filter}
        onChange={(text) => {
          setFilter(text);
        }}
      />

      <FilmTable films={filteredFilms} sortedBy={sortedBy} sort={sort} />

      {filteredFilms.map((film) => (
        <FilmCard film={film} key={film.id}></FilmCard>
      ))}
    </>
  );
}
