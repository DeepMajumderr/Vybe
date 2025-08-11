import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    try {
        const { name, email, password, userName } = req.body

        const findByEmail = await User.findOne({ email })
        if (findByEmail) {
            return res.status(400).json({ message: "Email already exists!" })
        }
        const findByUserName = await User.findOne({ userName })
        if (findByUserName) {
            return res.status(400).json({ message: "UserName already exists!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            userName,
            email,
            password: hashedPassword
        })

        const token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
            secure: false,
            sameSite: "Strict"
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({message: `Signup error ${error}`})
    }
}