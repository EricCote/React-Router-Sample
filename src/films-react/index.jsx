import { useEffect, useState } from 'react';
import FilmCards from '../films-common/FilmCards';
import FilmTable from '../films-common/FilmTable';
import FilterBox from '../films-common/FilterBox';

export default function FilmsReact() {
  const [films, setFilms] = useState([]);
  const [{ filter, sortCol, desc }, setSearchState] = useState({
    filter: '',
    sortCol: null,
    desc: false,
  });

  let filteredFilms;

  function handleSort(column) {
    //on créé un objet newSort, pour le nouvel état de recherche
    const newSort = {
      filter: filter, //On garde le tri courant
      sortCol: column, //Ov spécifie la colonne à trier
      desc: false, //Par défaut, c'est un tri croissant.
    };
    //Si on trie une colonne existante, on inverse l'ordre
    if (sortCol === newSort.sortCol) {
      newSort.desc = !desc;
    }
    setSearchState(newSort);
  }

  function handleFilter(filter) {
    setSearchState({ filter, sortCol, desc });
  }

  async function chargerFilms() {
    const response = await fetch(
      'https://mcuapi.herokuapp.com/api/v1/movies?limit=50'
    );
    const data = await response.json();
    setFilms(data.data);
  }

  useEffect(() => {
    chargerFilms();
  }, []);

  filteredFilms = films.filter((film) =>
    film.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (sortCol) {
    filteredFilms.sort((a, b) => {
      return a[sortCol].localeCompare(b[sortCol]); //on trie d'après la colonne
    });
    if (desc) filteredFilms.reverse(); // on gère le tri descendant.
  }

  return (
    <>
      <h1>Films Marvel Approche React Classique</h1>

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
