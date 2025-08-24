import React from 'react'
import { MdKeyboardBackspace } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dp from "../assets/dp.jpg"


const EditProfile = () => {

    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()

    const imageInput = useRef()


    return (

        <div className='w-full min-h-[120vh]  bg-black flex
        items-center flex-col gap-[20px] '>

            <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px]'>
                <MdKeyboardBackspace className='text-white w-[25px]
                h-[25px] cursor-pointer'
                    onClick={() => navigate(`/profile/${userData.userName}`)} />

                <h1 className='text-white text-[18px] font-semibold'>
                    Edit Profile
                </h1>

            </div>

            <div className='w-[80px] h-[80px] md:w-[80px] md:h-[80px] border-2 border-black
                rounded-full cursor-pointer overflow-hidden '>
                <input type='file' accept='image/*' ref={imageInput} hidden />
                <img src={userData?.profileImage || dp} alt=""
                    className='w-full object-cover' />
            </div>

            <div className='text-blue-500 text-center text-[18px] font-semibold'>
                Change Your Profile Picture
            </div>

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
            border-2 border-gray-700 rounded-2xl text-white font-semibold  px-[20px] outline-none'
                placeholder='Enter your name...' />

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
            border-2 border-gray-700 rounded-2xl text-white font-semibold  px-[20px] outline-none'
                placeholder='Enter your userName...' />

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
            border-2 border-gray-700 rounded-2xl text-white font-semibold  px-[20px] outline-none'
                placeholder='Enter your Bio...' />

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
            border-2 border-gray-700 rounded-2xl text-white font-semibold  px-[20px] outline-none'
                placeholder='Enter your Profession...' />

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
            border-2 border-gray-700 rounded-2xl text-white font-semibold  px-[20px] outline-none'
                placeholder='Enter your Gender...' />

            <button className='px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-[white]
            cursor-pointer rounded-2xl'>
                Save Profile
            </button>


        </div>
    )
}

export default EditProfile