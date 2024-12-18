const verifyJWT = require('../middleware/verifyJWT.js');
const verifyJWTOptional = require('../middleware/verifyJWTOptional.js');
const verifyUserJWT = require('../middleware/verifyUserJWT.js');

module.exports = (app) => {
    const { getProfile, followUser, unFollowUser, getUserJobs, getUserLikes, getUserFollowers, getUserFollowing, getProfileByEmail } = require('../controllers/companyProfile.controller.js');

    // Get profile - authentication optional
    app.get('/profiles/:username', verifyJWTOptional, getProfile);

    // Follow a user
    app.post('/profiles/:username/follow', verifyJWT, followUser);

    // unfollow a user
    app.delete('/profiles/:username/unfollow', verifyJWT, unFollowUser);

    app.get('/profiles/:username/jobs', verifyUserJWT, getUserJobs);

    app.get('/profiles/:username/likes', verifyUserJWT, getUserLikes);

    app.get('/profiles/:username/followers', verifyUserJWT, getUserFollowers);

    app.get('/profiles/:username/following', verifyUserJWT, getUserFollowing);

    app.get('/profiles/email/:email', verifyJWTOptional, getProfileByEmail);
}