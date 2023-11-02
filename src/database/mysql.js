const mysql = require('mysql2');
const dotenv = require('dotenv');   
dotenv.config();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '652002',
    database: 'SWD'
});

module.exports = connection;