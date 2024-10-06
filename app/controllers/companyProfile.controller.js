// CONTROLLERS: manejan las solicitudes HTTP, reciben las request y emiten la respuesta
const companyProfileService = require("../services/companyProfile.service.js");
// EXPRESS-ASYNC-HANDLER captura los errores generados en operaciones asíncronas y los pasa al midleware de express
// no es necesario utilizar los try ... catch
const asyncHandler = require('express-async-handler');

// GET PROFILE
const getProfile = asyncHandler(async (req, res) => {
    const user = await companyProfileService.getProfile(req, req.params);

    return res.status(200).json({profile: user})
});

// FOLLOW A USER
const followUser = asyncHandler(async (req, res) => {
    const followUser = await companyProfileService.followUser(req, req.params);

    return res.status(200).json(followUser)
});

// UNFOLLOW A USER
const unFollowUser = asyncHandler(async (req, res) => {
    const unFollowUser = await companyProfileService.unFollowUser(req, req.params);

    return res.status(200).json(unFollowUser);
})

module.exports = {
    getProfile,
    followUser,
    unFollowUser
}
