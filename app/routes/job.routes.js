module.exports = (app) => {
    const { createJob, findAllJobs, findOneJob, getJobsByCategory, updateJob, deleteOneJob } = require('../controllers/job.controller.js');

    app.post('/jobs', createJob);

    app.get('/jobs', findAllJobs);

    app.get('/jobs/:slug', findOneJob);

    app.get('/jobsByCategory/:slug', getJobsByCategory);

    app.put('/jobs/:slug', updateJob);

    app.delete('/jobs/:slug', deleteOneJob);
}