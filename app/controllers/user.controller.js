const userService = require("../services/user.service.js");
const asyncHandler = require('express-async-handler');



const userLogin = asyncHandler(async (req, res) => {
    const categories = await userService.userLogin(req.body);
    return res.status(200).json({ categories: categories });
});

const registerUser = asyncHandler(async (req, res) => {
    const categories = await userService.registerUser(req.body);
    return res.status(200).json({ categories: categories });
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const categories = await userService.updateUser(req.body);
    return res.status(200).json({ categories: categories });
});

const updateUser = asyncHandler(async (req, res) => {
    const categories = await userService.updateUser(req.body);
    return res.status(200).json({ categories: categories });
});


module.exports = {
    userLogin,
    registerUser,
    getCurrentUser,
    updateUser

}