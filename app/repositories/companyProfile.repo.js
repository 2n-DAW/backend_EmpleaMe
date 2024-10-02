const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");

const getProfile = async (params) => {
    return await User.findOne(params);
};

const followUser = async (loginUser, user_id) => {
    loginUser.follow(user_id);
};






module.exports = {
    getProfile,
    followUser
}