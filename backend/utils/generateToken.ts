import { Response } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (res: Response, userId: string) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || "", {
        expiresIn: '30s', 
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30000, 
    });
};

export default generateToken;
