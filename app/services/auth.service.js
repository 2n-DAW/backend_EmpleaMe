// SERVICES: toda la lógica de negocio
const authRepo = require('../repositories/auth.repo.js');
const { resp } = require("../utils/utils.js");
const bcrypt = require('bcrypt');

// LOGIN
const userLogin = async (data) => {
    const { user } = data;

    // confirm data
    if (!user || !user.email || !user.password) {
        return resp(400, { message: "Todos los campos son necesarios" });
    }

    const loginUser = await authRepo.userLogin({ email: user.email });

    if (!loginUser) return resp(404, { message: "Usuario no encontrado" });

    const match = await bcrypt.compare(user.password, loginUser.password);

    if (!match) return resp(401, { message: "Contraseña inválida" });

    const accessToken = await loginUser.generateAccessToken();
    const refreshToken = await loginUser.generateRefreshToken();

    // Guarda el refreshToken en la base de datos junto el idUser
    await authRepo.saveToken(refreshToken, accessToken, loginUser._id);

    const res = loginUser.toAuthResponse(accessToken);
    return resp(200, { user: res });
};

// REGISTER
const registerUser = async (data) => {
    const { user } = data;

    // confirm data
    if (!user || !user.email || !user.username || !user.password) {
        return resp(400, { message: "Todos los campos son necesarios" });
    }

    // hash password
    const hashedPwd = await bcrypt.hash(user.password, 10);

    const userObject = {
        "username": user.username,
        "password": hashedPwd,
        "email": user.email
    };

    const newUser = await authRepo.registerUser(userObject);

    if (newUser) {
        return resp(201, { user: newUser.toAuthResponse() });
    } else {
        return resp(400, { message: "Registro de usuario fallido" });
    }
};

// GET CURRENT USER
const getCurrentUser = async (req) => {
    const email = req.userEmail;
    const accessToken = req.token;

    const user = await authRepo.getCurrentUser({ email });

    if (!user) return { status: 404, result: { message: "Usuario no encontrado" } };

    return resp(200, { currentUser: user.toAuthResponse(accessToken) });
};

// UPDATE
const updateUser = async (req) => {
    const { user } = req.body;

    // confirm data
    if (!user) return resp(400, { message: "Usuario necesario" });

    const email = req.userEmail;

    const updatedUser = await authRepo.updateUser({ email }, user);

    if (!updatedUser) return resp(404, { message: "Usuario no encontrado" });

    return resp(200, { user: updatedUser.toAuthResponse() });
};

// LOGOUT
const logout = async (accessToken) => {
    const refreshTokenFinded = await authRepo.findOneToken(accessToken);
    const refreshToken =refreshTokenFinded.refreshToken;

    if (!refreshToken) return { status: 404, result: { message: "Tokens no encontrados" } };

    await authRepo.createBlacklistToken(refreshToken);
    await authRepo.deleteOneRefresh(refreshToken);

    return resp(200, { message: 'Deslogeado correctamente' });
};

module.exports = {
    userLogin,
    registerUser,
    getCurrentUser,
    updateUser,
    logout
}
