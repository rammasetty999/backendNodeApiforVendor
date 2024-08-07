const mongoose=require('mongoose')
const firmschema=new mongoose.Schema({
    firmname:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    category:[
        {
            type:String,
            enum:['veg','non-veg']
        }
    ],
    region:[
        {
            type:String,
            enum:['south-indian','north-indian','chinese','bakery']
        }
    ],
    offer:{
        type:String
    },
    image:{
        type:String
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'vendor'
        }
    ],
    product:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'product'

        }
    ]
})
const firm1=mongoose.model('firm',firmschema);
module.exports=firm1