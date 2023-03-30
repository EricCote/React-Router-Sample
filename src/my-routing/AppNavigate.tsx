import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Menu from './Menu';
import Route from './Route';

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  useEffect(() => {
    window.navigation.addEventListener('navigate', (evt) => {
      if (!evt.canIntercept) return; //is it a local page that we can intercept?
      evt.intercept({
        handler: () => {
          setCurrentPage(new URL(evt.destination.url).pathname);
        },
      });
    });
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
