module.exports = (app) => {
    const { userLogin, registerUser, getCurrentUser, updateUser, logout, refresh } = require('../controllers/auth.controller.js');
    const verifyJWT = require('../middleware/verifyJWT.js');
    const verifyJWTRefresh = require('../middleware/verifyJWTRefresh.js');


    app.post('/users/login', userLogin);

    app.post('/users', registerUser);

    app.get('/user', verifyJWT, getCurrentUser);

    app.put('/user', verifyJWT, updateUser);

    app.post('/user/logout', logout);

    app.post('/user/refresh', verifyJWTRefresh, refresh);

}