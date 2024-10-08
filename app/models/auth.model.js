const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require("jsonwebtoken");

const AuthSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    bio: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: "https://static.productionready.io/images/smiley-cyrus.jpg"
    },
    // favouriteArticles: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Article'
    // }],
    followingUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},
    {
        timestamps: true
    });

AuthSchema.plugin(uniqueValidator, { msg: "already taken" });

// @desc generate access token for a user
// @required valid email and password
AuthSchema.methods.generateAccessToken = function() {
    const accessToken = jwt.sign({
            "user": {
                "id": this._id,
                "username": this.username,
                "email": this.email,
                "password": this.password
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );
    return accessToken;
}

AuthSchema.methods.generateRefreshToken = function() {
    const refreshToken = jwt.sign({
            "user": {
                "id": this._id,
                "username": this.username,
                "email": this.email,
                "password": this.password
            }
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
    );
    return refreshToken;
}

AuthSchema.methods.toAuthResponse = function(accessToken) {
    return {
        username: this.username,
        email: this.email,
        bio: this.bio,
        image: this.image,
        token: accessToken
    }
};

AuthSchema.methods.toProfileJSON = function (user) {
    return {
        username: this.username,
        bio: this.bio,
        image: this.image,
        following: user ? user.isFollowing(this._id) : false
    }
};

AuthSchema.methods.isFollowing = function (id) {
    const idStr = id.toString();
    for (const followingUser of this.followingUsers) {
        if (followingUser.toString() === idStr) {
            return true;
        }
    }
    return false;
};

AuthSchema.methods.follow = function (id) {
    if(this.followingUsers.indexOf(id) === -1){
        this.followingUsers.push(id);
    }
    return this.save();
};

AuthSchema.methods.unfollow = function (id) {
    if(this.followingUsers.indexOf(id) !== -1){
        this.followingUsers.remove(id);
    }
    return this.save();
};

// AuthSchema.methods.isFavourite = function (id) {
//     const idStr = id.toString();
//     for (const article of this.favouriteArticles) {
//         if (article.toString() === idStr) {
//             return true;
//         }
//     }
//     return false;
// }

// AuthSchema.methods.favorite = function (id) {
//     if(this.favouriteArticles.indexOf(id) === -1){
//         this.favouriteArticles.push(id);
//     }

//     // const article = await Article.findById(id).exec();
//     //
//     // article.favouritesCount += 1;
//     //
//     // await article.save();

//     return this.save();
// }

// AuthSchema.methods.unfavorite = function (id) {
//     if(this.favouriteArticles.indexOf(id) !== -1){
//         this.favouriteArticles.remove(id);
//     }

//     // const article = await Article.findById(id).exec();
//     //
//     // article.favouritesCount -= 1;
//     //
//     // await article.save();

//     return this.save();
// };

module.exports = mongoose.model('Auth', AuthSchema);