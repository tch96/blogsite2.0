const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema ({
    name: String,
    email: {type: String,  unique:true},
    token: String,
    provider: String,
    provider_id: String,
    provider_img: String,
    subscribedTo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    subscribers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

UserSchema.methods.subscribeTo = function(user_id) {
    if (this.subscribedTo.indexOf(user_id) === -1) {
        this.subscribedTo.push(user_id);
    }
    return this.save()
}

UserSchema.methods.unsubTo = function(user_id) {
    let index = this.subscribedTo.indexOf(user_id);
    if (index > -1) {
        this.subscribedTo.splice(index,1);
    }
    return this.save()
}

UserSchema.methods.addSubscriber = function(sub_id) {
    if (this.subscribers.indexOf(sub_id) === -1) {
        this.subscribers.push(sub_id);
    }
    return this.save()
}

UserSchema.methods.removeSubscriber = function(sub_id) {
    let index = this.subscribers.indexOf(sub_id);
    if (index > -1) {
        this.subscribers.splice(index,1);
    }
    return this.save()
}

module.exports = mongoose.model('User', UserSchema);