const provinceModel = require("../models/province.model.js");


const createProvince = async (data) => {
    const province = await new provinceModel(data); //creamos un nuevo objeto de tipo categoryModel
    
    return await province.save(); //guardamos el objeto en la base de datos
};


const findAllProvinces = async () => {
    return await provinceModel.find();
};


const findProvinceId = async (provinceId) => {
    return await provinceModel.findById(provinceId);
};


const deleteOneProvince = async (params) => {
    return await provinceModel.findOneAndDelete(params);
};

module.exports = {
    createProvince,
    findAllProvinces,
    findProvinceId,
    deleteOneProvince
}