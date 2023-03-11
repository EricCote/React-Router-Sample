import { Container, Spinner } from 'react-bootstrap';
import { Outlet, useNavigation } from 'react-router-dom';
import Menu from './MenuRouter';

export default function Root() {
  const navigation = useNavigation();
  return (
    <>
      <Menu />
      <Container>
        {navigation.state === 'loading' && (
          <Spinner animation='border' variant='primary' />
        )}
        <Outlet />
      </Container>
    </>
  );
}
