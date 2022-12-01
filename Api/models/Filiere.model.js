const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const server = '127.0.0.1:27017';
const database = 'Gestion_Des_Etudiants';

const FiliereSchema = new Schema({
    
     code: {
         type: String,
         required: true
     },
     libelle: {
        type: String,
        required: true
    },
    filiere : [{type: mongoose.Schema.ObjectId,ref:'student'}]
});

const Filiere = mongoose.model('filiere', FiliereSchema);

exports.createNewFiliere = data => {
    return new Promise((resolve,reject)=> {
       mongoose.connect(`mongodb://${server}/${database}`)
       .then(()=>{
          return Filiere.findOne({code: data.code})
       })
       .then(filiere =>{
          if(filiere){
             mongoose.disconnect();
             reject("filiere already exists")
          }else{
           
            let filiere = new Filiere({
                code:  data.code,
                libelle: data.libelle,
             });

              return filiere.save();  
          }
        })
       .then(()=>{
          mongoose.disconnect();
          resolve("Filiere is created"); 
       }) 
       .catch(err =>{
          console.log(err)
          mongoose.disconnect();
          reject(err);
       })
    })
}

exports.deleteFiliere = async data => {
     
    try {     
        await mongoose.connect(`mongodb://${server}/${database}`);
        await Filiere.findOneAndDelete({code : data.cne});
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        return new Error(error);
    }
    
}

exports.updateFiliere = async data => {
     
    try {     
        await mongoose.connect(`mongodb://${server}/${database}`);
        await Filiere.findByIdAndUpdate(data.id,{code: data.code,libelle: data.libelle});
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        return new Error(error);
    }
    
}

exports.getFilieresData = async () => {    
    try {
        
        await mongoose.connect(`mongodb://${server}/${database}`);
        filieres = await Filiere.find();
        console.log(filieres)
        return filieres;
    }catch (error) {
        mongoose.disconnect();
        return error; 
    }  
};
