// CONTROLLERS: manejan las solicitudes HTTP, reciben las request y emiten la respuesta
const companyProfileService = require("../services/companyProfile.service.js");

// EXPRESS-ASYNC-HANDLER captura los errores generados en operaciones asíncronas y los pasa al midleware de express
// no es necesario utilizar los try ... catch
const asyncHandler = require('express-async-handler');

// GET PROFILE
const getProfile = asyncHandler(async (req, res) => {
    const { status, result } = await companyProfileService.getProfile(req);
    return res.status(status).json(result);
});

// FOLLOW A USER
const followUser = asyncHandler(async (req, res) => {
    const { status, result } = await companyProfileService.followUser(req);
    return res.status(status).json(result);
});

// UNFOLLOW A USER
const unFollowUser = asyncHandler(async (req, res) => {
    const { status, result } = await companyProfileService.unFollowUser(req);
    return res.status(status).json(result);
})

module.exports = {
    getProfile,
    followUser,
    unFollowUser
}
