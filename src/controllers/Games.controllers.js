import { Games } from "../models/all.models.js";

const addgame=async (req,res)=>{
    try{

        const {name,genre,rating}=req.body
        console.log(`name:${name}`)
        
        if(
            [name,genre,rating].some((field)=>field?.trim()==="")
        ){
            return res.status(400).json({ error: "All fields are required" });
        }

        const gameexist=await Games.findOne({name})
        if(gameexist){
            return res.status(400).json({ error: "Game already exists!" })
        }
        
        const newGame=await Games.create({name,genre,rating})

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

const returnGameByName=async(req,res)=>{
    try{
        const {name}=req.query
        const onegame=await Games.findOne({name})
        if(onegame){
            return res.status(200).json({game:onegame})
        }else{
            return res.status(404).json({ error: "Game not found" });
        }
    }
    catch(error){
        console.log("Failed finding the game",error)
        return res.status(500).json({error:"Internal server error"})
    }
}

const highrated=async(req,res)=>{
    try{
        const {top}=req.query

        const limit=top?parseInt(top):3;

        const result=await Games.find().sort({rating:-1}).limit(limit)
        if(result.length===0){
            res.status(404).json({error:"No games found"})
        }else{
            return res.status(200).json({ toprated: result });
        }
    }catch(error){
        console.log("Failed finding top rated games")
        return res.status(500).json({error:"Internal server error"})
    }
}

const updateGameAchievements=async(req,res)=>{
    try{
        const {gameName}=req.body
        console.log("Names of game:",gameName)
        if(!Array.isArray(gameName) || gameName.length!==2){
            return res.status(400).json({error:"Please provide exactly 2 game names"})
        }

        const achievements=[
            "Game Master" ,
            "Speed Demon"
        ]

        const result=await Games.updateMany(
            {
                name:{$in:gameName}
            },
            {
                $set:{
                    achievements
                }
            }
        )
        console.log("Reuslts:",result)
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

const acheivementgames=async(req,res)=>{
    try{
        const games=await Games.find({achievements:{
            $all:["Game Master","Speed Demon"]
        }})

        if(games.length===0){
            return res.status(404).json({error:"No games found with these achievements"})
        }
        return res.status(200).json({games})

    }catch(error){
        console.log("Failed fetching acheivement games",error)
        return res.status(500).json({error:"Internal server error"})
    }
}

const gamesWithAchievements=async(req,res)=>{
    try{
        const results=await Games.find({achievements:{$exists:true,$ne:[]}})

        if (results.length === 0) {
            return res.status(404).json({ error: "No games with achievements found" });
        }
        return res.status(200).json({results})
    }catch(error){
        console.log("Failed fetching games with achievements",error)
        return res.status(500).json({error:"Internal server error"})
    }
}





export {addgame,returnall,returnGameByName,highrated,acheivementgames,updateGameAchievements,gamesWithAchievements}