const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs_shop', 'root', 'mysql-nodejs', {dialect: 'mysql', host: 'localhost', port: 3306});

module.exports = sequelize;