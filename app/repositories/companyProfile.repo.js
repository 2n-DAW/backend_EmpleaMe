const authModel = require('../models/auth.model.js');


const getProfile  = async (data) => {
    return await authModel.findOne(data);
};


const followUser = async (loginUser, user_id) => {
    loginUser.follow(user_id);
};


const unFollowUser = async (loginUser, user_id) => {
    loginUser.unfollow(user_id);
};

module.exports = {
    getProfile ,
    followUser,
    unFollowUser,
}
