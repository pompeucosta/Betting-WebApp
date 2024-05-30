import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GameList from '../components/GameList'
import BetPreview from '../components/BetPreview'
import Sidenav from '../components/Sidenav'

function Home() {
    const [bets, setBets] = useState([])
    const navigate = useNavigate()

    const onBetSelected = (bet) => {
        setBets([...bets, bet])
    }

    const onBetRemoved = (bet) => {
        setBets(bets.filter((b) => b.id !== bet.id))
    }

    const onBetCheckout = () => {
        navigate('/betcheckout', { state: { bets } })
    }

    return (
        <div>
            <Sidenav />
            <GameList onBetSelected={onBetSelected} />
            <BetPreview bets={bets} onBetRemoved={onBetRemoved} onBetCheckout={onBetCheckout} />
        </div>
    )
}

export default Home