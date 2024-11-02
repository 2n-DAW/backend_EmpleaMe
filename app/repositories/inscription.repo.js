const inscriptionModel = require("../models/inscription.model.js");


const createInscription = async (data) => {
    const inscription = await new inscriptionModel(data);

    return await inscription.save();
};

module.exports = {
    createInscription,
}
