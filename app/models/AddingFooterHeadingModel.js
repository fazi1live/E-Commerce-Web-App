const mongoose = require('mongoose');
const HeadingSchema=mongoose.Schema({
    Heading:{type:String},
    HeadingDescription:{type:String},
    HeadingCategory:{type:String}
    })




module.exports=mongoose.model('AddingFooterHeadingSchemaCluster',HeadingSchema);