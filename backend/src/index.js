import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./db/db.js";
dotenv.config({
    path:"./.env"
})

const port = process.env.PORT || 8000;

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.error(error);
        throw error;
    })
   
    app.listen(port,()=>{
        console.log(`Server is running at port ${port}..........`);
        
    })
})
.catch((err)=>{
    console.log("MONGO DB connection failed:", err);
    
})


