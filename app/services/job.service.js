// SERVICES: toda la lógica de negocio
const jobRepo = require('../repositories/job.repo.js');
const categoryRepo = require('../repositories/category.repo.js');
const { resp } = require('../utils/utils.js');


// CREATE
const createJob = async (data) => {
    const job_data = {
        name: data.name || null,
        author: data.author || null,
        description: data.description || null,
        salary: data.salary || null,
        images: data.images,
        img: data.img || null,
        id_cat: data.id_cat || null,
        id_contract: data.id_contract || null,
        id_workingDay: data.id_workingDay || null,
        id_province: data.id_province || null
    };

    const id_cat = data.id_cat;

    const category = await categoryRepo.findOneCategory({ id_cat });
    if (!category) return resp(404, { message: "Categoria no encontrada" });

    const newJob = await jobRepo.createJob(job_data);
    if (!newJob) return resp(400, { message: "No se pudo crear el trabajo" });

    await category.addJob(newJob._id);
    return resp(201, await newJob.toJobResponse());
};


const findOneJob = async (params) => {
    const job = await jobRepo.findOneJob(params);
    if (!job) return resp(404, { message: "Trabajo no encontrado" });
    return resp(200, { job: await job.toJobResponse() });
};


const findAllJobs = async (params) => {
    const { jobs, job_count } = await jobRepo.findAllJobs(params);
    if (!jobs) return resp(404, { message: "No se encontraron trabajos" });
    const res = {
        jobs: await Promise.all(jobs.map(async job => {
            return await job.toJobResponse();
        })),
        job_count
    };
    return resp(200, res);
};


const getJobsByCategory = async (params) => {
    const category = await categoryRepo.findOneCategory(params);
    if (!category) return resp(404, { message: "Categoria no encontrada" });
    const res = await Promise.all(category.jobs.map(async jobId => {
        const jobObj = await jobRepo.getJobsByCategory(jobId);
        return await jobObj.toJobResponse();
    }))
    return resp(200, { jobs: res });
};


const updateJob = async (params, data) => {
    const updatedJob = await jobRepo.updateJob(params, data);
    if (!updatedJob) return resp(400, { message: "No se pudo actualizar el trabajo" });
    return resp(200, await updatedJob.toJobResponse());
};


const deleteOneJob = async (params) => {
    const job = await jobRepo.findOneJob(params);

    if (!job) return resp(404, { message: "Trabajo no encontrado" });

    const id_cat = job.id_cat;
    const category = await categoryRepo.findOneCategory({ id_cat });

    if (category) {
        await category.removeJob(job._id)
    }
    await jobRepo.deleteOneJob(params);
    return resp(200, { message: "Trabajo eliminado" });
};


module.exports = {
    createJob,
    findOneJob,
    findAllJobs,
    updateJob,
    getJobsByCategory,
    deleteOneJob
}
