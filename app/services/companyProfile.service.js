const companyProfileRepo = require("../repositories/companyProfile.repo.js");
const { resp } = require("../utils/utils.js");




const getProfile = async (req) => {
    const { username } = req.params;
    const loggedin = req.loggedin;

    const user = await companyProfileRepo.getProfile({ username });

    if (!user) {
        return resp(404, { message: "User Not Found" });
    }

    if (!loggedin) {
        return resp(200, { profile: user.toProfileJSON(false) });
    } else {
        const loginUser = await companyProfileRepo.getProfile({ email: req.userEmail });
        return resp(200, { profile: user.toProfileJSON(loginUser) });
    }
};



module.exports = {
    getProfile
}