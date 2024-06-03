import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const BetHistory = () => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [bets, setBets] = useState([]);

    useEffect(() => {
        const fetchBets = async () => {
            try {
                const response = await fetch('/getBets');
                if (!response.ok) {
                    throw new Error('Failed to fetch bets');
                }
                const data = await response.json();
                console.log('bets:', data.bets);
                setBets(data.bets);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchBets();
    }, []);

    const filteredBets = bets.filter(bet => 
        `${bet.gameData.result.teams[0].name} vs ${bet.gameData.result.teams[1].name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBets.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredBets.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    
    return (
        <div>
            <Card>
            <Card.Header>
                <h2 style={{ textAlign: 'center' }}>Bet History</h2>
            </Card.Header>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Game</th>
                            <th>Prediction</th>
                            <th>Odd</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {currentItems.map(bet => (
                            <tr key={bet.betID}>
                                <td>{bet.gameData.result.status}</td>
                                <td>{bet.gameData.result.teams[0].name} ({bet.gameData.result.homeGoals}) vs ({bet.gameData.result.awayGoals}) {bet.gameData.result.teams[1].name}</td>
                                <td>{bet.betValue}</td>
                                <td>
                                    {bet.betValue === "Home" ? bet.oddsData.result.odds[0].values[0].odd :
                                    bet.betValue === "Draw" ? bet.oddsData.result.odds[0].values[1].odd :
                                    bet.betValue === "Away" ? bet.oddsData.result.odds[0].values[2].odd : null}
                                </td>
                                <td>{bet.amountPlaced}€</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-between">
                    <div>
                        <button
                            onClick={() => setCurrentPage((oldPage) => Math.max(oldPage - 1, 1))}
                            disabled={currentPage === 1}
                            className='btn btn-primary'
                            style={{ backgroundColor: 'red', color: 'white', border: 'black' }}
                        >
                            {"<"}
                        </button>
                        <span> Page {currentPage} of {pageNumbers.length} </span>
                        <button
                            onClick={() => setCurrentPage((oldPage) => Math.min(oldPage + 1, pageNumbers.length))}
                            disabled={currentPage === pageNumbers.length}
                            className='btn btn-primary'
                            style={{ backgroundColor: 'red', color: 'white', border: 'black'}}
                        >
                            {">"}
                        </button>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Search for team"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="form-control"
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default BetHistory;