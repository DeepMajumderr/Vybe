import React from 'react'
import { MdKeyboardBackspace } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NotificationCard from '../components/NotificationCard'
import axios from 'axios'

const Notifications = () => {
    const navigate = useNavigate()
    const {notificationData} = useSelector(state => state.user)

    const markAsRead = async() => {
        try {
            const result = await axios
        } catch (error) {
            
        }
    }

    return (
        <div className='w-full h-[100vh] bg-black'>

            <div className='w-full h-[80px]  flex items-center gap-[20px] px-[20px] 
            lg:hidden'>
                <MdKeyboardBackspace className='text-white w-[25px]
                        h-[25px] cursor-pointer'
                    onClick={() => navigate(`/`)} />

                <h1 className='text-white text-[18px] font-semibold'>
                    Notifications
                </h1>

            </div>

            <div className='w-full flex flex-col h-[100%] gap-[20px] 
            overflow-auto px-[10px]'>

                {notificationData?.map((noti,index)=> (
                    <NotificationCard noti={noti} key={index} />
                ))}

            </div>

        </div>
    )
}

export default Notifications