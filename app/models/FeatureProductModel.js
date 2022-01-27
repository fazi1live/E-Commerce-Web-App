const mongoose = require('mongoose');
// Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const FeatureProductSchema=mongoose.Schema({
    
    productName:{type:String,required:true},
    price:{type:Number, required:true},
    quantity:{type:Number,required:true},
    description:{type:String,required:true},
    altImageName:{type:String,strict:false},
    imgDetails: [
        {
            _id: false,
            imageUrl:{type:String},
            imageName:{type:String},
            imageMimeType:{type:String},
        }
    ],
    
    sizeDetails:[
        {
            _id:false,
            size:{type:String}
        }
    ],
    fabric:{type:String},
    logo:{type:String},
    color:{type:String},
    Date: {
        type: String,
        default: `${year}-${month}-${day}`,
    },
},{timestamps: true,})




module.exports=mongoose.model('FeatureProductCluster',FeatureProductSchema);