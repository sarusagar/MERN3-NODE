require('dotenv').config()
const express =require('express')
const connectToDatabase = require('./database')
const app = express()

connectToDatabase()

app.get("/",(req,res)=>{
    // res.send("hello world from saga saru magar .")
    res.status(200).json({
        message:"hello world."
    })
})

// about
app.get("/about",(req,res)=>{
    res.json({
        message:"This is about."
    })
})



app.listen(process.env.PORT,()=>{
    console.log("NodeJs project has started.")
})


// mongodb+srv://sagarsaru:<db_password>@cluster0.kavlcph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0