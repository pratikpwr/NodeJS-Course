const express = require("express");

const app = express();

// 2.
// app.use('/',(req, res, next) => {
//     console.log('1st middleware.');
//     next();
// });

// app.use('/',(req, res, next) => {
//     console.log('2nd middleware.');
//     next();
// });

// 3.
app.use('/users',(req, res, next) => {
    console.log('1st middleware.');
    res.send('<h1>Users Page</h1>');
});

app.use('/',(req, res, next) => {
    console.log('1st middleware.');
    res.send('<h1>Home Page</h1>');
});


app.listen(3000);