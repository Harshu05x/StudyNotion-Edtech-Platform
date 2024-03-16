const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        accountType: {
            type: String,
            enum: ["Admin","Instructor","Student"],
            required: true
        },
        active: {
            type: Boolean,
            default: true,
        },
        approved: {
            type: Boolean,
            default: true,
        },
        token: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
        image: {
            type: String,
            required: true,
        },
        additionalDetails: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Profile"
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course"
            }
        ],
        courseProgress:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CourseProgress"
            },
        ], 
    },
    {timestamps: true} // Add timestamps for when the document is created and last modified
);

module.exports = mongoose.model("User",userSchema);