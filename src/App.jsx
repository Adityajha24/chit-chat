import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import LoginChecker from './components/LoginChecker'
import 'bootstrap-icons/font/bootstrap-icons.css';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/chat' element={<LoginChecker />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
