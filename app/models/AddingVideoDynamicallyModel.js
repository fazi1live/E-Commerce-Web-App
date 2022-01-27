const mongoose = require('mongoose');
// Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const AddingVideoDynamicallySchema=mongoose.Schema({
    videoUrl:{type:String},
    videoName:{type:String},
    videoMimeType:{type:String},
    Date: {
        type: String,
        default: `${year}-${month}-${day}`,
    }
    })




module.exports=mongoose.model('AddingVideoDynamicallySchemaCluster',AddingVideoDynamicallySchema);