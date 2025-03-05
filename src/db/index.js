import mongoose from "mongoose";
import { DB_NAME } from "../constants"; 
import dotenv from "dotenv"
import "dotenv/config"

dotenv.config({
    path:"./env"
})

const connectDB=async()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! host: ${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log("Failed to connect DB",e)
        process.exit(1)
    }
}

export default connectDB