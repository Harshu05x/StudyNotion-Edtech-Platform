const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    courseDescription: {
        type: String,
        required: true,
        trim: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    whatYouWillLearn: {
        type: String,
        // required: true,
    },
    coursesContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }
    ],
    ratingAndReviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReviews"
        },
    ], 
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    tag: {
        type: [String],
        trim: true
    },
    studentsEnrolled:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
    ], 
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    
},{timestamps: true});

module.exports = mongoose.model("Course",courseSchema);