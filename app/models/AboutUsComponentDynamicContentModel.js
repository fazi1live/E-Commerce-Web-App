const mongoose = require('mongoose');
const Schema=mongoose.Schema({
    imageType:{type:String},
    imageUrl:{type:String},
    imageName:{type:String},
    imageMimeType:{type:String},
    })




module.exports=mongoose.model('AboutUsComponentDynamicContentCollection',Schema);