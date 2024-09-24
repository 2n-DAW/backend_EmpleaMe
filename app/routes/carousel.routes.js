module.exports = (app) => {
    const { getCarouselCategory, getCarouselJob } = require('../controllers/carousel.controller');

    //GET ALL CATEGORIES
    app.get('/carousel', getCarouselCategory);

    //GET ALL IMAGES FROM ONE JOB
    app.get('/carousel/:slug', getCarouselJob);
}
