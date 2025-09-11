import React, { useEffect, useRef, useState } from 'react'
import { FaVolumeLow, FaVolumeXmark } from 'react-icons/fa6'
import dp from "../assets/dp.jpg"
import FollowButton from './FollowButton'
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineComment } from "react-icons/md";
import { serverUrl } from '../App'
import { setLoopData } from '../redux/loopSlice'
import axios from 'axios'

const LoopCard = ({ loop }) => {

  const videoRef = useRef()
  const [isPlaying, setisPlaying] = useState(true)
  const [isMute, setisMute] = useState(true)
  const [progress, setprogress] = useState(0)
  const { userData } = useSelector(state => state.user)
  const { loopData } = useSelector(state => state.loop)
  const dispatch = useDispatch()
  const [showHeart, setshowHeart] = useState(false)
  const [showComment, setshowComment] = useState(false)
  const commentRef = useRef()

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (video) {
      const percent = (video.currentTime / video.duration) * 100
      setprogress(percent)
    }
  }

  const handleClick = () => {
    if (isPlaying) {
      videoRef.current.pause()
      setisPlaying(false)
    } else {
      videoRef.current.play()
      setisPlaying(true)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      const video = videoRef.current
      if (entry.isIntersecting) {
        video.play()
        setisPlaying(true)
      } else {
        video.pause()
        setisPlaying(false)
      }
    }, { threshold: 0.6 })

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }


  }, [])

  useEffect(() => {

    const handleClickOutside = (e) => {
      if(commentRef.current && !commentRef.current.contains(e.target) ) {
        
      }
    }

    if(showComment) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [showComment])
  

  const handleLike = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/loop/like/${loop._id}`,
        { withCredentials: true })
      const updatedLoop = result.data

      const updatedLoops = loopData.map(l => l._id == loop._id ? updatedLoop : l)
      dispatch(setLoopData(updatedLoops))

    } catch (error) {
      console.log(error)
    }
  }

  const handleLikeOnDoubleClick = () => {
    setshowHeart(true)
    setTimeout(() => setshowHeart(false), 6000)
    { !loop.likes.includes(userData._id) ? handleLike() : null }
  }


  return (

    <div className='w-full lg:w-[480px] h-[100vh] flex items-center
    justify-center border-l-2 border-r-2 border-gray-800 relative overflow-hidden'>

      {showHeart &&
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 
      -translate-y-1/2 heart-animation z-50'>

          <IoMdHeart className='w-[100px]  h-[100px] text-white drop-shadow-2xl' />

        </div>}

      <div ref={commentRef} className={`absolute z-[200] bottom-0 w-full h-[500px]
      p-[10px] rounded-t-4xl bg-[#0e1718] transition-transform 
      duration-500 ease-in-out left-0 shadow-2xl shadow-black ${showComment ? 
      "translate-y-0" : "translate-y-[100%] "}`}>

        <h1 className='text-white text-[20px] text-center font-semibold'>
          Comments
        </h1>

      </div>

      <video ref={videoRef} autoPlay muted loop src={loop?.media}
        className='w-full max-h-full'
        onClick={handleClick} onTimeUpdate={handleTimeUpdate}
        onDoubleClick={handleLikeOnDoubleClick} />

      <div className='absolute top-[20px] right-[20px] z-[100]'
        onClick={() => setisMute(!isMute)}>

        {
          !isMute ?
            <FaVolumeXmark className='w-[20px] h-[20px] text-white 
            font-semibold' />
            :
            <FaVolumeLow className='w-[20px] h-[20px] text-white
            font-semibold' />
        }

      </div>

      <div className='absolute bottom-0 w-full h-[5px] bg-gray-900'>

        <div className='w-[200px] h-full bg-white transition-all duration-200 
        ease-linear'
          style={{ width: `${progress}%` }}>

        </div>

      </div>

      <div className='w-full absolute h-[100px] bottom-[10px] p-[10px] 
      flex flex-col gap-[10px]'>

        <div className='flex items-center gap-[10px]'>

          <div className='w-[30px] h-[30px] md:w-[40px] h-[40px] border-2 border-black
              rounded-full cursor-pointer overflow-hidden' >
            <img src={loop.author?.profileImage || dp} alt=""
              className='w-full object-cover' />
          </div>

          <div className='w-[120px] font-semibold truncate text-white'>
            {loop.author?.userName}
          </div>

          <FollowButton targetUserId={loop.author?._id}
            tailwind={'px-[10px] py-[5px] cursor-pointer text-white border-2 text-[14px] border-white rounded-2xl'} />

        </div>

        <div className='text-white px-[10px]'>
          {loop.caption}
        </div>

        <div className='absolute right-0  flex flex-col gap-[20px]
        text-white bottom-[130px] justify-center px-[10px]'>

          <div className='flex flex-col items-center cursor-pointer'>

            <div onClick={handleLike}>

              {
                !loop.likes.includes(userData._id) &&
                <IoMdHeartEmpty className='w-[25px] cursor-pointer h-[25px]' />
              }
              {
                loop.likes.includes(userData._id) &&
                <IoMdHeart className='w-[25px] cursor-pointer h-[25px] text-red-600' />
              }

            </div>

            <div>{loop.likes.length}</div>

          </div>

          <div className='flex flex-col items-center cursor-pointer ' onClick={()=>setshowComment(true)}>

            <div>
              <MdOutlineComment className='w-[25px] cursor-pointer h-[25px]' />
            </div>

            <div>{loop.comments.length}</div>

          </div>

        </div>

      </div>

    </div>
  )

}

export default LoopCard