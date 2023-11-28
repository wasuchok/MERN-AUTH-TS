import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from './middleware/errorMiddleware';
import connectDB from './config/db';
import cors from 'cors'
const port = process.env.PORT || 5000;

import userRoutes from './routes/userRoutes'

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true,
  }));

app.use(cookieParser())

app.use('/api/users', userRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server start on port ${port}`))