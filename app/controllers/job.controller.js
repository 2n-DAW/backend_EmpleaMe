const jobService = require("../services/job.service.js");
const asyncHandler = require('express-async-handler');


const createJob = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.createJob(req.body);
    return res.status(status).json(result);
});


const findOneJob = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.findOneJob(req.params);
    return res.status(status).json(result);
});


const findAllJobs = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.findAllJobs(req.query);
    return res.status(status).json(result);
});


const getJobsByCategory = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.getJobsByCategory(req.params);
    return res.status(status).json(result);
});


const updateJob = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.updateJob(req.params, req.body);
    return res.status(status).json(result);
})


const deleteOneJob = asyncHandler(async (req, res) => {
    const result = await jobService.deleteOneJob(req.params);
    return res.status(200).json(result);
})


module.exports = {
    createJob,
    findOneJob,
    findAllJobs,
    updateJob,
    getJobsByCategory,
    deleteOneJob
}
