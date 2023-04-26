import useMarvelMovies from './useMarvelMovies';

/*
intégré au navigateur
1. XmlHttpRequest (xhr Ajax)
2. Fetch API (promise based)

Librairies externes:
1. jQuery (ajax)
2. Axios  (promise based)
3. React query

*/

export default function Page1() {
  const [films, refreshFilms] = useMarvelMovies();

  return (
    <div>
      <h1>Page 1 </h1>
      <ul>
        {films.map((film) => {
          return (
            <li key={film.id}>
              {film.title} ({film.directed_by})
            </li>
          );
        })}
      </ul>
    </div>
  );
}
