import { Button, Table } from 'react-bootstrap';
import { Movie, SortedByType } from './MovieInterface';

interface MovieTableProps {
  movies: Movie[];
  sortedBy?: SortedByType;
  onSort?: (columnName: keyof Movie) => void;
}

function MovieTable({ movies, sortedBy, onSort }: MovieTableProps) {
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
        {movies.map((movie) => (
          <tr key={movie.id}>
            <td>
              <a href={`#${movie.title}`}>{movie.title}</a>{' '}
            </td>
            <td>{movie.release_date}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default MovieTable;

interface HeaderProps {
  columnName: keyof Movie;
  display: string;
  sortedBy?: SortedByType;
  onSort?: (columnName: keyof Movie) => void;
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
