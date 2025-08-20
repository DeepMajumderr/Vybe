import React from 'react'
import logo from "../assets/white_logo.png"
import { FaRegHeart } from "react-icons/fa";
import StoryDp from './StoryDp';

const Feed = () => {
  return (
    <div className='lg:w-[50%] w-full bg-black min-h-[100vh]
    lg:h-[100vh] relative lg:overflow-y-auto'>

      <div className='w-full h-[100px] flex items-center
          justify-between p-[20px] lg:hidden'>
        <img src={logo} alt="" className='w-[80px]' />
        <div>
          <FaRegHeart className='text-[white] w-[25px] h-[25px]' />
        </div>
      </div>

      <div className='flex w-full overflow-auto gap-[20px] items-center
       p-[20px]'>
          <StoryDp userName={"bfh"}/>
          <StoryDp userName={"bfh"}/>
          <StoryDp userName={"bfh"}/>
          <StoryDp userName={"bfh"}/>
          <StoryDp userName={"bfh"}/>
          <StoryDp userName={"bfh"}/>
          <StoryDp userName={"bfh"}/>
          <StoryDp userName={"bfh"}/>
          <StoryDp userName={"bfh"}/>
      </div>

    </div>
  )
}

export default Feed