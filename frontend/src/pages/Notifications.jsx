import React from 'react'
import { MdKeyboardBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Notifications = () => {
    const navigate = useNavigate()

    return (
        <div className='w-full h-[100vh bg-black]'>

            <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px]'>
                <MdKeyboardBackspace className='text-white w-[25px]
                        h-[25px] cursor-pointer'
                    onClick={() => navigate(`/`)} />

                <h1 className='text-white text-[18px] font-semibold'>
                    Notifications
                </h1>

            </div>

        </div>
    )
}

export default Notifications