import express from "express"
import { resetPassword, sendOtp, signin, signout, signup, verifyOtp } from "../controllers/auth.controllers.js"

const  authRouter = express.Router()

authRouter.post("/signup",signup)
authRouter.post("/signin",signin)
authRouter.get("/signout",signout)
authRouter.get("/sendOtp",sendOtp)
authRouter.get("/verifyOtp",verifyOtp)
authRouter.get("/resetPassword",resetPassword)

export default authRouter