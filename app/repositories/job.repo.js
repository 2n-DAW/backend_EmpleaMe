// REPOSITORIES: operaciones con la base de datos
const jobModel = require('../models/job.model.js');
const { isNotUndefined } = require('../shared/utils/utils.js');

// CREATE
const createJob = async (data) => {
    const job = await new jobModel(data); //creamos un nuevo objeto de tipo jobModel
    return await job.save(); //guardamos el objeto en la base de datos
};

// FIND ONE
const findOneJob = async (params) => {
    return await jobModel.findOne(params);
};

// FIND ALL
const findAllJobs = async (params) => {

    let { limit, offset, category, contract, workingDay, province, name, salary_min, salary_max } = params;
    const name_regex = new RegExp(name);

    limit = isNotUndefined(limit) ? parseInt(limit) : 3;
    offset = isNotUndefined(offset) ? parseInt(offset) : 0;
    category = isNotUndefined(category) ? category : "";
    contract = isNotUndefined(contract) ? contract : "";
    workingDay = isNotUndefined(workingDay) ? workingDay : "";
    province = isNotUndefined(province) ? province : "";
    name = isNotUndefined(name) ? name : "";
    salary_min = isNotUndefined(salary_min) ? salary_min : 0;
    salary_max = isNotUndefined(salary_max) ? salary_max : 999999;

    query = {
        name: { $regex: name_regex },
        $and: [{ salary: { $gte: salary_min } }, { salary: { $lte: salary_max } }]
    };

    category != "" && (query.id_cat = category);
    contract != "" && (query.id_contract = contract);
    workingDay != "" && (query.id_workingDay = workingDay);
    province != "" && (query.id_province = province);

    const jobs = await jobModel.find(query).limit(Number(limit)).skip(Number(offset));
    const job_count = await jobModel.find(query).count();
    return { jobs, job_count };
};

// GET JOBS BY CATEGORY
const getJobsByCategory = async (jobId) => {
    return await jobModel.findById(jobId);
};

// UPDATE
const updateJob = async (params, updateData) => {
    const job = await jobModel.findOne(params); //buscamos el objeto en la base de datos

    if (job) {
        const { name, salary, description, img, images } = updateData;

        job.name = name || job.name;
        job.salary = salary || job.salary;
        job.description = description || job.description;
        job.img = img || job.img;
        job.images = images || job.images;

        return await job.save();
    }

    return null;
};

// DELETE ONE
const deleteOneJob = async (params) => {
    return await jobModel.deleteOne(params);
}

module.exports = {
    createJob,
    findOneJob,
    findAllJobs,
    updateJob,
    getJobsByCategory,
    deleteOneJob
}
