const mongoose = require('mongoose');
const AddingFooterImageDynamically=mongoose.Schema({
    imageUrl:{type:String},
    imageName:{type:String},
    imageMimeType:{type:String},
    })




module.exports=mongoose.model('AddingFooterImageDynamicallyCluster',AddingFooterImageDynamically);