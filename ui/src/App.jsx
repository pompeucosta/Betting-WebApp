import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BetCheckout from './pages/BetCheckout'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
          <div className='container py-5 mt-5'>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="*" element={<Error />} />
              <Route path="/login" element={<Login />} />
              <Route path="/betcheckout" element={<BetCheckout />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
