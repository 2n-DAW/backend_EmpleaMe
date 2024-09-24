// REPOSITORIES: operaciones con la base de datos
const categoryModel = require("../models/category.model.js");
const jobModel = require("../models/job.model.js");

// CATEGORIAS
const getCarouselCategory = async () => {
    return await categoryModel.find();
};

// JOBS
const getCarouselJob = async (params) => {
    return await jobModel.findOne(params);
};

module.exports = {
    getCarouselCategory,
    getCarouselJob
}