import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/Header.css';


const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);
    const navigate = useNavigate();


    const getWalletBalance = () => {
        /*
        // Get wallet balance
        fetch('/wallet', {
            method: 'GET',
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        setWalletBalance(data.balance);
                    });
                } else {
                    console.error('Error:', response);
                }
            }).catch((error) => {
                console.error('Error:', error);
            });
            */
    };

    const addMoneyWallet = () => {
        // Add money to wallet
        // Criar um form para adicionar dinheiro à carteira

        //setWalletBalance(walletBalane + ...);
        console.log('Dinheiro adicionado à carteira!');
    };
    
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
                getWalletBalance();
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
                        <>                        
                        <Button className="walletButton" style={{ backgroundColor: 'rgb(186, 43, 4)', color: 'white', border:'none' }} onClick={addMoneyWallet}>
                            <span className="walletIcon">
                                <span className="walletIconPlus">+</span>
                            </span>
                            <span className="walletBalance">{walletBalance} €</span>
                        </Button>
                        <Button variant="light" className="ms-2" onClick={handleProfileClick}>Profile</Button>
                        </>
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