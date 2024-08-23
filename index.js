const express=require('express')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
const router=require('./routes/vendorroute')
const froutes=require('./routes/firmroute')
const proutes=require('./routes/productroute')
const cors=require('cors')
const app=express()
app.use(cors())
const port=process.env.port || 5000
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json())
mongoose.connect(process.env.mongourl).then(()=>{
    console.log("mongodb connected succesfully")
}).catch((error)=>{
    console.log("error occured in mongodb connection",error)
})
app.use('/firms',froutes)
app.use('/vendor',router)
app.use('/product',proutes)
app.use('/uploads',express.static('uploads'))
app.listen(port,()=>{
    console.log("server started succesfully")
})
app.use('/',(req,res)=>{
    res.send("<h2>welcome to myapi")
})