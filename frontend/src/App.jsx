import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import ForgotPassword from './pages/ForgotPassword'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import getCurrentUser from './hooks/getCurrentUser'
import getSuggestedUsers from './hooks/getSuggestedUsers'
import Profile from './pages/Profile'
export const serverUrl = "http://localhost:8000"

const App = () => {

  getCurrentUser()
  getSuggestedUsers()
  const { userData } = useSelector(state => state.user)


  return (
    <Routes>
      <Route path='/signup' element={!userData ? <Signup /> : <Navigate to={"/"} />} />
      <Route path='/signin' element={!userData ? <Signin /> : <Navigate to={"/"} />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to={"/signin"} />} />
      <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
      <Route path='/profile/:userName' element={userData ? <Profile /> : <Navigate to={"/signin"} />} />
    </Routes>
  )
}

export default App