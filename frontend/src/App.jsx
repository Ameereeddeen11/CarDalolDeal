import './App.css'
import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Home from './Pages/Home.jsx'
import Offer from './Pages/Offer.jsx'
import Login from './Pages/Login.jsx'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const navLinks = ["Home", "Hi"]

function App() {
  const urls = {
    home: 'http://localhost:8000',
    seller: 'http://localhost:8000/seller/' + 1,
  }

  const [ loggedIn, setLoggedIn ] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;
      try {
        const response = await fetch(`http://localhost:8000/auth/verify-token/${token}`)
        if (!response.ok) {
          throw new Error('Invalid token');
          setLoggedIn(false);
        }
        setLoggedIn(true);
      }
      catch (error) {
        console.error(error);
        setLoggedIn(false);
      }
    };
    verifyToken();
  }, [navigate]);

  return(
    <>
      <Header name="Amir" isLoggedIn={loggedIn} />
      <br /><br />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path="/seller/:id" element={<Offer/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <br /><br />
      <Footer/>
    </>
  )
}

export default App
