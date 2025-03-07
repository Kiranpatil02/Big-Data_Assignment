import mongoose,{Schema} from "mongoose";

const scoreSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true
    }
})

const gameSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    publisher:{
        type:String,
        required:true
    },
    released:{
        type:Date,
        required:true,

    },
    rating:{
        type:Number,
        required:true,
        max:10
    },
    scores:{
        type:[scoreSchema],
        default:[]
    }
},{timestamps:true})


export const question2=mongoose.model("q2",gameSchema)

