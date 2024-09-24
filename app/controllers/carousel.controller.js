// CONTROLLERS: manejan las solicitudes HTTP, reciben las request y emiten la respuesta
const carouselService = require("../services/carousel.service.js");
 // EXPRESS-ASYNC-HANDLER captura los errores generados en operaciones asíncronas y los pasa al midleware de express
 // no es necesario utilizar los try ... catch
const asyncHandler = require('express-async-handler');

// CATEGORIAS
const getCarouselCategory = asyncHandler(async (req, res) => {
    const categories =  await carouselService.getCarouselCategory();

    return res.status(200).json({categories: categories});
});

// JOBS
const getCarouselJob = asyncHandler(async (req, res) => {
    const job = await carouselService.getCarouselJob(req.params);

    return res.status(200).json(job);
});

module.exports = {
    getCarouselCategory,
    getCarouselJob 
}