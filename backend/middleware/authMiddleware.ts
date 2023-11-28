import jwt, { JwtPayload } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { NextFunction, Request, Response } from 'express'

import User from '../models/userModel'

interface MyJwtPayload extends JwtPayload {
    userId: string;
}

export const protect = asyncHandler(async (req : Request, res : Response, next : NextFunction) => {
    let token: string | undefined = req.cookies.jwt;
    
    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as MyJwtPayload 

            req.body.user = await User.findById(decoded.userId).select('-password')

            next()
        } catch (err) {
            res.status(401)
            throw new Error('Not authorized, invalid token')
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})
