const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: "https://static.productionready.io/images/smiley-cyrus.jpg"
    },
    userType: {
        type: String,
        required: true,
        enum: ['client', 'company', 'recruiter'],
        default: 'client'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    favouriteJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    followingUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},
    {
        timestamps: true
    });

UserSchema.plugin(uniqueValidator, { msg: "already taken" });

UserSchema.methods.toUserResponse = function() {
    return {
        email: this.email,
        userType: this.userType
    }
};

UserSchema.methods.toProfileJSON = function (user) {
    const isFollowing = user && user instanceof mongoose.model('User') && user.isFollowing(this._id);
    return {
        username: this.username,
        bio: this.bio,
        image: this.image,
        following: isFollowing || false
    }
};

UserSchema.methods.isFollowing = function (id) {
    const idStr = id.toString();
    for (const followingUser of this.followingUsers) {
        if (followingUser.toString() === idStr) {
            return true;
        }
    }
    return false;
};

UserSchema.methods.follow = function (id) {
    if(this.followingUsers.indexOf(id) === -1){
        this.followingUsers.push(id);
    }
    return this.save();
};

UserSchema.methods.unfollow = function (id) {
    if(this.followingUsers.indexOf(id) !== -1){
        this.followingUsers.remove(id);
    }
    return this.save();
};

UserSchema.methods.isFavourite = function (id) {
    const idStr = id.toString();
    for (const job of this.favouriteJobs) {
        if (job.toString() === idStr) {
            return true;
        }
    }
    return false;
}

UserSchema.methods.favorite = function (id) {
    if(this.favouriteJobs.indexOf(id) === -1){
        this.favouriteJobs.push(id);
    }

    return this.save();
}

UserSchema.methods.unfavorite = function (id) {
    if(this.favouriteJobs.indexOf(id) !== -1){
        this.favouriteJobs.remove(id);
    }

    return this.save();
};

module.exports = mongoose.model('User', UserSchema);