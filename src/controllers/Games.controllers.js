import { Games } from "../models/all.models";

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

export {addgame,returnall,returnone}