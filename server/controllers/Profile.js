const User = require("../models/User");
const Profile = require("../models/Profile");
const { uploadFileToCloudinary } = require("../utilis/fileUploader");
const { convertSecondsToDuration } = require("../utilis/secToDuration");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");

// update profile handler
exports.updateProfile = async (req, res) => {
    try {
        // get data
        const {
            firstName = "",
            lastName = "",
            dateOfBirth = "",
            about = "",
            gender = "",
            contactNumber = ""
        } = req.body;

        // get user id
        const id = req.user.id;

        // get profile id from user schema
        const user = await User.findById({ _id: id });

        // update profile
        const updatedProfile = await Profile.findByIdAndUpdate(
            { _id: user.additionalDetails },
            { gender, dateOfBirth, about, contactNumber },
            { new: true }
        );
        console.log("Updated Profile: ", updatedProfile);

        // update user 
        const updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            {
                firstName,
                lastName
            },
            { new: true },
        ).populate("additionalDetails").exec();

        // send response
        return res.status(200).json({
            success: true,
            data: updatedUser,
            message: "Profile updated successfully."
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while updating a profile."
        })
    }
}

// TODO: schedule this deletion opertion
// delete account handler
exports.deleteAccount = async (req, res) => {
    try {
        // get id
        const id = req.user.id;

        // validate
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            })
        }

        // delete profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
        // TODO: remove user from course enrolled
        // delete user
        await User.findByIdAndDelete(id);

        // send response
        return res.status(200).json({
            success: true,
            User,
            message: "Account deleted successfully."
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while deleting a account."
        })
    }
}

// Get all details of user handler Function
exports.getAllUserDetails = async (req, res) => {
    try {
        // get id 
        const id = req.user.id;

        // get all details
        const allUserDetails = await User.findById(id).populate("additionalDetails").exec();

        // validation
        if (!allUserDetails) {
            return res.status(404).json({
                success: false,
                message: "User details not found."
            })
        }
        // return response
        return res.status(200).json({
            success: true,
            message: `All details of user returned successfully.`,
            allUserDetails
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while getting all details of user."
        });
    }
}

// TODO: getEnrolledCourses , updateDisplayPicture controllers pending...
exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;

        const image = await uploadFileToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id
        let userDetails = await User.findOne({
            _id: userId,
        }).populate({
            path: "courses",
            populate: {
                path: "coursesContent",
                populate: {
                    path: "subSection",
                },
            }
        });


        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0
            SubsectionLength = 0
            for (var j = 0; j < userDetails.courses[i].coursesContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].coursesContent[
                    j
                ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
                userDetails.courses[i].totalDuration = convertSecondsToDuration(
                    totalDurationInSeconds
                )
                SubsectionLength +=
                    userDetails.courses[i].coursesContent[j].subSection.length
            }
            let courseProgressCount = await CourseProgress.findOne({
                courseId: userDetails.courses[i]._id,
                userId: userId,
            })
            courseProgressCount = courseProgressCount?.completedVideos.length
            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100
            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage =
                    Math.round(
                        (courseProgressCount / SubsectionLength) * 100 * multiplier
                    ) / multiplier
            }
        }

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.instructorDashboard = async (req,res) => {
    try {
        const courseDetails = await Course.find({instructor: req.user.id});

        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found."
            })
        }

        let totalIncome = 0;
        let totalStudents = 0;
        const courseData = courseDetails.map( (course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmount = totalStudentsEnrolled * course.price;
            totalIncome += totalAmount;
            totalStudents += totalStudentsEnrolled;
            
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                description: course.courseDescription,
                thumbnail: course.thumbnail,
                price: course.price,
                totalStudentsEnrolled,
                totalAmount
            }
            return courseDataWithStats;
        })

        return res.status(200).json({
            success: true,
            data: {courseData,totalIncome, totalStudents},
            message: "Instructor Stats fetched successfully."
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}