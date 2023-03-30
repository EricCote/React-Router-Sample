import { Button, Table } from 'react-bootstrap';
import { Film, SortedByType } from './FilmInterface';

interface FilmTableProps {
  films: Film[];
  sortedBy?: SortedByType;
  onSort?: (columnName: keyof Film) => void;
}

function FilmTable({ films, sortedBy, onSort }: FilmTableProps) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <Header
            columnName='title'
            display='Title'
            sortedBy={sortedBy}
            onSort={onSort}
          />
          <Header
            columnName='release_date'
            display='Release Date'
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

interface HeaderProps {
  columnName: keyof Film;
  display: string;
  sortedBy?: SortedByType;
  onSort?: (columnName: keyof Film) => void;
}

function Header({ columnName, display, sortedBy, onSort }: HeaderProps) {
  return sortedBy ? (
    <th>
      <Button
        variant='link'
        className='p-0 fw-bold'
        onClick={() => {
          if (onSort) onSort(columnName);
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
