const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const users = sequelize.define('users', {
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING, 
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = users;
