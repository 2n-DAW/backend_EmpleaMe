module.exports = (app) => {
    const { createInscription } = require('../controllers/inscriptions.controller');

    app.post('/inscription', createInscription);
}
