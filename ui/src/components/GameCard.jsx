import React from 'react'
import { Card, Button } from 'react-bootstrap'

const GameCard = ({ game, handleClick }) => {
    const generateId = () => {
        return Date.now()
    }

    return (
        <Card className='gameCard'>
            <Card.Body>
                <Card.Text className='gameCardContent'>
                    <h6>{game.homeTeam} vs {game.awayTeam}</h6>
                    <Button className='oddsButton' variant="warning" onClick={() => handleClick({id:generateId(), game:game, team:game.homeTeam, odds:game.oddsHomeTeam, amount:0.0})}>
                        <p>{game.homeTeam}</p>
                        {game.oddsHomeTeam}
                    </Button>
                    <Button className='oddsButton' variant="warning" onClick={() => handleClick({id:generateId(), game:game, team:'Draw', odds:game.oddsDraw, amount:0.0})}>
                        <p>Draw</p>
                        {game.oddsDraw}
                    </Button>
                    <Button className='oddsButton' variant="warning" onClick={() => handleClick({id:generateId(), game:game, team:game.awayTeam, odds:game.oddsAwayTeam, amount:0.0})}>
                        <p>{game.awayTeam}</p>
                        {game.oddsAwayTeam}
                    </Button>   
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default GameCard