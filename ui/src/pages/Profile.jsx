import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import withAuthCheck from '../components/withAuthCheck';
import BetHistory from '../components/BetHistory';
import {FaCoins, FaBaby, FaUser, FaEnvelope, FaCalendarAlt, FaPhone } from 'react-icons/fa'; // Importar ícones
import '../css/Profile.css';
import { Button, Modal, Form } from 'react-bootstrap'


const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [walletBalance, setWalletBalance] = useState(0);
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [amount, setAmount] = useState(0);
    const handleCloseDepositModal = () => setShowDepositModal(false);
    const handleShowDepositModal = () => setShowDepositModal(true);
    const handleCloseWithdrawModal = () => setShowWithdrawModal(false);
    const handleShowWithdrawModal = () => setShowWithdrawModal(true);
    const navigate = useNavigate();

    const handleWithdraw = () => {
        if (amount <= 0) {
            console.error('Invalid amount');
            return;
        }
        if(amount > walletBalance){
            console.error('Not enough money in the wallet');
            alert('Cannot withdraw that quantity!!!');
            return;
        }

        fetch('/withdraw?amount='+parseFloat(amount),{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            if (response.ok) {
                console.log('Withdrawal successful');
                getWalletBalance();
                
                window.location.reload();
            } else {
                console.error('Error:', response);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        handleCloseWithdrawModal();
    };

    const handleDeposit = () => {
        if (amount <= 0) {
            console.error('Invalid amount');
            return;
        }
    
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
                window.location.reload();
            } else {
                console.error('Error:', response);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        handleCloseDepositModal();
    };

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


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/getUserInfo');
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    getWalletBalance();
                } else {
                    setError('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = () => {
        fetch('/logout', {
            method: 'POST',
        }).then(response => {
            if (response.ok) {
                console.log('Logged out successfully');
                navigate('/');
                window.location.reload();
            } else {
                console.error('Failed to logout');
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    };

    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
        <div className="profile-container">
            <div className="profile-info">
                <h2 style={{ marginBottom: '25px', marginLeft:'5px'}}>User Profile</h2>
                {userData && (
                    <div className="Letters" style={{ marginBottom: '10px', fontSize:'18px' }}>
                        <p><FaUser style={{ color: 'grey' }} /><strong> Name:</strong> {userData.userName}</p>
                        <p><FaEnvelope style={{ color: 'grey' }} /><strong> Email:</strong> {userData.email}</p>
                        <p><FaCalendarAlt style={{ color: 'grey' }} /><strong> Date of Birth:</strong> {userData.birthDay}</p>
                        <p><FaPhone style={{ color: 'grey' }} /><strong> Phone Number:</strong> {userData.phoneNumber}</p>
                        <p><FaBaby style={{ color: 'grey' }} /><strong> Age:</strong> {calculateAge(userData.birthDay)}</p>
                        <p><FaCoins style={{ color: 'gold' }} /><strong> Balance available: </strong>{walletBalance} €</p>
                        <div className="Botoes">
                            <button variant="danger" onClick={handleLogout}>Logout</button>
                            <button variant="secondary" onClick={handleShowWithdrawModal}>Withdraw</button>
                            <button variant="danger" onClick={handleShowDepositModal}>Deposit</button>
                        </div>
                    </div>
                )}
            </div>
            <div className="bet-history">
                <BetHistory />
            </div>
        </div>
        <Modal show={showDepositModal} onHide={handleCloseDepositModal}>
        <Modal.Header closeButton>
            <Modal.Title>Add Money</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formAmount">
                    <Form.Label>Amount to deposit:</Form.Label>
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
            <Button style={{backgroundColor:'#ff0000',border:'none'}} onClick={handleDeposit}>
                Add money
          </Button>
        </Modal.Footer>
    </Modal>
    <Modal show={showWithdrawModal} onHide={handleCloseWithdrawModal}>
            <Modal.Header closeButton>
                <Modal.Title>Withdraw Money</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formAmount">
                        <Form.Label>Amount to withdraw:</Form.Label>
                        <Form.Control
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter the amount"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{backgroundColor:'#ff0000',border:'none'}} onClick={handleWithdraw}>
                    Withdraw
                </Button>
            </Modal.Footer>
        </Modal>
  </>
          
    );
};



export default withAuthCheck(Profile);
