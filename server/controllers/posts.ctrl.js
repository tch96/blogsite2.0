const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');
const cloudinary = require('cloudinary');

module.exports = {
    addPost: (req, res, next) => {
        let { text, title, likes, description } = req.body;
        if (req.files.image) {
            cloudinary.uploader.upload(req.files.image.path, (result)=> {
                let resObj = { text, title, likes, description, feature_img: result.url != null ? result.url: ''};
                savePost(resObj);
            }, {
                resource_type: 'image',
                eager: [
                    {effect: 'sepia'}
                ]
            })
        }
        else {
            savePost( {text, title, likes, description, feature_img: ''});
        }
        function savePost(obj) {
            new Post(obj).save((err, post) => {
                if (err) {
                    res.send(err);
                }
                else if (!post) {
                    res.send(400);
                }
                else {
                    return post.addAuthor(req.body.author_id).then((_post) => {
                        return res.send(_post);
                    });
                }
                next();
            });
        }
    },
    // params: post_id
    getAllPosts: (req, res, next) => {       
        Post.find({})
        .populate('author')
        .populate('comments.author')
        .exec(function (err, post) {
            if (err) {res.send(err);}
            else if (!post) {res.send(400);}
            else {
                res.send(post);
            }     
            next();
        })
    },
    // params: post_id
    likePost: (req, res, next) => {
        Post.findById(req.body.post_id).then((post) => {
            return post.like(req.body.like).then(()=> {
                return res.json({msg: "Liked!"});
            });
        }).catch(next);
    },
    // params: post_id
    commentPost: (req, res, next) => {
        console.log(req.body, 'body');
        Post.findById(req.body.post_id).then((post) => {
            if (!post) res.send(400);
            else {
                return post.comment({
                    author: req.body.author_id,
                    text: req.body.text
                }).then(() => {
                    return res.json({msg: "Commented!"});
                })
            }
        }).catch(next);
    },
    getPost: (req, res, next) => {
        Post.findById(req.params.id)
        .populate('author')
        .populate('comments.author')
        .exec((err, post) => {
            if (err) res.send(err);
            else if (!post) res.send(400);
            else res.send(post);
            next();
        })
    }
}