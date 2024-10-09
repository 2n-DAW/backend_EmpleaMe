// CONTROLLERS: manejan las solicitudes HTTP, reciben las request y emiten la respuesta
const carouselService = require("../services/carousel.service.js");

// EXPRESS-ASYNC-HANDLER captura los errores generados en operaciones asíncronas y los pasa al midleware de express
// no es necesario utilizar los try ... catch
const asyncHandler = require('express-async-handler');

const getCarouselCategory = asyncHandler(async (req, res) => {
    const { status, result } = await carouselService.getCarouselCategory();
    return res.status(status).json(result);
});

// JOBS
const getCarouselJob = asyncHandler(async (req, res) => {
    const { status, result } = await carouselService.getCarouselJob(req.params);
    return res.status(status).json(result);
});

module.exports = {
    getCarouselCategory,
    getCarouselJob
}