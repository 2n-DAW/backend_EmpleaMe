const authService = require("../services/companyProfile.service.js");
const asyncHandler = require('express-async-handler');



const getProfile = asyncHandler(async (req, res) => {
    const { status, result } = await authService.getProfile(req);
    return res.status(status).json(result);
});

const registerUser = asyncHandler(async (req, res) => {
    const { status, result } = await authService.registerUser(req.body);
    return res.status(status).json(result);
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const { status, result } = await authService.getCurrentUser(req.userEmail);
    return res.status(status).json(result);
});


module.exports = {
    getProfile,
    registerUser,
    getCurrentUser
}