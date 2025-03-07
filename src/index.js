import connectDB from "./db/index.js";
import { app } from "./app.js";


const PORT=process.env.PORT

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`App listening on port:${PORT}`)
    })
    
})
.catch((err)=>{
    console.log("MONGODB connection failed",err)
})
