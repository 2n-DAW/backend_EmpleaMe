const jobService = require("../services/job.service.js");
const asyncHandler = require('express-async-handler');

const createJob = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.createJob(req);
    return res.status(status).json(result);
});


const findOneJob = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.findOneJob(req.params);
    return res.status(status).json(result);
});


const findAllJobs = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.findAllJobs(req);
    return res.status(status).json(result);
});


const getJobsByCategory = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.getJobsByCategory(req.params);
    return res.status(status).json(result);
});


const updateJob = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.updateJob(req);
    return res.status(status).json(result);
});


const deleteOneJob = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.deleteOneJob(req);
    return res.status(status).json(result);
});

const favoriteJob = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.favoriteJob(req);
    return res.status(status).json(result);
});

const unfavoriteJob = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.unfavoriteJob(req);
    return res.status(status).json(result);
});


module.exports = {
    createJob,
    findOneJob,
    findAllJobs,
    updateJob,
    getJobsByCategory,
    deleteOneJob,
    favoriteJob,
    unfavoriteJob
}
