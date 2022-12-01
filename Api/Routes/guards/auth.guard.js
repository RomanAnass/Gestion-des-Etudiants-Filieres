const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { errorMessage, successMessage, status } = require("../../helpers/status");


dotenv.config();

exports.isAuth = (req,res,next)=>{
    console.log(req.headers.authorization.replace('Bearer ', ''));
    let token = req.headers.authorization.replace('Bearer ', '');
    if(!token){
        errorMessage.error = "Token not provided for this user";
        return res.status(status.bad).send(errorMessage); 
    }

    try {
       
       console.log("ss :",process.env.JWT_SECRET)
        let decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {
           id: decoded._id
        };
        next();
       } catch (error) {
        errorMessage.error = "Authentication Field for clientIP";
        return res.status(status.unauthorized).send(errorMessage.error);
       }
}
