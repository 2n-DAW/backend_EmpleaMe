const authService = require("../services/auth.service.js");
const asyncHandler = require('express-async-handler');



const userLogin = asyncHandler(async (req, res) => {
    const categories = await authService.userLogin(req.body);
    return res.status(200).json({ categories: categories });
});

const registerUser = asyncHandler(async (req, res) => {
    const categories = await authService.registerUser(req.body);
    return res.status(200).json({ categories: categories });
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const categories = await authService.updateUser(req.body);
    return res.status(200).json({ categories: categories });
});

const updateUser = asyncHandler(async (req, res) => {
    const categories = await authService.updateUser(req.body);
    return res.status(200).json({ categories: categories });
});


module.exports = {
    userLogin,
    registerUser,
    getCurrentUser,
    updateUser

}