
const express= require('express');
const app=express();
const path = require('path');
const DbConfig = require('../config/appDataBaseConnection');
const morgan = require('morgan');
const cors = require('cors');

//Making Folder Publicly Accessable By The Node Application. 


// app.use(express.static('Public'));
//3 Setting Header for the Api call
app.use((req,res,next)=>{
    // This is how we protect the api
    res.header('Access-Control-Allow-Origin','*');// So it make the header allow to the origin when cross platfrom try to exchange the data
   res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
   if(req.method==='OPTIONS'){
       res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
   //Mehtod is a property which help us to use the Methods by request. Browers send the options request before your Mthods request
       
   }
   next(); //if nothing of the response sent back so next() means other routes can take over
});




app.use('/AboutUsTeamImages',express.static('AboutUsTeamImages'));
app.use('/videos',express.static('videos'));
app.use('/AboutUsComponentImages',express.static('AboutUsComponentImages'));
app.use('/AdminImages',express.static('AdminImages'));
app.use('/UserImages',express.static('UserImages'));
app.use('/FeatureProducts',express.static('FeatureProducts'));
app.use('/files',express.static('files'));
app.use('/ProductCategoryImages',express.static('ProductCategoryImages'));
app.use('/FooterImage',express.static('FooterImage'));


const productRoutes=require('../routes/product');
const orderRoutes=require('../routes/orders');
const WhatsAppRoutes=require('../routes/WhatsApp');
const UserManagementRoute=require('../routes/UserManagement');
const SendEmailRoute=require('../routes/SendEmail');
const AdminManagementRoute=require('../routes/AdminManagement')
const WebsiteStatsRoute=require('../routes/WebsiteStats');
const UnserUnSuspensionRoute=require('../routes/UserUnSuspensionMessage');
const DataModelingOperationsRoute=require('../routes/DataModelingOperations');
const AddingVideoDynamicallyRoute = require('../routes/AddingVideoDynamically');
const GeneralSettingsRoute = require('../routes/GeneralSettings');
const AboutUsComponentDynamicContentRoute = require('../routes/AboutUsComponentDynamicContent');
const EasyPostRouter = require('../routes/EasyPostAPI');
const PayPalRouter = require('../routes/PayPal');

app.use(morgan('dev'));
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(cors());




app.use('/Products',productRoutes);
app.use('/Orders',orderRoutes);
app.use('/WhatsApp',WhatsAppRoutes);
app.use('/UserManagement',UserManagementRoute);
app.use('/AdminManagement',AdminManagementRoute)
app.use('/Email',SendEmailRoute);
app.use('/WebsiteStats',WebsiteStatsRoute);
app.use('/UserApplication',UnserUnSuspensionRoute);
app.use('/Normalization',DataModelingOperationsRoute);
app.use('/Video',AddingVideoDynamicallyRoute);
app.use('/GeneralSettings',GeneralSettingsRoute);
app.use('/AboutUs',AboutUsComponentDynamicContentRoute);
app.use('/EasyPost',EasyPostRouter);
app.use('/PayPal',PayPalRouter);



app.use(express.static(path.join(__dirname,'../FrontEnd')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../FrontEnd/index.html'));
})

app.use((req,res,next)=>{
    const error= new Error('Url not found'); 
    error.status=404; 
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message,
        }
    })
});





module.exports=app;