const Package= require('../package.json');
const mongoose= require('mongoose');
mongoose.connect(process.env.DATABASE_URI,{useNewUrlParser:true, useUnifiedTopology:true},(error)=>{
    if(!error){
        console.log('\nMogoDb Connected Successfuly at 27017 with Database Name TestingDb\n');
        console.log("Your App Has the Following Dependicies\n");
        for(dependencies in Package.dependencies){
            console.log(dependencies);
        }
    }
    else{console.log('Error: Not Connected to the MongoDb' + error)}
});

//mongodb+srv://pf:pf123@promisefitnessdb.lafnn.mongodb.net/pf?retryWrites=true&w=majority
//mongodb+srv://FaziTestingDB:Rehman1!!@testingcluster.uzquj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority