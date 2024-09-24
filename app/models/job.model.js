const mongoose = require('mongoose');
const slugify = require('slugify');
const uniqueValidator = require('mongoose-unique-validator');
const { log } = require('console');

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
    salary: {
        type: Number,
        required: true
    },

    description: {
        type: String,
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
    return {
        slug: this.slug,
        name: this.name,
        salary: this.salary,
        description: this.description,
        id_cat: this.id_cat,
        img: this.img,
        images: this.images
    }
}

JobSchema.methods.toJobCarouselResponse = async function () {
    return {
        images: this.images
    }
}

module.exports = mongoose.model('Job', JobSchema);