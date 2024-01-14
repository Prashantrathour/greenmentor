import React from 'react'
import Home from './pages/Home'
import {Routes,Route} from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import ProfilePage from './pages/ProfilePage'
function MainRoute() {
  return (
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/profile" element={<ProfilePage/>}/>
   </Routes>
  )
}

export default MainRoute