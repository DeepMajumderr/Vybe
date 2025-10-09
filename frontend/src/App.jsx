import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import ForgotPassword from './pages/ForgotPassword'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import getCurrentUser from './hooks/getCurrentUser'
import getSuggestedUsers from './hooks/getSuggestedUsers'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Upload from './pages/Upload'
import getAllPost from './hooks/getAllPost'
import Loops from './pages/Loops'
import getAllLoops from './hooks/getAllLoops'
import Story from './pages/Story'
import getAllStories from './hooks/getAllStories'
import Messages from './pages/Messages'
import MessageArea from './pages/MessageArea'
export const serverUrl = "https://vybe-backend-w6hg.onrender.com"
import { io } from "socket.io-client"
import { setOnlineUsers, setSocket } from './redux/socketSlice'
import getFollowigList from './hooks/getFollowingList'
import getPrevChatUsers from './hooks/getPrevChatUsers'
import Search from './pages/Search'
import getAllNotifications from './hooks/getAllNotifications'
import Notifications from './pages/Notifications'
import { setNotificationData } from './redux/userSlice'

const App = () => {

  getCurrentUser()
  getSuggestedUsers()
  getAllPost()
  getAllLoops()
  getAllStories()
  getFollowigList()
  getPrevChatUsers()
  getAllNotifications()

  const { userData, notificationData } = useSelector(state => state.user)
  const { socket } = useSelector(state => state.socket)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userData) {
      const socketIo = io(serverUrl, {
        query: {
          userId: userData._id
        }
      })
      dispatch(setSocket(socketIo))

      socketIo.on('getOnlineUsers', (users) => {
        dispatch(setOnlineUsers(users))
      })

      return () => socketIo.close()

    } else {

      if (socket) {
        socket.close()
        dispatch(setSocket(null))
      }

    }

  }, [userData])

  
    socket?.on("newNotification", (noti) => {
      dispatch(setNotificationData([...notificationData,noti]))
    })
  



  return (
    <Routes>
      <Route path='/signup' element={!userData ? <Signup /> : <Navigate to={"/"} />} />
      <Route path='/signin' element={!userData ? <Signin /> : <Navigate to={"/"} />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to={"/signin"} />} />
      <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
      <Route path='/upload' element={userData ? <Upload /> : <Navigate to={"/signin"} />} />
      <Route path='/search' element={userData ? <Search /> : <Navigate to={"/signin"} />} />
      <Route path='/profile/:userName' element={userData ? <Profile /> : <Navigate to={"/signin"} />} />
      <Route path='/story/:userName' element={userData ? <Story /> : <Navigate to={"/signin"} />} />
      <Route path='/editprofile' element={userData ? <EditProfile /> : <Navigate to={"/signin"} />} />
      <Route path='/messages' element={userData ? <Messages /> : <Navigate to={"/signin"} />} />
      <Route path='/messageArea' element={userData ? <MessageArea /> : <Navigate to={"/signin"} />} />
      <Route path='/notifications' element={userData ? <Notifications /> : <Navigate to={"/signin"} />} />
      <Route path='/loops' element={userData ? <Loops /> : <Navigate to={"/signin"} />} />
    </Routes>
  )
}

export default App
