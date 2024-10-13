import express from "express"
import cors from"cors"
import cookieParser from "cookie-parser"

const app = express()

const allowedOrigins = process.env.CORS_ORIGIN.split(',');

// CORS setup
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true // Allow credentials (cookies, authorization headers, etc.)
    })
);



app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(cookieParser())

//import router
import userRouter from "./routes/user.routes.js"
import notesRouter from "./routes/notes.routes.js"

//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/notes",notesRouter)

export default app;