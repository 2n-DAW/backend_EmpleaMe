const WorkingDayService = require("../services/workingDay.service.js");
const asyncHandler = require('express-async-handler');


const createWorkingDay = asyncHandler(async (req, res) => {
    const { status, result } = await WorkingDayService.createWorkingDay(req.body);
    return res.status(status).json(result)
});


const findAllWorkingDays = asyncHandler(async (req, res) => {
    const { status, result } = await WorkingDayService.findAllWorkingDays(req.query);
    return res.status(status).json(result)
});


const deleteOneWorkingDay = asyncHandler(async (req, res) => {
    const { status, result } = await WorkingDayService.deleteOneWorkingDay(req.params);
    return res.status(status).json(result)
});

module.exports = {
    createWorkingDay,
    findAllWorkingDays,
    deleteOneWorkingDay,
}