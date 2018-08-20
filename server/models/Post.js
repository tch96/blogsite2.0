const mongoose = require('mongoose');

let PostSchema = new mongoose.Schema ({
    text: String,
    title: String,
    description: String,
    feature_img: String,
    likes: Number,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            text: String,
            author: {
                type:mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ]
});

PostSchema.methods.like = function(like) {
    like? this.likes++: this.likes--;
    return this.save() 
}

PostSchema.methods.addAuthor = function (author_id) {
    this.author = author_id
    return this.save()
}

PostSchema.methods.comment = function(comment) {
    this.comments.push(comment)
    return this.save()
}

PostSchema.methods.fetchUserPosts = function (user_id) {
    Article.find({'author': user_id}).then((article) => {
        return article
    })
}

module.exports = mongoose.model('Post', PostSchema);