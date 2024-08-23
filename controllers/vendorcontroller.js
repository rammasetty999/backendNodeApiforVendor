const vendo=require('../models/vendor')
const jsonwebtoken=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const vendorregister=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const ven=await vendo.findOne({email})
        if(ven){
            return res.status(400).json("email already taken")
        }
        const hashpass=await bcrypt.hash(password,10)
        const newvendor=new vendo({
            name,
            email,
            password:hashpass
        });
        await newvendor.save();
        res.status(200).json("registered succesfully")

        console.log("registered succesfully");
    }
    catch(error)
    {
        res.status(400).json(error)

    }
}
const vendorlogin=async (req,res) => {
    try {
        const {email,password}=req.body
        const ven=await vendo.findOne({email})
        if(!ven || ! await bcrypt.compare(password,ven.password)){
                return res.status(400).json({error:"not a valid one or incorrect password"})
        }
        const token=jsonwebtoken.sign({vendorId:ven._id},process.env.key,{expiresIn:"1h"})
        let fm=ven.firm[0]
        console.log(`thisis ven firm ${fm}`)
        res.status(207).json({msg:"successful login",token:token,fm})
        console.log('login successful')
    } catch (error) {
        res.status(403).json(error)
        
    }
    
}
const getallrec=async (req,res) => {
    try{
        const vend=await vendo.find().populate('firm');
        res.status(200).json({vend})
    }
    catch(error)
    {
        res.status(400).json("error occcured in fetching")
    }
    
}
const getvenid=async (req,res) => {
    try{
        const id=req.params.id
        const rec=await vendo.findById(id).populate('firm')
        res.status(200).json(rec)
    }
    catch(error)
    {
        res.status(400).json("error in fetching by id")
    }
    
}
module.exports={vendorregister,vendorlogin,getallrec,getvenid}