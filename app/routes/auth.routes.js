module.exports = (app) => {
    const { userLogin, registerUser, getCurrentUser, updateUser } = require('../controllers/auth.controller.js');
    // const { verifyJWT } = require('../middlewares/auth.middleware.js');


    app.post('/users/login', userLogin);

    app.post('/users', registerUser);

    // app.get('/user', verifyJWT, getCurrentUser);

    // app.put('/user', verifyJWT, updateUser);

}