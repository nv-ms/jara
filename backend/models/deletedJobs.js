const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const users = require('./users');
const jobs = require('./jobs');

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
    job_type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    short_job_description:{
        type:DataTypes.STRING,
        allowNull:false
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
    min_salary: {
        type: DataTypes.STRING,
        allowNull: false
    },
    max_salary:{
        type:DataTypes.STRING,
        allowNull:true
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