const authRepo = require('../repositories/auth.repo.js');
const repoJob = require('../repositories/job.repo.js');
const { resp } = require("../utils/utils.js");
const bcrypt = require('bcrypt');

// USER TYPE
const userType = async (data) => {
    const { user } = data;

    // confirm data
    if (!user || !user.email || !user.password) {
        return resp(400, { message: "Todos los campos son necesarios" });
    }

    const loginUser = await authRepo.userType({ email: user.email });

    if (!loginUser) return resp(404, { message: "Usuario no encontrado" });
    if (loginUser.isActive === false) return resp(401, { message: "Usuario desactivado" });

    const match = await bcrypt.compare(user.password, loginUser.password);
    if (!match) return resp(401, { message: "Contraseña inválida" });

    const res = loginUser.toUserResponse();
    return resp(200, { user: res });
};

// LOGIN
const clientUserLogin = async (data) => {
    const { user } = data;

    // confirm data
    if (!user || !user.email || !user.password) {
        return resp(404, { message: "Usuario no encontrado" });
    }

    const loginUser = await authRepo.clientUserLogin({ email: user.email })
    if (!loginUser) return resp(404, { message: "Usuario no encontrado" });

    const accessToken = await loginUser.generateAccessToken();
    const refreshToken = await loginUser.generateRefreshToken();

    await authRepo.saveToken(refreshToken, accessToken, loginUser.userId);
    
    const res = loginUser.toClientUserResponse(accessToken);
    return resp(200, { user: res });
};

// REGISTER
const registerUser = async (data) => {
    const { user, userType } = data;
    // confirm data
    if (!user || !user.email || !user.username || !user.password) {
        return resp(400, { message: "Todos los campos son necesarios" });
    }

    // hash password
    const hashedPwd = await bcrypt.hash(user.password, 10);

    const userObject = {
        "username": user.username,
        "email": user.email,
        "password": hashedPwd,
        "userType": userType
    };
    const newUser = await authRepo.registerUser(userObject);
    if (!newUser) return resp(500, { message: "Registro de usuario fallido" });

    return resp(201, { user: newUser });
};

// GET CURRENT USER
const getCurrentUser = async (req) => {
    const userId = req.userId;
    const accessToken = req.token;

    const user = await authRepo.getCurrentUser({ userId });

    if (!user) return { status: 404, result: { message: "Usuario no encontrado" } };

    return resp(200, { user: user.toClientUserResponse(accessToken), type: "client" });
};

// UPDATE
const updateUser = async (req) => {
    const { user } = req.body;

    if (!user) return resp(400, { message: "Datos a actualizar necesarios" });
    const userId = req.userId;
    let updatedUser;

    if (user.username || user.email || user.password) {
        updatedUser = await authRepo.updateUser(userId, user);
        if (!updatedUser) return resp(404, { message: "Usuario no encontrado" });
    }
    const { password, ...respObject } = updatedUser.toObject();
    return resp(200, { user: respObject });
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

const userDelete = async (username) => {
    const user = await authRepo.userDelete(username);
    if (!user) return resp(404, { message: "Usuario no encontrado" });

    return resp(200, { message: "Usuario eliminado" });
};

const registerUserClient = async (data) => {
    const { user } = data;

    // confirm data
    if (!user || !user.email || !user.username || !user.password || !user.userId) {
        return resp(400, { message: "Todos los campos son necesarios" });
    }

    // hash password
    const hashedPwd = await bcrypt.hash(user.password, 10);

    const userObject = {
        "userId": user.userId,
        "username": user.username,
        "email": user.email,
        "password": hashedPwd
    };

    const newClientUser = await authRepo.registerClientUser(userObject);

    if (newClientUser) {
        return resp(201, { user: newClientUser });
    } else {
        return resp(409, { message: "Registro de usuario fallido" });
    }
};


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
