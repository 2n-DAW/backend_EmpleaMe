const userModel = require("../models/user.model.js");

const userLogin = async () => {
    return await userModel.find();
};

const registerUser = async (params) => {
    return await userModel.findOne(params);
};

const getCurrentUser = async (params) => {
    return await userModel.findOne(params);
};

const updateUser = async (params) => {
    return await userModel.findOne(params);
};

module.exports = {
    userLogin,
    registerUser,
    getCurrentUser,
    updateUser
}