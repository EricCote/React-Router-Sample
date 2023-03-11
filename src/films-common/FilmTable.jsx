import { Button, Table } from 'react-bootstrap';

function FilmTable({ films, sortedBy, onSort }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <Header
            columnName='title'
            display='Nom'
            sortedBy={sortedBy}
            onSort={onSort}
          />
          <Header
            columnName='release_date'
            display='Date Sortie'
            sortedBy={sortedBy}
            onSort={onSort}
          />
        </tr>
      </thead>
      <tbody>
        {films.map((film) => (
          <tr key={film.id}>
            <td>
              <a href={`#${film.title}`}>{film.title}</a>{' '}
            </td>
            <td>{film.release_date}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default FilmTable;

function Header({ columnName, display, sortedBy, onSort }) {
  return sortedBy ? (
    <th>
      <Button
        variant='link'
        className='p-0 fw-bold'
        onClick={() => {
          onSort(columnName);
        }}
      >
        {display}{' '}
        {sortedBy.sortCol === columnName ? (sortedBy.desc ? '⬆' : '⬇') : '↕'}
      </Button>
    </th>
  ) : (
    <th>{display}</th>
  );
}
