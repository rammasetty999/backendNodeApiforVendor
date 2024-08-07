const product=require('../models/product')
const multer=require('multer')
const Firm=require('../models/firm')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
  });
  const upload=multer({storage:storage})
  const addproduct=async (req,res) => {

    try{
        const {productname,price,category,bestseller,description}=req.body
    const image=req.file?req.file.filename:undefined;
    const firmid=req.params.firmid
    const firm=await Firm.findById(firmid)
    const pro=new product({
        productname,price,category,bestseller,description,image,firm:firm._id
    })
    const dup=await pro.save()
    firm.product.push(dup)
    await firm.save()
    res.status(200).json(dup)
    }
    catch(error){
        res.status(400).json(error)
    }
  }
  const getproductbyfirmid=async (req,res) => {
    try{
        const fid=req.params.firmid
        const firm=await Firm.findById(fid)
        if(!firm)
        {
            res.status(400).json("no firm found")

        }
        const allpro= await product.find({firm:firm._id}).populate('firm')
        res.status(202).json(allpro)
    }
    catch(error)
    {
        res.status(400).json(error)
    }
    
  }
  const deleteproductbyid=async (req,res) => {
    try {
        const pid=req.params.pid
        const del=await product.findByIdAndDelete(pid)
        if(!del){
            res.status(400).json("no product id")
        }
        res.status(200).json("product deleted succesfully")
    } catch (error) {
        res.status(400).json(error)
        
    }
    
  }
  module.exports={addproduct:[upload.single('image'),addproduct],getproductbyfirmid,deleteproductbyid}