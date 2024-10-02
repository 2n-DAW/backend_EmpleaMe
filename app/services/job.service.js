// SERVICES: toda la lógica de negocio
const jobRepo = require('../repositories/job.repo.js');
const categoryRepo = require('../repositories/category.repo.js');
const contractRepo = require('../repositories/contract.repo.js');
const workingDayRepo = require('../repositories/workingDay.repo.js');
const provinceRepo = require('../repositories/province.repo.js');
const authRepo = require('../repositories/auth.repo.js');

// CREATE
const createJob = async (req, data) => {
    const job_data = {
        name: data.name || null,
        description: data.description || null,
        salary: data.salary || null,
        images: data.images,
        img: data.img || null,
        id_cat: data.id_cat || null,
        id_contract: data.id_contract || null,
        id_workingDay: data.id_workingDay || null,
        id_province: data.id_province || null
    };

    const id = req.userId;
    const author = await authRepo.findById(id);

    // comprueba si existe el id de categoria en su respectiva colección
    const id_cat = data.id_cat;
    const category = await categoryRepo.findOneCategory({ id_cat });
    if (!category) {
        return { message: "Categoria no encontrada" };
    }

    // comprueba si existe el id de contrato en su respectiva colección
    // const id_contract = data.contract;
    // const contract = await contractRepo.findContractId(id_contract);
    // if (!contract) {
    //     return { message: "Contrato no encontrado" };
    // }

    // comprueba si existe el id de workingDay en su respectiva colección
    // const id_workingDay = data.working_day;
    // const workingDay = await workingDayRepo.findWorkingDayId(id_workingDay);
    // if (!workingDay) {
    //     return { message: "Jornada no encontrada" };
    // }

    // comprueba si existe el id de province en su respectiva colección
    // const id_province = data.province;
    // const province = await provinceRepo.findProvinceId(id_province);
    // if (!province) {
    //     return { message: "Provincia no encontrada" };
    // }

    const newJob = await jobRepo.createJob(job_data);
    newJob.author = id;

    if (!newJob) { //si no se crea el trabajo
        return { message: "No se ha creado el trabajo" };
    }

    await category.addJob(newJob._id); //añadir trabajo a la categoría
    return await newJob.toJobResponse(author);
};

// FIND ONE
const findOneJob = async (params) => {
    const job = await jobRepo.findOneJob(params);

    if (!job) {
        return { message: "Trabajo no encontrado" };
    }

    return await job.toJobResponse();
};

// FEED ALL JOBS
const feedAllJobs = async (req, params) => {
    const userId = req.userId;
    const loginUser = await authRepo.findById(userId);

    if (!loginUser) {
        return { message: "Usuario no encontrado" };
    }

    const { jobs, job_count } = await jobRepo.feedAllJobs(params, loginUser);

    if (!jobs) {
        return { message: "No se encontraron trabajos" };
    }

    return {
        jobs: await Promise.all(jobs.map(async job => {
            return await job.toJobResponse(loginUser);
        })),
        job_count
    };
};

// LIST ALL JOBS
const listAllJobs = async (req, params) => {
    const { jobs, job_count } = await jobRepo.listAllJobs(params);

    if (!jobs) {
        return { message: "No se encontraron trabajos" };
    }

    if (req.loggedin) {
        const loginUser = await authRepo.findById(req.userId);
        return {
            jobs: await Promise.all(jobs.map(async job => {
                return await job.toJobResponse(loginUser);
            })),
            job_count
        };
    } else {
        return {
            jobs: await Promise.all(jobs.map(async job => {
                return await job.toJobResponse(false);
            })),
            job_count
        };
    }
};

// GET JOBS BY CATEGORY
const getJobsByCategory = async (params) => {
    const category = await categoryRepo.findOneCategory(params);

    if (!category) {
        return { message: "Categoria no encontrada" };
    }

    return await Promise.all(category.jobs.map(async jobId => {
        const jobObj = await jobRepo.getJobsByCategory(jobId);
        return await jobObj.toJobResponse();
    }))
};

// UPDATE
const updateJob = async (req, params, data) => {
    const updatedJob = await jobRepo.updateJob(params, data);

    if (!updatedJob) {
        return { message: "Trabajo no encontrado" };
    }

    const userId  = req.userId;
    const loginUser = await authRepo.findById(userId);

    if (!loginUser) {
        return { message: "Usuario no encontrado" };
    }

    return await updatedJob.toJobResponse(loginUser);
};

// DELETE
const deleteOneJob = async (req, params) => {
    const job = await jobRepo.findOneJob(params);

    if (!job) {
        return { message: "Trabajo no encontrado" };
    }

    const userId  = req.userId;
    const loginUser = await authRepo.findById(userId);

    if (!loginUser) {
        return { message: "Usuario no encontrado" };
    }

    const id_cat = job.id_cat;
    const category = await categoryRepo.findOneCategory({ id_cat });

    if (category) {
        await category.removeJob(job._id) // metodo en category.model.js, elimina trabajo del array de categoria
    }

    if (job.author.toString() === loginUser._id.toString()) {
        await jobRepo.deleteOneJob(params);
        return { message: "Trabajo eliminado" };
    } else {
        return { message: "Solo la empresa responsable de la oferta de trabajo puede eliminarla" };
    }
};

module.exports = {
    createJob,
    findOneJob,
    feedAllJobs,
    listAllJobs,
    updateJob,
    getJobsByCategory,
    deleteOneJob
}
