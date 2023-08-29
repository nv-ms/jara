const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const category = sequelize.define('category',{
    category_id:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    category_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    category_description:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false
});

module.exports = category;