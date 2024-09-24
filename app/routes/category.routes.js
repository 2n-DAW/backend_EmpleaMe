module.exports = (app) => {
    const { createCategory, findAllCategories, findOneCategory, updateCategory, deleteOneCategory } = require('../controllers/category.controller.js');

    app.post('/categories', createCategory);

    app.get('/categories', findAllCategories);

    app.get('/categories/:slug', findOneCategory);

    app.put('/categories/:slug', updateCategory);

    app.delete('/categories/:slug', deleteOneCategory);
}