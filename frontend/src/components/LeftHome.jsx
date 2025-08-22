import React from 'react'
import logo from "../assets/white_logo.png"
import { FaRegHeart } from "react-icons/fa";
import dp from "../assets/dp.jpg"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import OtherUsers from './OtherUsers';


const LeftHome = () => {

  const { userData,suggestedUsers } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`,
        { withCredentials: true })

      dispatch(setUserData(null))

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='w-[25%] hidden lg:block min-h-[100vh] bg-[black]
    border-r-2 border-gray-900'>

      <div className='w-full h-[100px] flex items-center
      justify-between p-[20px]'>
        <img src={logo} alt="" className='w-[80px]' />
        <div>
          <FaRegHeart className='text-[white] w-[25px] h-[25px]' />
        </div>
      </div>

      <div className='flex items-center w-full justify-between gap-[10px]
      px-[10px] border-b-2 border-b-gray-900 py-[1px]'>

        <div className='flex items-center gap-[10px]'>

          <div className='w-[70px] h-[70px] border-2 border-black
        rounded-full cursor-pointer overflow-hidden'>
            <img src={userData.profileImage || dp} alt=""
              className='w-full object-cover' />
          </div>

          <div>
            <div className='text-[18px] text-white font-semibold'>{userData.userName}</div>
            <div className='text-[15px] text-gray-400 font-semibold'>{userData.name}</div>
          </div>

        </div>

        <div className='text-blue-500 font-semibold cursor-pointer'
          onClick={handleLogout}>
          Log Out
        </div>

      </div>

      <div className='w-full flex flex-col gap-[20px] p-[20px]'>
        <h1 className='text-[white] text-[17px]'>Suggested Users</h1>
        {suggestedUsers && suggestedUsers.slice(0,3).map((user,index) => (
          <OtherUsers key={index} user={user} />
        ))}
      </div>

    </div>
  )
}

export default LeftHome