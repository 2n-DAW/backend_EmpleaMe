// CONTROLLERS: manejan las solicitudes HTTP, reciben las request y emiten la respuesta
const authService = require("../services/auth.service.js");
// EXPRESS-ASYNC-HANDLER captura los errores generados en operaciones asíncronas y los pasa al midleware de express
// no es necesario utilizar los try ... catch
const asyncHandler = require('express-async-handler');

// LOGIN
const userLogin = asyncHandler(async (req, res) => {
    const loginUser = await authService.userLogin(req.body);

    return res.status(200).json(loginUser)
});

// REGISTER
const registerUser = asyncHandler(async (req, res) => {
    const newUser = await authService.registerUser(req.body);

    return res.status(201).json(newUser)
});

// GET CURRENT USER
const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await authService.getCurrentUser(req);

    return res.status(200).json({ currentUser: user });
});

// UPDATE
const updateUser = asyncHandler(async (req, res) => {
    const updatedUser = await authService.updateUser(req, req.body);

    res.status(200).json(updatedUser);
})

module.exports = {
    userLogin,
    registerUser,
    getCurrentUser,
    updateUser
}
