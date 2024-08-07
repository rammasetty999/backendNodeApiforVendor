const express=require('express')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
const router=require('./routes/vendorroute')
const froutes=require('./routes/firmroute')
const proutes=require('./routes/productroute')
const app=express()
const port=5000
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
// In your main server file
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});
