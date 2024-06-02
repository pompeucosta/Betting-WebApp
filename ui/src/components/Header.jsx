import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const Header = ({loggedIn}) => {

    const navigate = useNavigate();


    const handleProfileClick = () => {
        navigate('/profile');
    };

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
                    
                </Nav>
                <Nav className='px-3'>
                    {loggedIn ? (
                        <Button variant="light" className="ms-2" onClick={handleProfileClick}>Profile</Button>
                    ) : (
                        <>
                            <Button variant="light" className="ms-2" onClick={handleRegisterClick}>Register</Button>
                            <Button variant="danger" className="ms-2" onClick={handleLoginClick}>Login</Button>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header