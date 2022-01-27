const mongoose = require('mongoose');
const CardTwo=mongoose.Schema({
    FolderName:{type:String},
    imageUrl:{type:String},
    imageName:{type:String},
    imageMimeType:{type:String},
    })




module.exports=mongoose.model('CardTwoCluster',CardTwo);