import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


const Header = () => {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <Navbar variant='dark' expand="lg" className="navbar" fixed="top">
        <Navbar.Brand href="/" className='px-3'>NextGen SportsBet Inc.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="#">Sports</Nav.Link>
            <Nav.Link href="#">Live</Nav.Link>
            </Nav>
            <Nav className='px-3'>
            <Button variant="light" className="ms-2" onClick= {handleRegisterClick}>Register</Button>
            <Button variant="danger" className="ms-2" onClick={handleLoginClick} >Login</Button>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default Header