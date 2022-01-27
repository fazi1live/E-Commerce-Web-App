const mongoose = require('mongoose');
const AddingCardCategoryImagesDynamically=mongoose.Schema({
    imageUrl:{type:String},
    imageName:{type:String},
    imageMimeType:{type:String},
    })




module.exports=mongoose.model('AddingCardCategoryImagesDynamicallyCluster',AddingCardCategoryImagesDynamically);