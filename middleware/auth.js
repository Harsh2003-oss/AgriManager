const jwt = require("jsonwebtoken");
const user=require("../models/User");

const authenticateToken = (req, res, next) => {
    try {
        
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({error:"User not found"})
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
       console.log("Decoded user:", decoded); 
    req.user = decoded;
    next();

    } catch (error) {
        console.log(error);
        res.status(401).json({error:"Invalid Token"})
    }
}

module.exports = authenticateToken;