const provinceRepo = require("../repositories/province.repo.js");
const { resp } = require("../utils/utils.js");

const createProvince = async (data) => {
    const province_data = {
        id_province: data.id_province || null,
        province_name: data.province_name || null,
    };
    const res = await provinceRepo.createProvince(province_data);
    return resp(201, await res.toProvinceResponse());
};


const findAllProvinces = async (query) => {
    const provinces = await provinceRepo.findAllProvinces(query);

    if (!provinces) return resp(404, { message: "No se encontraron provincias" });

    const res = await Promise.all(provinces.map(async province => {
        return await province.toProvinceResponse();
    }));
    return resp(200, { provinces: res });
};


const deleteOneProvince = async (params) => {
    const province = await provinceRepo.deleteOneProvince(params);

    if (!province) return resp(404, { message: "Provincia no encontrada" });

    return resp(200, { message: "Provincia eliminada" });
};


module.exports = {
    createProvince,
    findAllProvinces,
    deleteOneProvince
}