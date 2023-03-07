import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
// on pourrait utiliser:
// XHR (XmlHttpRequest)
// jQuery (ajax)
// axios
// fetch (html5)

export default function Films() {
  const [films, setFilms] = useState([]);

  async function chargerFilms() {
    const response = await fetch(
      'https://mcuapi.herokuapp.com/api/v1/movies?page=1&limit=50'
    );
    const data = await response.json();
    setFilms(data.data);
  }

  useEffect(() => {
    chargerFilms();
  }, []);

  return (
    <>
      <h1>Films Marvel</h1>
      <Table striped bordered hovered>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film) => (
            <tr key={film.id}>
              <td>{film.title}</td>
              <td>{film.release_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
