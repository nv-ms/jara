const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const users = require('./users');
const jobs = require('./jobs');
const categories = require('./users');

const deletedJobs = sequelize.define('deleted_Jobs',{
    job_id:{
        primaryKey:true,
        type:DataTypes.STRING,
        allowNull:false
    },
    job_title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    job_description:{
        type: DataTypes.STRING,
        allowNull: true
    },
    job_location:{
        type: DataTypes.STRING,
        allowNull: false
    },
    job_requirements:{
        type: DataTypes.STRING,
        allowNull: true
    },
    category_id:{
        type:DataTypes.STRING,
        allowNull:false,
        references:{
            model:categories,
            key:"category_id"
        }
    },
    salary_range:{
        type: DataTypes.STRING,
        allowNull: false
    },
    posted_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    deleted_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    employer_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: users, 
            key: 'user_id' 
        }
    }    
},{
    timestamps:false
});

deletedJobs.belongsTo(users,{foreignKey:'employer_id'});
deletedJobs.belongsTo(jobs,{foreignKey:'job_id'});


module.exports = deletedJobs;