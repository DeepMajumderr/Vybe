import React, { useState } from 'react'
import logo2 from "../assets/logo2.png"
import white_logo from "../assets/white_logo.png"
import { IoEye } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios'
import { serverUrl } from '../App';
import { ClipLoader } from "react-spinners"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const Signup = () => {

  const [inputClicked, setinputClicked] = useState({
    name: false,
    userName: false,
    email: false,
    password: false
  })

  const [showPassword, setshowPassword] = useState(false)
  const [name, setname] = useState("")
  const [userName, setuserName] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignup = async () => {
    setloading(true)
    seterror("")
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`,
        { name, userName, email, password },
        { withCredentials: true }
      )
      dispatch(setUserData(result.data))
      setloading(false)
      setname("")
      setuserName("")
      setemail("")
      setpassword("")
    } catch (error) {
      seterror(error.response?.data?.message)
      console.log(error)
      setloading(false)
    }
  }


  return (
    <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900
    flex flex-col justify-center items-center'>
      <div className='w-[80%] lg:max-w-[60%] h-[535px]
      bg-white rounded-2xl flex justify-center items-center
      overflow-hidden border-2 border-[#1a1f23]'>

        <div className='w-full lg:w-[50%] h-full bg-white flex
        flex-col items-center p-[10px] gap-[20px]'>

          <div className='flex gap-[10px] items-center text-[20px]
          font-semibold mt-[40px]'>
            <span>Sign Up To</span>
            <img src={logo2} alt="" className='w-[70px]' />
          </div>

          <div className='relative flex items-center justify-start w-[90%] 
          h-[50px] rounded-2xl mt-[15px] border-2 border-black'
            onClick={() => setinputClicked({ ...inputClicked, name: true })}>

            <label htmlFor='name' className={`text-gray-700 absolute left-[20px]
             p-[5px] bg-white text-[15px] ${inputClicked.name ? "top-[-18px]" : ""}`}>
              Enter Your Name
            </label>
            <input onChange={(e) => setname(e.target.value)}
              value={name}
              type="text" id='name' className='w-[100%] h-[100%]
              rounded-2xl px-[20px] outline-none border-0 required' />
          </div>

          <div className='relative flex items-center justify-start w-[90%] 
          h-[50px] rounded-2xl  border-2 border-black'
            onClick={() => setinputClicked({ ...inputClicked, userName: true })}>

            <label htmlFor='userName' className={`text-gray-700 absolute left-[20px]
             p-[5px] bg-white text-[15px] ${inputClicked.userName ? "top-[-18px]" : ""}`}>
              Enter Username
            </label>
            <input onChange={(e) => setuserName(e.target.value)}
              value={userName}
              type="text" id='userName' className='w-[100%] h-[100%]
              rounded-2xl px-[20px] outline-none border-0 required' />
          </div>

          <div className='relative flex items-center justify-start w-[90%] 
          h-[50px] rounded-2xl  border-2 border-black'
            onClick={() => setinputClicked({ ...inputClicked, email: true })}>

            <label htmlFor='email' className={`text-gray-700 absolute left-[20px]
             p-[5px] bg-white text-[15px] ${inputClicked.email ? "top-[-18px]" : ""}`}>
              Enter Email
            </label>
            <input onChange={(e) => setemail(e.target.value)}
              value={email}
              type="email" id='email' className='w-[100%] h-[100%]
              rounded-2xl px-[20px] outline-none border-0 required' />
          </div>

          <div className='relative flex items-center justify-start w-[90%] 
          h-[50px] rounded-2xl  border-2 border-black'
            onClick={() => setinputClicked({ ...inputClicked, password: true })}>

            <label htmlFor='password' className={`text-gray-700 absolute left-[20px]
             p-[5px] bg-white text-[15px] ${inputClicked.password ? "top-[-18px]" : ""}`}>
              Enter Password
            </label>
            <input onChange={(e) => setpassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"} id='password' className='w-[100%] h-[100%]
              rounded-2xl px-[20px] outline-none border-0 required' />
            {
              showPassword ?
                <FaEyeSlash
                  onClick={() => setshowPassword(!showPassword)}
                  className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]' />
                :
                <IoEye
                  onClick={() => setshowPassword(!showPassword)}
                  className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]' />
            }

          </div>

          {
            error && <p className='text-red-500'>{error}</p>
          }


          <button className='w-[70%] px-[20px] py-[10px] bg-black text-white
            font-semibold h-[50px] cursor-pointer rounded-2xl mt-[20px]'
            onClick={handleSignup} disabled={loading}>
            {loading ? <ClipLoader size={30} color='white' /> : "Sign Up"}
          </button>

          <p
            onClick={() => navigate("/signin")}
            className='cursor-pointer text-gray-800'>
            Already Have An Account ?
            <span className='border-b-2 border-b-black pb-[3px] text-black'>
              {' '}Sign In
            </span>
          </p>

        </div>

        <div className='md:w-[50%] h-full hidden lg:flex
        justify-center items-center bg-[#000000] flex-col gap-[10px]
        text-white text-[16px] font-semibold rounded-l-[30px]
        shadow-2xl shadow-black'>
          <img src={white_logo} alt="" className='w-[40%]' />
          <p>
            Not Just A Platform, It's a VYBE
          </p>
        </div>

      </div>
    </div>
  )
}

export default Signup