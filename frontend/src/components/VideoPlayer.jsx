import React, { useRef, useState } from 'react'
import { FaVolumeLow } from "react-icons/fa6";
import { FaVolumeXmark } from "react-icons/fa6";

const VideoPlayer = ({ media }) => {

    const videoTag = useRef()
    const [mute, setmute] = useState(false)
    const [isPlaying, setisPlaying] = useState(true)
   

    const handleClick = () => {
        if (isPlaying) {
            videoTag.current.pause()
            setisPlaying(false)
        } else {
            videoTag.current.play()
            setisPlaying(true)
        }
    }

    return (
        <div className='h-[100%] relative cursor-pointer max-w-full 
        rounded-2xl overflow-hidden'>

            <video ref={videoTag} src={media} autoPlay loop muted={mute}
                className='h-[100%]  cursor-pointer w-full 
                object-cover rounded-2xl' onClick={handleClick} />

            <div className='absolute bottom-[10px] right-[10px]'
                onClick={() => setmute(!mute)}>
                {
                    !mute ?
                        <FaVolumeXmark className='w-[20px h-[20px] text-white
                        font-semibold' />
                        :
                        <FaVolumeLow className='w-[20px h-[20px] text-white
                        font-semibold' />
                }
            </div>

        </div>
    )
}

export default VideoPlayer