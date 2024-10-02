const mongoose = require('mongoose');
const slugify = require('slugify');
const uniqueValidator = require('mongoose-unique-validator');
const Contract = require("./contract.model");
const WorkingDay = require("./workingDay.model");
const Province = require("./province.model");
const Auth = require("./auth.model");

const JobSchema = mongoose.Schema({
    slug: {
        type: String,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    // author: {
    //     type: String,
    //     required: true
    // },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth'
    },
    description: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    images: [],

    img: {
        type: String,
        required: true
    },
    id_cat: {
        type: String,
        required: false
    },
    id_contract: {
        type: String,
        required: false
    },
    id_workingDay: {
        type: String,
        required: false
    },
    id_province: {
        type: String,
        required: false
    },
},
{
    timestamps: true
});

JobSchema.plugin(uniqueValidator, { msg: "already taken" });

JobSchema.pre('validate', async function (next) {
    if (!this.slug) {
        await this.slugify();
    }

    console.log(this.slug);
    next();
});

JobSchema.methods.slugify = async function (user) {
    this.slug = slugify(this.name) + '-' + (Math.random() * Math.pow(36, 10) | 0).toString(36);
};

JobSchema.methods.toJobResponse = async function (user) {
    const authorObj = await Auth.findById(this.author);
    // const contractObj = await Contract.findById(this.id_contractcontract);
    // const workingDayObj = await WorkingDay.findById(this.id_working_day);
    // const provinceObj = await Province.findById(this.id_province);
    return {
        slug: this.slug,
        name: this.name,
        author: this.author,
        author:  authorObj.toProfileJSON(user),
        description: this.description,
        id_contract: this.id_contract,
        id_workingDay: this.id_workingDay,
        id_province: this.id_province,
        salary: this.salary,
        images: this.images,
        img: this.img,
        id_cat: this.id_cat,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    }
}

// JobSchema.methods.toAllJobResponse = async function () {
//     return {
//         slug: this.slug,
//         name: this.name,
//         author: this.author,
//         description: this.description,
//         contract: this.contract,
//         working_day: this.working_day,
//         province: this.province,
//         salary: this.salary,
//         images: this.images,
//         img: this.img,
//         id_cat: this.id_cat,
//         createdAt: this.createdAt,
//         updatedAt: this.updatedAt
//     }
// }

JobSchema.methods.toJobCarouselResponse = async function () {
    return {
        images: this.images
    }
}

module.exports = mongoose.model('Job', JobSchema);