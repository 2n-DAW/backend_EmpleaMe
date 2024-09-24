// CONTROLLERS: manejan las solicitudes HTTP, reciben las request y emiten la respuesta
const categoryService = require("../services/category.service.js");
 // EXPRESS-ASYNC-HANDLER captura los errores generados en operaciones asíncronas y los pasa al midleware de express
 // no es necesario utilizar los try ... catch
const asyncHandler = require('express-async-handler');

// CREATE
const createCategory = asyncHandler(async (req, res) => {
    const newCategory = await categoryService.createCategory(req.body);

    return res.status(201).json(await newCategory.toCategoryResponse())
});

// FIND ALL
const findAllCategories = asyncHandler(async (req, res) => {
    const categories =  await categoryService.findAllCategories(req.query);

    return res.status(200).json({categories: categories});
});

// FIND ONE
const findOneCategory = asyncHandler(async (req, res) => {
    const category = await categoryService.findOneCategory(req.params);

    return res.status(200).json({categories: category});
});

// UPDATE
const updateCategory = asyncHandler(async (req, res) => {
    const updatedCategory  = await categoryService.updateCategory(req.params, req.body);

    res.status(200).json(updatedCategory);
});

// DELETE ONE
const deleteOneCategory = asyncHandler(async (req, res) => {
    const result = await categoryService.deleteOneCategory(req.params);

    return res.status(200).json(result);
});

module.exports = {
    createCategory,
    findAllCategories,
    findOneCategory,
    updateCategory,
    deleteOneCategory
}
