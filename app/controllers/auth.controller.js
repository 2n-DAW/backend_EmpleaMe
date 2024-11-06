const authService = require("../services/auth.service.js");
const asyncHandler = require('express-async-handler');

const userType = asyncHandler(async (req, res) => {
    const { status, result } = await authService.userType(req.body);
    return res.status(status).json(result);
});

const clientUserLogin = asyncHandler(async (req, res) => {
    const { status, result } = await authService.clientUserLogin(req.body);
    return res.status(status).json(result);
});


const registerUser = asyncHandler(async (req, res) => {
    const { status, result } = await authService.registerUser(req.body);
    return res.status(status).json(result);
});


const getCurrentUser = asyncHandler(async (req, res) => {
    const { status, result } = await authService.getCurrentUser(req);
    return res.status(status).json(result);
});


const updateUser = asyncHandler(async (req, res) => {
    const { status, result } = await authService.updateUser(req);
    return res.status(status).json(result);
})


const logout = asyncHandler(async (req, res) => {
    const { status, result } = await authService.logout(req.accessToken);
    return res.status(status).json(result);
});

const userDelete = asyncHandler(async (req, res) => {
    const { status, result } = await authService.userDelete(req.params.username);
    return res.status(status).json(result);
});

const registerUserClient = asyncHandler(async (req, res) => {
    const { status, result } = await authService.registerUserClient(req.body);
    return res.status(status).json(result);
});


module.exports = {
    userType,
    clientUserLogin,
    registerUser,
    getCurrentUser,
    updateUser,
    logout,
    userDelete,
    registerUserClient
}
