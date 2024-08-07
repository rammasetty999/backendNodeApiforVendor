const mongoose=require('mongoose')
const vendorschewma=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'firm'
        }
    ]
});
const ven=mongoose.model('vendor',vendorschewma);
module.exports=ven