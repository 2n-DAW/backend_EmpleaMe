// REPOSITORIES: operaciones con la base de datos
const authModel = require('../models/auth.model.js');

// FIND ONE
const findOne = async (data) => {
    return await authModel.findOne(data);
};

module.exports = {
    findOne
}
