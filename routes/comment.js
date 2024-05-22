const express = require('express');
const commentRouter = express.Router(); 
const Comment = require('../models/comments');
const Constants = require('../service/constants');
const AppUtils = require('../service/utils');


commentRouter.post('/',async(req,res)=>{
    const request=req.body;

    if(AppUtils.checkError(request,Constants.COMMENT_REQUEST)){
        res.status(400).json(AppUtils.checkError(request,Constants.COMMENT_REQUEST))
        return;
    }
    try {
        await Comment.create({
            name:request.name,
            comment:request.comment,
            postId:request.postId
        })
        res.status(200).json(AppUtils.generateSuccess("COMMENT ADDED","Comment added successfully"));

    } catch (error) {
        res.status(500).json(AppUtils.generateError(error.code,error.message))
    }
})

commentRouter.get('/',async(req,res)=>{
    const postId=req.query.postId;
    
    if(!postId){
        res.status(400).json(AppUtils.generateMissingFieldError(Constants.POSTID))
        return;
    }
    try {

        const data=await Comment.find({postId:postId})
        if(data){
            res.status(200).json(data);
        }
        else{
            res.status(400).json(AppUtils.generateError("COMMENT UNAVAILABLE","Comment not found"));
        }

    } catch (error) {
        res.status(500).json(AppUtils.generateError(error.code,error.message))
    }
})


module.exports=commentRouter