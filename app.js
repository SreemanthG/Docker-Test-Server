const express = require("express");
const mongoose = require("mongoose");
const dotevn = require('dotenv')
const bodyParser = require("body-parser")
const cors = require("cors");
const app = express();
dotevn.config()
mongoose.connect("mongodb://localhost:27017/dockertest")
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
// parse application/json
app.use(bodyParser.json())

//models
const testModel = require("./models/test");
const e = require("express");



//Routes
app.get("/",function(req,res){
    res.json({message:"Welcome to the api"})
})

app.get("/test",function(req,res){
    testModel.find({},function(err,test){
        if(err){
            res.json({status:"error",message:"Some error has occured"})
        } else{
            res.json({status:"success",message:"tests",data:test})
        }
    })

})

app.post("/test",function(req,res){
    testModel.create(req.body,function(err,test){
        if(err){
            res.json({status:"error",message:"Some error has occured",data:err})
        } else{
            res.json({status:"success",message:"Added Successfully",data:test})
        }
    })
    
})
//Listen
const PORT = process.env.PORT || 5000

app.listen(PORT, function(){
    console.log("Server started listening");
})