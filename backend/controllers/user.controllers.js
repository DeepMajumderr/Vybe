import uploadOnCloudinary from "../config/cloudinary.js"
import Notification from "../models/notification.model.js"
import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)
            .populate("posts loops posts.author posts.comments story following")
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ message: `get current user error ${error}` })
    }
}

export const suggestedUsers = async (req, res) => {
    try {
        const users = await User.find({
            _id: { $ne: req.userId }
        }).select("-password")
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: `get suggested user error ${error}` })
    }
}

export const editProfile = async (req, res) => {
    try {
        const { name, userName, bio, profession, gender } = req.body
        const user = await User.findById(req.userId).select("-password")
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        const sameUserWithUserName = await User.findOne({ userName }).select("-password")

        if (sameUserWithUserName && sameUserWithUserName._id != req.userId) {
            return res.status(400).json({ message: "userName already exists" })
        }

        let profileImage;
        if (req.file) {
            profileImage = await uploadOnCloudinary(req.file.path)
        }

        user.name = name
        user.userName = userName
        if (profileImage) {
            user.profileImage = profileImage
        }
        user.bio = bio
        user.profession = profession
        user.gender = gender

        await user.save()

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ message: `Edit profile error ${error}` })
    }
}

export const getProfile = async (req, res) => {
    try {
        const userName = req.params.userName
        const user = await User.findOne({ userName }).select("-password")
            .populate("posts loops followers following")

        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ message: `get profile error ${error}` })
    }
}

export const follow = async (req, res) => {
    try {
        const currentUserId = req.userId
        const targetUserId = req.params.targetUserId

        if (!targetUserId) {
            return res.status(400).json({
                message: "Target user not found!"
            })
        }

        if (currentUserId == targetUserId) {
            return res.status(400).json({
                message: "You can't follow yourself!"
            })
        }

        const currentUser = await User.findById(currentUserId)
        const targetUser = await User.findById(targetUserId)

        const isFollowing = currentUser.following.includes(targetUserId)

        if (isFollowing) {
            currentUser.following = currentUser.following.filter(f => f.toString() != targetUserId)
            targetUser.followers = targetUser.followers.filter(f => f.toString() != currentUserId)
            await currentUser.save()
            await targetUser.save()
            return res.status(200).json({
                following: false,
                message: "Unfollowed"
            })
        } else {
            currentUser.following.push(targetUserId)
            targetUser.followers.push(currentUserId)

            if (currentUser._id != targetUser._id) {
                const notification = await Notification.create({
                    sender: currentUser._id,
                    receiver: targetUser._id,
                    type: "follow",
                    message: "started following you"
                })
                const populatedNotification = await Notification.findById(notification._id).
                    populate("sender receiver")

                const receiverSockerId = getSocketId(targetUser._id)

                if (receiverSockerId) {
                    io.to(receiverSockerId).emit("newNotification", populatedNotification)
                }

            }

            await currentUser.save()
            await targetUser.save()
            return res.status(200).json({
                following: true,
                message: "Followed"
            })
        }

    } catch (error) {
        return res.status(500).json({ message: `Follow error ${error}` })

    }
}

export const followingList = async (req, res) => {
    try {
        const result = await User.findById(req.userId)
        return res.status(200).json(result?.following)
    } catch (error) {
        return res.status(500).json({ message: `Following error ${error}` })
    }
}

export const search = async (req, res) => {
    try {
        const keyWord = req.query.keyword

        if (!keyWord) {
            return res.status(400).json({ message: "keyword is required" })
        }

        const users = await User.find({
            $or: [
                { userName: { $regex: keyWord, $options: "i" } },
                { name: { $regex: keyWord, $options: "i" } },
            ]
        }).select("-password")

        return res.status(200).json(users)

    } catch (error) {
        return res.status(500).json({ message: `Search error ${error}` })
    }
}


export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            receiver: req.userId
        }).populate("sender receiver post loop")

        return res.status(200).json(notifications)

    } catch (error) {
        return res.status(500).json({ message: `Get notification error ${error}` })
    }
}

export const markAsRead = async (req, res) => {
    try {
        const {notificationId} = req.body
        const notification = await Notification.findById(notificationId).
            populate("sender receiver post loop")

        if(Array.isArray(notificationId)) {

        }

        return res.status(200).json({ message: "marked as read" })

    } catch (error) {
        return res.status(500).json({ message: `Read notification error ${error}` })

    }
}