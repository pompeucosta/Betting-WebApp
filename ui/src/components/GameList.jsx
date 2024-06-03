import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';
import mqtt from 'mqtt';


const GameList = ({ onBetSelected, bets, search }) => {

    const [games, setGames] = useState([]);
    const brokerUrl = import.meta.env.VITE_APP_MQTT_BROKER_URL;
    const live_update_topic = import.meta.env.VITE_APP_MQTT_LIVE_UPDATE_TOPIC;

    useEffect(() => {
        const fetchGames = async () => {
            try {
                
                const response = await fetch('/getLiveData');
                if (!response.ok) {
                    throw new Error('Failed to fetch games');
                }
              
                const gamesData = await response.json();
                console.log('gamesData:', gamesData.data)
                setGames(gamesData.data);
            } catch (error) {
                console.error('Erro ao obter os jogos:', error);
            }
        };
        fetchGames();

        // Connect to the MQTT broker and subscribe to live event updates
        const client = mqtt.connect(brokerUrl);

        console.log('Connecting to MQTT broker:', brokerUrl);
        console.log(client)

        client.on('connect', () => {
            client.subscribe(live_update_topic, (err) => {
                if (err) {
                    console.error('Failed to subscribe to topic:', err);
                }
            });
        });

        client.on('message', async (topic) => {
            if (topic === live_update_topic) {
                fetchGames();
            }
        });

        // Disconnect the client when the component is unmounted
        return () => {
            client.end();
        };
    }, []);

    const handleClick = (bet) => {
        onBetSelected(bet)
    }

    const filteredGames = games.filter(game => 
        `${game.teams[0].name} vs ${game.teams[1].name}`.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='gameList'>
            {Object.keys(filteredGames).length > 0 ? (
                Object.values(filteredGames).map((game, index) => (
                    <GameCard key={index} game={game} handleClick={handleClick} bets={bets} />
                ))
            ) : (
                <p>No games available.</p>
            )}
        </div>
    )
}

export default GameList