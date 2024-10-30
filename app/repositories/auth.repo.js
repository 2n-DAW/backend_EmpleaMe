const userModel = require('../models/user.model.js');
const clientUserModel = require('../models/clientUser.model.js');
const tokenModel = require('../models/token.model.js');
const blacklistModel = require('../models/blacklist.model.js');
const bcrypt = require('bcrypt');

// USER TYPE
const userType = async (emailObject) => {
    return await userModel.findOne(emailObject);
};

// LOGIN
const clientUserLogin = async (emailObject) => {
    return await clientUserModel.findOne(emailObject);
};

// REGISTER USER
const registerUser = async (user) => {
    return await userModel.create(user);
};

// REGISTER CLIENT USER
const registerClientUser = async (clientUser) => {
    console.log("sdfasdfsdafsadf", clientUser);
    return await clientUserModel.create(clientUser);
};

// GET CURRENT USER
const getCurrentUser = async (idObject) => {
    return await clientUserModel.findOne(idObject);
};

// UPDATE USER
const updateUser = async (idObject, user) => {
    const updatedUser = await userModel.findById(idObject);
    
    if (updatedUser) {
        if (user.username) updatedUser.username = user.username;
        if (user.email) updatedUser.email = user.email;
        if (user.password) updatedUser.password = await bcrypt.hash(user.password, 10);
        return await updatedUser.save();
    }

    return null;
};

// UPDATE USER CLIENT
const updateClientUser = async (idObject, user) => {
    const updatedClientUser = await clientUserModel.findOne(idObject);
    
    if (updatedClientUser) {
        if (user.username) updatedClientUser.username = user.username;
        if (user.email) updatedClientUser.email = user.email;
        if (typeof user.bio !== 'undefined') updatedClientUser.bio = user.bio;
        if (typeof user.image !== 'undefined') updatedClientUser.image = user.image;
        return await updatedClientUser.save();
    }

    return null;
};

// FIND BY ID
const findById = async (id) => {
    return await userModel.findById(id);
};

// FIND ONE
const findOne = async (data) => {
    return await clientUserModel.findOne(data);
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

const userDelete = async (username) => {
    return await userModel.findOneAndDelete({ username });
};


module.exports = {
    userType,
    clientUserLogin,
    registerUser,
    registerClientUser,
    getCurrentUser,
    updateUser,
    updateClientUser,
    findById,
    findOne,
    saveToken,
    findOneToken,
    isBlacklisted,
    createBlacklistToken,
    deleteOneRefresh,
    favorite,
    unfavorite,
    userDelete
}
