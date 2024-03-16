const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReviews");

// create Rating and Review handler function
exports.createRating = async(req,res) => {
    try {
        // get user Id
        const userId = req.user.id;
        // fetch data
        const {courseId,rating,review} = req.body;
        
        // check if user enrolled in course or not
        const courseDetails = await Course.findOne(
            {
                _id: courseId,
                studentsEnrolled: { $elemMatch: { $eq: userId }}
            }
        );
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "User is not enrolled in course."
            })
        };
        
        // check if user already reviewed course or not
        const alreadyReviewed = await RatingAndReview.findOne({ user: userId, course: courseId});
        if(alreadyReviewed){
            return res.status(404).json({
                success: false,
                message: "Course is already reviewed by the user."
            })
        };

        // create new rating and review
        const ratingAndReview = await RatingAndReview.create(
            {
                rating,review,
                course: courseId,
                user: userId
            }
        )

        // update course with newly created Rating and Review
        await Course.findByIdAndUpdate(
            {_id: courseId},
            {
                $push: {
                    ratingAndReviews: ratingAndReview._id
                }
            },
            {new: true}
        )

        // send response
        return res.status(200).json({
            success: true,
            message: "Rating and Review created successfully."
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while creating Rating and Review."
        });
    }
}

// get Average Rating handler function
// exports.getAvgRating = async(req,res) => {
//     try {
//         // get course id
//         const courseId = req.body;

//         // calculate average 
//         const result = RatingAndReview.aggregate(
//             [   // step 1] match on the basis of course id
//                 {
//                     $match: { coursecourse: new mongoose.Types.ObjectId(courseId) },
//                 },
//                 // step 2] group all rating under this courseId and calc avgerage
//                 {
//                     $group: {
//                         _id: null,
//                         avgRating: {$avg: "$rating"}
//                     }
//                 }

//             ]
//         );

//         console.log("getAvgRating");

//         if(result.length > 0){
//             return res.status(200).json({
//                 success: true,
//                 avgRating: result[0].avgRating,
//             })
//         }
        
//         // Average rating is 0
//         return res.status(200).json({
//             success: true,
//             avgRating: 0,
//             message: "Average rating is 0, no ratings given till now.",
//         })
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).json({
//             success: false,
//             error: error.message,
//             message: "Something went wrong while calculating average Rating."
//         });
//     }
// }


// get all rating and reviews of all courses handler function
exports.getAllRatings = async(req,res) => {
    try {
        const allRatingAndReviews = await RatingAndReview.find()
                                        .sort({rating: "desc"})
                                        .populate({
                                            path: "user",
                                            select: "firstName lastName email image"
                                        })
                                        .populate({
                                            path: "course",
                                            select: "courseName"
                                        }).exec();

        return res.status(200).json({
            success: true,
            data: allRatingAndReviews,
            message: "Rating and Reviews returned successfully.",
        })
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while geting all rating and reviews."
        });
    }
}

// get all rating and reviews of a single course handler function
exports.getAllRatingsOfCourse = async(req,res) => {
    try {
        // get course id
        const {courseId} = req.body || req.params;
        
        console.log("PRINTING COURSEID ID" ,courseId);
        // get rating and reviews
        const allRatingAndReviews = await Course.findById(
            {_id: courseId},
            {ratingAndReviews: true}
        ).populate({
            path: "ratingAndReviews",
            populate: {
                path: "user",
                select: "firstName lastName"
            }
        }).exec();
        
        console.log(allRatingAndReviews.ratingAndReviews);

        if(allRatingAndReviews?.ratingAndReviews?.length > 0){
            return res.status(200).json({
                success: true,
                data: allRatingAndReviews.ratingAndReviews.sort((a,b) => b.rating - a.rating),
                message: "Rating and Reviews returned successfully.",
            })
        }
        return res.status(200).json({
            success: true,
            data: 0,
            message: "No Rating and Reviews given till now.",
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while geting all rating and reviews of a course."
        });
    }
}