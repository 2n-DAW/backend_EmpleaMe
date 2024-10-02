const authRepo = require("../repositories/auth.repo.js");


const userLogin = async (params) => {
    const { user } = params;

    if (!user || !user.email || !user.password) {
        return { message: "All fields are required" };
    }

    const loginUser = await authRepo.userLogin({ email: user.email });

    if (!loginUser) {
        return { message: "User not found" };
    }

    const match = await authRepo.comparePassword(user.password, loginUser.password);
    if (!match) {
        return { message: "Invalid credentials" };
    }

    return loginUser.toUserResponse();
};

const registerUser = async () => {
    const user = await authRepo.registerUser();

    if (!user) {
        return { message: "No se encontraron categorías" };
    }

    return await job.toJobCarouselResponse();
};

const getCurrentUser = async () => {
    const user = await authRepo.getCurrentUser();

    if (!user) {
        return { message: "No se encontraron categorías" };
    }

    return await Promise.all(user.map(async category => {
        return await category.toCategoryCarouselResponse();
    }));
};

const updateUser = async () => {
    const user = await authRepo.updateUser();

    if (!user) {
        return { message: "No se encontraron categorías" };
    }

    return await Promise.all(user.map(async category => {
        return await category.toCategoryCarouselResponse();
    }));
};


module.exports = {
    userLogin,
    registerUser,
    getCurrentUser,
    updateUser
}