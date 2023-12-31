import { useState } from 'react'

import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import Bottom from './pages/Bottom'
import ApplicationHome from './pages/application/ApplicationHome'



function App() {
  

  return (
    <>
     
    <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/applications" element={<ApplicationHome/>}/>
      
      <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}/>
         <Route path="/chat" element={<Chat/>}/>
      </Route>
     </Routes>
     <Bottom/>
    </>
  )
}

export default App
