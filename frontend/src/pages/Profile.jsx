import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData, setUserData } from '../redux/userSlice'
import { MdKeyboardBackspace } from "react-icons/md";
import dp from "../assets/dp.jpg"
import Nav from '../components/Nav'


const Profile = () => {

    const { userName } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { profileData, userData } = useSelector(state => state.user)

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

                <div onClick={()=>navigate("/")}>
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
                    <div className='text-[18px] md:text-[18px] text-[#ffffffc7]'>
                        Posts</div>
                </div>

                <div>
                    <div className='flex items-center justify-center gap-[20px]'>

                        <div className='flex relative'>
                            {/* {profileData?.followers?.slice(0, 3).map((follower, index) => {
                                <div className='w-[60px] h-[60px] md:w-[100px] md:h-[100px] border-2 border-black
                        rounded-full cursor-pointer overflow-hidden '>
                                    <img src={profileData?.profileImage || dp} alt=""
                                        className='w-full object-cover' />
                                </div>
                            })} */}
                            <div className='w-[40px] h-[40px]  border-2 border-black
                            rounded-full cursor-pointer overflow-hidden '>
                                <img src={profileData?.profileImage || dp} alt=""
                                    className='w-full object-cover' />
                            </div>

                            <div className='w-[40px] h-[40px] absolute  border-2 border-black
                            rounded-full cursor-pointer overflow-hidden left-[9px] '>
                                <img src={profileData?.profileImage || dp} alt=""
                                    className='w-full object-cover' />
                            </div>

                            <div className='w-[40px] h-[40px]  border-2 border-black
                            rounded-full cursor-pointer overflow-hidden absolute left-[18px] '>
                                <img src={profileData?.profileImage || dp} alt=""
                                    className='w-full object-cover' />
                            </div>

                        </div>

                        <div className='text-white text-[22px] md:text-[30px]
                        font-semibold'>

                            {profileData?.followers.length}

                        </div>
                    </div>

                    <div className='text-[18px] md:text-[18px] text-[#ffffffc7]'>
                        Followers
                    </div>

                </div>

                <div>

                    <div className='flex items-center justify-center gap-[20px]'>

                        <div className='flex relative'>
                            {/* {profileData?.followers?.slice(0, 3).map((follower, index) => {
                                <div className='w-[60px] h-[60px] md:w-[100px] md:h-[100px] border-2 border-black
                        rounded-full cursor-pointer overflow-hidden '>
                                    <img src={profileData?.profileImage || dp} alt=""
                                        className='w-full object-cover' />
                                </div>
                            })} */}
                            <div className='w-[40px] h-[40px]  border-2 border-black
                            rounded-full cursor-pointer overflow-hidden '>
                                <img src={profileData?.profileImage || dp} alt=""
                                    className='w-full object-cover' />
                            </div>

                            <div className='w-[40px] h-[40px] absolute  border-2 border-black
                            rounded-full cursor-pointer overflow-hidden left-[9px] '>
                                <img src={profileData?.profileImage || dp} alt=""
                                    className='w-full object-cover' />
                            </div>

                            <div className='w-[40px] h-[40px]  border-2 border-black
                            rounded-full cursor-pointer overflow-hidden absolute left-[18px] '>
                                <img src={profileData?.profileImage || dp} alt=""
                                    className='w-full object-cover' />
                            </div>

                        </div>

                        <div className='text-white text-[22px] md:text-[30px]
                        font-semibold'>

                            {profileData?.following.length}

                        </div>

                    </div>

                    <div className='text-[18px] md:text-[18px] text-[#ffffffc7]'>
                        Following
                    </div>

                </div>

            </div>

            <div className='w-full h-[80px] flex justify-center items-center gap-[20px]'>

                {
                    profileData?._id == userData?._id &&

                    <button onClick={()=>navigate("/editprofile")}
                    className='mt-[-35px] px-[10px] min-w-[150px] py-[5px] h-[40px]
                    bg-[white] cursor-pointer rounded-2xl'>
                        Edit Profile
                    </button>
                }

                {
                    profileData?._id != userData?._id &&
                    <>
                        <button className='mt-[-35px] px-[10px] min-w-[150px] py-[5px] h-[40px]
                        bg-[white] cursor-pointer rounded-2xl'>
                            Follow
                        </button>

                        <button className='mt-[-35px] px-[10px] min-w-[150px] py-[5px] h-[40px]
                        bg-[white] cursor-pointer rounded-2xl'>
                            Message
                        </button>
                    </>
                }

            </div>

            <div className='w-full min-h-[100vh]  flex justify-center'>

                <div className='w-full max-w-[900px] flex flex-col items-center rounded-t-[30px]
                bg-white relative gap-[20px] pt-[30px]'>

                    <Nav />

                </div>

            </div>

        </div>
    )
}

export default Profile