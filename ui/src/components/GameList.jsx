import React from 'react'
import GameCard from './GameCard'



const GameList = ({ onBetSelected }) => {

    //const [games, setGames] = useState([]);

  

    const games = {
        game1: {
            homeTeam: 'Team 1',
            awayTeam: 'Team 2',
            oddsDraw: '2.0',
            oddsHomeTeam: '1.5',
            oddsAwayTeam: '2.5'
        },
        game2: {
            homeTeam: 'Team 3',
            awayTeam: 'Team 4',
            oddsDraw: '2.0',
            oddsHomeTeam: '1.7',
            oddsAwayTeam: '2.3'
        },
        game3: {
            homeTeam: 'Team 5',
            awayTeam: 'Team 6',
            oddsDraw: '3.0',
            oddsHomeTeam: '1.3',
            oddsAwayTeam: '2.7'
        },
        game4: {
            homeTeam: 'Team 7',
            awayTeam: 'Team 8',
            oddsDraw: '2.0',
            oddsHomeTeam: '1.6',
            oddsAwayTeam: '2.4'
        },
        game5: {
            homeTeam: 'Team 9',
            awayTeam: 'Team 10',
            oddsDraw: '2.0',
            oddsHomeTeam: '1.8',
            oddsAwayTeam: '2.2'
        },
        game6: {
            homeTeam: 'Team 11',
            awayTeam: 'Team 12',
            oddsDraw: '2.0',
            oddsHomeTeam: '1.4',
            oddsAwayTeam: '2.6'
        },
        game7: {
            homeTeam: 'Team 13',
            awayTeam: 'Team 14',
            oddsDraw: '2.0',
            oddsHomeTeam: '1.9',
            oddsAwayTeam: '2.1'
        },
        game8: {
            homeTeam: 'Team 15',
            awayTeam: 'Team 16',
            oddsDraw: '2.0',
            oddsHomeTeam: '2.0',
            oddsAwayTeam: '2.0'
        },
        game9: {
            homeTeam: 'Team 17',
            awayTeam: 'Team 18',
            oddsDraw: '2.0',
            oddsHomeTeam: '2.1',
            oddsAwayTeam: '1.9'
        },
        game10: {
            homeTeam: 'Team 19',
            awayTeam: 'Team 20',
            oddsDraw: '2.0',
            oddsHomeTeam: '2.2',
            oddsAwayTeam: '1.8'
        }
    }
    

    const handleClick = (bet) => {
        onBetSelected(bet)
    }

    return (
        <div className='gameList'>
            {Object.keys(games).length > 0 ? (
                Object.values(games).map((game, index) => (
                    <GameCard key={index} game={game} handleClick={handleClick} />
                ))
            ) : (
                <p>No games available.</p>
            )}
        </div>
    )
}

export default GameList