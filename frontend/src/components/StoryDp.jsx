import React from 'react'
import dp from "../assets/dp.jpg"
import { GoPlusCircle } from "react-icons/go";
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';


const StoryDp = ({ profileImage, userName, story }) => {

    const navigate = useNavigate()
    const { userData } = useSelector(state => state.user)

    const handleClick = () => {
        if (!story && userName == "Your Story") {
            navigate("/upload")
        } else if (story && userName == "Your Story") {
            navigate(`/story/${userData.userName}`)
        }
    }

    return (
        <div className='flex flex-col w-[80px]' >

            <div className={`w-[70px] h-[70px] ${story ? "bg-gradient-to-b from-blue-500 to-blue-950"
                : ""} rounded-full flex justify-center items-center relative`}
                onClick={handleClick}>

                <div className='w-[60px] h-[60px] border-2 border-black
                rounded-full cursor-pointer overflow-hidden'>
                    <img src={profileImage || dp} alt="" className='w-full object-cover' />

                    {
                        !story && userName == "Your Story" &&

                        <div>

                            <GoPlusCircle className='text-black absolute bottom-[8px] 
                                bg-white right-[10px] rounded-full w-[18px] h-[18px]'
                            />

                        </div>

                    }


                </div>

            </div>

            <div className='text-[14px] text-center truncate w-full
            text-white'>
                {userName}
            </div>

        </div>
    )
}

export default StoryDp