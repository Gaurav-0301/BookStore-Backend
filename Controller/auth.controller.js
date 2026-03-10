const User=require('../Models/user.model')


const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
module.exports.signup=async(req,res)=>{
const {name,email,password}=req.body;


try{
if(!email||!name||!password){
    return res.status(400).json({
        message:"All fields are required"
    })
}
let user=await User.findOne({email});
if(user){
    return res.status(400).json({
        message:"Account already exist with this email !!.Please try with other email address."
    })
}

let salt= await bcrypt.genSalt();
let hashedPassword= await bcrypt.hash(password,salt);

user=await User.create({
    name,
    email,
    password : hashedPassword,
});
let token=jwt.sign({id:user._id},process.env.JWT_SECRET,
    {expiresIn:"2d"});

    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        maxAge:7*24*60*60*1000
    });
  res.status(200).json({
    message:"User registration successfully"
  })
}
catch(error){
res.status(500).json({
    message:"Something went wrong "+error.message
})
}

};


module.exports.login=async(req,res)=>{
const {email,password}=req.body;
try {
    if(!email||!password){
    return res.status(400).json({
        message:"All fields are required"
    })
}
let user=await User.findOne({email});
if(!user){
    return res.status(400).json({
        message:"User not found"
    })
}
let isMatch= await bcrypt.compare(password,user.password);
    
if(!isMatch){
    return res.status(400).json({
        message:"Invalid password"
    })
}
let token=jwt.sign({id:user._id},process.env.JWT_SECRET,
    {expiresIn:"2d"});


      res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        maxAge:7*24*60*60*1000
    });

    res.status(200).json({
        message:"Login successfully",
        user:user
    })


} catch (error) {
    res.status(500).json({
    message:"Something went wrong "+error.message
})
}
}

module.exports.logout= async(req,res)=>{
    res.cookie("token",'',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({
        message:"Logout successfully"
    })
}

