import './App.css'
import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Home from './Pages/Home.jsx'
import { Route, Routes } from 'react-router-dom'

const navLinks = ["Home", "Hi"]

function App() {
  return(
    <>
      <Header name="Amir" isLoggedIn={true} />
      <br /><br />
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
      <br /><br />
      <Footer/>
    </>
  )
}

export default App
