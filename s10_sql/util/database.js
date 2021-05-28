// const mysql = require('mysql2');

// //pool - collection of connection
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'shop',
//     password: 'password'
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('shop', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;