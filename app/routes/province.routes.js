module.exports = (app) => {
    const { createProvince, findAllProvinces, deleteOneProvince } = require('../controllers/province.controller.js');

    app.post('/provinces', createProvince);

    app.get('/provinces', findAllProvinces);

    app.delete('/provinces/:_id', deleteOneProvince);
}