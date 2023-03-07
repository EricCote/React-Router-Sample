import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Menu from './MenuRouter';

export default function Root() {
  return (
    <>
      <Menu />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
