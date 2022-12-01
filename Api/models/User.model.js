const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const server = '127.0.0.1:27017';
const database = 'Gestion_Des_Etudiants';

const UserSchema = new Schema({
       email: {
            type: String,
            required: true,
            unique: true,
            validate: (value) => {
            return validator.isEmail(value)
            }
        },
        password: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        full_Name : {
            type: String,
            required: true
        }
});

const User = mongoose.model('user', UserSchema);

exports.createNewUser = data => {
    return new Promise((resolve,reject)=> {
       mongoose.connect(`mongodb://${server}/${database}`)
       .then(()=>{
          return User.findOne({email: data.email})
       })
       .then(user =>{
          if(user){
             mongoose.disconnect();
             reject("email is used")
          }else{
             return bcrypt.hash(data.password,10) 
          }
        })
       .then((hashpassword)=>{
           console.log(data.day+ '-'+ data.month + '-'+ data.year);
          let user = new User({
             email:  data.email,
             password: hashpassword,
          });
          return user.save(); 

       })
       .then(()=>{
          mongoose.disconnect();
          resolve("usr is created"); 
       }) 
       .catch(err =>{
          console.log(err)
          mongoose.disconnect();
          reject(err);
       })
    })
}

exports.login = (data)=>{  
    
    return new Promise((resolve,reject)=>{
        mongoose.connect(`mongodb://${server}/${database}`)
        .then(()=>{
            console.log(data.email)
           return User.findOne({email: data.email})
        })
        .then((user)=>{
            if(!user){
                console.log(user)
                mongoose.disconnect();
                reject("user is not exist");
            }
            
             bcrypt.compare(data.password,user.password).then((result)=>{
                if(!result){
                   mongoose.disconnect();
                   reject("password is incorrect");
                }
                mongoose.disconnect()
                console.log(user)
                resolve(user)
           })
        })
        .catch((err)=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}


exports.getUserData = async id =>{    
    try {
        await mongoose.connect(`mongodb://${server}/${database}`);
        user = await User.findById(id);
        if(!user){
          mongoose.disconnect()
          return new Error('user is not exist'); 
        }
        return user;
    }catch (error) {
        mongoose.disconnect();
        return error; 
    }  
};



