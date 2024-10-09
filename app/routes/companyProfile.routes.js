const verifyJWT = require('../middleware/verifyJWT.js');
const verifyJWTOptional = require('../middleware/verifyJWTOptional.js');

module.exports = (app) => {
    const { getProfile, followUser, unFollowUser } = require('../controllers/companyProfile.controller.js');

    // Get profile - authentication optional
    app.get('/profiles/:username', verifyJWTOptional, getProfile);

    // Follow a user
    app.post('/profiles/:username/follow', verifyJWT, followUser);

    // unfollow a user
    app.delete('/profiles/:username/unfollow', verifyJWT, unFollowUser);
}