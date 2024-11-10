const jobModel = require('../models/job.model.js');
const authRepo = require('../repositories/auth.repo.js');
const { isNotUndefined } = require('../shared/utils/utils.js');


const createJob = async (data) => {
    const job = await new jobModel(data); //creamos un nuevo objeto de tipo jobModel
    return await job.save(); //guardamos el objeto en la base de datos
};

const findOneJob = async (params) => {
    const res = await jobModel.findOne(params);
    return res;
};

const findAllJobs = async (params) => {
    let { limit, offset, category, contract, workingDay, province, name, salary_min, salary_max, author } = params;
    const name_regex = new RegExp(name, 'i');

    limit = isNotUndefined(limit) ? parseInt(limit) : 3;
    offset = isNotUndefined(offset) ? parseInt(offset) : 0;
    category = isNotUndefined(category) ? category : "";
    contract = isNotUndefined(contract) ? contract : "";
    workingDay = isNotUndefined(workingDay) ? workingDay : "";
    province = isNotUndefined(province) ? province : "";
    name = isNotUndefined(name) ? name : "";
    salary_min = isNotUndefined(salary_min) ? salary_min : 0;
    salary_max = isNotUndefined(salary_max) ? salary_max : 999999;
    author = isNotUndefined(author) ? author : "";

    query = {
        name: { $regex: name_regex },
        $and: [{ salary: { $gte: salary_min } }, { salary: { $lte: salary_max } }]
    };

    category != "" && (query.id_cat = category);
    contract != "" && (query.id_contract = contract);
    workingDay != "" && (query.id_workingDay = workingDay);
    province != "" && (query.id_province = province);

    if (author) {
        const authorFind = await authRepo.findOneUserModel({username: author});
        if (authorFind) {
            author = authorFind._id;
        }
    }

    const jobs = await jobModel.find(query).limit(Number(limit)).skip(Number(offset)).sort({createdAt: 'desc'});
    const job_count = await jobModel.find(query).count();
    return { jobs, job_count };
};

const getJobsByCategory = async (jobId) => {
    return await jobModel.findById(jobId);
};

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

const deleteOneJob = async (params) => {
    return await jobModel.deleteOne(params);
}

const updateFavoriteCount = async (job) => {
    return await job.updateFavoriteCount();
}

const toJobResponse = async (job, user) => {
    return await job.toJobResponse(user);
}

const addComment = async (job, comment_id) => {
    return await job.addComment(comment_id);
}

const removeComment = async (job, comment_id) => {
    return await job.removeComment(comment_id);
}

const getUserJobs = async (data) => {
    return await jobModel.find({ author: data._id });
}


module.exports = {
    createJob,
    findOneJob,
    findAllJobs,
    updateJob,
    getJobsByCategory,
    deleteOneJob,
    updateFavoriteCount,
    toJobResponse,
    addComment,
    removeComment,
    getUserJobs,
}
