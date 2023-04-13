import { Card, Col, Row } from 'react-bootstrap';
import { Movie } from './MovieInterface';

const formatCurrency: (value: number) => string = new Intl.NumberFormat(
  'en-US',
  {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }
).format;

interface MovieCardsProps {
  movies: Movie[];
}

export default function MovieCards({ movies }: MovieCardsProps) {
  return (
    <Row>
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id}></MovieCard>
      ))}
    </Row>
  );
}

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <Col lg='6'>
      <Card id={movie.title} className='mb-3'>
        <Row className='g-0'>
          <Col md='5'>
            <img
              className='img-fluid rounded-start'
              src={movie.cover_url}
              alt={movie.title}
              style={{ objectFit: 'cover', width: '100%' }}
            />
          </Col>
          <Col md='7' className='d-flex flex-column'>
            <Card.Body className='pb-0'>
              <Card.Title
                as='h4'
                className='overflow-y-auto'
                style={{ maxHeight: '2.0em', minHeight: 30 }}
              >
                {movie.title}
              </Card.Title>
              <Card.Text>
                <b>Released on:</b> {movie.release_date} <br />
                <b>Duration:</b> {movie.duration} minutes
              </Card.Text>
              <Card.Text className='overflow-y-scroll' style={{ height: 120 }}>
                {movie.overview}
              </Card.Text>
              <Card.Text className='pb-0'>
                <b>Box Office: </b> {formatCurrency(movie.box_office)}
                <br />
                <b>Directed by: </b> {movie.directed_by}
              </Card.Text>
            </Card.Body>
            <div className='mt-auto mb-3 d-flex'>
              <a className='btn btn-primary ms-auto me-3' href='#top'>
                Back to top
              </a>
            </div>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}
