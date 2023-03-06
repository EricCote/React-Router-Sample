import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Menu from './Menu';
import Route from './Route';

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.hash);

  useEffect(() => {
    //On gère la navigation hashchange
    window.addEventListener('hashchange', (evt) => {
      setCurrentPage(window.location.hash);
    });
  }, []);

  useEffect(() => {
    //On change les liens vers des Hash
    changeAllLinksToHashes();
  }, [currentPage]);

  return (
    <>
      <Menu />
      <Container>
        <Route page={currentPage} />
      </Container>
    </>
  );
}

export default App;

function changeAllLinksToHashes() {
  // On boucle à travers tous les liens
  for (const link of document.querySelectorAll(':link')) {
    //pour chaque lien, on créé un objet URL
    const url = new URL(link.href);
    //on valide si on reste sur même domaine
    if (url.hostname === window.location.hostname) {
      //On remplace le premier '/' par '#'
      //Workaround pour strictMode: on ajoute le hash quand on est appelé une 2e fois de suite
      link.href = '#' + url.pathname.slice(1) + url.hash.slice(1);
    }
  }
}
