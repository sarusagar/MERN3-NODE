const mongoose = require('mongoose')
const Schema =mongoose.Schema

const blogSchema = new Schema({
    title:{
        type: String
    },

    subtitle :{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    }
})

const Blog = mongoose.model('Blog',blogSchema)
module.exports = Blog

// to pushch the code
// you just type 
// git add .
// git commit -m "add blogSchema"
// git push