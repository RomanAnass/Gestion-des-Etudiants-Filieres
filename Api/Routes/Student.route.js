const express = require('express');
const route = express.Router();

const studentController = require('../Controllers/Student.controller');
const bodyParser = require('body-parser');
const authguard = require('./guards/auth.guard');


route.get('/list',authguard.isAuth,studentController.getStudents);
route.post('/save',authguard.isAuth,studentController.postStudent);
route.post('deleteStudent',authguard.isAuth,bodyParser.urlencoded({extended : true}),studentController.deleteStudent);
route.post('/update',authguard.isAuth,studentController.putStudent);

module.exports = route;