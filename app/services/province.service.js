// SERVICES: toda la lógica de negocio
const provinceRepo = require("../repositories/province.repo.js");

//CREATE
const createProvince = async (data) => {
    //montamos el objeto con los datos que vienen en el body
    const province_data = {
        id_province: data.id_province || null,
        province_name: data.province_name || null,
    };

    return await provinceRepo.createProvince(province_data);
};

// FIND ALL
const findAllProvinces = async (query) => {
    const provinces = await provinceRepo.findAllProvinces(query);

    if (!provinces) {
        return { message: "No se encontraron provincias" };
    }

    return await Promise.all(provinces.map(async province => {
            return await province.toProvinceResponse();
        }));
};

// DELETE ONE
const deleteOneProvince = async (params) => {
    const province = await provinceRepo.deleteOneProvince(params);

    if (!province) {
        return { message: "Provincia no encontrada" };
    }

    return { message: "Provincia eliminada" };
};

module.exports = {
    createProvince,
    findAllProvinces,
    deleteOneProvince
}