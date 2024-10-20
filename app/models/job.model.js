const mongoose = require('mongoose');
const slugify = require('slugify');
const uniqueValidator = require('mongoose-unique-validator');
const userModel = require("./user.model");
const authRepo = require('../repositories/auth.repo.js');

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
    favouritesCount: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},
{
    timestamps: true
});

JobSchema.plugin(uniqueValidator, { msg: "already taken" });

JobSchema.pre('validate', async function (next) {
    if (!this.slug) {
        await this.slugify();
    }
    next();
});

JobSchema.methods.slugify = async function () {
    this.slug = slugify(this.name) + '-' + (Math.random() * Math.pow(36, 10) | 0).toString(36);
};

JobSchema.methods.toJobResponse = async function (user) {
    const authorObj = await authRepo.findOne({ userId: this.author });
    return {
        slug: this.slug,
        name: this.name,
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
        updatedAt: this.updatedAt,
        favorited: user ? user.isFavourite(this._id) : false,
        favoritesCount: this.favouritesCount
    }
}

JobSchema.methods.toJobCarouselResponse = async function () {
    return {
        images: this.images
    }
}

JobSchema.methods.updateFavoriteCount = async function () {
    const favoriteCount = await userModel.count({
        favouriteJobs: { $in: [this._id] }
    });
    this.favouritesCount = favoriteCount;
    return this.save();
}

JobSchema.methods.addComment = function (commentId) {
    if (this.comments.indexOf(commentId) === -1) {
        this.comments.push(commentId);
    }
    return this.save();
};

JobSchema.methods.removeComment = function (commentId) {
    if (this.comments.indexOf(commentId) !== -1) {
        this.comments.remove(commentId);
    }
    return this.save();
};

module.exports = mongoose.model('Job', JobSchema);