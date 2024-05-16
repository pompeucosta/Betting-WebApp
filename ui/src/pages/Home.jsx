import { useState } from 'react'
import GameList from '../components/GameList'
import BetPreview from '../components/BetPreview'
import Sidenav from '../components/Sidenav'

function Home() {
    const [bets, setBets] = useState([])

    const onBetSelected = (bet) => {
        setBets([...bets, bet])
    }

    const onBetRemoved = (bet) => {
        setBets(bets.filter((b) => b.id !== bet.id))
    }

    return (
        <div>
            <Sidenav />
            <GameList onBetSelected={onBetSelected} />
            <BetPreview bets={bets} onBetRemoved={onBetRemoved} />
        </div>
    )
}

export default Home