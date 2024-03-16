const express = require("express");
const router = express.Router();

// Import middlerwares
const { auth, isStudent, isInstructor, isAdmin} = require("../middlerwares/auth");

// Import Controllers 
const { createCourse, showAllCourses, getFullCourseDetails, editCourse, getInstructorCourses, getCourseDetails, deleteCourse} = require("../controllers/Course");
const { createSection, updateSection, deleteSection } = require("../controllers/Section");
const { createSubsection, updateSubsection, deleteSubsection } = require("../controllers/Subsection");
const { createCategory, showAllCategories, categoryPageDetails } = require("../controllers/Catogory");
const { createRating, getAllRatings, getAllRatingsOfCourse} = require("../controllers/RatingAndReview");
const { updateCourseProgress } = require("../controllers/CourseProgress");


// ----------------------------------- [ Course Routes ] --------------------------------------------------
router.post("/createCourse", auth, isInstructor, createCourse);      // (Only by Instructor)
router.post("/getCourseDetails", getCourseDetails);
router.get("/getAllCourses", showAllCourses);
router.post("/editCourse", auth, isInstructor, editCourse);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.delete("/deleteCourse",deleteCourse);
router.post("/getFullCourseDetails",auth, getFullCourseDetails);
// TODO: edit course detail pending....

// ----------------------------------- [ Section Routes ] --------------------------------------------------
router.post("/addSection", auth, isInstructor, createSection);      // (Only by Instructor)
router.post("/updateSection", auth, isInstructor, updateSection);       // (Only by Instructor)
router.delete("/deleteSection", auth, isInstructor, deleteSection);    // (Only by Instructor)


// ----------------------------------- [ SubSection Routes ] --------------------------------------------------
router.post("/addSubSection", auth, isInstructor, createSubsection);      // (Only by Instructor)
router.post("/updateSubSection", auth, isInstructor, updateSubsection);       // (Only by Instructor)
router.delete("/deleteSubSection", auth, isInstructor, deleteSubsection);    // (Only by Instructor)


// ----------------------------------- [ Category routes ] --------------------------------------------------
router.post("/createCategory", auth, isAdmin, createCategory);     // (Only by Admin)
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);


// ----------------------------------- [ Rating and Review routes ] --------------------------------------------------
router.post("/createRating", auth, isStudent, createRating);     // (Only by Student)
router.get("/getReviews", getAllRatings);
// router.get("/getAverageRating", getAllRatings);
router.post("/getAllRatingsOfCourse", getAllRatingsOfCourse);

// ----------------------------------- [ Course Progress routes ] --------------------------------------------------
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// Export router
module.exports = router;