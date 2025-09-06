var User = require("../models/User");

const registerUser = async (req, res) => {

    try {
        
        const {name,email,password,phonenumber} = req.body;

        if(!name || !email || !password || !phonenumber){
            return res.status(400).json({error:"Please fill all the fields"})
        }

        const existedUser = await User.findOne({
            email:email
        })

        if(existedUser){
            return res.status(400).json({error:"User already exists"})
        }




const user = await User.create({
    name,
    email,
    password: await User.hashPassword(password),
    phonenumber
})

const token = user.generateJWT();
delete user._doc.password;
   
return res.status(201).json({
    message:"User registered successfully",
    user,
    token
})



    } catch (error) {
       return res.status(400).json({error:error.message })
    }
}

module.exports = registerUser;