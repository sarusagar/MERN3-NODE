require('dotenv').config()
const express =require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')

const app = express()
app.use(express.json())
const {multer,storage} =require('./middleware/multerConfig')
const uplaod = multer({storage:storage})
const fs = require('fs')
const cors= require('cors')

app.use(cors(
    {
    origin:["http://localhost:4000","https://mern-3-node-front.vercel.app"],
    optionsSuccessStatus: 200 

}
))


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
    console.log(req.file)
    const {title,subtitle,description} = req.body
    let filename;
    if(req.file){
    filename ="https://mern-3-node-front.vercel.app/" + req.file.filename
    }else{
        filename ="https://i.ndtvimg.com/i/2015-08/happy-smiley_650x400_61439186708.jpg"
    }
    

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

app.get("/blog/:id",async(req,res)=>{
        // console.log(req.params.id)
        const id = req.params.id
        const blog = await Blog.findById(id) //object 

    if(!blog){
            return res.status(404).json({
                message:"Data not found."
            })
        }
        res.status(200).json({
            message:"Data found.",
            data:blog
        })
})

app.delete("/blog/:id", async(req,res)=>{
    const id=req.params.id
    const blog =  await Blog.findById(id)
    const imageName = blog.image

    fs.unlink(`storage/${imageName}`,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("file deleted successfully.")
        }
    })
    await Blog.findByIdAndDelete(id)
    res.status(200).json({
        message:"Blog deleted Successfully."
    })
})

app.patch('/blog/:id',uplaod.single('image'), async(req,res)=>{
    const id = req.params.id
    const {title,subtitle,description} = req.body
    let imageName;

    if(req.file){
        imageName="https://mern-3-node-front.vercel.app/" +req.file.filename
        const blog = await Blog.findById(id)
        const oldimageName =blog.image

        fs.unlink(`storage/${oldimageName}`,(err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("File deleted successfully.")
            }
        })
    }
     await Blog.findByIdAndUpdate(id,{
        title : title,
        subtitle : subtitle,
        description : description,
        image : imageName
    })
    res.status(200).json({
        message:"Blog updated successfully."
    })

})


app.use(express.static('./storage'))


app.listen(process.env.PORT,()=>{
    console.log("NodeJs project has started.")
})


// mongodb+srv://sagarsaru:<db_password>@cluster0.kavlcph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0