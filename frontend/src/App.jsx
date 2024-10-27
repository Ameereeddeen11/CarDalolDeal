import './App.css'
import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Home from './Pages/Home.jsx'
import Offer from './Pages/Offer.jsx'
import AuthMain from './Pages/AuthMain.jsx'
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
        console.log(token)
      if (!token) {
        setLoggedIn(false);
        return;
      }
      try {
        const response = await fetch(`http://localhost:8000/auth/verify-token/`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error('Invalid token');
          localStorage.removeItem('access_token');
          setLoggedIn(false);
        }
        setLoggedIn(true);
        localStorage.setItem('access_token', token);
      }
      catch (error) {
        setLoggedIn(false);
        localStorage.removeItem('access_token');
        navigate('/');
      }
    };
    verifyToken();
  }, [navigate]);

  return(
    <>
      <Header name="Amir" isLoggedIn={loggedIn} />
      <br />
      <Routes className="my-4">
        <Route exact path='/' element={<Home/>} />
        <Route path="/seller/:id" element={<Offer/>} />
        <Route path="/login" element={<AuthMain login={true}/>} />
        <Route path='/register' element={<AuthMain login={false}/>} />
      </Routes>
      <br />
      <Footer/>
    </>
  )
}

export default App
