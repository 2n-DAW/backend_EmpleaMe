const workingDayModel = require("../models/workingDay.model.js");


const createWorkingDay = async (data) => {
    const workingDay = await new workingDayModel(data); //creamos un nuevo objeto de tipo categoryModel
    return await workingDay.save(); //guardamos el objeto en la base de datos
};


const findAllWorkingDays = async () => {
    return await workingDayModel.find();
};


const findWorkingDayId = async (workingDayId) => {
    return await workingDayModel.findById(workingDayId);
};


const deleteOneWorkingDay = async (params) => {
    return await workingDayModel.findOneAndDelete(params);
};

module.exports = {
    createWorkingDay,
    findAllWorkingDays,
    findWorkingDayId,
    deleteOneWorkingDay
}