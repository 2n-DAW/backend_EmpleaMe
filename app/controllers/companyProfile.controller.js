const companyProfileService = require("../services/companyProfile.service.js");
const asyncHandler = require('express-async-handler');


const getProfile = asyncHandler(async (req, res) => {
    const { status, result } = await companyProfileService.getProfile(req);
    return res.status(status).json(result);
});


const followUser = asyncHandler(async (req, res) => {
    const { status, result } = await companyProfileService.followUser(req);
    return res.status(status).json(result);
});


const unFollowUser = asyncHandler(async (req, res) => {
    const { status, result } = await companyProfileService.unFollowUser(req);
    return res.status(status).json(result);
})

module.exports = {
    getProfile,
    followUser,
    unFollowUser
}
