const mongoose = require("mongoose");
const mailSender = require("../utilis/mailSender");
const emailTemplate = require("../mails/templates/emailVerificationTemplate");


const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // The document will be automatically deleted after 5 minutes of its creation time
        expires: 5*60
    },
    otp: {
        type: String,
        required: true
    }  
});

// Function to send verification email
async function sendVerificationEmail(email,otp){
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email from StudyNotion",
            emailTemplate(otp)
        );
        console.log("Email sent successfully", mailResponse);

    } catch (error) {
        console.log("Error occured while sending verification email", error.message);
        throw error;
    }
}

// Define a post-save hook to send email after the document has been saved
otpSchema.pre("save", async function(next){
    // Only send an email when a new document is created
    if(this.isNew){
        await sendVerificationEmail(this.email,this.otp);
    }
    next();
})

module.exports = mongoose.model("OTP", otpSchema);