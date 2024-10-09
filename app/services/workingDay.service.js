// SERVICES: toda la lógica de negocio
const workingDayRepo = require("../repositories/workingDay.repo.js");
const { resp } = require("../utils/utils.js");

//CREATE
const createWorkingDay = async (data) => {
    //montamos el objeto con los datos que vienen en el body
    const workingDay_data = {
        id_workingDay: data.id_workingDay || null,
        workingDay_name: data.workingDay_name || null,
    };

    const res = await workingDayRepo.createWorkingDay(workingDay_data);
    return resp(201, await res.toWorkingDayResponse());
};

// FIND ALL
const findAllWorkingDays = async (query) => {
    const workingDays = await workingDayRepo.findAllWorkingDays(query);

    if (!workingDays) return resp(404, { message: "No se encontraron jornadas" });

    const res = await Promise.all(workingDays.map(async workingDay => {
        return await workingDay.toWorkingDayResponse();
    }));
    return resp(200, { workingDays: res });
};

// DELETE ONE
const deleteOneWorkingDay = async (params) => {
    const workingDay = await workingDayRepo.deleteOneWorkingDay(params);

    if (!workingDay) return resp(404, { message: "Jornada no encontrada" });
    
    return resp(200, { message: "Jornada eliminada" });
};

module.exports = {
    createWorkingDay,
    findAllWorkingDays,
    deleteOneWorkingDay
}