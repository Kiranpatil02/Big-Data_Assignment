import express from "express"
import { Gameroute } from "./Routes/Gameroutes.js"

const app=express()

app.use(express.json())

app.use("/api/q1/games",Gameroute)

export {app}