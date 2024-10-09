const categoryService = require("../services/category.service.js");

 // EXPRESS-ASYNC-HANDLER captura los errores generados en operaciones asíncronas y los pasa al midleware de express
 // no es necesario utilizar los try ... catch
const asyncHandler = require('express-async-handler');


const createCategory = asyncHandler(async (req, res) => {
    const { status, result } = await categoryService.createCategory(req.body);
    return res.status(status).json(result);
});


const findAllCategories = asyncHandler(async (req, res) => {
    const { status, result } = await categoryService.findAllCategories(req.query);
    return res.status(status).json(result);
});


const findOneCategory = asyncHandler(async (req, res) => {
    const { status, result } = await categoryService.findOneCategory(req.params);
    return res.status(status).json(result);
});


const updateCategory = asyncHandler(async (req, res) => {
    const { status, result } = await categoryService.updateCategory(req.params, req.body);
    res.status(status).json(result);
});


const deleteOneCategory = asyncHandler(async (req, res) => {
    const { status, result } = await categoryService.deleteOneCategory(req.params);
    return res.status(status).json(result);
});


module.exports = {
    createCategory,
    findAllCategories,
    findOneCategory,
    updateCategory,
    deleteOneCategory
}
