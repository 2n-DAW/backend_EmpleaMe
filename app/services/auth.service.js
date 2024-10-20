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
    const { userType } = data;

    // confirm data
    if (!userType || !userType.email || !userType.userType) {
        return resp(404, { message: "Usuario no encontrado" });
    }

    const loginUser = await authRepo.clientUserLogin({ email: userType.email });
    if (!loginUser) return resp(404, { message: "Usuario no encontrado" });

    const accessToken = await loginUser.generateAccessToken();
    const refreshToken = await loginUser.generateRefreshToken();

    // Guarda el refreshToken en la base de datos junto el idUser
    await authRepo.saveToken(refreshToken, accessToken, loginUser.userId);

    const res = loginUser.toClientUserResponse(accessToken);
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
        "email": user.email,
        "password": hashedPwd
    };
    const newUser = await authRepo.registerUser(userObject);
    if (!newUser) return resp(400, { message: "Registro de usuario fallido" });

    const clientUserObject = {
        "userId": newUser._id,
        "username": user.username,
        "email": user.email,
    };
    const newClientUser = await authRepo.registerClientUser(clientUserObject);

    if (newClientUser) {
        return resp(201, { message: "Registro de usuario terminado" });
    } else {
        return resp(400, { message: "Registro de usuario fallido" });
    }
};

// GET CURRENT USER
const getCurrentUser = async (req) => {
    const userId = req.userId;
    const accessToken = req.token;

    const user = await authRepo.getCurrentUser({ userId });

    if (!user) return { status: 404, result: { message: "Usuario no encontrado" } };

    return resp(200, { currentUser: user.toClientUserResponse(accessToken) });
};

// UPDATE
const updateUser = async (req) => {
    const { user } = req.body;

    // confirm data
    if (!user) return resp(400, { message: "Datos a actualizar necesarios" });

    const email = req.userEmail;
    const userId = req.userId;

    if (user.username || user.email || user.password) {
        const updatedUser = await authRepo.updateUser(userId, user);
        if (!updatedUser) return resp(404, { message: "Usuario no encontrado" });
    }

    if (user.username || user.email || user.bio || user.image) {
        updatedClientUser = await authRepo.updateClientUser({ userId }, user);
        if (!updatedClientUser) return resp(404, { message: "Usuario no encontrado" });
    }

    return resp(200, { user: updatedClientUser.toClientUserResponse() });
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
    userType,
    clientUserLogin,
    registerUser,
    getCurrentUser,
    updateUser,
    logout,

}
