import { Container } from 'react-bootstrap';
import { useRouteError } from 'react-router-dom';
import Menu from './MenuRouter';

export default function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  return (
    <>
      <Menu />
      <Container>
        <p>Erreur {error?.status} sur la page:</p>
        <p>{error?.data}</p>
      </Container>
    </>
  );
}
