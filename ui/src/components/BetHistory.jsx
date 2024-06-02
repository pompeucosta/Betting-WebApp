import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

const BetHistory = () => {

    const test_bets = [
        {
            id: 1,
            date: "2021-10-01",
            amount: 100,
            odd: 1.5,
            outcome: "Team A",
            game: {home: "Team A", away: "Team B"}
        },
        {
            id: 2,
            date: "2021-10-02",
            amount: 200,
            odd: 2.0,
            outcome: "Team B",
            game: {home: "Team C", away: "Team B"}
        },
        {
            id: 3,
            date: "2021-10-03",
            amount: 300,
            odd: 1.8,
            outcome: "Team D",
            game: {home: "Team A", away: "Team D"}
        },
        {
            id: 4,
            date: "2021-10-04",
            amount: 400,
            odd: 1.6,
            outcome: "Team A",
            game: {home: "Team A", away: "Team B"}
        },
        {
            id: 5,
            date: "2021-10-05",
            amount: 500,
            odd: 2.5,
            outcome: "Team B",
            game: {home: "Team C", away: "Team B"}
        },
        {
            id: 6,
            date: "2021-10-06",
            amount: 600,
            odd: 1.9,
            outcome: "Team D",
            game: {home: "Team A", away: "Team D"}
        },
        {
            id: 7,
            date: "2021-10-07",
            amount: 700,
            odd: 1.7,
            outcome: "Team A",
            game: {home: "Team A", away: "Team B"}
        },
        {
            id: 8,
            date: "2021-10-08",
            amount: 800,
            odd: 2.6,
            outcome: "Team B",
            game: {home: "Team C", away: "Team B"}
        },
        {
            id: 9,
            date: "2021-10-09",
            amount: 900,
            odd: 1.4,
            outcome: "Team D",
            game: {home: "Team A", away: "Team D"}
        },
        {
            id: 10,
            date: "2021-10-10",
            amount: 1000,
            odd: 1.3,
            outcome: "Team A",
            game: {home: "Team A", away: "Team B"}
        },
        {
            id: 11,
            date: "2021-10-11",
            amount: 1100,
            odd: 2.7,
            outcome: "Team B",
            game: {home: "Team C", away: "Team B"}
        },
        {
            id: 12,
            date: "2021-10-12",
            amount: 1200,
            odd: 1.2,
            outcome: "Team D",
            game: {home: "Team A", away: "Team D"}
        }
    ]
    
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBets = test_bets.filter(bet => 
        `${bet.game.home} vs ${bet.game.away}`.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <h2>Bet History</h2>
                </Card.Header>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Game</th>
                            <th>Prediction</th>
                            <th>Odd</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(bet => (
                            <tr key={bet.id}>
                                <td>{bet.date}</td>
                                <td>{bet.game.home} vs {bet.game.away}</td>
                                <td>{bet.outcome}</td>
                                <td>{bet.odd}</td>
                                <td>{bet.amount}€</td>
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
                        >
                            {"<"}
                        </button>
                        <span> Page {currentPage} of {pageNumbers.length} </span>
                        <button
                            onClick={() => setCurrentPage((oldPage) => Math.min(oldPage + 1, pageNumbers.length))}
                            disabled={currentPage === pageNumbers.length}
                            className='btn btn-primary'
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