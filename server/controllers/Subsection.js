const Subsection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadFileToCloudinary } = require("../utilis/fileUploader");
const Course = require("../models/Course");

// create Subsection handler function
exports.createSubsection = async(req,res) => {
    try {
        // get all data
        const {courseId,sectionId,title,description} = req.body;
        // get video file
        const videoFile = req.files.video;
        // validation
        console.log(courseId);
        console.log(sectionId);
        console.log(title);
        console.log(description);
        if(!sectionId || !title || !description || !videoFile){
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        };

        // upload file to cloudinary
        const uploadDetails = await uploadFileToCloudinary(videoFile,process.env.FLODER_NAME);

        // create a subsection
        const newSubsection = await Subsection.create({
            title,
            description,
            timeDuration: `${uploadDetails.duration}`,
            videoUrl: uploadDetails.secure_url
        });

        // add subsection to section
        const updatedSection = await Section.findByIdAndUpdate(
            {_id: sectionId},
            {
                $push: {
                    subSection: newSubsection._id,
                }
            },
            {new: true}
        );

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
            message: "Subsection created successfully."
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while creating a subsection."
        })
    }
}


// update subsection handler function
exports.updateSubsection = async(req,res) => {
    try {
        // fetch data
        const {courseId,subSectionId,title,description} = req.body;
        const subSection = await Subsection.findById(subSectionId);
        
        // // get video file
        // const videoFile = req.files.videoFile;

        // validation
        if(!subSection){
            return res.status(400).json({
                success: false,
                message: "Subsection not found."
            });
        };

        if(title !== undefined){
            subSection.title = title;
        }

        if(description !== undefined){
            subSection.description = description;
        }
        
        // update subsection
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            
            const uploadDetails = await uploadFileToCloudinary(
                video,
                process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }
      
        await subSection.save();

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
            message: "Subsection updated successfully."
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while updating a subsection."
        })
    }
}


// delete Subsection handler function
exports.deleteSubsection = async(req,res) => {
    try {
        // fetch data
        const {courseId,sectionId,subSectionId} = req.body;
        
        // validation
        if(!subSectionId || !sectionId){
            return res.status(400).json({
                success: false,
                message: "Missing properties"
            })
        }
        
        // delete subsection from section schema
        await Section.findByIdAndUpdate(
            {_id: sectionId},
            {
                $pull: {
                    subSection: subSectionId
                }
            }
        )
        // delete subsection
        const deletedSubsection = await Subsection.findByIdAndDelete({_id: subSectionId});
        
        if (!deletedSubsection) {
            return res.status(404).json({ 
                success: false, 
                message: "SubSection not found" 
            })
        }

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
            message: "Subsection deleted successfully."
        });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while deleting a subsection."
        })
    }
}