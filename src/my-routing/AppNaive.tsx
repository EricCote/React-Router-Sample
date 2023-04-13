import { Container } from 'react-bootstrap';
import Menu from './Menu';
import Route from './Route';

//the problem here: when we click on the menu,
//the browser loads our app again, instead of hiding/showing
//the current page/component.
//But there's no need to reload, since a SPA loads all components at load time.
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
