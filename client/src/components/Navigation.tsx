import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <i className="fas fa-user-tie me-2"></i>
          MI PORTFOLIO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              <i className="fas fa-home me-2"></i>
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/admin">
              <i className="fas fa-cogs me-2"></i>
              Panel Admin
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation; 