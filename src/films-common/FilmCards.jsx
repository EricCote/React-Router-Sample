import { Card, Col, Row } from 'react-bootstrap';

const formatCurrency = new Intl.NumberFormat('fr-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 0,
}).format;

function FilmCards({ films }) {
  return (
    <Row>
      {films.map((film) => (
        <FilmCard film={film} key={film.id}></FilmCard>
      ))}
    </Row>
  );
}

function FilmCard({ film }) {
  return (
    <Col lg='6'>
      <Card id={film.title} className='mb-3'>
        <Row className='g-0'>
          <Col md='5'>
            <img
              className='img-fluid rounded-start'
              src={film.cover_url}
              alt={film.title}
              style={{ objectFit: 'cover', width: '100%' }}
            />
          </Col>
          <Col md='7' className='d-flex flex-column'>
            <Card.Body className='pb-0'>
              <Card.Title
                as='h4'
                className='overflow-y-auto'
                style={{ maxHeight: '2.0em' }}
              >
                {film.title}
              </Card.Title>
              <Card.Text>
                <b>Released on:</b> {film.release_date} <br />
                <b>Duration:</b> {film.duration} minutes
              </Card.Text>
              <Card.Text className='overflow-y-scroll' style={{ height: 120 }}>
                {film.overview}
              </Card.Text>
              <Card.Text className='pb-0'>
                <b>Box Office: </b> {formatCurrency(film.box_office)}
                <br />
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
    </Col>
  );
}

export default FilmCards;
