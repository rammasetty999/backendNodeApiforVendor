const { default: mongoose } = require('mongoose')
const moongoose=require('mongoose')
const productschema=new moongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:[
        {
            type:String,
            enum:['veg','non-veg']
        }
    ],
    
    image:{
        type:String
    },
    bestseller:{
        type:String
    },
    description:{
        type:String
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'firm'
        }
    ]
})
const pmodel=mongoose.model('product',productschema)
module.exports=pmodel