// REPOSITORIES: operaciones con la base de datos
const workingDayModel = require("../models/workingDay.model.js");

// CREATE
const createWorkingDay = async (data) => {
    const workingDay = await new workingDayModel(data); //creamos un nuevo objeto de tipo categoryModel
    
    return await workingDay.save(); //guardamos el objeto en la base de datos
};

// FIND ALL
const findAllWorkingDays = async () => {
    return await workingDayModel.find();
};

// FIND BY ID
const findWorkingDayId = async (workingDayId) => {
    return await workingDayModel.findById(workingDayId);
};

// DELETE ONE
const deleteOneWorkingDay = async (params) => {
    return await workingDayModel.findOneAndDelete(params);
};

module.exports = {
    createWorkingDay,
    findAllWorkingDays,
    findWorkingDayId,
    deleteOneWorkingDay
}