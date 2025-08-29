import React, { useRef, useState } from 'react'
import { FaRegSquarePlus } from 'react-icons/fa6'
import { MdKeyboardBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Upload = () => {
    const navigate = useNavigate()
    const [uploadType, setuploadType] = useState("post")
    const [frontendMedia, setfrontendMedia] = useState(null)
    const [backendMedia, setbackendMedia] = useState(null)
    const [mediaType, setmediaType] = useState("")
    const mediaInput = useRef()

    const handleMedia = (e) => {
        const file = e.target.files[0]
        if (file.type.includes("image")) {
            setmediaType("image")
        } else {
            setmediaType("video")
        }
        setbackendMedia(file)
        setfrontendMedia(URL.createObjectURL(file))
    }

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

                <div className={`${uploadType == "post" ? "bg-black text-white shadow-2xl shadow-black" : ""}
                w-[28%] h-[80%] flex justify-center items-center text-[19px]
                font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer
                hover:shadow-2xl hover:shadow-black`} onClick={() => setuploadType("post")}>
                    Post
                </div>

                <div className={`${uploadType == "story" ? "bg-black text-white shadow-2xl shadow-black" : ""}
                w-[28%] h-[80%] flex justify-center items-center text-[19px]
                font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer
                hover:shadow-2xl hover:shadow-black`} onClick={() => setuploadType("story")}>
                    Story
                </div>

                <div className={`${uploadType == "loop" ? "bg-black text-white shadow-2xl shadow-black" : ""}
                w-[28%] h-[80%] flex justify-center items-center text-[19px]
                font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer
                hover:shadow-2xl hover:shadow-black`} onClick={() => setuploadType("loop")}>
                    Loop
                </div>

            </div>

            {
                !frontendMedia &&

                <div className='w-[80%] max-w-[500px] h-[250px] bg-[#0e1316]
                border-gray-800 border-2 flex flex-col items-center justify-center gap-[8px]
                mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]'
                    onClick={() => mediaInput.current.click()}>
                    <input type="file" hidden ref={mediaInput}
                        onChange={handleMedia} />
                    <FaRegSquarePlus className='text-white w-[25px] h-[25px] cursor-pointer' />
                    <div className='text-white text-[19px] font-semibold'>Upload {uploadType}</div>
                </div>

            }

            {
                frontendMedia &&

                <div className='w-[80%] max-w-[500px] h-[250px]
                flex flex-col items-center justify-center mt-[1vh]'>

                    {
                        mediaType == "image" &&
                        <div className='w-[80%] max-w-[500px] h-[250px] 
                        flex flex-col items-center justify-center mt-[5vh]'>
                            <img src={frontendMedia} alt="" className='h-[60%]
                            rounded-2xl' />
                            {
                                uploadType != "story" &&
                                <input type='text' className='w-full border-b-gray-400 border-b-2
                                outline-none px-[10px] py-[5px] text-white mt-[20px]'
                                    placeholder='write caption...' />
                            }
                        </div>
                    }

                    {
                        mediaType == "video" &&
                        <div className='w-[80%] max-w-[500px] h-[250px] 
                        flex flex-col items-center justify-center mt-[5vh]'>
                            
                            {
                                uploadType != "story" &&
                                <input type='text' className='w-full border-b-gray-400 border-b-2
                                outline-none px-[10px] py-[5px] text-white mt-[20px]'
                                    placeholder='write caption...' />
                            }
                        </div>
                    }

                </div>
            }

            {
                frontendMedia &&
                <button className='px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-[white]
                mt-[50px] cursor-pointer rounded-2xl'>
                    Upload {uploadType}
                </button>
            }

        </div>
    )
}

export default Upload