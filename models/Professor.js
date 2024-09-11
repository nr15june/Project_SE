const mongoose = require("mongoose");

const ProfessorSchema = new mongoose.Schema({
    Name        : {type:String,required:true},
    //Last_Name   : {type:String,required:true},
    Email       : {type:String,required:true},
    Username    : {type:String,required:true},
    Phone       : {type:String,required:true},
    Password    : {type:String,required:true},
    //Institude   : {type:String,required:true},
    Faculty     : {type:String,required:true},
    //Profile     : {type:String,required:true},
},{timestamps:true, versionKey:false})

module.exports = mongoose.model('Professor',ProfessorSchema);