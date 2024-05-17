const express = require('express');
const postRouter = express();
const Post = require('../models/post')
const Constants = require('../service/constants')
const Utils = require('../service/utils')

postRouter.post('/', async (req, res) => {
    const request = req.body

    if (Utils.checkError(request, Constants.BLOG_REQUEST)) {
        res.status(400).json(Utils.checkError(request, Constants.BLOG_REQUEST));
        return;
    }
    try {

        await Post.create({
            email: request.email,
            name:request.name,
            content: request.content
        })

        res.status(200).json(Utils.generateSuccess('BLOG ADDED', 'Blog posted successfully'))

    } catch (err) {
        res.status(500).json(Utils.generateError(err.code, err.message))
    }

});

postRouter.get('/all', async (req, res) => {
    try {
        const postData = await Post.find({});
        res.status(200).json(postData);
    }
    catch (err) {
        res.status(500).json(Utils.generateError(err.code, err.message))
    }
});










module.exports = postRouter