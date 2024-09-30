// SERVICES: toda la lógica de negocio
const jobRepo = require('../repositories/job.repo.js');
const categoryRepo = require('../repositories/category.repo.js');
const contractRepo = require('../repositories/contract.repo.js');
const workingDayRepo = require('../repositories/workingDay.repo.js');
const provinceRepo = require('../repositories/province.repo.js');

// CREATE
const createJob = async (data) => {
    const job_data = {
        name: data.name || null,
        author: data.author || null,
        description: data.description || null,
        contract: data.contract || null,
        working_day: data.working_day || null,
        province: data.province || null,
        salary: data.salary || null,
        images: data.images,
        img: data.img || null,
        id_cat: data.id_cat || null,
    };

    // comprueba si existe el id de categoria en su respectiva colección
    const id_cat = data.id_cat;
    const category = await categoryRepo.findOneCategory({ id_cat });
    if (!category) {
        return { message: "Categoria no encontrada" };
    }

    // comprueba si existe el id de contrato en su respectiva colección
    const id_contract = data.contract;
    const contract = await contractRepo.findContractId(id_contract);
    if (!contract) {
        return { message: "Contrato no encontrado" };
    }

    // comprueba si existe el id de workingDay en su respectiva colección
    const id_workingDay = data.working_day;
    const workingDay = await workingDayRepo.findWorkingDayId(id_workingDay);
    if (!workingDay) {
        return { message: "Jornada no encontrada" };
    }

    // comprueba si existe el id de province en su respectiva colección
    const id_province = data.province;
    const province = await provinceRepo.findProvinceId(id_province);
    if (!province) {
        return { message: "Provincia no encontrada" };
    }

    const newJob = await jobRepo.createJob(job_data);

    if (!newJob) { //si no se crea el trabajo
        return { message: "No se ha creado el trabajo" };
    }

    await category.addJob(newJob._id); //añadir trabajo a la categoría
    return await newJob.toJobResponse();
};

// FIND ONE
const findOneJob = async (params) => {
    const job = await jobRepo.findOneJob(params);

    if (!job) {
        return { message: "Trabajo no encontrado" };
    }

    return await job.toJobResponse();
};

// FIND ALL
const findAllJobs = async (params) => {
    const { jobs, job_count } = await jobRepo.findAllJobs(params);

    if (!jobs) {
        return { message: "No se encontraron trabajos" };
    }

    return {
        jobs: await Promise.all(jobs.map(async job => {
            return await job.toAllJobResponse();
        })),
        job_count
    };
};

// GET JOBS BY CATEGORY
const getJobsByCategory = async (params) => {
    const category = await categoryRepo.findOneCategory(params);

    if (!category) {
        return { message: "Categoria no encontrada" };
    }

    return await Promise.all(category.jobs.map(async jobId => {
        const jobObj = await jobRepo.getJobsByCategory(jobId);
        return await jobObj.toAllJobResponse();
    }))
};

// UPDATE
const updateJob = async (params, data) => {
    const updatedJob = await jobRepo.updateJob(params, data);

    if (!updatedJob) {
        return { message: "Trabajo no encontrado" };
    }

    return await updatedJob.toJobResponse();
};

// DELETE
const deleteOneJob = async (params) => {
    const job = await jobRepo.findOneJob(params);

    if (!job) {
        return { message: "Trabajo no encontrado" };
    }

    const id_cat = job.id_cat;
    const category = await categoryRepo.findOneCategory({ id_cat });

    if (category) {
        await category.removeJob(job._id) // metodo en category.model.js, elimina trabajo del array de categoria
    }

    await jobRepo.deleteOneJob(params);
    return { message: "Trabajo eliminado" };
};

module.exports = {
    createJob,
    findOneJob,
    findAllJobs,
    updateJob,
    getJobsByCategory,
    deleteOneJob
}
