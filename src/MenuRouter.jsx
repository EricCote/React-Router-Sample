import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <Navbar variant='dark' bg='dark' expand='lg' className='mb-4'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          React Academy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/page1'>
              Page 1
            </Nav.Link>
            <Nav.Link as={Link} to='/page2'>
              Page 2
            </Nav.Link>
            <Nav.Link as={Link} to='/compteur'>
              Compteur
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
