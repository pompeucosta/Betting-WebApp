import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Form, FormGroup, Card } from 'react-bootstrap';
import withAuthCheck from '../components/withAuthCheck';

const BetCheckout = () => {
    const location = useLocation();
    const [bets, setBets] = useState(location.state.bets);

    const [formData, setFormData] = useState({
        amount: '',
        prediction: '',
        paymentMethod: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // TODO: Send to server
    };

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
                        <h1>Possible Gains: {bets.reduce((acc, bet) => acc + parseFloat(bet.amount) * parseFloat(bet.odds), 0)}€</h1>
                    </Card.Footer>
                </Card>
            </div>
            <Form onSubmit={handleSubmit} className="checkout-form">
                <h1>Checkout</h1>
                <h3>Total: {bets.reduce((acc, bet) => acc + parseFloat(bet.amount), 0)}€</h3>
                <FormGroup>
                <Form.Label>Payment Method</Form.Label>
                <Form.Select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                >
                    <option value="">Select a payment method</option>
                    <option value="creditCard">Credit Card</option>
                    <option value="debitCard">Debit Card</option>
                    <option value="paypal">Wallet</option>
                </Form.Select>
            </FormGroup>
                <Button type="submit">Place Bet</Button>
            </Form>
        </div>
    );
};

export default withAuthCheck(BetCheckout);