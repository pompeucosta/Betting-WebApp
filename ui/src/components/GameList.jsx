import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';



const GameList = ({ onBetSelected, bets }) => {

    const [games, setGames] = useState([]);
 

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
    }, []);

    const handleClick = (bet) => {
        onBetSelected(bet)
    }

    return (
        <div className='gameList'>
            {Object.keys(games).length > 0 ? (
                Object.values(games).map((game, index) => (
                    <GameCard key={index} game={game} handleClick={handleClick} bets={bets} />
                ))
            ) : (
                <p>No games available.</p>
            )}
        </div>
    )
}

export default GameList