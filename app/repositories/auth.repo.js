const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");

const userLogin = async (params) => {
    const { email } = params;
    const loginUser = await User.findOne({ email }).exec();
    return loginUser;
};

const registerUser = async (params) => {
    return await User.create(params);
};

const getCurrentUser = async (params) => {
    return await User.findOne(params);
};

const updateUser = async (params) => {
    return await User.findOne(params);
};

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

const hashPassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
};

module.exports = {
    userLogin,
    registerUser,
    getCurrentUser,
    updateUser,
    comparePassword,
    hashPassword
}