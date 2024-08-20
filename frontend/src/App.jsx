import './App.css'
import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Home from './Pages/Home.jsx'
import Offer from './Pages/Offer.jsx'
import { Route, Routes } from 'react-router-dom'

const navLinks = ["Home", "Hi"]

function App() {
  const urls = {
    home: 'http://localhost:8000',
    seller: 'http://localhost:8000/seller/' + 1
  }
  return(
    <>
      <Header name="Amir" isLoggedIn={true} />
      <br /><br />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path="/seller/:id" element={<Offer/>} />
      </Routes>
      <br /><br />
      <Footer/>
    </>
  )
}

export default App
