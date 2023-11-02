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
    job_category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    specialization:{
        type:DataTypes.STRING,
        allowNull: true
    },
    job_location:{
        type: DataTypes.STRING,
        allowNull: false
    },
    min_qualification:{
        type: DataTypes.STRING,
        allowNull:true
    },
    min_experience: {
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
    dead_line:{
        type: DataTypes.STRING,
        allowNull: true
    },
    posted_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    job_description: {
        type: DataTypes.STRING,
        allowNull: true
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
    },
    directRequests:{
        type:DataTypes.INTEGER,
        allowNull:true
    }, 
},
{
    timestamps:false
});

deletedJobs.belongsTo(users,{foreignKey:'employer_id'});
deletedJobs.belongsTo(jobs,{foreignKey:'job_id'});


module.exports = deletedJobs;