import express from "express"
import { q2addgame,getallgames } from "../controllers/q2.controller.js"

const router=express.Router()

router.post("/q2add",q2addgame)
router.get("/alldetails",getallgames)

export {router as q2router}