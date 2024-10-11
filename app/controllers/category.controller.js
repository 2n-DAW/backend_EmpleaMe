const categoryService = require("../services/category.service.js");
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
