import React from 'react'
import { Navbar, Nav, Button, Modal, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/Header.css';


const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);
    const [show, setShow] = useState(false);
    const [amount, setAmount] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();



    const getWalletBalance = () => {
        fetch('/checkBalance', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data.balance);
                    setWalletBalance(data.balance);
                });
            } else {
                console.error('Error:', response);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };


    const addMoneyWallet = () => {
        if (amount <= 0) {
            console.error('Invalid amount');
            return;
        }
    
        // Envia uma solicitação POST para o endpoint /deposit
        fetch('/deposit?amount='+parseFloat(amount), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            if (response.status === 200) {
                getWalletBalance();
                console.log('Dinheiro adicionado à carteira!');
            } else {
                console.error('Error:', response);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        setShow(false);  
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
        <>
        <Navbar variant='dark' expand="lg" className="navbar" fixed="top">
            <Navbar.Brand href="/" className='px-3'>NextGen SportsBet Inc.</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    
                </Nav>
                <Nav className='px-3'>
                    {loggedIn ? (
                        <>                        
                        <Button className="walletButton" style={{ backgroundColor: 'rgb(186, 43, 4)', color: 'white', border:'none' }} onClick={handleShow}>
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
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Add Money</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form>
              <Form.Group controlId="formAmount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Insert the quantity"
                  />
              </Form.Group>
          </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
              Close
          </Button>
          <Button variant="primary" onClick={addMoneyWallet}>
              Add money
        </Button>
      </Modal.Footer>
  </Modal>
</>
);
};

export default Header;