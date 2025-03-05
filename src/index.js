import connectDB from "./db/index.js";
import express from "express"

const app=express()

const PORT=process.env.PORT

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`App listening on port:${PORT}`)
    })
    
})
.catch((err)=>{
    console.log("MONGODB connection failed",err)
})
