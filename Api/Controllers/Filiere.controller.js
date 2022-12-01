const filiereModel = require('../models/Filiere.model');
const { errorMessage, successMessage, status } =  require("../helpers/status");
const { isEmpty } =  require("../helpers/validations");

exports.getFilieres = (req,res,next) => {
  
  filiereModel.getFilieresData()
  .then((filieres)=>{
      console.log(filieres)
      successMessage.data =  filieres;
      return res.status(status.success).send(successMessage);
  })
  .catch((err)=>{
    return res.status(status.error).send(err);
  })
  
}

exports.postFiliere = (req,res,next) =>{
 
   console.log(req.body.code,' ',req.body.libelle)
  if (isEmpty(req.body.code) || isEmpty(req.body.libelle)) {
    console.log(01)
    errorMessage.error = 'Make sure that you fill out all required fields';
    console.log(02)
    return res.status(status.bad).send(errorMessage);
  }
    console.log(1)
    filiereModel.createNewFiliere({
      code : req.body.code,
      libelle : req.body.libelle
    })
    .then(()=>{
      successMessage.data = 'Filiere created successfully';
      return res.status(status.created).send(successMessage);
      
    })
    .catch(err =>{
      errorMessage.error = 'Failed to created Filiere';
      return res.status(status.bad).send(errorMessage);
    })
}

exports.putFiliere = (req,res,next) =>{
  if (isEmpty(req.body.id) || isEmpty(req.body.code) || isEmpty(req.body.libelle)){
    errorMessage.error = 'Make sure that you fill out all required fields';
    return res.status(status.bad).send(errorMessage);
  }
    filiereModel.updateFiliere({
        id: req.body.id,
        code : req.body.code,
        libelle : req.body.libelle
    })
    .then((result)=>{
      successMessage.data = 'Filiere updated successfully';
      return res.status(status.created).send(successMessage);
    })
    .catch(err =>{
      errorMessage.error = 'Failed to update Filiere';
      return res.status(status.bad).send(errorMessage);
    })
   
}

exports.deleteFiliere = (req,res,next) =>{
    filiereModel.deleteFiliere({
        code : req.body.code 
    })
    .then((result)=>{
      console.log(result)
      
    })
    .catch(err =>{
      console.log(err)
     
    })
   
}

