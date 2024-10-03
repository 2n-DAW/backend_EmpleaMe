// REPOSITORIES: operaciones con la base de datos
const authModel = require('../models/auth.model.js');
const bcrypt = require('bcrypt');

// LOGIN
const userLogin = async (emailObject) => {
    return await authModel.findOne(emailObject);
};

// REGISTER
const registerUser = async (user) => {
    return await authModel.create(user);
};

// GET CURRENT USER
const getCurrentUser = async (emailObject) => {
    return await authModel.findOne(emailObject);
};

// UPDATE
const updateUser = async (emailObject, user) => {
    const updatedUser = await authModel.findOne(emailObject);
    
    if (updatedUser) {
        if (user.email) {
            updatedUser.email = user.email;
        }
        if (user.username) {
            updatedUser.username = user.username;
        }
        if (user.password) {
            const hashedPwd = await bcrypt.hash(user.password, 10);
            updatedUser.password = hashedPwd;
        }
        if (typeof user.image !== 'undefined') {
            updatedUser.image = user.image;
        }
        if (typeof user.bio !== 'undefined') {
            updatedUser.bio = user.bio;
        }
        return await updatedUser.save();
    }

    return null;
};

// FIND BY ID
const findById = async (id) => {
    return await authModel.findById(id);
};

module.exports = {
    userLogin,
    registerUser,
    getCurrentUser,
    updateUser,
    findById
}
