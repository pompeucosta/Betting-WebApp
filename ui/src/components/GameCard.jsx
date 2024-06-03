import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const GameCard = ({ game, handleClick, bets }) => {
    const [odds, setOdds] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const brokerUrl = import.meta.env.VITE_APP_MQTT_BROKER_URL;
    const live_update_topic = import.meta.env.VITE_APP_MQTT_LIVE_UPDATE_TOPIC;
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

        // Connect to the MQTT broker and subscribe to live event updates
        const client = mqtt.connect(brokerUrl);

        client.on('connect', () => {
            console.log('Connected to MQTT broker');
            client.subscribe(live_update_topic, (err) => {
                if (err) {
                    console.error('Failed to subscribe to topic:', err);
                } else {
                    console.log('Subscribed to topic:', live_update_topic);
                }
            });
        });

        client.on('message', async (topic) => {
            if (topic === live_update_topic) {
                getOdds(game.fixtureID);
            }
        });

        client.on('error', (error) => {
            console.error('Failed to connect to MQTT broker:', error);
        });

        client.on('close', () => {
            console.log('Connection closed');
        });

        // Disconnect the client when the component is unmounted
        return () => {
            client.end();
        };
    }, [game.fixtureID]);

    const isBetPlaced = (betValue) => {
        return bets.some((bet) => bet.game.fixtureID === game.fixtureID && bet.betValue === betValue);
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
                            <Button className='oddsButton' variant={isBetPlaced("Home") ? "dark" : "warning"} disabled={isBetPlaced("Home")} onClick={() => 
                                handleClick({id: generateId(), game: game, betValue: "Home", team: game.teams[0].name, odds: odds[0].values[0].odd, amount: 0.0})}>
                                <p>{game.teams[0].name}</p>
                                {odds[0].values[0].odd}
                            </Button>

                            <Button className='oddsButton mx-2' variant={isBetPlaced('Draw') ? "dark" : "warning"} disabled={isBetPlaced('Draw')} onClick={() => 
                                handleClick({id: generateId(), game: game, betValue: 'Draw', team: 'Draw', odds:  odds[0].values[1].odd, amount: 0.0})}>
                                <p>Draw</p>
                                {odds[0].values[1].odd}
                            </Button>

                            <Button className='oddsButton' variant={isBetPlaced("Away") ? "dark" : "warning"} disabled={isBetPlaced("Away")} onClick={() => 
                                handleClick({id: generateId(), game: game, betValue: "Away", team: game.teams[1].name, odds: odds[0].values[2].odd, amount: 0.0})}>
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
