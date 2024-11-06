const companyProfileRepo = require('../repositories/companyProfile.repo.js');
const jobRepo = require('../repositories/job.repo.js');
const inscriptionRepo = require('../repositories/inscription.repo.js');
const { resp } = require("../utils/utils.js");


const getProfile = async (req) => {
    const { username } = req.params;
    const loggedin = req.loggedin;
    
    const user = await companyProfileRepo.getUserProfile({ username });

    if (!user) {
        return resp(404, { message: "Usuario no encontrado" });
    }

    if (!loggedin) {
        return resp(200, { profile: user.toProfileJSON(false) });
    } else {
        const loginUser = await companyProfileRepo.getUserProfile({ email: req.userEmail });
        return resp(200, { profile: user.toProfileJSON(loginUser) });
    }
};


const followUser = async (req) => {
    const { username } = req.params;

    const loginUser = await companyProfileRepo.getUserProfile({ email: req.userEmail });
    const user = await companyProfileRepo.getUserProfile({ username });

    if (!user || !loginUser) {
        return resp(404, { message: "Usuario no encontrado" });
    }
    await companyProfileRepo.followUser(loginUser, user._id);

    return resp(200, { profile: user.toProfileJSON(loginUser) });
};


const unFollowUser = async (req) => {
    const { username } = req.params;

    const loginUser = await companyProfileRepo.getUserProfile({ email: req.userEmail });
    const user = await companyProfileRepo.getUserProfile({ username });

    if (!user || !loginUser) {
        return resp(404, { message: "Usuario no encontrado" });
    }
    await companyProfileRepo.unFollowUser(loginUser, user._id);

    return resp(200, { profile: user.toProfileJSON(loginUser) });
};

const getUserJobs = async (req) => {
    const is_owner = req.same_User;
    const { username } = req.params;

    const user = await companyProfileRepo.getUserProfile({ username });
    if (!user) return resp(404, { message: "Usuario no encontrado" });

    const jobs = await jobRepo.getUserJobs(user);

    const res = await Promise.all(jobs.map(async (job) => {
        return await job.toJobResponse(user);
    })
    );

    return resp(200, { jobs: res, job_count: jobs.length, is_owner });
};

const getUserLikes = async (req) => {
    const { username } = req.params;

    const user = await companyProfileRepo.getUserProfile({ username });
    if (!user) return resp(404, { message: "Usuario no encontrado" });

    const userInscriptions = await inscriptionRepo.findUserInscriptions(user.email);

    let jobs = await Promise.all(user.favouriteJobs.map(async (jobId) => {
        const job = await jobRepo.findOneJob({ _id: jobId });
        const inscription = userInscriptions.find(inscription => inscription.job === job.slug);
        return await job.toJobResponse(user, inscription ? inscription.status : 0);
    }));

    return resp(200, { jobs, jobs_count: jobs.length, is_owner: req.same_User });
};

const getUserFollowers = async (req) => {
    const { username } = req.params;
    const query = req.query;

    const user = await companyProfileRepo.getUserProfile({ username });
    if (!user) return resp(404, { message: "Usuario no encontrado" });

    const followers = await companyProfileRepo.getUserFollowers(user, query);

    return resp(200, { users: followers, users_count: followers.length, is_owner: req.same_User });
};

const getUserFollowing = async (req) => {
    const { username } = req.params;
    const query = req.query;

    const user = await companyProfileRepo.getUserProfile({ username });
    if (!user) return resp(404, { message: "Usuario no encontrado" });

    const following = await companyProfileRepo.getUserFollowing(user, query);

    return resp(200, { users: following, users_count: following.length, is_owner: req.same_User });
};

const getProfileByEmail = async (req) => {
    const { email } = req.params;
    const loggedin = req.loggedin;

    const user = await companyProfileRepo.getUserProfile({ email });

    console.log(user);
    if (!user) {
        return resp(404, { message: "Usuario no encontrado" });
    }

    if (!loggedin) {
        return resp(200, { profile: user.toProfileJSON(false) });
    } else {
        const loginUser = await companyProfileRepo.getUserProfile({ email: req.userEmail });
        return resp(200, { profile: user.toProfileJSON(loginUser) });
    }
}

module.exports = {
    getProfile,
    followUser,
    unFollowUser,
    getUserJobs,
    getUserLikes,
    getUserFollowers,
    getUserFollowing,
    getProfileByEmail
}
