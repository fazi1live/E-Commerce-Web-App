const mongoose = require('mongoose');

// Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const ProductSchema=mongoose.Schema({
    
    productName:{type:String,required:true},
    category:{type:String,required:true},
    price:{type:Number, required:true},
    quantity:{type:Number,required:true},
    description:{type:String,required:true},
    altImageName:{type:String,strict:false},
    imageUrl:{type:String},
    imageName:{type:String},
    imageMimeType:{type:String},
    CreatedDate:{type:Date,default:Date.now},
    Date: {
        type: String,
        default: `${year}-${month}-${day}`,
    },
    },{timestamps: true,})




module.exports=mongoose.model('ProductCluster',ProductSchema);