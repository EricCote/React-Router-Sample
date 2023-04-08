import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Menu from './Menu';
import Route from './Route';

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  //with the Navigation API, the code is simpler.
  //No need for a <Link to="/dest"> component,
  //nor to handle click events on hyperlinks.

  useEffect(() => {
    //Manage the navigate event
    window.navigation.addEventListener('navigate', (evt) => {
      if (!evt.canIntercept) return; //is it a local page that we can intercept?
      evt.intercept({
        //in that case, intercept the navigation (cancels navigation)
        handler: () => {
          //setState to re-render
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
