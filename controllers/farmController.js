const farmModel = require("../models/Farm");

const createFarm = async (req,res) => {
    try {
     
        const {name,location,totalArea,fields} = req.body;
        
        if(!name || !location || !totalArea || !fields){
            return res.status(400).json({error:"Please fill all the fields"})
        }


        const farm = await farmModel.create({
            name,
            owner: req.user ? req.user._id:null,
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

    module.exports = {createFarm};