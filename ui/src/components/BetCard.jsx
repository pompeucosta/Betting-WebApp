import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

const BetCard = ({ bet, handleRemoveBet, onBetAmountChange }) => {
    return (
        <Card>
            <Card.Header>
                <Button variant="danger" onClick={() => handleRemoveBet(bet)}>X</Button>
            </Card.Header>
            <Card.Body>
                <h6>{bet.game.teams[0].name} vs {bet.game.teams[1].name}</h6>
                <h5>{bet.team}</h5>
                <p>{bet.odds}</p>   
                <Form>
                    <Form.Group controlId="betAmount">
                        <Form.Control type="number" placeholder="Amount" onChange={(e) => onBetAmountChange(bet, e.target.value)} />
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default BetCard