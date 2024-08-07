const vendor=require('../models/vendor')
const jsonwebtoken=require('jsonwebtoken')
const dotenv=require('dotenv').config()
const verifytoken=async (req,res,next) => {
    const token=req.headers.token
    if(!token)
    {
        return res.status(400).json("no token found")
    }
    try{
        const decoded= jsonwebtoken.verify(token,process.env.key)
        const vend=await vendor.findById(decoded.vendorId);
        if(!vend)
        {
            return res.status(400).json("invalid vendor")
        }
        req.vendorId=vend._id
    
        next();
    }
    catch(error)
    {
        return res.status(400).json("no token found")
    }
    
}
module.exports=verifytoken