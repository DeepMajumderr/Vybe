import React, { useState } from 'react'
import { MdKeyboardBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Upload = () => {
    const navigate = useNavigate()
    const [uploadType, setuploadType] = useState("post")

    return (
        <div className='w-full h-[100vh] bg-black flex flex-col
        items-center'>

            <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px]'>
                <MdKeyboardBackspace className='text-white w-[25px]
                        h-[25px] cursor-pointer'
                    onClick={() => navigate(`/`)} />

                <h1 className='text-white text-[18px] font-semibold'>
                    Upload Media
                </h1>

            </div>

            <div className='w-[90%] max-w-[600px] h-[70px] bg-[white] rounded-full
            flex justify-around items-center gap-[10px]'>

                <div className={ `${uploadType == "post" ?  "bg-black text-white shadow-2xl shadow-black" : ""}
                w-[28%] h-[80%] flex justify-center items-center text-[19px]
                font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer
                hover:shadow-2xl hover:shadow-black`} onClick={() => setuploadType("post")}>
                    Post
                </div>

                <div className='w-[28%] h-[80%] flex justify-center items-center text-[19px]
                font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer
                hover:shadow-2xl hover:shadow-black' onClick={() => setuploadType("story")}>
                    Story
                </div>

                <div className='w-[28%] h-[80%] flex justify-center items-center text-[19px]
                font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer
                hover:shadow-2xl hover:shadow-black' onClick={() => setuploadType("loop")}>
                    Loop
                </div>

            </div>

        </div>
    )
}

export default Upload