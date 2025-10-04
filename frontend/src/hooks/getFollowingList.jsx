import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setFollowing, setUserData } from '../redux/userSlice'
import { setCurrentUserStory } from '../redux/storySlice'

const getFollowigList = () => {

    const dispatch = useDispatch()
    const {storyData} = useSelector(state => state.story)
    // console.log(storyData)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/followingList`,
                    { withCredentials: true })
                
                dispatch(setFollowing(result.data))
            } catch (error) {
                console.log(error)
            }
        }

        fetchUser()
    }, [storyData])

}

export default getFollowigList