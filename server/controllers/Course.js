const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadFileToCloudinary } = require("../utilis/fileUploader");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utilis/secToDuration");

// Handler Function for create course
exports.createCourse = async (req, res) => {
    try {
        // get user id
        const userId = req.user.id;
        // fetch data 
        let {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
            status,
            instructions,
        } = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;
        console.log(thumbnail);

        // validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tag || !thumbnail) {
            return res.status(403).json({
                success: false,
                message: "All fields are required."
            });
        }

        if (!status || status === undefined) {
            status = "Draft";
        }

        const instructorDetails = await User.findById(userId, { accountType: "Instructor", });
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor details not found."
            });
        }

        // category validation
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category details not found."
            });
        }

        // Upload Image to cloudinary
        const thumbnailImage = await uploadFileToCloudinary(thumbnail, process.env.FLODER_NAME);

        // create new course entry in DB
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: JSON.parse(tag),
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions: JSON.parse(instructions),
        });

        // add new course id to user schema of instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            { new: true }
        )

        // update category schema
        const catalogData = await Category.findByIdAndUpdate(
            { _id: categoryDetails._id },
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            { new: true }
        );

        console.log(catalogData);

        // send response
        return res.status(200).json({
            success: true,
            data: newCourse,
            message: "New course created successfully.."
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while creating new course."
        });
    }
}

// Get all courses handler Function
exports.showAllCourses = async (req, res) => {
    try {
        // get all course
        const allCourses = await Course.find(
            { status: "Published" },
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnroled: true,
            }
        ).populate("instructor").exec();

        // return response
        return res.status(200).json({
            success: true,
            message: `All courses returned successfully.`,
            data: allCourses
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while getting all courses."
        });
    }
}

// Edit Course Details
exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const updates = req.body
        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({ error: "Course not found" })
        }

        // If Thumbnail Image is found, update it
        if (req.files) {
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadFileToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key])
                } else {
                    course[key] = updates[key]
                }
            }
        }

        await course.save()

        const updatedCourse = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "coursesContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()

        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body
        const courseDetails = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "coursesContent",
                populate: {
                    path: "subSection",
                    select: "-videoUrl",
                },
            })
            .exec()

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }

        let totalDurationInSeconds = 0
        courseDetails.coursesContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// Get all details of a course
exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id
        const courseDetails = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "coursesContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()

        let courseProgressCount = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId,
        })

        console.log("courseProgressCount : ", courseProgressCount)

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }

        let totalDurationInSeconds = 0
        courseDetails.coursesContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos
                    ? courseProgressCount?.completedVideos
                    : [],
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
    try {
        // Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id

        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 })

        // Return the instructor's courses
        res.status(200).json({
            success: true,
            data: instructorCourses,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}

// Delete the Course
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body

        // Find the course
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId },
            })
        }

        // Delete sections and sub-sections
        const courseSections = course.coursesContent
        for (const sectionId of courseSections) {
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }

        // Delete the course
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}