const User = require("../models/User");
const bcrypt = require("bcrypt");
const mailSender = require("../utilis/mailSender");
const crypto = require("crypto");
require("dotenv").config();


exports.resetPasswordToken = async(req,res) => {
    try {
        // fetch email
        const {email} = req.body;
        // validate email
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Your email is not registered with us."
            });
        }

        // Generate token
        const token = crypto.randomBytes(20).toString("hex");
        console.log("Token: ", token);

        // update user
        const updatedDetails = await User.findOneAndUpdate({email: email},
                                            {
                                                token,
                                                resetPasswordExpires: Date.now() + 3600000
                                            }, {new: true})
        // create URL
        const url = `${process.env.FRONTEND_URL}/update-password/${token}`;

        // send mail
        const title = "Please reset your StudyNotion password";
        const body = `<div>
                        <h2>Reset your StudyNotion password</h2>
                        <p>We heard that you lost your StudyNotion password. Sorry about that!
                        But don't worry! You can use the following link to reset your password:</p>
                        <p>link: ${url}</p>
                        <p>If you don't use this link within 5 mintues, it will expire</p>
                        <p>Thanks,</p>
                        <p>The StudyNotion Team</p>
                    </div>`
        await mailSender(email,title,body);
        return res.status(200).json({
            success: true,
            message: "Email sent successfully, please check your email and change password."
        });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while sending reset password link"
        });
    }
}

exports.resetPassword = async(req,res) => {
    try {
        // fetch data
        const {password,confirmPassword,token} = req.body;

        // match password
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password not matching."
            });
        };

        // fetch user details from DB using token
        const user = await User.findOne({token: token});
        
        // invalid token
        if(!user || !token){
            return res.status(400).json({
                success: false,
                message: "Invalid Token."
            });
        }

        // check token expiry
        if(user.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success: false,
                message: "Link is expired, please regenerate it."
            });
        }

        // All good now hash password and update in DB
        const hashedPassword = await bcrypt.hash(password,10);
        
        await User.findOneAndUpdate(
            {token},
            {password: hashedPassword},
            {new: true}
        );
        return res.status(200).json({
            success: true,
            message: "Password reset successfull."
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Password cannot be registered."
        });
    }
}