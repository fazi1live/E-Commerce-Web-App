const mongoose = require('mongoose');
const Schema=mongoose.Schema({
    Name:{type:String},
    Role:{type:String},
    MemberCategory:{type:String},
    imageUrl:{type:String},
    imageName:{type:String},
    imageMimeType:{type:String},
    })




module.exports=mongoose.model('AboutUsComponentDynamicTeamCollection',Schema);