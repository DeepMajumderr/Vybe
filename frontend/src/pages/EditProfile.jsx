import React, { useRef, useState } from 'react'
import { MdKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dp from "../assets/dp.jpg"
import axios from 'axios'
import { serverUrl } from '../App'
import { setProfileData, setUserData } from '../redux/userSlice';
import { ClipLoader } from 'react-spinners';


const EditProfile = () => {

    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    const imageInput = useRef()
    const [frontendImage, setfrontendImage] = useState(userData.profileImage || dp)
    const [backendImage, setbackendImage] = useState(null)
    const [name, setname] = useState(userData.name || "")
    const [userName, setuserName] = useState(userData.userName || "")
    const [bio, setbio] = useState(userData.bio || "")
    const [profession, setprofession] = useState(userData.profession || "")
    const [gender, setgender] = useState(userData.gender || "")
    const [loading, setloading] = useState(false)

    const dispatch = useDispatch()


    const handleImage = (e) => {
        const file = e.target.files[0]
        setbackendImage(file)
        setfrontendImage(URL.createObjectURL(file))
    }

    const handleEditProfile = async (req, res) => {
        setloading(true)
        try {
            const formdata = new FormData()
            formdata.append("name", name)
            formdata.append("userName", userName)
            formdata.append("bio", bio)
            formdata.append("profession", profession)
            formdata.append("gender", gender)
            if (backendImage) {
                formdata.append("profileImage", backendImage)
            }
            const result = await axios.post(`${serverUrl}/api/user/editProfile`,
                formdata,
                { withCredentials: true }
            )
            dispatch(setProfileData(result.data))
            dispatch(setUserData(result.data))
            setloading(false)
            navigate(`/profile/${userData.userName}`)

        } catch (error) {
            setloading(false);

            if (error.response) {
                // Server responded with an error (4xx or 5xx)
                console.log("Response error:", error.response.data);
                console.log("Status:", error.response.status);
                console.log("Headers:", error.response.headers);
            } else if (error.request) {
                // Request was made but no response
                console.log("Request error:", error.request);
            } else {
                // Something else went wrong
                console.log("Error message:", error.message);
            }
        }
    }

    return (

        <div className='w-full min-h-[120vh]  bg-black flex
        items-center flex-col gap-[20px] '>

            <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px]'>
                <MdKeyboardBackspace className='text-white w-[25px]
                h-[25px] cursor-pointer'
                    onClick={() => navigate(`/profile/${userData.userName}`)} />

                <h1 className='text-white text-[18px] font-semibold'>
                    Edit Profile
                </h1>

            </div>

            <div className='w-[80px] h-[80px] md:w-[80px] md:h-[80px] border-2 border-black
                rounded-full cursor-pointer overflow-hidden '
                onClick={() => imageInput.current.click()}>
                <input type='file' accept='image/*' ref={imageInput} hidden
                    onChange={handleImage} />
                <img src={frontendImage} alt=""
                    className='w-full object-cover' />
            </div>

            <div className='text-blue-500 text-center text-[18px] font-semibold cursor-pointer'
                onClick={() => imageInput.current.click()}>
                Change Your Profile Picture
            </div>

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
            border-2 border-gray-700 rounded-2xl text-white font-semibold  px-[20px] outline-none'
                placeholder='Enter your name...' onChange={(e) => setname(e.target.value)} value={name} />

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
            border-2 border-gray-700 rounded-2xl text-white font-semibold  px-[20px] outline-none'
                placeholder='Enter your userName...' onChange={(e) => setuserName(e.target.value)} value={userName} />

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
            border-2 border-gray-700 rounded-2xl text-white font-semibold  px-[20px] outline-none'
                placeholder='Enter your Bio...' onChange={(e) => setbio(e.target.value)} value={bio} />

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
            border-2 border-gray-700 rounded-2xl text-white font-semibold  px-[20px] outline-none'
                placeholder='Enter your Profession...' onChange={(e) => setprofession(e.target.value)} value={profession} />

            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010]
            border-2 border-gray-700 rounded-2xl text-white font-semibold  px-[20px] outline-none'
                placeholder='Enter your Gender...' onChange={(e) => setgender(e.target.value)} value={gender} />

            <button className='px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-[white]
            cursor-pointer rounded-2xl' onClick={handleEditProfile}>
                {
                    loading ?
                        <ClipLoader size={30} color='black' />
                        :
                        "Save Profile"
                }

            </button>


        </div>
    )
}

export default EditProfile