import './custom.scss';
import Menu from './Menu';
import Page1 from './Page1';
import Page2 from './Page2';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

function Out({ page }) {
  switch (page) {
    case '#page1':
    case '#':  
      return <Page1 />;
    case '#page2':
      return <Page2 />;
    default:
      return "404 error";  
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.hash);

  useEffect(() => {
    window.addEventListener('hashchange', (evt) => {
      evt.preventDefault();
      setCurrentPage(window.location.hash);
    });
  }, []);

  return (
    <>
      <Menu />
      <Container>
        <Out page={currentPage} />
      </Container>
    </>
  );
}

export default App;
