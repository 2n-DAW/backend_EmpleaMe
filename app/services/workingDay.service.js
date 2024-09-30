// SERVICES: toda la lógica de negocio
const workingDayRepo = require("../repositories/workingDay.repo.js");

//CREATE
const createWorkingDay = async (data) => {
    //montamos el objeto con los datos que vienen en el body
    const workingDay_data = {
        id_workingDay: data.id_workingDay || null,
        workingDay_name: data.workingDay_name || null,
    };

    return await workingDayRepo.createWorkingDay(workingDay_data);
};

// FIND ALL
const findAllWorkingDays = async (query) => {
    const workingDays = await workingDayRepo.findAllWorkingDays(query);

    if (!workingDays) {
        return { message: "No se encontraron jornadas" };
    }

    return await Promise.all(workingDays.map(async workingDay => {
            return await workingDay.toWorkingDayResponse();
        }));
};

// DELETE ONE
const deleteOneWorkingDay = async (params) => {
    const workingDay = await workingDayRepo.deleteOneWorkingDay(params);

    if (!workingDay) {
        return { message: "Jornada no encontrada" };
    }

    return { message: "Jornada eliminada" };
};

module.exports = {
    createWorkingDay,
    findAllWorkingDays,
    deleteOneWorkingDay
}