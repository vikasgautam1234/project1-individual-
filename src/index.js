// Entry file--------------------------------
const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route')
const app = express();
app.use(express.json());

app.use('/' , route);

mongoose.connect("mongodb+srv://vikasgautam:8279787711@cluster0.anirnnm.mongodb.net/project1" ,{
    useNewUrlparser :true
})
.then(()=>console.log("Mongodb is Connected"))
.catch((err)=>console.log(err.message))



app.listen(3000 , function(){
    console.log("Running on the port",3000)
})