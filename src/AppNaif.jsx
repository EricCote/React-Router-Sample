import { Container } from 'react-bootstrap';
import Menu from './Menu';
import Route from './Route';

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
