// const http = require("http");

const express = require("express");

const app = express();

app.use('/add-product',(req, res, next)=>{

    console.log("In the middleware!");
    res.send('<h>Add Product Here!</h>');
    
    // next();// allows the request to continue to next middleware in line
});

app.use('/',(req, res, next)=>{

    console.log("In the another middleware!");
    res.send('<h>Home Page</h>');
});

// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000);

