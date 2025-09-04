require('dotenv').config()
const express =require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')
const app = express()
app.use(express.json())

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

app.post("/blog",async(req,res)=>{
    // const title = req.body.title
    // const subtitle = req.body.subtitle
    // const description = req.body.description
    // const image = req.body.image

    const {title,subtitle,description,image} = req.body
    await Blog.create({
        title : title,
        subtitle : subtitle,
        description : description,
        image :image
    })

    res.status(200).json({
        message:"Blog API hit Successfully."
    })
})


app.listen(process.env.PORT,()=>{
    console.log("NodeJs project has started.")
})


// mongodb+srv://sagarsaru:<db_password>@cluster0.kavlcph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0