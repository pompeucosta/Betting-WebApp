import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';



const GameList = ({ onBetSelected, bets, search }) => {

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