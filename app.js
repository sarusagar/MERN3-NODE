require('dotenv').config()
const express =require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')

const app = express()
app.use(express.json())
const {multer,storage} =require('./middleware/multerConfig')
const uplaod = multer({storage:storage})

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

app.post("/blog",uplaod.single('image'), async(req,res)=>{
    // console.log(req.body)
    console.log(req.file)
    // const title = req.body.title
    // const subtitle = req.body.subtitle
    // const description = req.body.description
    // const image = req.body.image or

    const {title,subtitle,description} = req.body
    const filename =req.file.filename

    if(!title || !subtitle || !description){
        return res.status(400).json({
            message :"Please provide title,subtitle, & description."
        })
    }

    await Blog.create({ 
        title : title,
        subtitle : subtitle,
        description : description,
        image : filename
    })

    res.status(200).json({
        message:"Blog API hit Successfully."
    })
})

app.get("/blog", async(req,res)=>{
    const blogs = await Blog.find()
    res.status(200).json({
        message:"Blogs fetched data successfully.", // return array
        data:blogs
    })
})

app.use(express.static('./storage'))


app.listen(process.env.PORT,()=>{
    console.log("NodeJs project has started.")
})


// mongodb+srv://sagarsaru:<db_password>@cluster0.kavlcph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0