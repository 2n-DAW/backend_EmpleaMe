// CONTROLLERS: manejan las solicitudes HTTP, reciben las request y emiten la respuesta
const WorkingDayService = require("../services/workingDay.service.js");
 // EXPRESS-ASYNC-HANDLER captura los errores generados en operaciones asíncronas y los pasa al midleware de express
 // no es necesario utilizar los try ... catch
const asyncHandler = require('express-async-handler');

// CREATE
const createWorkingDay = asyncHandler(async (req, res) => {
    const newWorkingDay = await WorkingDayService.createWorkingDay(req.body);

    return res.status(201).json(await newWorkingDay.toWorkingDayResponse())
});

// FIND ALL
const findAllWorkingDays = asyncHandler(async (req, res) => {
    const workingDays =  await WorkingDayService.findAllWorkingDays(req.query);

    return res.status(200).json({workingDays: workingDays});
});

// DELETE ONE
const deleteOneWorkingDay = asyncHandler(async (req, res) => {
    const result = await WorkingDayService.deleteOneWorkingDay(req.params);

    return res.status(200).json(result);
});

module.exports = {
    createWorkingDay,
    findAllWorkingDays,
    deleteOneWorkingDay,
}