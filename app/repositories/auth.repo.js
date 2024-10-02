const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");

const userLogin = async (params) => {
    const { email } = params;
    return await User.findOne({ email });
};

const registerUser = async (params) => {
    return await User.create(params);
};

const getCurrentUser = async (email) => {
    return await User.findOne({ email });
};

const updateUser = async (params) => {
    return await params.save();
};

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

const hashPassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
};

const findOneUser = async (params) => {
    return await User.findOne(params);
};

module.exports = {
    userLogin,
    registerUser,
    getCurrentUser,
    updateUser,
    comparePassword,
    hashPassword,
    findOneUser
}