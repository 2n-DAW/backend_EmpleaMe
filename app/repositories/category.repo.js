const categoryModel = require("../models/category.model.js");


const createCategory = async (data) => {
    const category = await new categoryModel(data); //creamos un nuevo objeto de tipo categoryModel
    
    return await category.save(); //guardamos el objeto en la base de datos
};


const findAllCategories = async (query) => {
    const  {offset, limit} = query;
    
    return await categoryModel.find({}, {}, { skip: Number(offset), limit: Number(limit)});
};


const findOneCategory = async (params) => {
    return await categoryModel.findOne(params);
};


const updateCategory = async (params, updateData) => {
    const category = await categoryModel.findOne(params); //buscamos el objeto en la base de datos

    if (category) {
        const { id_cat, category_name, image, jobs } = updateData;

        category.id_cat = id_cat || category.id_cat;
        category.category_name = category_name || category.category_name;
        category.image = image || category.image;
        category.jobs = jobs || category.jobs;
    
        return await category.save();
    }

    return null;
};


const deleteOneCategory = async (params) => {
    return await categoryModel.findOneAndDelete(params);
};

module.exports = {
    createCategory,
    findAllCategories,
    findOneCategory,
    updateCategory,
    deleteOneCategory
}
