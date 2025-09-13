const mongoose = require('mongoose');

const expenseModel = new mongoose.Schema({

amount:{
    type:Number,
    required:true
},

description:{
    type:String,
    required:true
},
date:{
    type:Date,
    required:true
},
category:{
    type:String,
      enum: ["seeds", "fertilizers", "pesticides", "labor", "machinery", "irrigation", "transportation", "others"],
    required:true
},
owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},

farm:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Farm",
    required:true
},

crop:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Crop",
    required:false
}


},{timestamps:true})

module.exports = mongoose.model("Expense",expenseModel);