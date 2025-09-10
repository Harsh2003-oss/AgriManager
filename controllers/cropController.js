const cropModel = require('../models/Crop');
const farmModel = require('../models/Farm');


const createCrop = async (req,res) => {
    try {
        console.log("req.user:", req.user);           
console.log("req.user.id:", req.user.id);
        const{name,status,farm,plantingDate,expectedHarvestDate,actualHarvestDate} = req.body;

        if(!name || !farm || !plantingDate){
            return res.status(400).json({error:"Please fill all the fields"})
        }

        const existingFarm = await farmModel.findById(farm);

        if(!existingFarm){
            return res.status(404).json({error:"Farm not found"})
        }

        const crop = await cropModel.create({
            name,
            status,
            farm,
            owner:req.user.userId,
            plantingDate,
            expectedHarvestDate,
            actualHarvestDate
        })

        return res.status(201).json({
            message:"Crop created successfully",
            crop
        })

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


const getCrops = async (req,res) => {
    try {
        

    const crops = await cropModel.find({owner:req.user.userId})

    return res.status(200).json({
        crops
    })


    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getCropsById = async (req,res) => {
    try {
 
        const crop = await cropModel.findById(req.params.id)
        if(!crop){
            return res.status(404).json({error:"Crop not found"})
        }
        return res.status(200).json({
            crop
        })


    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const updateCrop = async (req,res) => {
    try {
        

        const {name,status,farm,plantingDate,expectedHarvestDate,actualHarvestDate} = req.body;



        const crop = await cropModel.findById(req.params.id);
        if(!crop){
            return res.status(404).json({error:"Crop not found"})
        }

        if(crop.owner.toString() !== req.user.userId){
            return res.status(403).json({error:"You are not authorized to update this crop"})
        }

        crop.name = name ;
        crop.status = status ;
        crop.farm = farm ;
        crop.plantingDate = plantingDate;
        crop.expectedHarvestDate = expectedHarvestDate;
        crop.actualHarvestDate = actualHarvestDate;

        await crop.save();
        return res.status(200).json({
            message:"Crop updated successfully",
            crop
        })


    } catch (error) {
 res.status(400).json({error:error.message})       
    }
}

const deleteCrop = async (req,res) => {
    try {
 
        const crop = await cropModel.findById(req.params.id);
        if(!crop){
            return res.status(404).json({error:"Crop not found"})
        }
        if(crop.owner.toString() !== req.user.userId){
            return res.status(403).json({error:"You are not authorized to delete this crop"})
        }
        await cropModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message:"Crop deleted successfully"
        })

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {createCrop,getCrops,getCropsById,updateCrop,deleteCrop};