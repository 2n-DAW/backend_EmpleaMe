// const express = require('express');
// const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT.js');
const verifyJWTOptional = require('../middleware/verifyJWTOptional.js');

module.exports = (app) => {
    const { getProfile, followUser, unFollowUser, getProfile_User } = require('../controllers/companyProfile.controller.js');

    // Get profile - authentication optional
    app.get('/:username', verifyJWTOptional, getProfile);

    // Follow a user
    app.post('/:username/follow', verifyJWT, followUser);

    // unfollow a user
    app.delete('/:username/unfollow', verifyJWT, unFollowUser);
}