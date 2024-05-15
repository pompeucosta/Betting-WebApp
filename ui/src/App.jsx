import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Error from './pages/Error'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidenav from './components/Sidenav'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Sidenav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
