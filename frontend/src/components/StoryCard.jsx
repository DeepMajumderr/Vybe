import React from 'react'
import dp from "../assets/dp.jpg"
import { useSelector } from 'react-redux'
import { MdKeyboardBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const StoryCard = () => {
  const { storyData } = useSelector(state => state.story)
  const navigate = useNavigate()

  return (
    <div className='w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800
    pt-[10px] relative flex flex-col justify-center'>

      <div className='flex items-center gap-[10px] absolute top-[20px] px-[10px]'>

        <MdKeyboardBackspace className='text-white w-[25px] h-[25px] cursor-pointer'
          onClick={() => navigate(`/`)} />

        <div className='w-[30px] h-[30px] md:w-[40px] h-[40px] border-2 border-black
                    rounded-full cursor-pointer overflow-hidden' >
          <img src={storyData.author?.profileImage || dp} alt=""
            className='w-full object-cover' />
        </div>

        <div className='w-[120px] font-semibold truncate text-white'>
          {storyData.author?.userName}
        </div>

      </div>

    </div>
  )
}

export default StoryCard