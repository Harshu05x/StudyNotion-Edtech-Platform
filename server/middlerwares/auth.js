const jwt = require("jsonwebtoken");
require("dotenv").config();

// Authentication
exports.auth = (req,res,next) => {
    try{
        // Extract the token
        const token = req.body.token || 
                      req.cookies.token ||
                      req.header("Authorization")?.replace("Bearer ", "");
        console.log("Auth middlerware: ",token);

        // if Token is not present then return response with error
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            });
        };

        // Decode Token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECERT);
            console.log(decode);
            req.user = decode;
            
        }catch(e){
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            });
        };

        // Go to next middleware
        next();
    }catch(e){
        console.log(e.message);
        return res.status(500).json({
            success: false,
            error: e.message,
            message: "Someting went wrong while token validation"
        })
    }
}


// isStudent Authorization
exports.isStudent = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Students only"
            })
        }
        next();

    }catch(e){
        console.log(e.message);
        return res.status(500).json({
            success: false,
            error: e.message,
            message: "User role cannot be verified."
        })
    }
}
// isInstructor Authorization
exports.isInstructor = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructors only"
            })
        }
        next();

    }catch(e){
        console.log(e.message);
        return res.status(500).json({
            success: false,
            error: e.message,
            message: "User role cannot be verified."
        })
    }
}
// isAdmin Authorization
exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admins only"
            })
        }
        next();

    }catch(e){
        console.log(e.message);
        return res.status(500).json({
            success: false,
            error: e.message,
            message: "User role cannot be verified."
        })
    }
}