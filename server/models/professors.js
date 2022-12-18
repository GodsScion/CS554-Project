const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        min: 3,
        required: true,
    },
});

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        min: 3,
        required: true,
    },
    userId: mongoose.Schema.Types.ObjectId,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    createdAt: {
        type: Number,
        required: true,
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
            min: 1,
            max: 5,
            required: true,
        },
        courses: [courseSchema],
        reviews: [reviewSchema]
    }
);

module.exports = mongoose.model('courses', schema, 'courses');
