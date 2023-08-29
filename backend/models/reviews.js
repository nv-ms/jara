const sequelize = require('../config/database');
const {DataTypes} = require('sequelize');
const users = require('./users');
const jobs = require('./jobs');

const reviews = sequelize.define('reviews',{
    review_id:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    user_id:{
        type:DataTypes.STRING,
        allowNull:false,
        references:{
            model:users,
            key:"user_id"
        }
    },
    job_id:{
        type:DataTypes.STRING,
        allowNull:false,
        references:{
            model:jobs,
            key:"job_id"
        }
    },
    message:{
        type:DataTypes.STRING,
        allowNull:true
    },
    posted_date:{
        type:DataTypes.STRING,
        allowNull:true
    },
    rating:{
        type:DataTypes.ENUM('*','**','***','****','*****'),
        allowNull:false
    }
},{
    timestamps:false
});

reviews.belongsTo(users,{foreignKey:'user_id'});
reviews.belongsTo(jobs,{foreignKey:'job_id'});

module.exports = reviews;