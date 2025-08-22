import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData, setUserData } from '../redux/userSlice'
import { MdKeyboardBackspace } from "react-icons/md";
import dp from "../assets/dp.jpg"


const Profile = () => {

    const { userName } = useParams()
    const dispatch = useDispatch()
    const { profileData } = useSelector(state => state.user)

    const handleProfile = async () => {
        try {
            const result = await axios.get(
                `${serverUrl}/api/user/getProfile/${userName}`,
                { withCredentials: true }
            )
            dispatch(setProfileData(result.data))

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleProfile()
    }, [userName, dispatch])

    const handleLogout = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`,
                { withCredentials: true })

            dispatch(setUserData(null))

        } catch (error) {
            console.log(error)
        }
    }


    return (

        <div className='w-full min-h-screen bg-black'>

            <div className='text-white w-full h-[80px] flex justify-between
            items-center px-[30px]'>

                <div>
                    <MdKeyboardBackspace className='text-white w-[25px]
                    h-[25px] cursor-pointer' />
                </div>

                <div className='font-semibold text-[18px]'>
                    {profileData?.userName}
                </div>

                <div className='font-semibold  cursor-pointer text-[18px]
                text-blue-500' onClick={handleLogout}>
                    Log Out
                </div>
            </div>

            <div className='w-full h-[150px] flex items-start gap-[20px]
            lg:gap-[50px] pt-[20px] px-[10px] justify-center'>

                <div className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] border-2 border-black
                        rounded-full cursor-pointer overflow-hidden '>
                    <img src={profileData?.profileImage || dp} alt=""
                        className='w-full object-cover' />
                </div>

                <div>

                    <div className='font-semibold text-[22px] text-white'>{profileData?.name}</div>

                    <div className='text-[17px] text-[#ffffffe8]'>{profileData?.profession || "New User"}</div>

                    <div className='text-[17px] text-[#ffffffe8]'>{profileData?.bio}</div>

                </div>

            </div>

            <div className='w-full h-[100px] flex items-center justify-center gap-[40px]
            md:gap-[60px] px-[20%]  text-white'>

                <div>
                    <div className='text-white text-[22px] md:text-[30px]
                    font-semibold'>
                        {profileData?.posts.length}
                    </div>
                    <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>
                        Posts</div>
                </div>

                <div>
                    <div className='flex items-center justify-center gap-[20px]'>
                        <div>
                            {profileData?.followers.slice(0,3)}
                        </div>
                        <div>

                        </div>
                    </div>
                    <div>Followers</div>
                </div>

                <div>
                    <div></div>
                    <div>Following</div>
                </div>

            </div>

        </div>
    )
}

export default Profile