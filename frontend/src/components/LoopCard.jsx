import React, { useEffect, useRef, useState } from 'react'
import { FaVolumeLow, FaVolumeXmark } from 'react-icons/fa6'
import dp from "../assets/dp.jpg"
import FollowButton from './FollowButton'

const LoopCard = ({ loop }) => {

  const videoRef = useRef()
  const [isPlaying, setisPlaying] = useState(true)
  const [isMute, setisMute] = useState(true)
  const [progress, setprogress] = useState(0)

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


  return (

    <div className='w-full lg:w-[480px] h-[100vh] flex items-center
    justify-center border-l-2 border-r-2 border-gray-800 relative'>

      <video ref={videoRef} autoPlay muted loop src={loop?.media}
        className='w-full max-h-full'
        onClick={handleClick} onTimeUpdate={handleTimeUpdate} />

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
        text-white bottom-[100px] justify-center px-[10px]'>

          <div className='flex flex-col items-center cursor-pointer'>

            <div>
              
            </div>

            <div></div>

          </div>

          <div></div>

        </div>

      </div>

    </div>
  )

}

export default LoopCard