const contractService = require("../services/contract.service.js");
const asyncHandler = require('express-async-handler');


const createContract = asyncHandler(async (req, res) => {
    const { status, result } = await contractService.createContract(req.body);
    return res.status(status).json(result);
});


const findAllContracts = asyncHandler(async (req, res) => {
    const { status, result } = await contractService.findAllContracts();
    return res.status(status).json(result);
});


const deleteOneContract = asyncHandler(async (req, res) => {
    const { status, result } = await contractService.deleteOneContract(req.params);
    return res.status(status).json(result);
});


module.exports = {
    createContract,
    findAllContracts,
    deleteOneContract,
}