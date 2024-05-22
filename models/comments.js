const mongoose=require('mongoose');

const CommentSchema=new mongoose.Schema({
    name:String,
    postId:String,
    comment:String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('comments',CommentSchema);