import express from 'express'
import { adminLogin, forgotPassword, getProfile, loginUser, registerUser, resetPassword } from '../controllers/userController.js'
import userAuth from '../middleware/userAuth.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post("/profile",userAuth, getProfile);

userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);


export default userRouter;