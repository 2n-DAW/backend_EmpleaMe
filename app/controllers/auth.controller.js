const authService = require("../services/auth.service.js");
const asyncHandler = require('express-async-handler');



const userLogin = asyncHandler(async (req, res) => {
    const result = await authService.userLogin(req.body);
    return res.status(201).json(result);
});

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const result = await authService.registerUser(req.body);

    return res.status(201).json(result);
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const result = await authService.updateUser(req.body);
    return res.status(201).json(result);
});

const updateUser = asyncHandler(async (req, res) => {
    const result = await authService.updateUser(req.body);
    return res.status(201).json(result);
});


module.exports = {
    userLogin,
    registerUser,
    getCurrentUser,
    updateUser

}