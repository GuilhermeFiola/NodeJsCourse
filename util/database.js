const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejs_shop',
    password: 'mysql-nodejs',
    port: 3306
});

module.exports = pool.promise();