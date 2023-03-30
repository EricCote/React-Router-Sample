import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Table } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLoaderData } from 'react-router-dom';

interface Character {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  family: string;
  image: string;
  imageUrl: string;
}

export default function Thrones() {
  const characters = useLoaderData() as Character[];
  const [selectedId, setSelectedId] = useState<number | null>(null);

  function onClickPersonage(id: number) {
    setSelectedId(id);
  }

  const showCharacter = characters.find(
    (character) => character.id === selectedId
  );

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Table
              striped
              bordered
              hover
              data-bs-theme='dark'
              className='table-dark'
            >
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
            {showCharacter && (
              <Card style={{ width: '18rem' }}>
                <Card.Img
                  variant='top'
                  key={showCharacter.id}
                  src={showCharacter.imageUrl}
                  alt={showCharacter.id.toString()}
                />{' '}
                <Card.Body>
                  <Card.Title>{showCharacter.fullName}</Card.Title>
                  <Card.Text>{showCharacter.family}</Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

// --------------------

export async function loaderSimpleThrones() {
  return fetch('https://thronesapi.com/api/v2/Characters');
}
