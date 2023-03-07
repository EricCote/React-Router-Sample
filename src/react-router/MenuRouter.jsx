import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function Menu() {
  let location = useLocation();
  return (
    <Navbar variant='dark' bg='dark' expand='lg' className='mb-4'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          React Academy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav activeKey={location.pathname} className='me-auto'>
            <Nav.Link as={Link} eventKey='/page1' to='/page1'>
              Page 1
            </Nav.Link>
            <Nav.Link as={Link} eventKey='/page2' to='/page2'>
              Page 2
            </Nav.Link>
            <Nav.Link as={Link} eventKey='/compteur' to='/compteur'>
              Compteur
            </Nav.Link>
            <Nav.Link as={Link} eventKey='/films' to='/films'>
              Films Marvel
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
