import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import BetCard from './BetCard'

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
                            bets.map((bet) => (
                                <div key={bet.id}>
                                    <BetCard bet={bet} handleRemoveBet={handleRemoveBet} onBetAmountChange={onBetAmountChange} />
                                </div>  
                            ))
                        ) : (
                            <p>No bets placed yet.</p>
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