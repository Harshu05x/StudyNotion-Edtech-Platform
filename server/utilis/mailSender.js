const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async(email,title,body) => {
    try {
        // Create Transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        let info = await transporter.sendMail({
            from: "StudyNotion || H&M - by Harshad",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        });

        console.log("Mail Info--> ", info);
        return info;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = mailSender;