import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const GameCard = ({ game, handleClick, bets }) => {
    const [odds, setOdds] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const generateId = () => Date.now();

    useEffect(() => {
        const getOdds = async (fixtureID) => {
            try {
                const response = await fetch(`/getLiveEventOdds?fixtureID=${fixtureID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch odds');
                }
                const result = await response.json();
                console.log("Result:", result);
                setOdds(result.data.odds);
            } catch (error) {
                console.error('Erro ao obter as odds:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getOdds(game.fixtureID);
    }, [game.fixtureID]);

    const isBetPlaced = (team) => {
        return bets.some((bet) => bet.game.fixtureID === game.fixtureID && bet.team === team);
    }

    return (
        <Card className='gameCard'>
            <Card.Body>
                <Card.Title className='gameCardTitle text-center mb-4'>
                    <h5>{game.teams[0].name} {game.homeGoals}-{game.awayGoals} {game.teams[1].name}</h5>
                    <p className='timeElapsed' style={{ position: 'absolute', top: '10px', right: '10px' }}>{game.timeElapsed}`</p>
                </Card.Title>
                <Card.Text className='gameCardContent text-center'>
                    {loading ? (
                        <p>Loading odds...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <div className='d-flex justify-content-center gap-3'>
                            <Button className='oddsButton' variant={isBetPlaced(game.teams[0].name) ? "dark" : "warning"} disabled={isBetPlaced(game.teams[0].name)} onClick={() => 
                                handleClick({id: generateId(), game: game, team: game.teams[0].name, odds: odds[0].values[0].odd, amount: 0.0})}>
                                <p>{game.teams[0].name}</p>
                                {odds[0].values[0].odd}
                            </Button>

                            <Button className='oddsButton mx-2' variant={isBetPlaced('Draw') ? "dark" : "warning"} disabled={isBetPlaced('Draw')} onClick={() => 
                                handleClick({id: generateId(), game: game, team: 'Draw', odds:  odds[0].values[1].odd, amount: 0.0})}>
                                <p>Draw</p>
                                {odds[0].values[1].odd}
                            </Button>

                            <Button className='oddsButton' variant={isBetPlaced(game.teams[1].name) ? "dark" : "warning"} disabled={isBetPlaced(game.teams[1].name)} onClick={() => 
                                handleClick({id: generateId(), game: game, team: game.teams[1].name, odds: odds[0].values[2].odd, amount: 0.0})}>
                                <p>{game.teams[1].name}</p>
                                {odds[0].values[2].odd}
                            </Button>
                        </div>
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default GameCard;
