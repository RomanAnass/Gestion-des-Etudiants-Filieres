const express = require('express');
const route = express.Router();

const userController = require('../Controllers/User.controller');
const bodyParser = require('body-parser');
const authguard = require('./guards/auth.guard');


route.post('/login',userController.postLogin);
route.post('/newUser',authguard.isAuth,userController.postSignup);

module.exports = route;



