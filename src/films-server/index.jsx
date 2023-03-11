import { Nav } from 'react-bootstrap';
import {
  useLoaderData,
  useParams,
  useSearchParams,
  NavLink,
  useNavigate,
} from 'react-router-dom';
import FilmCards from '../films-common/FilmCards';
import FilmTable from '../films-common/FilmTable';
import FilterBox from '../films-common/FilterBox';

export default function FilmsServer() {
  const { films, q, total } = useLoaderData(); //Get data from the loader
  let { page = 1 } = useParams(); //get the page from the url

  const navigate = useNavigate(); //to help us navigate back or forward

  const nbPages = Math.ceil((total + 1) / 10);

  let [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  //{q: str, sortCol: column, desc: bool}

  function handleSort(column) {
    //on créé un objet newSort, pour le nouvel état de recherche
    const newSort = {
      sortCol: column, //On spécifie la colonne à trier
      desc: false, //Par défaut, c'est un tri croissant.
    };
    //Si on trie une colonne existante, on inverse l'ordre
    if (params.sortCol === newSort.sortCol) {
      //on doit convertir un string en booléen et l'inverser.
      newSort.desc = !(params.desc === 'true');
    }
    updateSearch(newSort);
  }

  function updateSearch(newSearch) {
    const mergedSearch = { ...params, ...newSearch }; //fusion des paramètres nouveau et ancien
    setSearchParams(mergedSearch); //Sauvegardons ces paramètres
    if (newSearch.q !== params.q && page > 1) {
      // si nous lancons une recherche et qu'on est
      const s = new URLSearchParams(mergedSearch);
      navigate(`/marvel/server/?${s}`); //then lets navigate to page 1, keeping the searchParams
    }
  }

  return (
    <>
      <h1>Films Marvel Server</h1>

      <FilterBox
        value={q}
        onSubmit={(text) => {
          updateSearch({ q: text });
        }}
      />

      <Paging nbPages={nbPages} page={page} searchParams={searchParams} />

      <FilmTable
        films={films}
        sortedBy={{ sortCol: params.sortCol, desc: params.desc == 'true' }} // desc needs to be converted to bool.  Only 2 == here
        onSort={handleSort}
      />

      <FilmCards films={films} />
    </>
  );
}

function Paging({ nbPages, page, searchParams }) {
  return (
    nbPages > 1 && (
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
    )
  );
}
