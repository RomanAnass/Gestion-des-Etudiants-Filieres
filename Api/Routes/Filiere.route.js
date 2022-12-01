const express = require('express');
const route = express.Router();

const filiereController = require('../Controllers/Filiere.controller');
const bodyParser = require('body-parser');
const authguard = require('./guards/auth.guard');

route.get('/list',authguard.isAuth,filiereController.getFilieres);
route.post('/save',authguard.isAuth,filiereController.postFiliere);
//route.post('/filiere/deleteFilieret',authguard.isAuth,bodyParser.urlencoded({extended : true}),filiereController.deleteFiliere);
route.post('/update',authguard.isAuth,filiereController.putFiliere);

module.exports = route;