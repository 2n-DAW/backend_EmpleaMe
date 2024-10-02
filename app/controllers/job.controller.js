// CONTROLLERS: manejan las solicitudes HTTP, reciben las request y emiten la respuesta
const jobService = require("../services/job.service.js");
// EXPRESS-ASYNC-HANDLER captura los errores generados en operaciones asíncronas y los pasa al midleware de express
// no es necesario utilizar los try ... catch
const asyncHandler = require('express-async-handler');

// CREATE
const createJob = asyncHandler(async (req, res) => {
    const newJob = await jobService.createJob(req, req.body);

    return res.status(201).json(newJob)
});

// FEED ALL JOBS
const feedAllJobs = asyncHandler(async (req, res) => {
    console.log(req.query);
    const { jobs, job_count } = await jobService.feedAllJobs(req, req.query);

    return res.status(200).json({ jobs, job_count });
});

// LIST ALL JOBS
const listAllJobs = asyncHandler(async (req, res) => {
    console.log(req.query);
    const { jobs, job_count } = await jobService.listAllJobs(req, req.query);

    return res.status(200).json({ jobs, job_count });
});

// FIND ONE
const findOneJob = asyncHandler(async (req, res) => {
    const job = await jobService.findOneJob(req.params);

    return res.status(200).json({ job: job });
});

// GET JOBS BY CATEGORY
const getJobsByCategory = asyncHandler(async (req, res) => {
    const jobs = await jobService.getJobsByCategory(req.params);

    return res.status(200).json({ jobs: jobs });
});

// UPDATE
const updateJob = asyncHandler(async (req, res) => {
    const updatedJob = await jobService.updateJob(req, req.params, req.body);

    return res.status(200).json(updatedJob);
})

// DELETE ONE
const deleteOneJob = asyncHandler(async (req, res) => {
    const result = await jobService.deleteOneJob(req, req.params);

    return res.status(200).json(result);
})

module.exports = {
    createJob,
    findOneJob,
    feedAllJobs,
    listAllJobs,
    updateJob,
    getJobsByCategory,
    deleteOneJob
}
