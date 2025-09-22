import React from 'react'
import { MdKeyboardBackspace } from 'react-icons/md'

const Messages = () => {
  return (
    <div className='w-full min-h-[100vh] flex flex-col bg-black
    gap-[20] p-[20px]'>

      <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px]'>
        <MdKeyboardBackspace className='text-white w-[25px]
                      h-[25px] cursor-pointer lg:hidden'
          onClick={() => navigate(`/`)} />

        <h1 className='text-white text-[18px] font-semibold'>
          Messages
        </h1>

      </div>

    </div>
  )
}

export default Messages