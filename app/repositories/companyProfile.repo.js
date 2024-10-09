// REPOSITORIES: operaciones con la base de datos
const authModel = require('../models/auth.model.js');

// GET PROFILE
const getProfile  = async (data) => {
    return await authModel.findOne(data);
};

// FOLLOW A USER
const followUser = async (loginUser, user_id) => {
    loginUser.follow(user_id);
};

// UNFOLLOW A USER
const unFollowUser = async (loginUser, user_id) => {
    loginUser.unfollow(user_id);
};

module.exports = {
    getProfile ,
    followUser,
    unFollowUser
}
