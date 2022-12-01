
//const  env = require('../env');
const jwt = require('jsonwebtoken');
const dotenv =  require('dotenv');

dotenv.config();

exports.isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  if(typeof input == "string" && input.replace(/\s/g, '').length) {
    return false;
  }
  if(typeof input == "object"){
    if (input == null || input == '' || input.length == 0)
      return true;
    else
      return false;
  }
  return false;
};

  exports.isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
  };

  exports.isValidatePassword = (password) => {
    if (password.length < 5 || password === '') {
      return false;
    }
    return true;
  };
  exports.generateToken = (email,user_id,username,full_Name) =>{
  console.log("ss : ",process.env.JWT_SECRET);
  const  token = jwt.sign({
    email,
    user_id,
    username,
    full_Name
     },process.env.JWT_SECRET,{
    expiresIn: "3d"
  });
return token;
};

/**
 *  MH  - Add Password Validation
 *
 */
const passwordValidator = require('password-validator');
const passwordChecker = new passwordValidator();
/*
exports.passwordChecker
  .min(8)                                    // Minimum length 8
  .max(100)                                  // Maximum length 100
  .uppercase()                              // Must have uppercase letters
  .lowercase()                              // Must have lowercase letters
  .digits(2)                                // Must have at least 2 digits
  .not().spaces()                           // Should not have spaces
  .not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
// /* -------------- End Of Password Validator ------------ 
 */


