import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setFollowing, setUserData } from '../redux/userSlice'

const getCurrentUser = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/current`,
                    { withCredentials: true })
                dispatch(setUserData(result.data))
                dispatch(setFollowing(result.data.following))

            } catch (error) {
                console.log(error)
            }
        }

        fetchUser()
    }, [])

}

export default getCurrentUser