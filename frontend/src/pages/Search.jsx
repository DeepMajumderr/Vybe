import React from 'react'
import { MdKeyboardBackspace } from 'react-icons/md'

const Search = () => {
    return (

        <div className='w-full min-h-[120vh]  bg-black flex
        items-center flex-col gap-[20px]'>

            <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px]'>
                <MdKeyboardBackspace className='text-white w-[25px]
                            h-[25px] cursor-pointer'
                    onClick={() => navigate(`/profile/${userData.userName}`)} />

                <h1 className='text-white text-[18px] font-semibold'>
                    Edit Profile
                </h1>

            </div>

        </div>
    )
}

export default Search