const mongoose = require('mongoose');
const UserUnSuspensionMessageSchema=mongoose.Schema({
    
    UserId:{type:mongoose.Schema.Types.ObjectId,ref:'UserCluster'},
    Message:String
    
    
})

module.exports=mongoose.model('UserUnSuspensionMessageCluster', UserUnSuspensionMessageSchema);