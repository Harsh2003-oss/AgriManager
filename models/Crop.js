const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name:{
     type: String, 
     required: true
     },  

  status: { 
    type: String, 
    enum: ["planted", "growing", "harvested", "failed"], 
    default: "planted" 
  },
  farm: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Farm", 
    required: true 
  },

    owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  plantingDate: { type: Date,
     required: true
     },
  expectedHarvestDate: { 
    type: Date
 }, 
  actualHarvestDate: {
     type: Date 
    }
},
{ timestamps: true});


module.exports = mongoose.model("Crop", cropSchema);
