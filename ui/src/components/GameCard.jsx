import React from 'react';
import { Card, Button } from 'react-bootstrap';

const GameCard = ({ game, handleClick }) => {
    const generateId = () => {
        return Date.now();
    };

    return (
        <Card className='gameCard'>
            <Card.Body>
                <Card.Title className='gameCardTitle text-center mb-4'>
                    <h5>{game.teams[0].name} {game.homeGoals}-{game.awayGoals} {game.teams[1].name}</h5>
                </Card.Title>
                <Card.Text className='gameCardContent'>
                    <p className='timeElapsed'>{game.timeElapsed}`</p>
                    <Button className='oddsButton' variant="warning" onClick={() => handleClick({id:generateId(), game:game, team:game.teams[0].name, odds:10, amount:0.0})}>
                        <p>{game.teams[0].name}</p>
                        {game.oddsHomeTeam}
                    </Button>
                    <Button className='oddsButton mx-0' variant="warning" onClick={() => handleClick({id:generateId(), game:game, team:'Draw', odds:game.oddsDraw, amount:0.0})}>
                        <p>Draw</p>
                        {game.oddsDraw}
                    </Button>
                    <Button className='oddsButton' variant="warning" onClick={() => handleClick({id:generateId(), game:game, team:game.teams[1].name, odds:10, amount:0.0})}>
                        <p>{game.teams[1].name}</p>
                        {game.oddsAwayTeam}
                    </Button>   
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default GameCard;
