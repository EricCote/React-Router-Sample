import { Card, Col, Row, Button } from 'react-bootstrap';

const formatCurrency = new Intl.NumberFormat('fr-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 0,
}).format;

function FilmCard({ film }) {
  return (
    <Card id={film.title} className='mb-3'>
      <Row className='g-2'>
        <Col md='4'>
          <img
            className='img-fluid rounded-start'
            src={film.cover_url}
            alt={film.title}
            style={{ objectFit: 'cover', width: '100%' }}
          />
        </Col>
        <Col md='8' className='d-flex flex-column'>
          <Card.Body>
            <Card.Title as='h2'>{film.title}</Card.Title>
            <Card.Text>
              <b>Released on:</b> {film.release_date} &nbsp;&nbsp;&nbsp;{' '}
              <b>Duration:</b> {film.duration} minutes
            </Card.Text>
            <Card.Text>{film.overview}</Card.Text>
            <Card.Text>
              <b>Box Office: </b> {formatCurrency(film.box_office)}
            </Card.Text>
            <Card.Text>
              <b>Directed by: </b> {film.directed_by}
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
  );
}

export default FilmCard;
