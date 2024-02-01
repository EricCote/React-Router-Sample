import { useEffect, useState } from 'react';
import { Movie } from '../marvel/common/MovieInterface';

/*
Browser API
1. XmlHttpRequest (xhr Ajax)
2. Fetch API (promise based)

External libraries
1. jQuery (ajax)
2. Axios  (promise based)
3. TanStack Query
*/

export default function useMarvelMovies(): [
  movies: Movie[],
  refreshMovies: () => Promise<void>
] {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    refreshMovies();
  }, []);

  async function refreshMovies() {
    const res = await fetch(
      'https://mcuapi.herokuapp.com/api/v1/movies?limit=50'
    );
    const data = await res.json();
    setMovies(data.data);
  }

  return [movies, refreshMovies];
}
