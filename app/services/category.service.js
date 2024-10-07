const categoryRepo = require("../repositories/category.repo.js");
const { resp } = require("../utils/utils.js");


const createCategory = async (data) => {
    const category_data = {
        id_cat: data.id_cat || null,
        category_name: data.category_name || null,
        image: data.image || null,
        jobs: []
    };
    const res = await categoryRepo.createCategory(category_data);
    return resp(201, res.toCategoryResponse());
};


const findAllCategories = async (query) => {
    const categories = await categoryRepo.findAllCategories(query);
    if (!categories) return resp(404, { message: "Categorías no encontradas" });
    const res = await Promise.all(categories.map(async category => {
        return await category.toCategoryResponse();
    }));
    return resp(200, { categories: res });
};


const findOneCategory = async (params) => {
    const category = await categoryRepo.findOneCategory(params);
    if (!category) return resp(404, { message: "Categoría no encontrada" });
    return resp(200, { categories: category.toCategoryResponse() });
};


const updateCategory = async (params, data) => {
    const updatedCategory = await categoryRepo.updateCategory(params, data);
    if (!updatedCategory) return resp(404, { message: "Categoría no encontrada" });
    return resp(200, updatedCategory.toCategoryResponse());
};


const deleteOneCategory = async (params) => {
    const category = await categoryRepo.deleteOneCategory(params);
    if (!category) return resp(404, { message: "Categoría no encontrada" });
    return resp(200, { message: "Categoría eliminada" });
};

module.exports = {
    createCategory,
    findAllCategories,
    findOneCategory,
    updateCategory,
    deleteOneCategory
}
