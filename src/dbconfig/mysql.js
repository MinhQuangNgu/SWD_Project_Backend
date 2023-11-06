const mysql = require('mysql2');
const dotenv = require('dotenv');   
dotenv.config();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'SWD'
});

module.exports = connection;