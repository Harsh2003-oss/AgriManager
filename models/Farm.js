const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
    name:{
        type:String,
           required: true,
    trim: true
    },

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    
location: {
    address: String,
    coordinates: {
     
      type: [Number],      
       required: false 
  },
    },

    totalArea:{
        type:Number,
        required:true
    },

    fields:{
        type:String
    }    
},
{timestamps:true}
)