import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Table } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLoaderData } from 'react-router-dom';
// on pourrait utiliser:
// XHR (XmlHttpRequest)
// jQuery (ajax)
// axios
// fetch (html5)

export default function Thrones() {
  const characters = useLoaderData();
  const [selctedId, setSelectedId] = useState(null);

  function onClickPersonage(id) {
    setSelectedId(id);
  }

  const showCaracter = characters.find(
    (character) => character.id === selctedId
  );

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover variant='dark'>
              <thead>
                <tr>
                  <th>Personage</th>
                  <th>Titre</th>
                </tr>
              </thead>
              <tbody>
                {characters.map((character) => (
                  <tr
                    key={character.id}
                    id={character.id}
                    onClick={() => {
                      onClickPersonage(character.id);
                    }}
                  >
                    <td>{character.fullName}</td>
                    <td>{character.title}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col>
            {showCaracter && (
              <Card style={{ width: '18rem' }}>
                <Card.Img
                  variant='top'
                  key={showCaracter.id}
                  src={showCaracter.imageUrl}
                  alt={showCaracter.id}
                  id={showCaracter.id}
                />{' '}
                <Card.Body>
                  <Card.Title>{showCaracter.fullName}</Card.Title>
                  <Card.Text>{showCaracter.family}</Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
