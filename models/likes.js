const mongoose =require('mongoose');

const LikeModel=new mongoose.Schema({
    email:{
        type:String,
    },
    postId:String,
    like:{
        type:Boolean,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('like',LikeModel);