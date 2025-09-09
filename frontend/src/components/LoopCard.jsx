import React, { useEffect, useRef } from 'react'

const LoopCard = ({ loop }) => {

  const videoRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver((entry) => {
      const video = videoRef.current
      if(entry.isIntersecting){
        
      }
    })

    observer.observe(videoRef.current)

  }, [])
  

  return (

    <div className='w-full lg:w-[480px] h-[100vh] flex items-center
    justify-center border-l-2 border-r-2 border-gray-800 relative'>

      <video ref={videoRef} autoPlay muted loop src={loop?.media}
        className='w-full max-h-full' />

    </div>
  )

}

export default LoopCard