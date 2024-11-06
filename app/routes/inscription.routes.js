const verifyJWT = require('../middleware/verifyJWT');

module.exports = (app) => {
    const { createInscription, getInscriptions } = require('../controllers/inscriptions.controller');

    app.post('/inscription', createInscription);
    app.get('/inscription', verifyJWT, getInscriptions);
}
