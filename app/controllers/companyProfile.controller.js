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
});

const getUserJobs = asyncHandler(async (req, res) => {
    const { status, result } = await companyProfileService.getUserJobs(req);
    return res.status(status).json(result);
});

const getUserLikes = asyncHandler(async (req, res) => {
    const { status, result } = await companyProfileService.getUserLikes(req);
    return res.status(status).json(result);
});

const getUserFollowers = asyncHandler(async (req, res) => {
    const { status, result } = await companyProfileService.getUserFollowers(req);
    return res.status(status).json(result);
});

const getUserFollowing = asyncHandler(async (req, res) => {
    const { status, result } = await companyProfileService.getUserFollowing(req);
    return res.status(status).json(result);
});

const getProfileByEmail = asyncHandler(async (req, res) => {
    const { status, result } = await companyProfileService.getProfileByEmail(req);
    return res.status(status).json(result);
});

module.exports = {
    getProfile,
    followUser,
    unFollowUser,
    getUserJobs,
    getUserLikes,
    getUserFollowers,
    getUserFollowing,
    getProfileByEmail
}
