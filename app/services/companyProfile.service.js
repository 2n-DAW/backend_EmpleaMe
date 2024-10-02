// SERVICES: toda la lógica de negocio
const companyProfileRepo = require('../repositories/companyProfile.repo.js');

// GET PROFILE
const getProfile = async (req, params) => {
    const { username } = params;
    const loggedin = req.loggedin;

    // console.log(`print out username ${username}`)
    const user = await companyProfileRepo.findOne({ username });

    if (!user) {
        return { message: "Usuario no encontrado" };
    }

    if (!loggedin) {
        return user.toProfileJSON(false);
    } else {
        const loginUser = await companyProfileRepo.findOne({ email: req.userEmail });
        return user.toProfileJSON(loginUser);
    }
};

// FOLLOW A USER
const followUser = async (req, params) => {
    const { username } = params;

    const loginUser = await companyProfileRepo.findOne({ email: req.userEmail });
    const user = await companyProfileRepo.findOne({ username });

    if (!user || !loginUser) {
        return { message: "Usuario no encontrado" };
    }
    await loginUser.follow(user._id);

    return await user.toAuthResponse(loginUser);
};

// UNFOLLOW A USER
const unFollowUser = async (req, params) => {
    const { username } = params;

    const loginUser = await companyProfileRepo.findOne({ email: req.userEmail });
    const user = await companyProfileRepo.findOne({ username });

    if (!user || !loginUser) {
        return { message: "Usuario no encontrado" };
    }
    await loginUser.unfollow(user._id);

    return await user.toAuthResponse(loginUser);
};

module.exports = {
    getProfile,
    followUser,
    unFollowUser
}
