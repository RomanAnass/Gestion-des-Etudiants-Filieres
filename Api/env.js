const dotenv = require('dotenv');

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET,
  LOG_FILE_PATH: process.env.LOG_FILE_PATH,
  UPLOAD_PATH:process.env.UPLOAD_PATH,
  HOTMAIL:process.env.HOTMAIL,
  PASS:process.env.PASS
}