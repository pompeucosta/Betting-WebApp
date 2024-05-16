import { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import BetCard from './BetCard'

const BetPreview = ( { bets, onBetRemoved } ) => {
    const [possibleGains, setPossibleGains] = useState(0)

    // useEffect hook to calculate possible gains when bets are removed
    useEffect(() => {
        calculatePossibleGains()
    }, [bets])
    
    const calculatePossibleGains = () => {
        let gains = 0
        bets.forEach((bet) => {
            gains += bet.amount * bet.odds
        })
        setPossibleGains(gains)
    }
    
    const onBetAmountChange = (bet, amount) => {
        bet.amount = amount
        calculatePossibleGains() // Recalculate possible gains when bet amount changes
    }

    const handleRemoveBet = (bet) => {
        onBetRemoved(bet)
    }

    return (
        <div className="betPreview">
            <Card>
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
                    {bets.length > 0 ? (
                        <Card.Footer>
                            <h5>Possible Gains: {possibleGains}€</h5>
                            <Button variant="danger">Place Bet</Button>
                        </Card.Footer>
                    ) : (
                        <Card.Footer>
                            <h5>Possible Gains: {possibleGains}€</h5>
                            <Button variant="danger" disabled>Place Bet</Button>
                        </Card.Footer>
                    )}
                </Card.Body>
            </Card>
        </div>
    )
}

export default BetPreview