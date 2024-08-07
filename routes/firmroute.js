const express=require('express')
const path=require('path')
const firmcontroller=require('../controllers/firmcontroller')
const mw=require('../middlewares/verifytoken')
const router1=express.Router()
router1.post('/add-firm',mw,firmcontroller.addfirm)
router1.delete('/delete-firm/:pid',firmcontroller.deletefirmbyid)
router1.get('/uploads/:imageName',(req,res)=>{
    const imagename=req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imagename))
})
console.log("now crossed route")
module.exports=router1