import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function Menu() {
  return (
    <Navbar variant='dark' bg='dark' expand='lg' className='mb-4'>
      <Container>
        <Navbar.Brand href='/'>React Academy</Navbar.Brand>
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
