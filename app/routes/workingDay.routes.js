module.exports = (app) => {
    const { createWorkingDay, findAllWorkingDays, deleteOneWorkingDay } = require('../controllers/workingDay.controller.js');

    app.post('/workingDays', createWorkingDay);

    app.get('/workingDays', findAllWorkingDays);

    app.delete('/workingDays/:_id', deleteOneWorkingDay);
}