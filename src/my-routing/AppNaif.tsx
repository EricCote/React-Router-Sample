import { Container } from 'react-bootstrap';
import Menu from './Menu';
import Route from './Route';

//the problem here: when we click on the menu,
//the browser loads our app again, instead of hiding/showing
//the current page/component.
//Since the SPA loads all components at load time. There's no need to reload
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
