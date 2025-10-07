import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationData } from '../redux/userSlice'

const getAllNotifications = () => {

    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)

    useEffect(() => {

        const fetchNotifications = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/getAllNotifications`,
                    { withCredentials: true })
                dispatch(setNotificationData(result.data))

            } catch (error) {
                console.log(error)
            }
        }

        fetchNotifications()

    }, [dispatch, userData])


}

export default getAllNotifications