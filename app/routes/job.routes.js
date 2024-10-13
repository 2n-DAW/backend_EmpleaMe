const verifyJWT = require('../middleware/verifyJWT.js');
const verifyJWTOptional = require('../middleware/verifyJWTOptional');

module.exports = (app) => {
    const { createJob, findAllJobs, findOneJob, getJobsByCategory, updateJob, deleteOneJob, favoriteJob, unfavoriteJob } = require('../controllers/job.controller.js');

    app.post('/jobs', verifyJWT, createJob);

    app.get('/jobs', verifyJWTOptional, findAllJobs);

    app.get('/jobs/:slug', findOneJob);

    app.get('/jobsByCategory/:slug', getJobsByCategory);

    app.put('/jobs/:slug', verifyJWT, updateJob);

    app.delete('/jobs/:slug', verifyJWT, deleteOneJob);

    app.post('/:slug/favorite', verifyJWT, favoriteJob);

    app.delete('/:slug/unfavorite', verifyJWT, unfavoriteJob);
}