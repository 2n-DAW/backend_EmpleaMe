const jobRepo = require('../repositories/job.repo.js');
const categoryRepo = require('../repositories/category.repo.js');
const authRepo = require('../repositories/auth.repo.js');
const { resp } = require('../utils/utils.js');
const inscriptionRepo = require('../repositories/inscription.repo.js');


const createJob = async (req) => {
    const id = req.userId;
    const { name, description, salary, images, img, id_cat, id_contract, id_workingDay, id_province } = req.body;

    const author = await authRepo.findById(id);
    if (!author) return resp(404, { message: "Usuario no logeado" });
    const category = await categoryRepo.findOneCategory({ id_cat });
    if (!category) return resp(404, { message: "Categoria no encontrada" });

    const job_data = {
        name: name || null,
        description: description || null,
        salary: salary || null,
        images: images,
        img: img || null,
        id_cat: id_cat || null,
        id_contract: id_contract || null,
        id_workingDay: id_workingDay || null,
        id_province: id_province || null,
        author: id
    };

    const { newJob } = await jobRepo.createJob(job_data);
    if (!newJob) return resp(400, { message: "No se pudo crear el trabajo" });

    await category.addJob(newJob._id); //añadir trabajo a la categoría
    return resp(201, await newJob.toJobResponse(author));
};


const findOneJob = async (req) => {
    const job = await jobRepo.findOneJob(req.params);

    if (!job) return resp(404, { message: "Trabajo no encontrado" });

    if (req.loggedin) {
        const loginUser = await authRepo.findById(req.userId);
        res = { job: await job.toJobResponse(loginUser) };
    } else {
        res = { job: await job.toJobResponse(false) };
    }

    return resp(200, res);
};


const findAllJobs = async (req) => {
    const { jobs, job_count } = await jobRepo.findAllJobs(req.query);

    if (!jobs) return resp(404, { message: "No se encontraron trabajos" });


    let res = {};
    if (req.loggedin) {
        const loginUser = await authRepo.findById(req.userId);
        console.log(req.userEmail);
        const userInscriptions = await inscriptionRepo.findUserInscriptions(req.userEmail);
        console.log(userInscriptions);

        res = {
            jobs: await Promise.all(jobs.map(async job => {
                const inscription = userInscriptions.find(inscription => inscription.job === job.slug);
                console.log(inscription);
                return await job.toJobResponse(loginUser, inscription ? inscription.status : 0);
            })),
            job_count
        };

        return resp(200, res);
    } else {
        res = {
            jobs: await Promise.all(jobs.map(async job => {
                return await job.toJobResponse(false, 0);
            })),
            job_count
        };

        return resp(200, res);
    }
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


const updateJob = async (req) => {
    const updatedJob = await jobRepo.updateJob(req.params, req.body);
    if (!updatedJob) return resp(400, { message: "No se pudo actualizar el trabajo" });

    const userId = req.userId;
    const loginUser = await authRepo.findById(userId);
    if (!loginUser) return resp(404, { message: "Usuario no encontrado" });

    return resp(200, await updatedJob.toJobResponse(loginUser));
};


const deleteOneJob = async (req) => {
    const job = await jobRepo.findOneJob(req.params);
    if (!job) return resp(404, { message: "Trabajo no encontrado" });

    const userId = req.userId;
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


const favoriteJob = async (req) => {
    const idUser = req.userId;
    const { slug } = req.params;
    const loginUser = await authRepo.findById(idUser);
    if (!loginUser) return resp(404, { message: "Usuario no encontrado" });
    const job = await jobRepo.findOneJob({ slug });
    if (!job) return resp(404, { message: "Trabajo no encontrado" });
    await authRepo.favorite(loginUser, job._id);
    const updatedJob = await jobRepo.updateFavoriteCount(job);
    return resp(200, { job: await jobRepo.toJobResponse(updatedJob, loginUser) });
};


const unfavoriteJob = async (req) => {
    const idUser = req.userId;
    const { slug } = req.params;
    const loginUser = await authRepo.findById(idUser);
    if (!loginUser) return resp(404, { message: "Usuario no encontrado" });
    const job = await jobRepo.findOneJob({ slug });
    if (!job) return resp(404, { message: "Trabajo no encontrado" });
    await authRepo.unfavorite(loginUser, job._id);
    const updatedJob = await jobRepo.updateFavoriteCount(job);
    return resp(200, { job: await jobRepo.toJobResponse(updatedJob, loginUser) });
};


module.exports = {
    createJob,
    findOneJob,
    findAllJobs,
    updateJob,
    getJobsByCategory,
    deleteOneJob,
    favoriteJob,
    unfavoriteJob
}
