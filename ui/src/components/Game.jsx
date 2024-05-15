import React from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';

const Game = ({ game }) => {
    return (
        <Card className='gameCard'>
            <Card.Body>
                <Card.Text className='gameCardContent'>
                    <h6>{game.homeTeam} vs {game.awayTeam}</h6>
                    <Button className='oddsButton' variant="warning">
                        <p>{game.homeTeam}</p>
                        {game.oddsHomeTeam}
                    </Button>
                    <Button className='oddsButton' variant="warning">
                        <p>Draw</p>
                        {game.oddsDraw}
                    </Button>
                    <Button className='oddsButton' variant="warning">
                        <p>{game.awayTeam}</p>
                        {game.oddsAwayTeam}
                    </Button>   
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Game;