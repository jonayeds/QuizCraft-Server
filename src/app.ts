import express, { Application, NextFunction, Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import router from "./app/routes"
import { errorHandler } from "./app/middlewares/globalErrorHandler"
import { notFound } from "./app/middlewares/notFound"

const app:Application = express()

// persers 
app.use(cors({
    origin:["http://localhost:3000",    'http://quizcraft-client.vercel.app'],
    credentials: true 
}))
app.use(cookieParser()) // Add cookie parser middleware
app.use(express.json())

// application routes
app.use("/api/v1",(req, res,next:NextFunction)=>{
    next()
} , router)

app.get("/api/v1", (req:Request, res:Response)=>{
    res.send("QuizCraft is running 🏃🏼‍♂️‍➡️")
})

app.use(errorHandler)

app.use(notFound)


export default app