import React from 'react'

const SenderMessage = ({message}) => {
  return (
    <div className='w-fit max-w-[60%] bg-gradient-to-br from-[#9500ff] to-[#ff0095]
    rounded-t-2xl rounded-bl-2xl rounded-br-0 px-[10px] py-[10px] relative ml-auto 
    right-0 flex flex-col gap-[10px]'>

      {message.image &&  
  
        <img src={message.image} alt=""  
        className='h-[200px] object-cover rounded-2xl'/>
      
      }

      {message.message && 

        <div className='text-[18px] text-white wrap-break-word'>
          {message.message}
        </div>
      
      }

    </div>
  )
}

export default SenderMessage