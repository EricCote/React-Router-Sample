import {
  URLSearchParamsInit,
  useLoaderData,
  useSearchParams,
} from 'react-router-dom';
import MovieCards from '../common/MovieCards';
import { Movie } from '../common/MovieInterface';
import MovieTable from '../common/MovieTable';
import FilterBox from '../common/FilterBox';

interface IData {
  data: Movie[];
}

interface SearchParamsObject {
  filter?: string;
  sortCol?: keyof Movie | null;
  desc?: string;
  q?: string;
}

export default function MoviesRoutingUrl() {
  const movies = (useLoaderData() as IData)?.data ?? [];
  let [searchParams, setSearchParams] = useSearchParams();
  //searchParams: https://url?q=str&sortCol=column&desc=bool
  const params: SearchParamsObject = Object.fromEntries(searchParams);
  //params= {q: str, sortCol: column, desc: "bool"}
  const { q = '', sortCol, desc } = params;

  let filteredMovies;

  function handleSort(column: keyof Movie) {
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

  filteredMovies = movies?.filter((movie) =>
    movie.title.toLowerCase().includes(q.toLowerCase())
  );

  if (sortCol) {
    filteredMovies.sort((a, b) => {
      return (a[sortCol] as string).localeCompare(b[sortCol] as string); //on trie d'après la colonne
    });
    if (desc) filteredMovies.reverse(); // on gère le tri descendant.
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

      <MovieTable
        movies={filteredMovies}
        sortedBy={{ sortCol: sortCol ?? null, desc: desc === 'true' }}
        onSort={handleSort}
      />
      <MovieCards movies={filteredMovies} />
    </>
  );
}
