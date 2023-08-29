const sequelize = require("../config/database");
const { DataTypes } = require("sequelize"); 
const categories = require('./categories');
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
    category_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: categories,
            key: 'category_id'
        }
    },
    job_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    job_location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    job_requirements: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salary_range: {
        type: DataTypes.STRING,
        allowNull: false
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
},{
    timestamps: false
});

Jobs.belongsTo(categories, { foreignKey: 'category_id' });
Jobs.belongsTo(users, { foreignKey: 'employer_id' });

module.exports = Jobs;
