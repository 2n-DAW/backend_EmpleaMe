const userRepo = require("../repositories/user.repo.js");


const userLogin = async () => {
    const user = await userRepo.userLogin();

    if (!user) {
        return { message: "No se encontraron categorías" };
    }

    return await Promise.all(user.map(async category => {
        return await category.toCategoryCarouselResponse();
    }));
};

const registerUser = async () => {
    const user = await userRepo.registerUser();

    if (!user) {
        return { message: "No se encontraron categorías" };
    }

    return await job.toJobCarouselResponse();
};

const getCurrentUser = async () => {
    const user = await userRepo.getCurrentUser();

    if (!user) {
        return { message: "No se encontraron categorías" };
    }

    return await Promise.all(user.map(async category => {
        return await category.toCategoryCarouselResponse();
    }));
};

const updateUser = async () => {
    const user = await userRepo.updateUser();

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