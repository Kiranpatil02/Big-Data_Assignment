import mongoose,{Schema} from "mongoose";

const GamesSchema=new Schema({
    name:{
        unique:true,
        required:true,
        type:String
    },
    genre:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        max:100,
        min:1
    },
    achievements: { type: [String], default: [] } 
    

},{timestamps:true})

export const Games=mongoose.model("Games",GamesSchema)

