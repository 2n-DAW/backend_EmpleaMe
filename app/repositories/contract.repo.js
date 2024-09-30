// REPOSITORIES: operaciones con la base de datos
const contractModel = require("../models/contract.model.js");

// CREATE
const createContract = async (data) => {
    const contract = await new contractModel(data); //creamos un nuevo objeto de tipo categoryModel
    
    return await contract.save(); //guardamos el objeto en la base de datos
};

// FIND ALL
const findAllContracts = async () => {
    return await contractModel.find();
};

// FIND BY ID
const findContractId = async (contractId) => {
    return await contractModel.findById(contractId);
};

// DELETE ONE
const deleteOneContract = async (params) => {
    return await contractModel.findOneAndDelete(params);
};

module.exports = {
    createContract,
    findAllContracts,
    findContractId,
    deleteOneContract
}