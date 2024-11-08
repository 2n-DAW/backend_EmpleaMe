const userModel = require('../models/user.model.js');
const clientUserModel = require('../models/clientUser.model.js');


const getUserProfile = async (data) => {
    return await userModel.findOne(data);
};

const getClientProfile = async (data) => {
    return await clientUserModel.findOne(data);
};

const followUser = async (loginUser, user_id) => {
    loginUser.follow(user_id);
};

const unFollowUser = async (loginUser, user_id) => {
    loginUser.unfollow(user_id);
};

const getUserFollowers = async (user, query) => {
    // Buscamos followers en User
    const { offset, limit } = query;
    const followerUsers  = await userModel.find({ followingUsers: user._id }, {}, { skip: Number(offset), limit: Number(limit) });
    // Extraemos los ids de los followers en User
    const followerUserIds = followerUsers.map(follower => follower._id);
    // Buscamos esos ids en ClientUser
    const followerClientUsers = await clientUserModel.find({ userId: { $in: followerUserIds } }).select('userId image bio');
    // Añadimos al objeto followerUsers los campos image y bio de followerClientUsers
    const result = followerUsers.map(follower => {
        const followerData = follower._doc
        const user = followerUsers.find(cu => cu._id.toString() === follower._id.toString());
        return { ...followerData, image: user.image, bio: user.bio };
    });
    return result;
};

const getUserFollowing = async (user, query) => {
    // Buscamos followings en User
    const { offset, limit } = query;
    const followingUsers = await userModel.find({ _id: { $in: user.followingUsers } }, {}, { skip: Number(offset), limit: Number(limit) });
    // Extraemos los ids de los followings en User
    const followingUserIds = followingUsers.map(following => following._id);
    // Buscamos esos ids en follower
    const followerUser = await userModel.find({ _id: { $in: followingUserIds } }).select('userId image bio');
    // Añadimos al objeto followingUsers los campos image y bio de followerUsers
    const result = followingUsers.map(following => {
        const followingData = following._doc
        const followerData = followerUser.find(cu => cu._id.toString() === following._id.toString());
        return { ...followingData, image: followerData.image, bio: followerData.bio };
    });
    return result;
};

module.exports = {
    getUserProfile,
    getClientProfile,
    followUser,
    unFollowUser,
    getUserFollowers,
    getUserFollowing
}
