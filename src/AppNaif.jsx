import { Container } from 'react-bootstrap';
import Menu from './Menu';
import Route from './Route';

//Le problème avec cette approche: quand on clique un menu,
//ça charge de nouveau notre application, plutôt que de cacher/montrer la bonne page/composant.
//On ne profite donc pas du SPA qui a chargé tous les composants dès le départ.
function App() {
  const currentPage = window.location.pathname;

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
