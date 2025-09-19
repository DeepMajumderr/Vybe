import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.jpg"
import { GoPlusCircle } from "react-icons/go";
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';


const StoryDp = ({ profileImage, userName, story }) => {

    const navigate = useNavigate()
    const { userData } = useSelector(state => state.user)
    const { storyData, storyList } = useSelector(state => state.story)
    const [viewed, setviewed] = useState(false)

    useEffect(() => {
        if (story?.viewers?.some((viewer) =>
            viewer._id?.toString() === userData._id?.toString() || viewer?.toString() == userData._id?.toString()
        )) {
            setviewed(true)
        } else {
            setviewed(true)
        }


    }, [story, userData, storyData, storyList])


    const handleViewers = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/story/view/${story._id}`, { withCredentials: true })
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = () => {
        if (!story && userName == "Your Story") {
            navigate("/upload")
        } else if (story && userName == "Your Story") {
            navigate(`/story/${userData.userName}`)
        } else {
            handleViewers()
            navigate(`/story/${userName}`)
        }
    }

    return (
        <div className='flex flex-col w-[80px]' >

            <div className={`w-[70px] h-[70px] ${!story ? null : !viewed ? "bg-gradient-to-b from-blue-500 to-blue-950" : "bg-gradient-to-b from-gray-500 to-black-950"}
            rounded-full flex justify-center items-center relative`}
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