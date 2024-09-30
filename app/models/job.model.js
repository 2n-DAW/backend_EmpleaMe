const mongoose = require('mongoose');
const slugify = require('slugify');
const uniqueValidator = require('mongoose-unique-validator');
const Contract = require("./contract.model");
const WorkingDay = require("./workingDay.model");
const Province = require("./province.model");

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
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract',
        required: true
    },
    working_day: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkingDay',
        required: true
    },
    province: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Province',
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
    }
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

JobSchema.methods.slugify = async function () {
    this.slug = slugify(this.name) + '-' + (Math.random() * Math.pow(36, 10) | 0).toString(36);
};

JobSchema.methods.toJobResponse = async function () {
    const contractObj = await Contract.findById(this.contract);
    const workingDayObj = await WorkingDay.findById(this.working_day);
    const provinceObj = await Province.findById(this.province);
    return {
        slug: this.slug,
        name: this.name,
        author: this.author,
        description: this.description,
        contract: contractObj.toContractJSON(),
        working_day: workingDayObj.toWorkingDayJSON(),
        province: provinceObj.toProvinceJSON(),
        salary: this.salary,
        images: this.images,
        img: this.img,
        id_cat: this.id_cat,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    }
}

JobSchema.methods.toAllJobResponse = async function () {
    return {
        slug: this.slug,
        name: this.name,
        author: this.author,
        description: this.description,
        contract: this.contract,
        working_day: this.working_day,
        province: this.province,
        salary: this.salary,
        images: this.images,
        img: this.img,
        id_cat: this.id_cat,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    }
}

JobSchema.methods.toJobCarouselResponse = async function () {
    return {
        images: this.images
    }
}

module.exports = mongoose.model('Job', JobSchema);