const authModel = require('../models/auth.model.js');


const getProfile = async (data) => {
    return await authModel.findOne(data);
};


const followUser = async (loginUser, user_id) => {
    loginUser.follow(user_id);
};


const unFollowUser = async (loginUser, user_id) => {
    loginUser.unfollow(user_id);
};

const getUserFollowers = async (user, query) => {
    const { offset, limit } = query;
    return await authModel.find({ followingUsers: user._id }, {}, { skip: Number(offset), limit: Number(limit) });
};

const getUserFollowing = async (user, query) => {
    const { offset, limit } = query;
    return await authModel.find({ _id: { $in: user.followingUsers } }, {}, { skip: Number(offset), limit: Number(limit) });
};

module.exports = {
    getProfile,
    followUser,
    unFollowUser,
    getUserFollowers,
    getUserFollowing
}
