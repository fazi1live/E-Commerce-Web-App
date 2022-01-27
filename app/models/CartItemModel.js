const mongoose = require('mongoose');
const CartItemSchema=mongoose.Schema({
    
    productName:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number},
    description:{type:String},
    altImageName:{type:String},
    imageUrl:{type:String},
    imageName:{type:String},
    imageMimeType:{type:String},
    productId:{type:mongoose.Schema.Types.ObjectId},
    
    
})



module.exports=mongoose.model('CardItemCluster',CartItemSchema);