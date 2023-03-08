import { Button, Table } from 'react-bootstrap';

function FilmTable({ films, sortedBy, sort }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <Header
            columnName='title'
            display='Nom'
            sortedBy={sortedBy}
            sort={sort}
          />
          <Header
            columnName='release_date'
            display='Date Sortie'
            sortedBy={sortedBy}
            sort={sort}
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

function Header({ columnName, display, sortedBy, sort }) {
  return sortedBy ? (
    <th>
      <Button
        variant='link'
        className='p-0 fw-bold'
        onClick={() => {
          sort(columnName);
        }}
      >
        {display}{' '}
        {sortedBy.column === columnName
          ? sortedBy.isDescending
            ? '⬆'
            : '⬇'
          : '↕'}
      </Button>
    </th>
  ) : (
    <th>{display}</th>
  );
}
