const User = require('./../models/User')
const Post = require('./../models/Post')
const _ = require('lodash');

module.exports = {
    addUser: (req, res, next) => {
        User.findOne({'email': req.body.email})
        .populate('subscribers', '_id')
        .populate('subscribedTo', '_id')
        .exec((err, user) => {
            console.log(user, "user");
            if (err) res.send(err);
            else if (!_.isEmpty(user)) {
                console.log(user, "return user");
                res.send(user);
                next()
            }
            else {
                console.log("user is undefined!");
                new User(req.body).save((err, newUser) => {
                    if (err)
                        res.send(err)
                    else if (!newUser)
                        res.send(400)
                    else {
                        console.log(newUser, "new user");
                        res.send(newUser)
                    }
                    next()
                });
            }
        })
    },
    // params: id
    getUser: (req, res, next) => {
        User.findById(req.params.id).then
        ((err, user)=> {
            if (err)
                res.send(err)
            else if (!user)
                res.send(404)
            else
                res.send(user)
            next()            
        })
    },
    // params: id (current user), user_id (user to be subscribed to)
    subscribeToUser: (req, res, next) => {
        User.findById(req.body.id).then((user) => {
            User.findById(req.body.user_id).then((userToSub) => {
                userToSub.addSubscriber(req.body.id);
                return user.subscribeTo(req.body.user_id).then(() => {
                    return res.json({msg: "subscribed"})
                })
            })
        }).catch(next)
    },
    unsubToUser: (req, res, next) => {
        User.findById(req.body.id).then((user)=> {
            User.findById(req.body.user_id).then((userToUnsub) => {
                userToUnsub.removeSubscriber(req.body.id);
                return user.unsubTo(req.body.user_id).then(()=> {
                    return res.json({msg: "unsubscribed"})
                })
             })
        }).catch(next)
    },
    // params: id (current user)
    getUserProfile: (req, res, next) => {
        User.findById(req.params.id)
        .populate('subscribedTo', 'name provider_img')
        .populate('subscribers', 'name provider_img')
        .exec(function (err, user) {
            if (err) {res.send(err);}
            else if (!user) {res.send(400);}
            else {
                return Post.find({'author': req.params.id}).then((_posts)=> {
                    return res.json({ user: user, posts: _posts })
                })
            }
            next()
        })
    }
}