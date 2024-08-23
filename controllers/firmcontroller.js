const vendor=require('../models/vendor')
const path=require('path')
const firm=require('../models/firm')
const multer=require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
  });
  const upload=multer({storage:storage})
const addfirm=async (req,res) => {
  try{
    const {firmname,area,category,region,offer}=req.body
    const image=req.file?req.file.filename:undefined;

    const vend=await vendor.findById(req.vendorId)
    if(vend.firm.length>0){
      msg="already firm exists"
      return res.status(400).json({msg})
    }
    if(!vend){
      res.status(400).json("no vendor")
    }
    const frm=new firm({
        firmname,area,category,region,offer,image,vendor:vend._id
    })
   const dup= await frm.save();
   const fm=dup._id
   vend.firm.push(dup)
   await vend.save()
    return res.status(200).json({fm})
  }
  catch(error)
  {
    console.log(error )
    return res.status(400).json("from controller")
   
    
  }
    
}
const deletefirmbyid=async (req,res) => {
  try {
      const pid=req.params.pid
      const del=await firm.findByIdAndDelete(pid)
      if(!del){
          return res.status(400).json("no firm id")
      }
      res.status(200).json("firm deleted succesfully")
  } catch (error) {
      res.status(400).json(error)
      
  }}
const getafm =async (req,res) => {
  try {
    const pid=req.params.firmid
    const fir= await firm.findById(pid)
    if(!fir){
      return res.status(400).json("not found ")
    }
   await console.log(fir.firmname)
   let a=fir.firmname
    res.status(200).json({"a":a})
    
  } catch (error) {
    res.status(400).json(error)
  }
  
}

module.exports={addfirm:[upload.single('image'),addfirm],deletefirmbyid,getafm}