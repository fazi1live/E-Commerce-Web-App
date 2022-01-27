const mongoose = require('mongoose');

// const ExtraInfoModel = mongoose.Schema({
//     title:String,
//     body:String,
//     date: Date
// })

const EmbeddedDataModel = mongoose.Schema({
    class:Number,
    ExtraInfo:[
        {
            _id:false,
            title:String,
            body:String,
            date: Date
        }
    ]
})


module.exports = mongoose.model('EmbeddedDataCluster',EmbeddedDataModel);