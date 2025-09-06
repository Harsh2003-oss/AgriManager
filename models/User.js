const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true
},

email:{
    type:String,
    required:true,
    trim:true,
    unique:true,
    lowercase:true,
    minlength:[5,"Email must be at least 5 characters long"],
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address"]
},
password:{
    type:String,
    required:true,
    minlength:[6,"Password must be at least 6 characters long"]
},

phonenumber:{
    type:Number,
    required:true,
}},
{timestamps:true}
);


module.exports = mongoose.model("User",userSchema);