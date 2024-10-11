const categoryModel = require("../models/category.model.js");
const jobModel = require("../models/job.model.js");


const getCarouselCategory = async () => {
    return await categoryModel.find();
};


const getCarouselJob = async (params) => {
    return await jobModel.findOne(params);
};

module.exports = {
    getCarouselCategory,
    getCarouselJob
}