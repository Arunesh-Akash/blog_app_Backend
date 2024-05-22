const express = require('express');
const postRouter = express();
const Post = require('../models/post')
const Like = require('../models/likes');
const Constants = require('../service/constants')
const Utils = require('../service/utils')
const multer = require('multer');
const path = require('path');


postRouter.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


postRouter.post('/', upload.single('image'), async (req, res) => {
    const request = req.body
    const image = req.file ? `/uploads/${req.file.filename}` : null

    if (Utils.checkError(request, Constants.BLOG_REQUEST)) {
        res.status(400).json(Utils.checkError(request, Constants.BLOG_REQUEST));
        return;
    }
    try {

        await Post.create({
            email: request.email,
            name: request.name,
            content: request.content,
            image: image
        })

        res.status(200).json(Utils.generateSuccess('BLOG ADDED', 'Blog posted successfully'))

    } catch (err) {
        res.status(500).json(Utils.generateError(err.code, err.message))
    }

});

postRouter.get('/all', async (req, res) => {
    const email = req.query.email;
    try {
        const posts = await Post.find();
        const likes = await Like.find({ email });

        const postsWithLikes = posts.map(post => {
            const liked = likes.some(like => like.postId.toString() === post._id.toString() && like.like);
            return { ...post.toObject(), liked };
        });

        res.status(200).json(postsWithLikes);
    }
    catch (err) {
        res.status(500).json(Utils.generateError(err.code, err.message))
    }
});




module.exports = postRouter