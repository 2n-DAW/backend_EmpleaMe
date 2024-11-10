const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require("jsonwebtoken");

const ClientUserSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    username: {
        type: String,
        required: true,
        unique: true
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
    }
},
    {
        timestamps: true
    });

ClientUserSchema.plugin(uniqueValidator, { msg: "already taken" });

ClientUserSchema.methods.generateAccessToken = function(userType) {
    const accessToken = jwt.sign({
            "user": {
                "id": this.userId,
                "username": this.username,
                "email": this.email,
                "userType": userType
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );
    return accessToken;
};

ClientUserSchema.methods.generateRefreshToken = function(userType) {
    const refreshToken = jwt.sign({
            "user": {
                "id": this.userId,
                "username": this.username,
                "email": this.email,
                "userType": userType
            }
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
    );
    return refreshToken;
};

ClientUserSchema.methods.toClientUserResponse = function(accessToken) {
    return {
        username: this.username,
        email: this.email,
        bio: this.bio,
        image: this.image,
        token: accessToken
    }
};

module.exports = mongoose.model('ClientUser', ClientUserSchema);