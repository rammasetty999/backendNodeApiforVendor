const express=require('express')
const path=require('path')
const router=express.Router()
const productcontroller=require('../controllers/productcontroller')
router.post('/add-product/:firmid',productcontroller.addproduct)
router.delete('/delete-product/:pid',productcontroller.deleteproductbyid)
router.get('/getallproducts/:firmid',productcontroller.getproductbyfirmid)
router.get('/uploads/:imageName',(req,res)=>{
    const imagename=req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imagename))
})
module.exports=router

