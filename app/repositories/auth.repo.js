const authModel = require('../models/auth.model.js');
const tokenModel = require('../models/token.model.js');
const blacklistModel = require('../models/blacklist.model.js');
const bcrypt = require('bcrypt');

// LOGIN
const userLogin = async (emailObject) => {
    return await authModel.findOne(emailObject);
};

// REGISTER
const registerUser = async (user) => {
    return await authModel.create(user);
};

// GET CURRENT USER
const getCurrentUser = async (emailObject) => {
    return await authModel.findOne(emailObject);
};

// UPDATE
const updateUser = async (emailObject, user) => {
    const updatedUser = await authModel.findOne(emailObject);
    
    if (updatedUser) {
        if (user.email) {
            updatedUser.email = user.email;
        }
        if (user.username) {
            updatedUser.username = user.username;
        }
        if (user.password) {
            const hashedPwd = await bcrypt.hash(user.password, 10);
            updatedUser.password = hashedPwd;
        }
        if (typeof user.image !== 'undefined') {
            updatedUser.image = user.image;
        }
        if (typeof user.bio !== 'undefined') {
            updatedUser.bio = user.bio;
        }
        return await updatedUser.save();
    }

    return null;
};

// FIND BY ID
const findById = async (id) => {
    const res = await authModel.findById(id);
    return res;
};

// SAVE TOKEN
const saveToken = async (refresh, access, userId) => {
    const storedToken = await tokenModel.findOne({ refreshToken: refresh });
    
    if (!storedToken) {
        newToken = new tokenModel({
            refreshToken: refresh,
            accessTokens: [{
                token: access,
                createdAt: new Date()
            }],
            user: userId
        });

        return await newToken.save();
    } 

    storedToken.accessTokens.push({
        token: access,
        createdAt: new Date()
    });

    return await storedToken.save();
};

// FIND ONE TOKEN
const findOneToken = async (access) => {
    return await tokenModel.findOne({ 'accessTokens.token': access }, { refreshToken: 1 });
};

// FIND IN BLACKLIST
const isBlacklisted = async (refresh) => {
    return await blacklistModel.findOne({ refreshToken: refresh });
};

// CREATE BLACKLIST TOKEN
const createBlacklistToken = async (refresh) => {
    return await blacklistModel.create({ refreshToken: refresh });
};

// DELETE REFRESH
const deleteOneRefresh = async (refresh) => {
    return await tokenModel.deleteOne({ refreshToken: refresh });
}
// FAVORITE
const favorite = async (user, jobId) => {

    return await user.favorite(jobId);
};

// UNFAVORITE
const unfavorite = async (user, jobId) => {
    return await user.unfavorite(jobId);
};


module.exports = {
    userLogin,
    registerUser,
    getCurrentUser,
    updateUser,
    findById,
    saveToken,
    findOneToken,
    isBlacklisted,
    createBlacklistToken,
    deleteOneRefresh,
    favorite,
    unfavorite
}
