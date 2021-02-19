// const http = require("http");

const express = require("express");

const app = express();

app.use((req, res, next)=>{

    console.log("In the middleware!");
    next();// allows the request to continue to next middleware in line
});

app.use((req, res, next)=>{

    console.log("In the another middleware!");
    res.send('<h>This is Express JS</h>');
});

// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000);

