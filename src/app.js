import express from "express"
import { Gameroute } from "./Routes/Gameroutes.js"
import { q2router } from "./Routes/q2.routes.js"


const app=express()

app.use(express.json())

app.use("/api/q1/games",Gameroute)
app.use("/api/q2",q2router)


export {app}