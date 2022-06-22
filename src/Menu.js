import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function Menu() {
  return (
    <Navbar bg='light' variant='light' expand='lg' >
      <Container>
        <Navbar.Brand href='/'>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/page1'>Page 1</Nav.Link>
            <Nav.Link href='/page2'>Page 2</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
