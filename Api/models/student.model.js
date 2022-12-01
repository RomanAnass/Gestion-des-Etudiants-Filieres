const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const server = '127.0.0.1:27017';
const database = 'Gestion_Des_Etudiants';

const StudentSchema = new Schema({
    
     nom: {
         type: String,
         required: true
     },
     prenom : {
        type: String,
        required: true
    },
    cne : {
        type: String,
        required: true
    },
    filiere : {type: mongoose.Schema.ObjectId,ref:'filiere'}
});

const Student = mongoose.model('student', StudentSchema);

exports.createNewStudent = data => {
    return new Promise((resolve,reject)=> {
       mongoose.connect(`mongodb://${server}/${database}`)
       .then(()=>{
          return Student.findOne({cne: data.cne})
       })
       .then(student =>{
          if(student){
             mongoose.disconnect();
             reject("student already exists")
          }else{
           
            let student = new Student({
                nom:  data.nom,
                prenom: data.prenom,
                cne: data.cne,
                filiere: data.filiere
             });

              return student.save();  
          }
        })
       .then(()=>{
          mongoose.disconnect();
          resolve("Student is created"); 
       }) 
       .catch(err =>{
          console.log(err)
          mongoose.disconnect();
          reject(err);
       })
    })
}

exports.deleteStudent = async data => {
     
    try {     
        await mongoose.connect(`mongodb://${server}/${database}`);
        await Student.findOneAndDelete({cne : data.cne});
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        return new Error(error);
    }
    
}

exports.updateStudent = async data => {
     
    try {     
        await mongoose.connect(`mongodb://${server}/${database}`);
        await Student.findByIdAndUpdate(data.id,{nom: data.nom,prenom: data.prenom,cne: data.cne, filiere: data.filiere});
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        return new Error(error);
    }
    
}

exports.getStudentsData = async () => {    
    try {
        
        await mongoose.connect(`mongodb://${server}/${database}`);
        students = await Student.find().populate({
            path: 'filiere',
            model: 'filiere'
        });
        console.log("std : ",students);
        return students;
    }catch (error) {
        mongoose.disconnect();
        return error; 
    }  
};
