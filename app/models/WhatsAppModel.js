const mongoose = require('mongoose');
const WhatsAppSchema=mongoose.Schema({
    
    message:{type:String,required:true},
    
})

module.exports=mongoose.model('WhatsAppCluster',WhatsAppSchema);