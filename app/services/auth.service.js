// SERVICES: toda la lógica de negocio
const authRepo = require('../repositories/auth.repo.js');
const bcrypt = require('bcrypt');

// LOGIN
const userLogin = async (data) => {
    const { user } = data;

    // confirm data
    if (!user || !user.email || !user.password) {
        return { message: "Todos los campos son necesarios" };
    }

    const loginUser = await authRepo.userLogin({ email: user.email });

    if (!loginUser) {
        return { message: "Usuario no encontrado" };
    }

    const match = await bcrypt.compare(user.password, loginUser.password);

    if (!match) return { message: 'Contraseña no autorizada' };

    const accessToken = await loginUser.generateAccessToken();
    const refreshToken = await loginUser.generateRefreshToken();

    // Guarda el refreshToken en la base de datos junto el idUser
    await authRepo.saveToken(refreshToken, accessToken, loginUser._id);

    return await loginUser.toAuthResponse(accessToken);
};

// REGISTER
const registerUser = async (data) => {
    const { user } = data;

    // confirm data
    if (!user || !user.email || !user.username || !user.password) {
        return { message: "Todos los campos son necesarios" };
    }

    // hash password
    const hashedPwd = await bcrypt.hash(user.password, 10); // salt rounds

    const userObject = {
        "username": user.username,
        "password": hashedPwd,
        "email": user.email
    };

    const newUser = await authRepo.registerUser(userObject);

    if (newUser) { // user object created successfully
        return await newUser.toAuthResponse();
    } else {
        return { message: "Registro deshabilitado" };
    };
};

// GET CURRENT USER
const getCurrentUser = async (req) => {
    // After authentication; email and hashsed password was stored in req
    const email = req.userEmail;
    const accessToken = req.token;

    const user = await authRepo.getCurrentUser({ email });

    if (!user) {
        return { message: "Usuario no encontrado" };
    }

    return await user.toAuthResponse(accessToken);
};

// UPDATE
const updateUser = async (req, data) => {
    const { user } = data;

    // confirm data
    if (!user) {
        return { message: "Usuario necesario" };
    }

    const email = req.userEmail;

    const updatedUser = await authRepo.updateUser({ email }, user);

    if (!updatedUser) {
        return { message: "Usuario no encontrado" };
    }

    return await updatedUser.toAuthResponse();
};

// LOGOUT
const logout = async (accessToken) => {
    const refreshTokenFinded = await authRepo.findOneToken(accessToken);
    const refreshToken =refreshTokenFinded.refreshToken;

    if (!refreshToken) return { message: 'Tokens corruptos' };

    await authRepo.createBlacklistToken(refreshToken);
    await authRepo.deleteOneRefresh(refreshToken);

    return { message: 'Deslogeado correctamente' };
};

module.exports = {
    userLogin,
    registerUser,
    getCurrentUser,
    updateUser,
    logout
}
