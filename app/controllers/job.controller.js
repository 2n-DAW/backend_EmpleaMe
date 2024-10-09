// CONTROLLERS: manejan las solicitudes HTTP, reciben las request y emiten la respuesta
const jobService = require("../services/job.service.js");

// EXPRESS-ASYNC-HANDLER captura los errores generados en operaciones asíncronas y los pasa al midleware de express
// no es necesario utilizar los try ... catch
const asyncHandler = require('express-async-handler');

// CREATE
const createJob = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.createJob(req);
    return res.status(status).json(result);
});

// FIND ONE JOB
const findOneJob = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.findOneJob(req.params);
    return res.status(status).json(result);
});

// // FEED ALL JOBS
// const feedAllJobs = asyncHandler(async (req, res) => {
//     const { jobs, job_count } = await jobService.feedAllJobs(req, req.query);

//     return res.status(200).json({ jobs, job_count });
// });

// FIND ALL JOBS
const findAllJobs = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.findAllJobs(req);
    return res.status(status).json(result);
});

// GET JOBS BY CATEGORY
const getJobsByCategory = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.getJobsByCategory(req.params);
    return res.status(status).json(result);
});

// UPDATE
const updateJob = asyncHandler(async (req, res) => {
    const { status, result } = await jobService.updateJob(req);
    return res.status(status).json(result);
})

// DELETE ONE
const deleteOneJob = asyncHandler(async (req, res) => {
    const result = await jobService.deleteOneJob(req);
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
