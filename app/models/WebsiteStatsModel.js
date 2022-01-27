const mongoose = require('mongoose');
const WebsiteStatsSchema=mongoose.Schema({
    Status:{type:Number,default:0},
    NewVisitors:{
        VisitorCounter:{type:Number,default:0},
    },
    ActiveUsers:{
        UserCounter:{type:Number,default:0}
    },
    Purchases:{
        PurchasesCounter:{type:Number,default:0}
    },
    ProductClicks:{
        ClicksCounter:{type:Number,default:0}
    },
    TotalReturns:{
        RerutnsCounter:{type:Number,default:0}
    }
})

module.exports=mongoose.model('WebsiteStatsCluster',WebsiteStatsSchema);