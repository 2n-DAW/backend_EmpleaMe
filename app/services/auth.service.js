const authRepo = require("../repositories/auth.repo.js");


const userLogin = async (params) => {
    console.log(params);
    const { user } = params;
    console.log(user);
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


const registerUser = async (params) => {
    // console.log(params);
    const { user } = params;

    //console.log(user);

    if (!user || !user.email || !user.username || !user.password) {
        return { message: "All fields are required" };
    }

    const hashedPassword = await authRepo.hashPassword(user.password, 10);

    const userObject = {
        "username": user.username,
        "password": hashedPassword,
        "email": user.email
    };

    const newUser = await authRepo.registerUser(userObject);

    if (newUser) {
        return { user: newUser.toUserResponse() };
    } else {
        return {
            errors: {
                body: "Unable to register a user"
            }
        };
    }
}





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