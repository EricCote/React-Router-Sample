import './custom.scss';
import Menu from './Menu';
import Page1 from './Page1';
import Page2 from './Page2';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

function Out({ page }) {
  //  console.log(page);
  switch (page) {
    case '/page1':
    case '/':  
      return <Page1 />;
    case '/page2':
      return <Page2 />;
    default:
      return "404 error";  
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState('/page1');

  useEffect(() => {
    window.addEventListener("popstate", (evt)=> {setCurrentPage(evt.state)})

    for (const link of document.querySelectorAll(':link')) {
      link.addEventListener('click', (evt) => {
        const url = new URL(link.href);
        if (url.hostname === window.location.hostname && url.pathname!== window.location.pathname) {
          evt.preventDefault();
          window.history.pushState(url.pathname, '', url.pathname);
          console.log(url.pathname);
          setCurrentPage(url.pathname);
          
        }
      });
    }
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
