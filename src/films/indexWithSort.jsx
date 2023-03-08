import { useEffect, useState } from 'react';
import FilmCard from './FilmCard';
import FilmTable from './FilmTable';
import FilterBox from './FilterBox';
// on pourrait utiliser:
// XHR (XmlHttpRequest)
// jQuery (ajax)
// axios
// fetch (html5)

export default function Films() {
  const [films, setFilms] = useState([]);
  const [sortedBy, setSort] = useState({ column: null, isDescending: false });
  const [filter, setFilter] = useState('');

  function sort(column) {
    const newSort = { column, isDescending: false }; //Si on trie une nouvelle colonne, c'est ascendant.
    if (sortedBy.column === newSort.column)
      newSort.isDescending = !sortedBy.isDescending; //Si on trie un colonne existante, c'est descendant
    const sortedFilms = [...films]; //on clone les films
    sortedFilms.sort((a, b) => {
      return a[column].localeCompare(b[column]); //on trie d'après la colonne
    });
    if (newSort.isDescending) sortedFilms.reverse(); // on gère le tri descendant.
    setSort(newSort);
    setFilms(sortedFilms);
  }

  async function chargerFilms() {
    const response = await fetch(
      'https://mcuapi.herokuapp.com/api/v1/movies?limit=50'
    );
    const data = await response.json();
    setSort({ column: null, isDescending: false });
    setFilms(data.data);
  }

  useEffect(() => {
    chargerFilms();
  }, []);

  const filteredFilms = films.filter((film) =>
    film.title.toLowerCase().includes(filter.toLowerCase())
  );

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
