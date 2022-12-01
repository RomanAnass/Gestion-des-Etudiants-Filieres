const userModel = require('../models/User.model');
const { errorMessage, successMessage, status } =  require("../helpers/status");
const {passwordChecker, generateToken} = require("../helpers/validations");
const { isEmpty,isValidEmail,isValidatePassword} = require("../helpers/validations");

  
exports.postLogin = (req,res,next) => {
  
  const {email, password} = req.body;

  if (!isValidEmail(email)) {
    errorMessage.status = 'Please enter a valid Email';
    return res.status(status.bad).send(errorMessage);
  }

  if (!isValidatePassword(password)) {
    console.log(password.length)
    errorMessage.status = 'Password must be more than 8 characters';
    return res.status(status.bad).send(errorMessage);
  }

      
  userModel.login({email: req.body.email,password : req.body.password})
            .then((user)=>{
              const token = generateToken(user.email,String(user.id),user.username,user.full_Name)
              console.log('token',token);
              successMessage.data = {user : user, token: token} ;
              console.log("token created");
              console.log("succ : ",successMessage)
              return res.status(status.success).send(successMessage);
            })
            .catch((err)=>{
              console.log(err);
              errorMessage.error = 'invalid email or password';
              return res.status(status.unauthorized).send(errorMessage);
            })
               
}


exports.postSignup = (req,res,next) =>{
    userModel.createNewUser({
        email : req.body.emailAddress,
        password : req.body.password  
    })
    .then((result)=>{
      console.log(result)
      
    })
    .catch(err =>{
      console.log(err)
     
    })
   
}