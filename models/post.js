const mongoose =require('mongoose');

const PostModel=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:String,
    content:String,
    like:Array(),
    comments:Array(),
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('posts',PostModel);