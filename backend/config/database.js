const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const database = process.env.DBNAME;
const username = process.env.DBUSERNAME;
const password = process.env.DBPASSWORD;

const sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
