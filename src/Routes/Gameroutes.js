import express from "express"
import { addgame,highrated,acheivementgames,returnall,updateGameAchievements,returnGameByName,gamesWithAchievements } from "../controllers/Games.controllers.js"


const router=express.Router()

router.post("/",addgame)
router.get("/",returnall)
router.get("/top",highrated)
router.patch("/update-achivements",updateGameAchievements)
router.get("/achievements/both",acheivementgames)
router.get("/achiv",gamesWithAchievements)
router.get("/:name",returnGameByName)


export  {router as Gameroute}