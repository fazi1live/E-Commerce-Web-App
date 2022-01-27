const mongoose = require('mongoose');
const CardThree=mongoose.Schema({
    FolderName:{type:String},
    imageUrl:{type:String},
    imageName:{type:String},
    imageMimeType:{type:String},
    })




module.exports=mongoose.model('CardThreeCluster',CardThree);