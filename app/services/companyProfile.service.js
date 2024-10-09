// SERVICES: toda la lógica de negocio
const companyProfileRepo = require('../repositories/companyProfile.repo.js');
const { resp } = require("../utils/utils.js");

// GET PROFILE
const getProfile = async (req) => {
    const { username } = req.params;
    const loggedin = req.loggedin;

    const user = await companyProfileRepo.getProfile({ username });

    if (!user) {
        return resp(404, { message: "Usuario no encontrado" });
    }

    if (!loggedin) {
        return resp(200, { profile: user.toProfileJSON(false) });
    } else {
        const loginUser = await companyProfileRepo.getProfile({ email: req.userEmail });
        return resp(200, { profile: user.toProfileJSON(loginUser) });
    }
};

// FOLLOW A USER
const followUser = async (req) => {
    const { username } = req.params;

    const loginUser = await companyProfileRepo.getProfile({ email: req.userEmail });
    const user = await companyProfileRepo.getProfile({ username });

    if (!user || !loginUser) {
        return resp(404, { message: "Usuario no encontrado" });
    }
    await companyProfileRepo.followUser(loginUser, user._id);

    return resp(200, { profile: user.toProfileJSON(loginUser) });
};

// UNFOLLOW A USER
const unFollowUser = async (req) => {
    const { username } = req.params;

    const loginUser = await companyProfileRepo.getProfile({ email: req.userEmail });
    const user = await companyProfileRepo.getProfile({ username });

    if (!user || !loginUser) {
        return resp(404, { message: "Usuario no encontrado" });
    }
    await companyProfileRepo.unFollowUser(loginUser, user._id);

    return resp(200, { profile: user.toProfileJSON(loginUser) });
};

module.exports = {
    getProfile,
    followUser,
    unFollowUser
}
