module.exports = (app) => {
    const { getProfile, followUser, unFollowUser } = require('../controllers/companyProfile.controller.js');
    const verifyJWT = require('../middleware/verifyJWT.js');
    const verifyJWTOptional = require('../middleware/verifyJWTOptional.js');


    app.get('/:username', verifyJWTOptional, getProfile);

    //app.post('/:username/follow', verifyJWT, followUser);

    //app.delete('/:username/follow', verifyJWT, unFollowUser);

}