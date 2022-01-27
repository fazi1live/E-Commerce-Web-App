const mongoose = require('mongoose');
const CardFour=mongoose.Schema({
    imageUrl:{type:String},
    imageName:{type:String},
    imageMimeType:{type:String},
    })




module.exports=mongoose.model('CardFourCluster',CardFour);