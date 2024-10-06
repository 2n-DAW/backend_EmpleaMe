const authRepo = require("../repositories/auth.repo.js");
const { resp } = require("../utils/utils.js");

const userLogin = async (params) => {
    const { user } = params;
    if (!user || !user.email || !user.password) {
        return resp(400, { message: "All fields are required" });
    }

    const loginUser = await authRepo.userLogin({ email: user.email });
    if (!loginUser) {
        return resp(404, { message: "User Not Found" });
    }

    const match = await authRepo.comparePassword(user.password, loginUser.password);
    if (!match) {
        return resp(401, { message: "Invalid Password" });
    }

    const res = loginUser.toLoginResponse();
    const refreshToken = res.refreshToken;

    const target = await authRepo.findOneUser({ email: user.email });

    target.refreshToken = refreshToken;

    await authRepo.updateUser(target);


    return resp(200, { user: res });
};


const registerUser = async (params) => {
    const { user } = params;

    if (!user || !user.email || !user.username || !user.password) {
        return resp(400, { message: "All fields are required" });
    }

    const hashedPassword = await authRepo.hashPassword(user.password, 10);

    const userObject = {
        "username": user.username,
        "password": hashedPassword,
        "email": user.email
    };

    const newUser = await authRepo.registerUser(userObject);

    if (newUser) {
        return resp(201, { user: newUser.toUserResponse() });
    } else {
        return resp(400, { message: "User Registration Failed" });
    }
}


const getCurrentUser = async (email) => {
    const user = await authRepo.getCurrentUser(email);
    if (!user) return { status: 404, result: { message: "User Not Found" } };
    return resp(200, { user: user.toUserResponse() });
};


const updateUser = async (req) => {
    const { user } = req.body;
    if (!user) return resp(400, { message: "Required a User object" });
    const email = req.userEmail;
    const target = await authRepo.findOneUser({ email });

    if (user.email) {
        target.email = user.email;
    }
    if (user.username) {
        target.username = user.username;
    }
    if (user.password) {
        const hashedPwd = await authRepo.hashPassword(user.password, 10);
        target.password = hashedPwd;
    }
    if (typeof user.image !== 'undefined') {
        target.image = user.image;
    }
    if (typeof user.bio !== 'undefined') {
        target.bio = user.bio;
    }

    await authRepo.updateUser(target);
    return resp(200, { user: target.toUserResponse() });
};


module.exports = {
    userLogin,
    registerUser,
    getCurrentUser,
    updateUser,

}