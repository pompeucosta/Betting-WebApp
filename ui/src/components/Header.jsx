import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Header = () => {
    return (
        <Navbar variant='dark' expand="lg" className="navbar" fixed="top">
        <Navbar.Brand href="#">NextGen SportsBet Inc.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="#">Sports</Nav.Link>
            <Nav.Link href="#">Live</Nav.Link>
            </Nav>
            <Nav>
            <Button variant="light" className="ms-2">Register</Button>
            <Button variant="danger" className="ms-2">Login</Button>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;