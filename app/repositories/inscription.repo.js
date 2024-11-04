const inscriptionModel = require('../models/inscription.model');


const createInscription = async (data) => {
    const inscription = await new inscriptionModel(data);
    return await inscription.save();
};

const findInscription = async (user_email, job) => {
    return await inscriptionModel.findOne({ user_email, job });
};

const findUserInscriptions = async (user_email) => {
    console.log('user_email', user_email);

    const resp = await inscriptionModel.find({ user_email: user_email });

    console.log(resp);
    return resp;
}

module.exports = {
    createInscription,
    findInscription,
    findUserInscriptions
}