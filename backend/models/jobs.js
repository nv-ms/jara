const sequelize = require("../config/database");
const { DataTypes } = require("sequelize"); 
const users = require("./users"); 

const Jobs = sequelize.define('Jobs', {
    job_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    job_title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    job_type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    short_job_description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    job_description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    job_location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    job_requirements: {
        type: DataTypes.STRING,
        allowNull: false
    },
    min_salary: {
        type: DataTypes.STRING,
        allowNull: false
    },
    max_salary:{
        type:DataTypes.STRING,
        allowNull:true
    },
    posted_date: {
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
},{
    timestamps: false
});

Jobs.belongsTo(users, { foreignKey: 'employer_id' });

module.exports = Jobs;
