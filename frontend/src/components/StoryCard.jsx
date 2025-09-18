import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.jpg"
import { useSelector } from 'react-redux'
import { MdKeyboardBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import VideoPlayer from './VideoPlayer'
import { FaEye } from "react-icons/fa";

const StoryCard = ({ storyData }) => {

  const navigate = useNavigate()
  const [progress, setprogress] = useState(0)
  const { userData } = useSelector(state => state.user)

  useEffect(() => {

    const interval = setInterval(() => {
      setprogress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          navigate("/")
          return 100
        }
        return prev + 1
      })
    }, 100)

    return () => clearInterval(interval)
  }, [navigate])


  return (
    <div className='w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800
    pt-[10px] relative flex flex-col justify-center'>

      <div className='flex items-center gap-[10px] absolute top-[30px] px-[10px]'>

        <MdKeyboardBackspace className='text-white w-[25px] h-[25px] cursor-pointer'
          onClick={() => navigate(`/`)} />

        <div className='w-[40px] h-[40px] md:w-[40px] h-[40px] border-2 border-black
                    rounded-full cursor-pointer overflow-hidden' >
          <img src={storyData?.author?.profileImage || dp} alt=""
            className='w-full object-cover' />
        </div>

        <div className='w-[120px] font-semibold truncate text-white'>
          {storyData?.author?.userName}
        </div>

      </div>

      <div className='w-[90%] 
                flex  items-center justify-center '>

        {
          storyData?.mediaType == "image" &&
          <div className='w-[full] h-[90vh] flex items-center justify-center '>
            <img src={storyData?.media} alt="" className='w-[80%]
                            rounded-2xl  object-cover' />
          </div>
        }

        {
          storyData?.mediaType == "video" &&
          <div className='w-[80%] flex flex-col items-center justify-center'>
            <VideoPlayer media={storyData?.media} />
          </div>
        }

      </div>

      <div className='absolute top-[10px] w-full h-[5px] bg-gray-900'>

        <div className='w-[200px] h-full bg-white transition-all duration-200 
        ease-linear'
          style={{ width: `${progress}%` }}>

        </div>

      </div>

      {
        storyData?.author?.userName == userData?.userName &&
        <div className='w-full h-[70px] text-white absolute bottom-0 p-2 left-0'>

          <div className='text-white flex items-center gap-[5px]'>
            <FaEye /> {storyData.viewers.length}
          </div>

        </div>
      }


    </div>
  )
}

export default StoryCard