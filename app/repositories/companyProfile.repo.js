const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");

const getProfile = async (params) => {
    return await User.findOne(params);
};






module.exports = {
    getProfile
}