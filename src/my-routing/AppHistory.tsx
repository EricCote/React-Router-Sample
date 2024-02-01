import { useEffect, useState } from 'react';
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

  useEffect(modifyLinksToAddClickHandler, []);

  //Modify existing links, instead of using a <Link to="/dest" /> component
  function modifyLinksToAddClickHandler() {
    // Select all huperlinks
    for (const link of document.querySelectorAll(
      ':link'
    ) as NodeListOf<HTMLLinkElement>) {
      //bind a click event handler
      link.addEventListener('click', clickHandler);
    }
  }

  //click handler that uses the history API instead of navigating
  function clickHandler(evt: Event) {
    //create a url object from the link text
    const url = new URL((evt!.target as HTMLAnchorElement).href);
    if (
      //if hostname is the same, but with a different path,
      //then handle the navigation
      url.hostname === window.location.hostname &&
      url.pathname !== window.location.pathname
    ) {
      evt.preventDefault(); //cancel the navigation
      //Add destination in history API
      window.history.pushState(url.pathname, '', url.pathname);
      setCurrentPage(url.pathname); //set State to re-render the app.
    } else if (
      url.hostname === window.location.hostname &&
      url.pathname === window.location.pathname
    ) {
      evt.preventDefault(); //cancel if we navigate to the same page twice
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
