const mongoose = require('mongoose');
const moment = require('moment');

const courseSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        min: 3,
        required: true,
    },
});

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        min: 2,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    createdAt: {
        type: Number,
        default: moment().unix(),
    },
    votes: {
        type: Number,
        required: true,
        default: 0
    },
});

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            min: 3,
            required: true,
        },
        description: {
            type: String,
            min: 3,
            required: true,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        courses: { type: [courseSchema], default: [] },
        reviews: { type: [reviewSchema], default: [] },
    }
);

module.exports = mongoose.model('professors', schema, 'professors');
