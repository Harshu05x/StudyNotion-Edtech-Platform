const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const mailSender = require("../utilis/mailSender");
const { passwordUpdated } = require("../mails/templates/passwordUpdate"); 
require("dotenv").config();


// Send OTP For Email Verification
exports.sendOTP = async(req,res) => {
    try {
        // fetch email
        const {email} = req.body;

        // validation
        const checkUserPresent = await User.findOne({email});
        
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: "User already registered."
            });
        };

        // Generate OTP
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })
        console.log("OTP generated: ", otp);

        // validate otp
        let result = await OTP.findOne({otp: otp});
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({otp});
        }

        // create an entry for OTP
        const response = await OTP.create({email,otp});

        // send response
        res.status(200).json({
            success: true,
            otp,
            message: "OTP sent successfully."
        });

    } catch (error) {
        console.log("Error in OTP sending: ", error.message);
        return  res.status(500).json({
            success: false,
            message: error.message
        });
    }   
}

// Signup Controller for Registering Users
exports.signUp = async (req,res) => {
    try {
        // fetch data
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            contactNumber,
            accountType,
            otp
        } = req.body;

        // validate
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success: false,
                message: "All fields are required."
            });
        };
        
        // match password
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password not matching."
            });
        };
        
        // check user already present
        const existingUser = await User.findOne({email}); 
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User is already regsitered."
            });
        };

        // find most recent OTP
        const recentOTP = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        console.log(recentOTP);
        // validate OTP
        if(recentOTP.length == 0){
            // OTP not found
            return res.status(400).json({
                success: false,
                message: "OTP not found."
            });
        }else if(otp !== recentOTP[0].otp){
            // OTP not matching
            return res.status(400).json({
                success: false,
                message: "Invalid OTP."
            });

        }

        // hash password
        const hashedPassword = await bcrypt.hash(password,10);
        
        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

		// Create the Additional Profile For User
        const profile = await Profile.create({
            gender: null, 
            dateOfBirth: null, 
            about: null,
            contactNumber: null, 
        })

        // save entry in DB
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            approved: approved,
            additionalDetails: profile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        // send response 
        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully."
        });


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "User cannot be registered."
        });

    }
}

// Login controller for authenticating users
exports.login = async(req,res) => {
    try {
        // fetch data
        const {email,password} = req.body;

        // validation
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: "All fields are required."
            });
        }

        // check user exists 
        const user = await User.findOne({email}).populate("additionalDetails").exec();
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not registered with us, please sign up first."
            });
        }
        
        // match password
        const passwordMatched = await bcrypt.compare(password,user.password);
        if(!passwordMatched){
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });   
        }

        // generate JWT token ans send in response
        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType
        }
        const token = JWT.sign(payload,process.env.JWT_SECERT,{
            expiresIn: "24h"
        })

        user.token = token;
        user.password = undefined;

        // send response with cookie
        const options = {
            expires: new Date (Date.now() + 3*24*60*60*1000),
            httpOnly: true,
        }

        res.cookie("token",token,options).status(200).json({
            success: true,
            token,
            user,
            message: "User logged in successfully"
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "User cannot be logged In."
        });
    }
}

// Controller for Changing Password
exports.changePassword = async (req, res) => {
    try {
        // Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "Old password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

        // Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

        // Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
                `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`,
				passwordUpdated(
					updatedUserDetails.email,
					`${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

        // send response 
        return res.status(200).json({
            success: true,
            message: "Password updated successfully."
        });
    } catch (error) {
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while updating password:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        });
    }
}