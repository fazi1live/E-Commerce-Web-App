require('./credentials/env');
const http=require('http');
const app=require('./app/app');
const port=process.env.PORT || 7878;
const server =http.createServer(app);
server.listen(port,()=>{
    console.log("Server is Running on the Port "+port);
});






