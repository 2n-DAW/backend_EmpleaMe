const contractService = require("../services/contract.service.js");

 // EXPRESS-ASYNC-HANDLER captura los errores generados en operaciones asíncronas y los pasa al midleware de express
 // no es necesario utilizar los try ... catch
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