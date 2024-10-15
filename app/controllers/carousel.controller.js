const carouselService = require("../services/carousel.service.js");

const asyncHandler = require('express-async-handler');

const getCarouselCategory = asyncHandler(async (req, res) => {
    const { status, result } = await carouselService.getCarouselCategory();
    return res.status(status).json(result);
});

const getCarouselJob = asyncHandler(async (req, res) => {
    const { status, result } = await carouselService.getCarouselJob(req.params);
    return res.status(status).json(result);
});

module.exports = {
    getCarouselCategory,
    getCarouselJob
}