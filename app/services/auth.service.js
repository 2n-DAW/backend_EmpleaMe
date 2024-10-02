const authRepo = require("../repositories/auth.repo.js");


const userLogin = async () => {
    const user = await authRepo.userLogin();

    if (!user) {
        return { message: "No se encontraron categorías" };
    }

    return await Promise.all(user.map(async category => {
        return await category.toCategoryCarouselResponse();
    }));
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