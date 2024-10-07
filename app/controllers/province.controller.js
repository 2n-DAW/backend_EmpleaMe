const provinceService = require("../services/province.service.js");
const asyncHandler = require('express-async-handler');


const createProvince = asyncHandler(async (req, res) => {
    const { status, result } = await provinceService.createProvince(req.body);
    return res.status(status).json(result);
});


const findAllProvinces = asyncHandler(async (req, res) => {
    const { status, result } = await provinceService.findAllProvinces(req.query);
    return res.status(status).json(result);
});


const deleteOneProvince = asyncHandler(async (req, res) => {
    const { status, result } = await provinceService.deleteOneProvince(req.params);
    return res.status(status).json(result);
});


module.exports = {
    createProvince,
    findAllProvinces,
    deleteOneProvince,
}