const express = require('express');
const path = require('path');
const  Server  = require('http');
const bodyParser  = require('body-parser');
const cors = require('cors');

const userRoute = require('./Routes/User.route');
const student = require('./Routes/Student.route');
const filiere = require('./Routes/Filiere.route');

const app = express();
const server = require('http').createServer(app);


app.use(bodyParser.json());
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = '3000'
const  hostname = 'localhost'

app.use('/user', userRoute);
app.use('/etudiant',student);
app.use('/filiere',filiere);
server.listen(port,()=>{
    console.log(`http://${hostname}:${port}`);
})

 