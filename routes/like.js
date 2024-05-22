const express = require('express');
const likeRouter = express.Router(); 
const Like = require('../models/likes');
const Constants = require('../service/constants');
const AppUtils = require('../service/utils');

likeRouter.get('/', async (req, res) => {
    const email = req.query.email;
    const postId = req.query._id;

    if (!email) {
        res.status(400).json(AppUtils.generateMissingFieldError(Constants.PARAM_MISSING));
        return;
    }

    try {
        let likeData = await Like.findOne({ email: email, postId: postId });

        if (!likeData) {
            likeData = await Like.create({
                email: email,
                postId: postId,
                like: true,
            });
            res.status(201).json({ message: true });
        } else {
            likeData.like = !likeData.like;
            await likeData.save();
            res.status(200).json({ message: likeData.like });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(Utils.generateError(err.code, err.message));
    }
});

module.exports = likeRouter;
