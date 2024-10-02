const authModel = require("../models/auth.model.js");

const userLogin = async () => {
    return await authModel.find();
};

const registerUser = async (params) => {
    return await authModel.findOne(params);
};

const getCurrentUser = async (params) => {
    return await authModel.findOne(params);
};

const updateUser = async (params) => {
    return await authModel.findOne(params);
};

module.exports = {
    userLogin,
    registerUser,
    getCurrentUser,
    updateUser
}