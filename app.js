const express =require('express')
const app = express()


app.get("/",(req,res)=>{
    // res.send("hello world from saga saru magar .")
    res.json({
        message:"hello world."
    })
})

// about
app.get("/about",(req,res)=>{
    res.json({
        message:"This is about."
    })
})


app.listen(3000,()=>{
    console.log("NodeJs project has started.")
})
