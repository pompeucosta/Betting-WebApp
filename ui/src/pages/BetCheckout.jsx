import React, { useState } from 'react';
import { json, useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Card } from 'react-bootstrap';
import withAuthCheck from '../components/withAuthCheck';

const BetCheckout = () => {
    const location = useLocation();
    const [bets, setBets] = useState(location.state.bets);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let userId = "";
        // retrieve userId from /checkLogIn
        try {
            const response = await fetch('/checkLogIn', {
                method: 'GET',
            });
            if (response.status === 200) {
                const data = await response.json();
                userId = data.email; // Assign data.email to userId
                console.log(userId);
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error);
            navigate('/login');
        }
        for (const bet of bets) {
            console.log(bet.game);
            let betInfo = {};
            betInfo = {
                betValue: bet.betValue,
                amountPlaced: bet.amount,
                fixtureId: bet.game.fixtureID
            }
            
            try {
                const response = await fetch('/createBet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(betInfo)
                });
                if (response.status === 200) {
                    console.log('Bet placed successfully');
                    navigate('/profile');
                    window.location.reload();
                } else {
                    console.error('Failed to place bet');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    const handleBetRemoved = (bet) => {
        setBets(bets.filter((b) => b.id !== bet.id));
    }

    return (
        <div className="bet-checkout">
            <div className="bets-info">
                <Card style={{ height: '100%' }}>
                    <Card.Title>Bets</Card.Title>
                    <div className="betPreviewBody">
                        <Card.Body>
                            {bets.map((bet) => (
                                <div key={bet.id}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{bet.game.teams[0].name} vs {bet.game.teams[1].name}</Card.Title>
                                            <Card.Text>
                                                <p><strong>Prediction:</strong> {bet.team}</p>
                                                <p><strong>Odds:</strong> {bet.odds}</p>
                                                <p><strong>Amount:</strong> {bet.amount}€</p>
                                            </Card.Text>
                                            <Button onClick={() => handleBetRemoved(bet)}>Remove</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </Card.Body>
                    </div>
                    <Card.Footer>
                        <h1>Possible Gains: {bets.reduce((acc, bet) => acc + parseFloat(bet.amount) * parseFloat(bet.odds), 0).toFixed(2)}€</h1>
                    </Card.Footer>
                </Card>
            </div>
            <Form onSubmit={handleSubmit} className="checkout-form">
                <h1>Checkout</h1>
                <h3>Total: {bets.reduce((acc, bet) => acc + parseFloat(bet.amount), 0).toFixed(2)}€</h3>
                <Button type="submit">Place Bet</Button>
            </Form>
        </div>
    );
};

export default withAuthCheck(BetCheckout);