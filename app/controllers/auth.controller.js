// CONTROLLERS: manejan las solicitudes HTTP, reciben las request y emiten la respuesta
const authService = require("../services/auth.service.js");

// EXPRESS-ASYNC-HANDLER captura los errores generados en operaciones asíncronas y los pasa al midleware de express
// no es necesario utilizar los try ... catch
const asyncHandler = require('express-async-handler');

// LOGIN
const userLogin = asyncHandler(async (req, res) => {
    const { status, result } = await authService.userLogin(req.body);
    return res.status(status).json(result);
});

// REGISTER
const registerUser = asyncHandler(async (req, res) => {
    const { status, result } = await authService.registerUser(req.body);
    return res.status(status).json(result);
});

// GET CURRENT USER
const getCurrentUser = asyncHandler(async (req, res) => {
    const { status, result } = await authService.getCurrentUser(req);
    return res.status(status).json(result);
});

// UPDATE
const updateUser = asyncHandler(async (req, res) => {
    const { status, result } = await authService.updateUser(req);
    return res.status(status).json(result);
})

// LOGOUT
const logout = asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    
    if (!authHeader?.startsWith('Token ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const accessToken  = authHeader.split(' ')[1];

    const { status, result } = await authService.logout(accessToken);
    return res.status(status).json(result);
});


module.exports = {
    userLogin,
    registerUser,
    getCurrentUser,
    updateUser,
    logout
}
