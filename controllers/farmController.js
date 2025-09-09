const farmModel = require("../models/Farm");

const createFarm = async (req,res) => {
    try {
     
        const {name,owner,location,totalArea,fields} = req.body;
        
        if(!name || !location || !totalArea || !fields){
            return res.status(400).json({error:"Please fill all the fields"})
        }


        const farm = await farmModel.create({
            name,
            owner:req.user.id,
            location,
            totalArea,
            fields
        })

        return res.status(201).json({
            message:"Farm created successfully",
            farm
        })

    } catch (error) {
        res.status(400).json({error:error.message})
    }  
    }

   const getFarms = async (req,res) => {
    try {
        
    const farms = await farmModel.find({owner:req.user._id})

    return res.status(200).json({
        farms
    })

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getFarmsById = async (req,res) => {
    try {
 
    const farm = await farmModel.findById(req.params.id)


    if(!farm){
        return res.status(404).json({error:"Farm not found"})
    }


    return res.status(200).json({
        farm
    })
        
    } catch (error) {
           
        res.status(400).json({error:error.message})
    }
}

const updateFarm = async (req,res) => {
    try {
 
        const {name,location,totalArea,fields} = req.body;

    const farm = await farmModel.findById(req.params.id);

    if(!farm ){
        return res.status(404).json({error:"Farm not found"})
    }

if(farm.owner !== req.user.id){
    return res.status(401).json({error:"You are not authorized to update this farm"})
}

  farm.name=name;
  farm.location=location;
  farm.totalArea=totalArea;
  farm.fields=fields;

    farm.save();

    return res.status(200).json({
        message:"Farm updated successfully",
        farm
    })

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const deleteFarm = async (req,res) => {
    try {
  
    const farm = await farmModel.findById(req.params.id);

    if(!farm){
        return res.status(404).json({error:"Farm not found"})
    }

    if(farm.owner !== req.user.id){
        return res.status(401).json({error:"You are not authorized to delete this farm"})
    }

    await farmModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        message:"Farm deleted successfully"
    })

        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

    module.exports = {createFarm , getFarms , getFarmsById, updateFarm, deleteFarm};