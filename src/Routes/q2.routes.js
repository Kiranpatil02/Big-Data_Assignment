import express from "express"
import { q2addgame,getTotalScoresofplayers } from "../controllers/q2.controller.js"

const router=express.Router()

router.post("/q2add",q2addgame)
router.get("/totalscore",getTotalScoresofplayers)

export {router as q2router}