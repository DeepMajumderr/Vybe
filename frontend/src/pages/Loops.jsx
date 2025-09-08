import React from 'react'
import { MdKeyboardBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Loops = () => {
    const navigate = useNavigate()

    return (
        <div className='w-screen h-screen bg-black overflow-hidden
    flex justify-center items-center'>

            <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px] 
            fixed top-[10px] left-[10px]'>
                <MdKeyboardBackspace className='text-white w-[25px]
                        h-[25px] cursor-pointer'
                    onClick={() => navigate(`/`)} />

                <h1 className='text-white text-[18px] font-semibold'>
                    Loops
                </h1>

            </div>

        </div>
    )
}

export default Loops