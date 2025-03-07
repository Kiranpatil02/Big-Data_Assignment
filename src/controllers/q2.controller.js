import { question2 } from "../models/q2.models.js";


const q2addgame=async(req,res)=>{
    try{
        console.log(req.body)
        const {name,publisher,released,rating,scores}=req.body
        if(!name ||!publisher||!released||!rating||!scores){
            return res.status(400).json({error:"All fields are required!"})
        }

        const nameexist=await question2.findOne({name})
        if(nameexist){
            res.status(400).json({error:"Game already exists!!"})
        }

        const newgame=await question2.create({name,publisher,released,rating,scores})

        return res.status(200).json({message:"Games added success",newgame})
    }catch(error){
        console.log("Failed to add game",error);
        res.status(500).json({error:"Internal server error"})
    }
}

const getTotalScoresofplayers=async(req,res)=>{
    try{
        const results=await question2.aggregate([
            {
                $unwind:"$scores"
            },
            {
                $group:{
                    _id:"$scores.name",
                    totalScore:{$sum:"$scores.score"} // This sum's all of the players scores
                }
            },
            {
                $sort:{
                    totalScore:-1
                }
            }
        ])


            return res.status(200).json({results})

    }catch(error){
        console.log("Failed Calculating total scores",error)
        res.status(500).json({error:"Internal server error"})
    }
}

export {getTotalScoresofplayers,q2addgame}