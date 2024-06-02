import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Error from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BetCheckout from './pages/BetCheckout'
import Header from './components/Header'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import { useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Header loggedIn ={isLoggedIn} />
          <div className='container py-5 mt-5'>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="*" element={<Error />} />
              <Route path="/login" element={<Login element ={setIsLoggedIn}/>} />
              <Route path="/betcheckout" element={<BetCheckout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} />} />
            </Routes>
          </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
