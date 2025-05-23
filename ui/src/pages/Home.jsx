import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GameList from '../components/GameList'
import BetPreview from '../components/BetPreview'
import Sidenav from '../components/Sidenav'

function Home() {
    const [bets, setBets] = useState([])
    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTermChange = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
    }

    const onBetSelected = (bet) => {
        setBets([...bets, bet])
    }

    const onBetRemoved = (bet) => {
        setBets(bets.filter((b) => b.id !== bet.id))
    }

    const UpdateBetAmount = (bet, amount) => {
        setBets(bets.map((b) => b.id === bet.id ? { ...b, amount } : b))
    }

    const onBetCheckout = () => {
        navigate('/betcheckout', { state: { bets } })
    }

    return (
        <div>
            <Sidenav searchTerm={searchTerm} onSearchTermChange={onSearchTermChange} />
            <GameList onBetSelected={onBetSelected} bets={bets} search={searchTerm} />
            <BetPreview bets={bets} onBetRemoved={onBetRemoved} onBetCheckout={onBetCheckout} updateBetAmount={UpdateBetAmount} />
        </div>
    )
}

export default Home