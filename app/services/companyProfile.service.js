const companyProfileRepo = require('../repositories/companyProfile.repo.js');
const jobRepo = require('../repositories/job.repo.js');
const { resp } = require("../utils/utils.js");


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

const getUserJobs = async (req) => {
    const is_owner = req.same_User;
    const { username } = req.params;
    const user = await companyProfileRepo.getProfile({ username });

    if (!user) return resp(404, { message: "Usuario no encontrado" });

    const jobs = await jobRepo.getUserJobs(user);
    console.log(jobs.length);
    console.log(is_owner);
    return resp(200, { jobs, job_count: jobs.length, is_owner });
};

const getUserLikes = async (req) => {
    const { username } = req.params;
    const user = await companyProfileRepo.getProfile({ username });
    console.log(user);
    if (!user) return resp(404, { message: "Usuario no encontrado" });


    let likes = await Promise.all(user.favouriteJobs.map(async (jobId) => {
        const job = await jobRepo.findOneJob({ _id: jobId });
        return await job.toJobResponse(user);
    }));

    console.log(likes);

    return resp(200, { likes, likes_count: likes.length, is_owner: req.same_User });
};

module.exports = {
    getProfile,
    followUser,
    unFollowUser,
    getUserJobs,
    getUserLikes
}
