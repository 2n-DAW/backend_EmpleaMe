// SERVICES: toda la lógica de negocio
const carouselRepo = require("../repositories/carousel.repo.js");

// CATEGORIAS
const getCarouselCategory = async () => {
    const categories = await carouselRepo.getCarouselCategory();

    if (!categories) {
        return { message: "No se encontraron categorías" };
    }

    return await Promise.all(categories.map(async category => {
            return await category.toCategoryCarouselResponse();
        }));
};

// JOBS
const getCarouselJob = async (params) => {
    const job = await carouselRepo.getCarouselJob(params);

    if (!job) {
        return { message: "Trabajo no encontrado" };
    }

    return await job.toJobCarouselResponse();
};

module.exports = {
    getCarouselCategory,
    getCarouselJob 
}