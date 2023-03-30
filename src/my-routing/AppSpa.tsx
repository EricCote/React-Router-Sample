import { Container } from 'react-bootstrap';
import Page1 from '../page1';

/* ------------------------
The way a web server is configured in SPA mode:
- if a folder or page exists on disk, serve it
- if it doesn't exist, serve the default page instead (index.html)
  - unless there is an extension in the request (.png .css .js .html)
    then serve a 404.
---------------------------- */
function App() {
  return (
    <Container className='mt-5'>
      <Page1 />
    </Container>
  );
}

export default App;
