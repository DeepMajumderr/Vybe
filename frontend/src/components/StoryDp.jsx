import React from 'react'
import dp from "../assets/dp.jpg"
import { GoPlusCircle } from "react-icons/go";

const StoryDp = ({ profileImage, userName, story }) => {

    return (
        <div className='flex flex-col w-[80px]'>

            <div className={`w-[70px] h-[70px] ${story ? "bg-gradient-to-b from-blue-500 to-blue-950"
                : ""} rounded-full flex justify-center items-center relative`}>

                <div className='w-[60px] h-[60px] border-2 border-black
                rounded-full cursor-pointer overflow-hidden'>
                    <img src={profileImage || dp} alt="" className='w-full object-cover' />

                    {
                        !story && userName == "Your Story" &&

                        <div>

                        </div>

                    }

                    <GoPlusCircle className='text-black absolute bottom-[10px] 
                    bg-white right-[10px]' />

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