import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Menu from './Menu';
import Route from './Route';

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.hash);

  useEffect(() => {
    //Handle the "hashchange" event
    window.addEventListener('hashchange', (evt) => {
      setCurrentPage(window.location.hash);
    });
  }, []);

  useEffect(() => {
    //change the existing links to hashes
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
  // go through all links
  for (const link of document.querySelectorAll(
    ':link'
  ) as NodeListOf<HTMLLinkElement>) {
    //create a new link from the existing one
    const url = new URL(link.href);
    //is the destination on the same hostname?
    if (url.hostname === window.location.hostname) {
      //replace the first '/' with '#'
      //Workaround for strictMode: Corrctly add the hash when called a second time.
      link.href = '#' + url.pathname.slice(1) + url.hash.slice(1);
    }
  }
}
