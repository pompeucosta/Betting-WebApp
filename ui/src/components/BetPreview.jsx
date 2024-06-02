import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'


const BetPreview = ( { bets, onBetRemoved, onBetCheckout, updateBetAmount } ) => {
    const [possibleGains, setPossibleGains] = useState(0)

    // useEffect hook to calculate possible gains when bets are removed
    useEffect(() => {
        calculatePossibleGains()
    }, [bets])
    
    const calculatePossibleGains = () => {
        let gains = 0
        bets.forEach((bet) => {
            gains += parseFloat(bet.amount) * parseFloat(bet.odds)
        })
        setPossibleGains(gains)
    }
    
    const onBetAmountChange = (bet, amount) => {
        bet.amount = amount
        calculatePossibleGains() // Recalculate possible gains when bet amount changes
        updateBetAmount(bet, amount)
    }

    const handleRemoveBet = (bet) => {
        onBetRemoved(bet)
    }

    const navigateToBetCheckout = () => {
        onBetCheckout()
    }

    return (
        <div className="betPreview">
            <Card style={{ height: '100%' }}>
                <div className="betPreviewBody">
                    <Card.Body>
                        {bets.length > 0 ? (
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Game</th>
                                        <th>Prediction</th>
                                        <th>Odd</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bets.map((bet) => (
                                        <tr key={bet.id}>
                                            <td>
                                                <Button variant="danger" onClick={() => handleRemoveBet(bet)} className="btn-sm">X</Button>
                                            </td>
                                            <td>{bet.game.teams[0].name} vs {bet.game.teams[1].name}</td>
                                            <td>{bet.team}</td>
                                            <td>{bet.odds}</td>
                                            <td>
                                                <div className="input-group">
                                                    <input 
                                                        type="number" 
                                                        value={bet.amount} 
                                                        onChange={(e) => onBetAmountChange(bet, e.target.value)} 
                                                        className="form-control form-control-sm" 
                                                    />
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">€</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>
                                <p style={{ textAlign: 'center', marginTop: '170px' }}>
                                    <span style={{ fontSize: '22px', color: 'black', fontWeight: 'bold' }}>No bets placed yet.</span>
                                    <br />
                                    You haven't added selections to the bulletin yet. Click on the odds to add selections.
                                </p>
                            </div>
            
                        )}
                    </Card.Body>
                </div>
                {bets.length > 0 && (
                    <Card.Footer>
                        <h5>Possible Gains: {possibleGains}€</h5>
                        <Button variant="danger" onClick={navigateToBetCheckout}>Place Bet</Button>
                    </Card.Footer>
                )}
            </Card>
        </div>
    );
}

export default BetPreview