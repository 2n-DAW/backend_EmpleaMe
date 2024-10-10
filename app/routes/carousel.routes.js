module.exports = (app) => {
    const { getCarouselCategory, getCarouselJob } = require('../controllers/carousel.controller');

    app.get('/carousel', getCarouselCategory);

    app.get('/carousel/:slug', getCarouselJob);
}
