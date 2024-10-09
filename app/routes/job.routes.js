const verifyJWT = require('../middleware/verifyJWT.js');
const verifyJWTOptional = require('../middleware/verifyJWTOptional');

module.exports = (app) => {
    const { createJob, findAllJobs, findOneJob, getJobsByCategory, updateJob, deleteOneJob } = require('../controllers/job.controller.js');

    app.post('/jobs', verifyJWT, createJob);

    // // feed endpoint must go before :slug endpoint
    // app.get('/jobs/feed', verifyJWT, feedAllJobs);

    app.get('/jobs', verifyJWTOptional, findAllJobs);

    app.get('/jobs/:slug', findOneJob);

    app.get('/jobsByCategory/:slug', getJobsByCategory);

    app.put('/jobs/:slug', verifyJWT, updateJob);

    app.delete('/jobs/:slug', verifyJWT, deleteOneJob);
}