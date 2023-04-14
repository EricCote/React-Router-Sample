import { Nav } from 'react-bootstrap';
import {
  useLoaderData,
  useParams,
  useSearchParams,
  NavLink,
  useNavigate,
  LoaderFunctionArgs,
  URLSearchParamsInit,
} from 'react-router-dom';
import MovieCards from '../common/MovieCards';
import { Movie } from '../common/MovieInterface';
import MovieTable from '../common/MovieTable';
import FilterBox from '../common/FilterBox';

interface IData {
  movies: Movie[];
  q: string;
  total: number;
}

interface SearchParamsObject {
  filter?: string;
  sortCol?: keyof Movie | null;
  desc?: string;
  q?: string;
}

export default function MoviesServer() {
  const { movies, q, total } = (useLoaderData() as IData) ?? {
    movies: [],
    q: '',
    total: 0,
  }; //Get data from the loader, put default values if no data
  let { page = '1' } = useParams(); //get the page from the url

  const navigate = useNavigate(); //to help us navigate back or forward

  const nbPages = Math.ceil((total + 1) / 10); //get the number of pages from the total items

  let [searchParams, setSearchParams] = useSearchParams();
  const params: SearchParamsObject = Object.fromEntries(searchParams);
  //{q: str, sortCol: column, desc: bool}

  function handleSort(column: keyof Movie) {
    //create a newsort object
    const newSort: SearchParamsObject = {
      sortCol: column, //column name to sort
      desc: 'false', //default is ascending sort
    };
    //if sorting same column, invert order
    if (params.sortCol === newSort.sortCol) {
      //convert string to boolean
      newSort.desc = (!(params.desc === 'true')).toString();
    }
    updateSearch(newSort as SearchParamsObject);
  }

  function updateSearch(newSearch: SearchParamsObject) {
    const mergedSearch: SearchParamsObject = { ...params, ...newSearch }; //merge old and new params
    setSearchParams(mergedSearch as URLSearchParamsInit); //set new search param
    if (newSearch.q !== params.q && Number.parseInt(page) > 1) {
      // if we're launching a search from page greater than 1
      const s = new URLSearchParams(mergedSearch as URLSearchParams);
      navigate(`/marvel/server/?${s}`); //then navigate back to page 1, keeping current searchParams
    }
  }

  return (
    <>
      <h1>Marvel Movies Server-Side</h1>

      <FilterBox
        value={q}
        onSubmit={(text) => {
          updateSearch({ q: text });
        }}
      />

      <Paging nbPages={nbPages} page={page} searchParams={searchParams} />

      <MovieTable
        movies={movies}
        sortedBy={{
          sortCol: params.sortCol ?? null,
          desc: params.desc === 'true',
        }}
        onSort={handleSort}
      />

      <MovieCards movies={movies} />
    </>
  );
}

interface PagingProps {
  nbPages: number;
  page: string;
  searchParams: URLSearchParams;
}

//----------------------------------

function Paging({ nbPages, page, searchParams }: PagingProps) {
  return nbPages > 1 ? (
    <Nav
      className='justify-content-center mb-1'
      variant='pills'
      activeKey={page}
    >
      {[...Array(nbPages).keys()].slice(1).map((p) => (
        <Nav.Item key={p}>
          <Nav.Link
            as={NavLink}
            eventKey={p}
            to={`/marvel/server/${p}?${searchParams.toString()}`}
          >
            {p}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  ) : (
    <></> //single page, no paging to display
  );
}

///--------------------------------

export async function loaderWithServerSort({
  request,
  params,
}: LoaderFunctionArgs) {
  const url = new URL(request.url); //url is a JS object (not from react router)
  const q = url.searchParams.get('q');
  const order = url.searchParams.get('sortCol');
  const desc = url.searchParams.get('desc');
  const page = params.page ?? 1; //params is from React Router
  let fetchParams = `limit=10&page=${page}`; //build the fetch params
  if (order)
    fetchParams = `${fetchParams}&order=${order},${
      desc === 'true' ? 'DESC' : 'ASC'
    }`;
  if (q) fetchParams = `${fetchParams}&filter=title%3D${q}`;
  const res = await fetch(
    `https://mcuapi.herokuapp.com/api/v1/movies?${fetchParams}`
  );
  const data = await res.json();
  const movies = data.data;
  const total = data.total;

  return { movies, q, total };
  //we return an object of 3 properties:
  //movies (array)
  //q (string)
  //total (number)
}
