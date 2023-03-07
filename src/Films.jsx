import { useEffect, useState } from 'react';
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
    setFilms(data);
  }

  useEffect(() => {
    chargerFilms();
  }, []);

  return (
    <>
      <h1>Films Marvel</h1>
    </>
  );
}
