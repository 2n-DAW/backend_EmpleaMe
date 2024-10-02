const authService = require("../services/companyProfile.service.js");
const asyncHandler = require('express-async-handler');



const getProfile = asyncHandler(async (req, res) => {
    const { status, result } = await authService.getProfile(req);
    return res.status(status).json(result);
});

const followUser = asyncHandler(async (req, res) => {
    const { status, result } = await authService.followUser(req);
    return res.status(status).json(result);
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const { status, result } = await authService.getCurrentUser(req.userEmail);
    return res.status(status).json(result);
});


module.exports = {
    getProfile,
    followUser,
    getCurrentUser
}