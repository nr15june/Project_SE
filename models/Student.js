const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    Name        : {type:String,required:true},
    //Last_Name   : {type:String,required:true},
    Email       : {type:String,required:true},
    Username    : {type:String,required:true},
    Phone       : {type:String,required:true},
    Password    : {type:String,required:true},
    Faculty     : {type:String,required:true},
    Program     : {type:String,required:true},
    //Profile     : {type:String,required:true},
    Sex         : {type:String,required:true},
    Year_of_study : {type:Number, required:true}
},{timestamps:true, versionKey:false})

module.exports = mongoose.model('Student',StudentSchema);