const mongoose = require('mongoose');
const Schema=mongoose.Schema({
    Heading:{type:String},
    HeadingDescription:{type:String},
    HeadingCategory:{type:String}
    })




module.exports=mongoose.model('AboutUsComponentDynamicHeadingsCollection',Schema);