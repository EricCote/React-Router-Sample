import { MouseEvent, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Menu from './Menu';
import Route from './Route';

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  useEffect(() => {
    //handle the Back button!
    window.addEventListener('popstate', (evt) => {
      setCurrentPage(evt.state); //change state to re-render the right page
    });
  }, []); //bind this event on the first render.

  //Modify existing links, instead of using a <Link to="/dest" /> component
  useEffect(modifyLinksToAddClickHandler, []);

  function modifyLinksToAddClickHandler() {
    // Select all huperlinks
    for (const link of document.querySelectorAll(
      ':link'
    ) as NodeListOf<HTMLLinkElement>) {
      link.addEventListener('click', (evt) => {
        clickHandler(evt, link); //modify the click event with a special click handler
      });
    }
  }

  function clickHandler(evt: Event, link: HTMLLinkElement) {
    //create a url object from the link text
    const url = new URL(link.href);
    if (
      //if hostname is the same, but with a different path,
      //then handle the navigation
      url.hostname === window.location.hostname &&
      url.pathname !== window.location.pathname
    ) {
      evt.preventDefault(); //cancel the navigation
      window.history.pushState(url.pathname, '', url.pathname); //Add destination in history
      setCurrentPage(url.pathname); //set State to re-render the app.
    }
  }

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
