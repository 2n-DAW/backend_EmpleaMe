// REPOSITORIES: operaciones con la base de datos
const provinceModel = require("../models/province.model.js");

// CREATE
const createProvince = async (data) => {
    const province = await new provinceModel(data); //creamos un nuevo objeto de tipo categoryModel
    
    return await province.save(); //guardamos el objeto en la base de datos
};

// FIND ALL
const findAllProvinces = async () => {
    return await provinceModel.find();
};

// FIND BY ID
const findProvinceId = async (provinceId) => {
    return await provinceModel.findById(provinceId);
};

// DELETE ONE
const deleteOneProvince = async (params) => {
    return await provinceModel.findOneAndDelete(params);
};

module.exports = {
    createProvince,
    findAllProvinces,
    findProvinceId,
    deleteOneProvince
}