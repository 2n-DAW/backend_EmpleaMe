// SERVICES: toda la lógica de negocio
const jobRepo = require('../repositories/job.repo.js');
const categoryRepo = require('../repositories/category.repo.js');
const contractRepo = require('../repositories/contract.repo.js');
const workingDayRepo = require('../repositories/workingDay.repo.js');
const provinceRepo = require('../repositories/province.repo.js');
const authRepo = require('../repositories/auth.repo.js');
const { resp } = require('../utils/utils.js');

// CREATE
const createJob = async (req) => {
    const id = req.userId;
    const author = await authRepo.findById(id);
    if (!author) return resp(404, { message: "Usuario no logeado" });

    // comprueba si existe el id de categoria en su respectiva colección
    const id_cat = req.body.id_cat;
    const category = await categoryRepo.findOneCategory({ id_cat });
    if (!category) return resp(404, { message: "Categoria no encontrada" });

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

    const job_data = {
        name: req.body.name || null,
        description: req.body.description || null,
        salary: req.body.salary || null,
        images: req.body.images,
        img: req.body.img || null,
        id_cat: req.body.id_cat || null,
        id_contract: req.body.id_contract || null,
        id_workingDay: req.body.id_workingDay || null,
        id_province: req.body.id_province || null,
        author: id
    };

    const newJob = await jobRepo.createJob(job_data);
    if (!newJob) return resp(400, { message: "No se pudo crear el trabajo" });

    await category.addJob(newJob._id); //añadir trabajo a la categoría
    return resp(201, await newJob.toJobResponse(author));
};


const findOneJob = async (params) => {
    const job = await jobRepo.findOneJob(params);

    if (!job) return resp(404, { message: "Trabajo no encontrado" });

    return resp(200, { job: await job.toJobResponse() });
};

// // FEED ALL JOBS
// const feedAllJobs = async (req, params) => {
//     const userId = req.userId;
//     const loginUser = await authRepo.findById(userId);

//     if (!loginUser) {
//         return { message: "Usuario no encontrado" };
//     }

//     const { jobs, job_count } = await jobRepo.feedAllJobs(params, loginUser);

//     if (!jobs) {
//         return { message: "No se encontraron trabajos" };
//     }

//     return {
//         jobs: await Promise.all(jobs.map(async job => {
//             return await job.toJobResponse(loginUser);
//         })),
//         job_count
//     };
// };

// FIND ALL JOBS
const findAllJobs = async (req) => {
    const { jobs, job_count } = await jobRepo.findAllJobs(req.query);

    if (!jobs) return resp(404, { message: "No se encontraron trabajos" });

    if (req.loggedin) {
        res = {
            jobs: await Promise.all(jobs.map(async job => {
                return await job.toJobResponse(loginUser);
            })),
            job_count
        };
    } else {
        res = {
            jobs: await Promise.all(jobs.map(async job => {
                return await job.toJobResponse(false);
            })),
            job_count
        };
    }

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

// UPDATE
const updateJob = async (req) => {
    const updatedJob = await jobRepo.updateJob(req.params, req.body);
    if (!updatedJob) return resp(400, { message: "No se pudo actualizar el trabajo" });

    const userId  = req.userId;
    const loginUser = await authRepo.findById(userId);
    if (!loginUser) return resp(404, { message: "Usuario no encontrado" });

    return resp(200, await updatedJob.toJobResponse(loginUser));
};

// DELETE
const deleteOneJob = async (req) => {
    const job = await jobRepo.findOneJob(req.params);
    if (!job) return resp(404, { message: "Trabajo no encontrado" });

    const userId  = req.userId;
    const loginUser = await authRepo.findById(userId);
    if (!loginUser) return resp(404, { message: "Usuario no encontrado" });

    const id_cat = job.id_cat;
    const category = await categoryRepo.findOneCategory({ id_cat });

    if (category) await category.removeJob(job._id) // metodo en category.model.js, elimina trabajo del array de categoria

    if (job.author.toString() === loginUser._id.toString()) {
        await jobRepo.deleteOneJob(req.params);
        return resp(200, { message: "Trabajo eliminado" });
    } else {
        return resp(400, { message: "Solo la empresa responsable de la oferta de trabajo puede eliminarla" });
    }
};


module.exports = {
    createJob,
    findOneJob,
    findAllJobs,
    updateJob,
    getJobsByCategory,
    deleteOneJob
}
