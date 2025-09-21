var User = require("../models/User");

const registerUser = async (req, res) => {

    try {
        console.log('API Key:', process.env.WEATHER_API_KEY ? 'Present' : 'Missing');
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

const login = async (req,res) => {
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"Please fill all the fields"})
        }

        const user = await User.findOne({email:email});

        if(!user){
            return res.status(400).json({error:"User does not exist"})
        }

        const isValidPassword = await user.isValidPassword(password);

        if(!isValidPassword){
            return res.status(400).json({error:"Invalid credentials"})
        }

        const token = user.generateJWT();
        delete user._doc.password;

        res.json({
            message:"User logged in successfully",
            user,
            token
        })

    } catch (error) {
        res.status(400).json({error:error.message })
    }
}

module.exports ={ registerUser, login };