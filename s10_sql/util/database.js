const mysql = require('mysql2');

//pool - collection of connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'shop',
    password: 'password'
});

module.exports = pool.promise();