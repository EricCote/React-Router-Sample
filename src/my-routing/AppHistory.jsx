import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Menu from './Menu';
import Route from './Route';

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  useEffect(() => {
    //on gère le bouton Back!
    window.addEventListener('popstate', (evt) => {
      setCurrentPage(evt.state); //On change l'état pour afficher la bonne page
    });

    //On gère les liens existants, de telle façon que quand on clique, on roule notre code de History API
    for (const link of document.querySelectorAll(':link')) {
      link.addEventListener('click', (evt) => {
        const url = new URL(link.href);
        if (
          //on compare si la destination est différente, mais sur le même domaine, que la page courante
          url.hostname === window.location.hostname &&
          url.pathname !== window.location.pathname
        ) {
          evt.preventDefault(); //annule la navigation
          window.history.pushState(url.pathname, '', url.pathname); //on ajoute la destination dans l'historique
          setCurrentPage(url.pathname); //on change l'état pour afficher la bonne page
        }
      });
    }
  }, []);

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
