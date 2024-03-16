const Section = require("../models/Section");
const Course = require("../models/Course");

// create Section handler function
exports.createSection = async(req,res) => {
    try {
        // fetch data
        const {sectionName, courseId} = req.body;

        // validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "Missing properties"
            })
        }

        // create section
        const newSection = await Section.create({sectionName});
       

        // add created section in course schema
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            {_id: courseId},
            {
                $push: {
                    coursesContent: newSection._id
                }
            },
            {new: true}
        ).populate({
            path: "coursesContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        // send response
        return res.status(200).json({
            success: true,
            data: updatedCourseDetails,
            message: "Section created successfully."
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while creating a section."
        })
    }
}

// update Section handler function
exports.updateSection = async(req,res) => {
    try {
        // fetch data
        const {sectionName, sectionId, courseId} = req.body;

        // validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success: false,
                message: "Missing properties"
            })
        }

        // update section
        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},{sectionName: sectionName},{new: true}).populate("subSection").exec();
        
        const course = await Course.findById(
            {_id: courseId}
        ).populate({
            path: "coursesContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        // send response
        return res.status(200).json({
            success: true,
            data: course,
            message: "Section updated successfully."
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while updating a section."
        })
    }
}

// delete Section handler function
exports.deleteSection = async(req,res) => {
    try {
        // fetch data
        const {sectionId,courseId} = req.body;

        // validation
        if(!sectionId || !courseId){
            return res.status(400).json({
                success: false,
                message: "Missing properties"
            })
        }

        // delete section from course schema also
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            {_id: courseId},
            {
                $pull: {
                    coursesContent: sectionId
                }
            },
            {new: true}
        ).populate({
            path: "coursesContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        // delete section
        const deletedSection = await Section.findByIdAndDelete({_id: sectionId});


        // send response
        return res.status(200).json({
            success: true,
            data: updatedCourseDetails,
            message: "Section deleted successfully."
        });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while deleting a section."
        })
    }
}