import { useEffect, useState } from 'react';
import { Movie } from '../marvel/common/MovieInterface';

/*
intégré au navigateur
1. XmlHttpRequest (xhr Ajax)
2. Fetch API (promise based)

Librairies externes:
1. jQuery (ajax)
2. Axios  (promise based)
3. React query

*/

export default function useMarvelMovies(): [
  films: Movie[],
  refreshMovies: () => Promise<void>
] {
  const [films, setFilms] = useState<Movie[]>([]);

  useEffect(() => {
    refreshFilms();
  }, []);

  async function refreshFilms() {
    const res = await fetch(
      'https://mcuapi.herokuapp.com/api/v1/movies?limit=50'
    );
    const data = await res.json();
    setFilms(data.data);
  }

  return [films, refreshFilms];
}
