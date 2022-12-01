const studentModel = require('../models/student.model');
const { errorMessage, successMessage, status } =  require("../helpers/status");
const { isEmpty } =  require("../helpers/validations");

exports.getStudents = (req,res,next) => {
    studentModel.getStudentsData()
    .then((students)=>{
        console.log(students)
        successMessage.data =  students;
        return res.status(status.success).send(successMessage);
    })
    .catch((err)=>{
      return res.status(status.error).send(err);
    })
  
}

exports.postStudent = (req,res,next) =>{

  if (isEmpty(req.body.nom) || isEmpty(req.body.prenom) || isEmpty(req.body.cne) || isEmpty(req.body.filiere) ) {
    errorMessage.error = 'Make sure that you fill out all required fields';
    return res.status(status.bad).send(errorMessage);
  }

    studentModel.createNewStudent({
      nom : req.body.nom,
      prenom : req.body.prenom,
      cne : req.body.cne,
      filiere: req.body.filiere
    })
    .then((result)=>{
      successMessage.data = 'Etudiant created successfully';
      return res.status(status.created).send(successMessage);
      
    })
    .catch(err =>{
      errorMessage.error = 'Failed to created etudiant';
      return res.status(status.bad).send(errorMessage);
    })
   
}

exports.putStudent = (req,res,next) =>{

  if (isEmpty(req.body.id) || isEmpty(req.body.nom) || isEmpty(req.body.nom) ||isEmpty(req.body.cne) || isEmpty(req.body.filiere) ) {
    errorMessage.error = 'Make sure that you fill out all required fields';
    return res.status(status.bad).send(errorMessage);
  }
    studentModel.updateStudent({
        id: req.body.id,
        nom : req.body.nom,
        prenom : req.body.prenom,
        cne : req.body.cne, 
        filiere: req.body.filiere
    })
    .then((result)=>{
      successMessage.data = 'Etudiant updated successfully';
      return res.status(status.created).send(successMessage);
    })
    .catch(err =>{
      errorMessage.error = 'Failed to update etudiant';
      return res.status(status.bad).send(errorMessage);
    })
   
}

exports.deleteStudent = (req,res,next) =>{
    studentModel.deleteStudent({
        cne : req.body.cne 
    })
    .then((result)=>{
      console.log(result)
      
    })
    .catch(err =>{
      console.log(err)
     
    })
   
}