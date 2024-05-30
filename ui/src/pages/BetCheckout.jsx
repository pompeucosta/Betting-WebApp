import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Form, FormGroup } from 'react-bootstrap';
import BetPreview from '../components/BetPreview';
import BetCard from '../components/BetCard';

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
        <div className="bet-checkout container">
            <div className="bets-info">
                {bets.map((bet) => (
                    <div key={bet.id}>
                        <BetCard bet={bet} handleRemoveBet={handleBetRemoved} />
                    </div>
                ))}
            </div>
            <Form onSubmit={handleSubmit} className="checkout-form">
                <h1>Checkout</h1>
                <FormGroup>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type="text"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Form.Label>Prediction</Form.Label>
                    <Form.Control
                        type="text"
                        id="prediction"
                        name="prediction"
                        value={formData.prediction}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Control
                        type="text"
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button type="submit">Place Bet</Button>
            </Form>
        </div>
    );
};

export default BetCheckout;