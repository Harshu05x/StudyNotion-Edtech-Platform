const express = require("express");
const router = express.Router();

// Import middlerwares
const { auth, isInstructor } = require("../middlerwares/auth");

// Import Controllers 
const { updateProfile, deleteAccount, getAllUserDetails,getEnrolledCourses, instructorDashboard} = require("../controllers/Profile");


// ----------------------------------- [ Profile routes] --------------------------------------------------
router.put("/updateProfile", auth, updateProfile);
// router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.delete("/deleteProfile", auth, deleteAccount);
router.get("/getUserDetails", auth, getAllUserDetails);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

// // TODO: getEnrolledCourses , updateDisplayPicture routes pending...


// Export router
module.exports = router;