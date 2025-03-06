import { Games } from "../models/all.models.js";

const addgame=async (req,res)=>{
    try{

        const {name,genre,rating}=req.body
        console.log(`req.body:${req.body}`)
        
        if(
            [name,genre,rating].some((field)=>field?.trim()==="")
        ){
            return res.status(400).json({ error: "All fields are required" });
        }

        const gameexist=await Games.findOne({name})
        if(gameexist){
            return res.status(400).json({ error: "Game already exists!" })
        }
        
        await Games.create({name,genre,rating})

        return res.status(201).json({ message: "Game added successfully", game: newGame });
        
    }catch(error){
        console.log("Failed",error)
        return res.status(500).json({error:"Internal server error"})
    }
}

const returnall=async(req,res)=>{
    try{
        const allgames=await Games.find({})
        return res.status(200).json({games:allgames})

        

    }catch(error){
        console.log("Failed returning all Games")
        return res.status(500).json({error:"Internal server error"})
    }
}

const returnone=async(req,res)=>{
    try{
        const {name}=req.body
        const onegame=await Games.findOne({name})
        if(onegame){
            return res.status(200).json({game:onegame})
        }else{
            return res.status(404).json({ error: "Game not found" });
        }
    }
    catch(error){
        console.log("Failed finding the game")
        return res.status(500).json({error:"Internal server error"})
    }
}

const highrated=async(req,res)=>{
    try{
        const {top}=req.query

        const limit=top?parseInt(top):3;

        const result=await Games.find().sort({rating:-1}).limit(limit)
        if(result.length>0){
            return res.status(200).json({ toprated: result });
        }else{
            res.status(404).json({error:"No games found"})
        }
    }catch(error){
        console.log("Failed finding top rated games")
        return res.status(500).json({error:"Internal server error"})
    }
}

const updateGameAchievements=async(gameNames)=>{
    try{
        const {gameName}=req.body
        if(!Array.isArray(gameName) || gameName.length!==2){
            return res.json(400).json({error:"Please provide exactly 2 game names"})
        }

        const achievements={
            "Game Master": "Achieved mastery of the game",
            "Speed Demon": "Completed game at record speed"
        }

        const result=await Games.updateMany(
            {
                name:{$in:gameName}
            },
            {
                $set:{
                    achievements:achievements
                }
            }
        )
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "No games found to update" });
        }

        return res.status(200).json({
            message: "Achievements updated successfully",
            updatedCount: result.modifiedCount
        })


    }catch(error){
        console.log("Failed updating achievements!",error)
        return res.status(500).json({error:"Internal server error"})
    }
}

export {addgame,returnall,returnone,highrated}