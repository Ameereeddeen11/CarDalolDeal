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

  const { loggedIn, isLoggedIn } = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/verify-token/${token}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
          isLoggedIn(false)
        }
        const result = await response.json()
        console.log(result)
        isLoggedIn(true)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  })

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
