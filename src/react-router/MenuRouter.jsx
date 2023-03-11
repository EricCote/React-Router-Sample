import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { NavLink, Link, useLocation } from 'react-router-dom';
import DarkModeMenu from './DarkModeMenu';
import { LocalTheme } from './ThemeProvider';

export default function Menu() {
  let location = useLocation();
  return (
    <LocalTheme theme='dark'>
      <Navbar expand='lg' bg='body' className='mb-4'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            React Academy
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav
              activeKey={location.pathname}
              variant='pills'
              className='me-auto'
            >
              <Nav.Link as={NavLink} to='/page1'>
                Page 1
              </Nav.Link>
              <Nav.Link as={NavLink} to='/page2'>
                Page 2
              </Nav.Link>
              <Nav.Link as={NavLink} to='/compteur'>
                Compteur
              </Nav.Link>
              <NavDropdown
                title='Marvel'
                active={location.pathname.startsWith('/marvel')}
                id='nav-dropdown'
              >
                <NavDropdown.Item as={NavLink} to='/marvel/simpleReact'>
                  Approche React Simple
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to='/marvel/classic'>
                  Approche React
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to='/marvel/router'>
                  Approche Routage
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to='/marvel/defer'>
                  Approche Routage avec defer
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to='/marvel/url'>
                  Approche Routage avec url search
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to='/marvel/server'>
                  Approche Serveur
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={NavLink} to='/thrones'>
                GOT
              </Nav.Link>
              <Nav.Link as={NavLink} to='/contacts'>
                Contacts
              </Nav.Link>
              <DarkModeMenu />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </LocalTheme>
  );
}
