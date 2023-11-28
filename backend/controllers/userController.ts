import { Request, Response } from "express"
import asyncHandler from 'express-async-handler'
import User from "../models/userModel"
import generateToken from "../utils/generateToken"
import bcrypt from 'bcrypt'

const saltRounds = 10;

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
export const authUser = asyncHandler(async  (req : Request, res : Response) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if(user && bcrypt.compareSync(password, user.password)) {
        generateToken(res, user._id)
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid email or password')
    }
})

// @desc Register a new user
// route POST /api/users
// @access Public
export const registerUser = asyncHandler(async  (req : Request, res : Response) => {
    let { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400);
        throw new Error('User already exists')
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    password = hash

    const  user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Logout user
// route POST /api/users/logout
// @access Public
export const logoutUser = asyncHandler(async  (req : Request, res : Response) => {
    res.cookie('jwt', '', {
        httpOnly : true,
        expires : new Date(0)
    })

    res.status(200).json({
        message : "User logged out"
    })
})

// @desc Get user profile
// route GET /api/users/profile
// @access Private
export const getUserProfile = asyncHandler(async  (req : Request, res : Response) => {
    const user = {
        _id : req.body.user._id,
        name : req.body.user.name,
        email : req.body.user.email
    }
    res.status(200).json(user)
})

// @desc Update user profile
// route put /api/users/profile
// @access Private
export const updateUserProfile = asyncHandler(async  (req : Request, res : Response) => {
    const user = await User.findById(req.body.user._id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if(req.body.password) {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash
            user.password = req.body.password
        }

       const updateUser = await user.save()

       res.status(200).json({
        _id : updateUser._id,
        name : updateUser.name,
        email : updateUser.email
       })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


