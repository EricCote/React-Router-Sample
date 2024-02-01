import useMarvelMovies from './useMarvelMovies';

export default function Page1() {
  const [movies, refreshMovies] = useMarvelMovies();

  return (
    <div>
      <h1>Page 1 </h1>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              {movie.title} ({movie.directed_by})
            </li>
          );
        })}
      </ul>
      <button onClick={refreshMovies}>Refresh</button>
    </div>
  );
}
