import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);
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

    useEffect(() => {
        // Check if user is logged in, endpoint should return 200 if logged in (/checkLogIn)
        fetch('/checkLogIn', {
          method: 'GET',
        })
          .then((response) => {
            if (response.status === 200) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
    }, []);

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