// SERVICES: toda la lógica de negocio
const carouselRepo = require("../repositories/carousel.repo.js");
const { resp } = require("../utils/utils.js");

// CATEGORIAS
const getCarouselCategory = async () => {
    const categories = await carouselRepo.getCarouselCategory();

    if (!categories) {
        return resp(404, { message: "No se encontraron categorías" });
    }

    const res = await Promise.all(categories.map(async category => {
        return await category.toCategoryCarouselResponse();
    }));
    return resp(200, { categories: res });
};



const getCarouselJob = async (params) => {
    const job = await carouselRepo.getCarouselJob(params);

    if (!job) {
        return resp(404, { message: "Trabajo no encontrado" });
    }

    const res = await job.toJobCarouselResponse();
    return resp(200, { job: res });
};

module.exports = {
    getCarouselCategory,
    getCarouselJob
}