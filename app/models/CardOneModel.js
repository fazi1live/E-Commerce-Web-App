const mongoose = require('mongoose');
const CardOne=mongoose.Schema({
    imageUrl:{type:String},
    imageName:{type:String},
    imageMimeType:{type:String},
    })




module.exports=mongoose.model('CardOneCluster',CardOne);